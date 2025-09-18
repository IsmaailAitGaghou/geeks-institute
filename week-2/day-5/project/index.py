import os
import math
from flask import Flask, render_template, request, redirect, url_for, flash, g
from database.index import get_db_conn
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY", "a_very_secret_key_123")


# --- Database Connection Management ---
@app.before_request
def before_request():
    g.conn = get_db_conn()
    g.cur = g.conn.cursor()


@app.teardown_request
def teardown_request(exception):
    if hasattr(g, "cur"):
        g.cur.close()
    if hasattr(g, "conn"):
        g.conn.close()


# --- Helper Functions ---
def get_pagination_data(query, params, page, per_page=6):
    """Generic pagination helper."""
    # Get total count
    count_query = f"SELECT COUNT(*) FROM ({query}) as subquery"
    g.cur.execute(count_query, params)
    total_items = g.cur.fetchone()[0]
    total_pages = math.ceil(total_items / per_page)

    # Get items for the current page
    offset = (page - 1) * per_page
    paginated_query = f"{query} LIMIT %s OFFSET %s"
    g.cur.execute(paginated_query, params + [per_page, offset])
    items = [
        dict(zip([desc[0] for desc in g.cur.description], row))
        for row in g.cur.fetchall()
    ]

    return {
        "items": items,
        "page": page,
        "total_pages": total_pages,
        "has_prev": page > 1,
        "has_next": page < total_pages,
        "prev_num": page - 1,
        "next_num": page + 1,
        "iter_pages": range(1, total_pages + 1),
    }


# --- Main Routes (Albums) ---
@app.route("/")
def list_albums():
    page = request.args.get("page", 1, type=int)
    search_query = request.args.get("search", "").strip()

    base_query = "SELECT id, title, release_year FROM album"
    params = []

    if search_query:
        base_query += " WHERE title ILIKE %s"
        params.append(f"%{search_query}%")

    base_query += " ORDER BY title"

    pagination = get_pagination_data(base_query, params, page)
    return render_template(
        "index.html",
        albums=pagination["items"],
        pagination=pagination,
        search_query=search_query,
    )


@app.route("/albums/new", methods=["GET", "POST"])
def create_album():
    if request.method == "POST":
        title = request.form.get("title")
        release_year = request.form.get("release_year", type=int)
        genre_id = request.form.get("genre_id", type=int)
        artist_ids = request.form.getlist("artists", type=int)

        if not title or not release_year:
            flash("Title and Release Year are required.", "error")
            return redirect(url_for("create_album"))

        g.cur.execute(
            "INSERT INTO album (title, release_year, genre_id) VALUES (%s, %s, %s) RETURNING id",
            (title, release_year, genre_id),
        )
        new_album_id = g.cur.fetchone()[0]

        for artist_id in artist_ids:
            g.cur.execute(
                "INSERT INTO album_artist (album_id, artist_id) VALUES (%s, %s)",
                (new_album_id, artist_id),
            )

        g.conn.commit()
        flash(f'Album "{title}" created successfully!', "success")
        return redirect(url_for("list_albums"))

    g.cur.execute("SELECT id, name FROM genre ORDER BY name")
    genres = g.cur.fetchall()
    g.cur.execute("SELECT id, name FROM artist ORDER BY name")
    artists = g.cur.fetchall()

    return render_template("create.html", type="album", genres=genres, artists=artists)


@app.route("/albums/<int:album_id>")
def details_album(album_id):
    g.cur.execute(
        """
        SELECT a.id, a.title, a.release_year, g.name as genre_name
        FROM album a
        JOIN genre g ON a.genre_id = g.id
        WHERE a.id = %s;
    """,
        (album_id,),
    )
    album = g.cur.fetchone()

    if not album:
        flash("Album not found.", "error")
        return redirect(url_for("list_albums"))

    album_dict = dict(zip([desc[0] for desc in g.cur.description], album))

    g.cur.execute(
        """
        SELECT ar.id, ar.name FROM artist ar
        JOIN album_artist aa ON ar.id = aa.artist_id
        WHERE aa.album_id = %s ORDER BY ar.name;
    """,
        (album_id,),
    )
    artists = [
        dict(zip([desc[0] for desc in g.cur.description], row))
        for row in g.cur.fetchall()
    ]

    return render_template("details.html", album=album_dict, artists=artists)


@app.route("/albums/<int:album_id>/edit", methods=["GET", "POST"])
def edit_album(album_id):
    if request.method == "POST":
        title = request.form.get("title")
        release_year = request.form.get("release_year", type=int)
        genre_id = request.form.get("genre_id", type=int)
        artist_ids = request.form.getlist("artists", type=int)

        g.cur.execute(
            "UPDATE album SET title = %s, release_year = %s, genre_id = %s WHERE id = %s",
            (title, release_year, genre_id, album_id),
        )

        g.cur.execute("DELETE FROM album_artist WHERE album_id = %s", (album_id,))
        if artist_ids:
            for artist_id in artist_ids:
                g.cur.execute(
                    "INSERT INTO album_artist (album_id, artist_id) VALUES (%s, %s)",
                    (album_id, artist_id),
                )

        g.conn.commit()
        flash(f'Album "{title}" updated successfully!', "success")
        return redirect(url_for("list_albums"))

    # GET request
    g.cur.execute(
        "SELECT id, title, release_year, genre_id FROM album WHERE id = %s", (album_id,)
    )
    album = dict(zip([desc[0] for desc in g.cur.description], g.cur.fetchone()))

    g.cur.execute("SELECT artist_id FROM album_artist WHERE album_id = %s", (album_id,))
    selected_artist_ids = [row[0] for row in g.cur.fetchall()]

    g.cur.execute("SELECT id, name FROM genre ORDER BY name")
    genres = g.cur.fetchall()
    g.cur.execute("SELECT id, name FROM artist ORDER BY name")
    artists = g.cur.fetchall()

    return render_template(
        "edit.html",
        type="album",
        item=album,
        genres=genres,
        artists=artists,
        selected_artist_ids=selected_artist_ids,
    )


@app.route("/albums/<int:album_id>/delete", methods=["POST"])
def delete_album(album_id):
    g.cur.execute("DELETE FROM album WHERE id = %s RETURNING title", (album_id,))
    deleted_album = g.cur.fetchone()
    g.conn.commit()

    if deleted_album:
        flash(f'Album "{deleted_album[0]}" deleted successfully.', "success")
    return redirect(url_for("list_albums"))


# --- Artist Routes ---
@app.route("/artists")
def list_artists():
    g.cur.execute("SELECT id, name FROM artist ORDER BY name;")
    artists = [
        dict(zip([desc[0] for desc in g.cur.description], row))
        for row in g.cur.fetchall()
    ]
    return render_template("artists.html", artists=artists)


@app.route("/artists/new", methods=["GET", "POST"])
def create_artist():
    if request.method == "POST":
        name = request.form.get("name", "").strip()
        if not name:
            flash("Artist name cannot be empty.", "error")
            return redirect(url_for("create_artist"))
        try:
            g.cur.execute("INSERT INTO artist (name) VALUES (%s)", (name,))
            g.conn.commit()
            flash(f'Artist "{name}" created successfully.', "success")
        except Exception:
            g.conn.rollback()
            flash(f'Artist "{name}" already exists.', "error")
        return redirect(url_for("list_artists"))

    return render_template("create.html", type="artist")


@app.route("/artists/<int:artist_id>/edit", methods=["GET", "POST"])
def edit_artist(artist_id):
    if request.method == "POST":
        name = request.form.get("name", "").strip()
        g.cur.execute("UPDATE artist SET name = %s WHERE id = %s", (name, artist_id))
        g.conn.commit()
        flash(f'Artist "{name}" updated.', "success")
        return redirect(url_for("list_artists"))

    g.cur.execute("SELECT id, name FROM artist WHERE id = %s", (artist_id,))
    artist = dict(zip([desc[0] for desc in g.cur.description], g.cur.fetchone()))
    return render_template("edit.html", type="artist", item=artist)


@app.route("/artists/<int:artist_id>/delete", methods=["POST"])
def delete_artist(artist_id):
    try:
        g.cur.execute("DELETE FROM artist WHERE id = %s RETURNING name", (artist_id,))
        artist_name = g.cur.fetchone()[0]
        g.conn.commit()
        flash(f'Artist "{artist_name}" deleted.', "success")
    except Exception as e:

        flash(f"You can not delete this artist", "error")
    return redirect(url_for("list_artists"))


# --- Stats Route ---
@app.route("/stats")
def stats():
    g.cur.execute(
        """
        SELECT g.name, COUNT(a.id) as count
        FROM genre g JOIN album a ON g.id = a.genre_id
        GROUP BY g.name ORDER BY count DESC;
    """
    )
    stats_data = g.cur.fetchall()
    labels = [row[0] for row in stats_data]
    data = [row[1] for row in stats_data]

    return render_template("stats.html", labels=labels, data=data)


if __name__ == "__main__":
    app.run(debug=True)

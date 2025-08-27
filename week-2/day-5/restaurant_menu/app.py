from flask import Flask, render_template, request, redirect, url_for
from menu_manager import MenuManager
from menu_item import MenuItem

app = Flask(__name__)

@app.route('/')
def index():
    return redirect(url_for('menu'))

@app.route('/menu')
def menu():
    items = MenuManager.all_items()
    return render_template('menu.html', items=items)

@app.route('/add', methods=['GET', 'POST'])
def add_item():
    if request.method == 'POST':
        name = request.form.get('name')
        price = request.form.get('price')
        if name and price:
            item = MenuItem(name=name, price=int(price))
            item.save()
        return redirect(url_for('menu'))
    return render_template('add_item.html')

@app.route('/update/<int:item_id>', methods=['GET', 'POST'])
def update_item(item_id):
    item = MenuManager.get_by_id(item_id)
    if not item:
        return "Item not found", 404

    if request.method == 'POST':
        new_name = request.form.get('name')
        new_price = request.form.get('price')
        if new_name and new_price:
            item.update(new_name, int(new_price))
        return redirect(url_for('menu'))

    return render_template('update_item.html', item=item)

@app.route('/delete/<int:item_id>', methods=['POST'])
def delete_item(item_id):
    item = MenuManager.get_by_id(item_id)
    if item:
        item.delete()
    return redirect(url_for('menu'))

if __name__ == '__main__':
    app.run(debug=True)
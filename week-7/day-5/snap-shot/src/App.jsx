import "./App.css";
import React, { useState, useEffect } from "react";
import { createClient } from "pexels";

const queries = ["Mountain", "Beaches", "Birds", "Food"];

function App() {
   const [photos, setPhotos] = useState([]);
   const [loading, setLoading] = useState(true);
   const [query, setQuery] = useState("Mountain");
   const [input, setInput] = useState("");

   useEffect(() => {
      const client = createClient(import.meta.env.VITE_YOUR_PEXELS_API_KEY);

      const fetchPhotos = async () => {
         try {
            setLoading(true);
            const result = await client.photos.search({ query, per_page: 30 });
            setPhotos(result.photos);
         } catch (error) {
            console.error("Error fetching photos:", error);
         } finally {
            setLoading(false);
         }
      };

      fetchPhotos();
   }, [query]);

   return (
      <>
         <div>
            <h1 className="text-5xl font-bold text-center my-4 ">Snap Shot</h1>
            <div>
               <input
                  type="text"
                  className="border bg-gray-100 p-2 w-[400px]"
                  placeholder="Search for photos..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
               />
               <button
                  className={`${input ? "bg-blue-900" : "bg-blue-100"} text-white p-2 rounded-none`}
                  disabled={!input}
                  onClick={() => setQuery(input)}
               >
                  Search
               </button>
            </div>
            <div className="flex justify-center gap-4 my-4">
               {queries.map((query, index) => (
                  <button
                     key={index}
                     className="bg-gray-300 p-2 rounded-full"
                     onClick={(event) => {
                        setQuery(event.target.textContent);
                     }}
                  >
                     {query}
                  </button>
               ))}
            </div>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 max-w-5xl mx-auto">
            {loading ? (
               <p>Loading...</p>
            ) : (
               photos.map((photo) => (
                  <img
                     key={photo.id}
                     src={photo.src.original}
                     alt={photo.alt}
                  />
               ))
            )}
         </div>
      </>
   );
}

export default App;

import { useState } from "react";

export default function Vote() {
   const [languages, setLanguages] = useState([
      { name: "PHP", votes: 0 },
      { name: "Python", votes: 0 },
      { name: "JavaScript", votes: 0 },
      { name: "Java", votes: 0 },
   ]);

   function handleClick(index) {
      setLanguages((prev) =>
         prev.map((lang, i) =>
            i === index ? { ...lang, votes: lang.votes + 1 } : lang
         )
      );
   }
   return (
      <div className="flex flex-col items-center justify-center mt-10 h-screen">
         <h1>Vote Your Language!</h1>
         <div>
            {languages.map((lang, i) => (
               <h2
                  key={i}
                  className="bg-gray-200 p-4 m-2 rounded-lg flex items-center justify-between"
               >
                  {lang.votes}: {lang.name}
                  <button
                     onClick={() => handleClick(i)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                  >
                     Click here
                  </button>
               </h2>
            ))}
         </div>
      </div>
   );
}

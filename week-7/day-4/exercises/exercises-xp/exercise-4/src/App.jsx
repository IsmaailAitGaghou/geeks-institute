import "./App.css";

function App() {
   const fetchData = async () => {
      try {
         const response = await fetch(
            "https://webhook.site/2ce51f15-bbe4-4753-a3e0-0fcbe570e4ee",
            {
               method: "POST",
               headers: {
                  "Content-Type": "application/json",
               },
               body: JSON.stringify({
                  key1: "myusername",
                  email: "mymail@gmail.com",
                  name: "Isaac",
                  lastname: "Doe",
                  age: 27,
               }),
            }
         );

         const data = await response.json();
         console.log({"response":data});
      } catch (error) {
         console.error("Error:", error);
      }
   };

   return (
      <>
         <div className="">
            <h1>Exercise 4</h1>
            <button
               onClick={fetchData}
               className="bg-blue-500 text-white px-4 py-2 rounded"
            >
               Click Me
            </button>
         </div>
      </>
   );
}

export default App;

import { useState } from "react";
import quotes from "../QuotesDatabase.js";

const Quotes = () => {
   const randomIndex = Math.floor(Math.random() * quotes.length);
   const [quote, setQuote] = useState(quotes[randomIndex]);
   return (
      <div className="flex flex-col items-center py-10 px-2 rounded-lg  justify-center bg-gradient-to-b from-green-400 to-red-500 gap-5 shadow-lg max-w-xl mx-auto">
         <p className="text-3xl italic font-bold text-white">"{quote.quote}"</p>
         <p className="text-right text-xl text-white">- {quote.author}</p>
         <button
            onClick={() =>
               setQuote(quotes[Math.floor(Math.random() * quotes.length)])
            }
         >
            New Quote
         </button>
      </div>
   );
};

export default Quotes;

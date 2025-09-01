let userInput = prompt("Enter several words separated by commas:");

//Clean and split into array
if (!userInput) {
    console.log("No input provided.");
} else {
    const words = userInput.split(",").map(word => word.trim());

    //Find the length of the longest word
    const maxLength = Math.max(...words.map(word => word.length));

    // Build top and bottom border
    const border = "*".repeat(maxLength + 4);

    console.log(border);

    words.forEach(word => {
        console.log(`* ${word.padEnd(maxLength)} *`);
    });

    console.log(border);
}
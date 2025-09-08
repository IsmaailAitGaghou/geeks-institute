function makejuice(size) {

    const ingredients = [];
    
    function addIngredients(ingredient1, ingredient2, ingredient3) {
        const message = `The client wants a ${size} juice, containing ${ingredient1}, ${ingredient2}, ${ingredient3}`;
        console.log(message);
        ingredients.push(ingredient1, ingredient2, ingredient3);

        
    }
    function displayJuice() {
        console.log(`The client wants a ${size} juice, containing ${ingredients.join(", ")}`);
    }
    addIngredients("orange", "apple", "carrot");
    addIngredients("spinach", "ginger", "lemon");
    displayJuice();
}

makejuice("large");
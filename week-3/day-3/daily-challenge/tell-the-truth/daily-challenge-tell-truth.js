let form = document.querySelector("#libform");
let noun = document.querySelector("#noun");
let adjective = document.querySelector("#adjective");
let person = document.querySelector("#person");
let verb = document.querySelector("#verb");
let place = document.querySelector("#place");
let story = document.querySelector("#story");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const nounVal = noun.value.trim();
    const adjectiveVal = adjective.value.trim();
    const personVal = person.value.trim();
    const verbVal = verb.value.trim();
    const placeVal = place.value.trim();

    if (!nounVal || !adjectiveVal || !personVal || !verbVal || !placeVal) {
        alert("Please fill in all fields");
        return;
    }

    story.textContent = `Once upon a time, ${personVal} ${verbVal} to the ${placeVal} with a ${adjectiveVal} ${nounVal}.`;
    
});
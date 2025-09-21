const infoContainer = document.querySelector(".info-container");
const btn = document.querySelector("#generate-button");

const getData = async (randomId) => {
  try {
    const response = await fetch(
      `https://www.swapi.tech/api/people/${randomId}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error fetching data:", error);
  }
};

const getHomeworld = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } 
  catch (error) {
    console.log("Error fetching homeworld data:", error);
  }
};

btn.addEventListener("click", async () => {
    infoContainer.innerHTML = `<p class="loading"><i class="fa-solid fa-spinner fa-spin-pulse"></i><span> Loading...</span></p>`;
    try {
        const randomId = Math.floor(Math.random() * 88) + 1;
        const data = await getData(randomId);
        const homeworldUrl = data.result.properties.homeworld;
        const homeworldData = await getHomeworld(homeworldUrl);
        data.result.properties.homeworld = homeworldData.result.properties.name;
        console.log(data);

        infoContainer.innerHTML = `
            <h1 class="info-title">${data.result.properties.name}</h1>
            <p class="info">Height: ${data.result.properties.height}</p>
            <p class="info">Gender: ${data.result.properties.gender}</p>
            <p class="info">Birth Year: ${data.result.properties.birth_year}</p>
            <p class="info">Home World: ${data.result.properties.homeworld}</p>
        `;
    } catch (error) {
        console.log("Error in button click handler:", error);
        infoContainer.innerHTML = `<p class="error">Oh No! That person isn't available.</p>`;
    }
});

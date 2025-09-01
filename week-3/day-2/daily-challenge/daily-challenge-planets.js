const solarSystem = document.querySelector(".listPlanets");

const planets = [
  { name: "Mercury", color: "#A9A9A9", moons: 0 },
  { name: "Venus", color: "#E39E54", moons: 0 },
  { name: "Earth", color: "#6B93D6", moons: 1 },
  { name: "Mars", color: "#C1440E", moons: 2 },
  { name: "Jupiter", color: "#D8CA9D", moons: 95 },
  { name: "Saturn", color: "#F4D03F", moons: 146 },
  { name: "Uranus", color: "#D1F2EB", moons: 27 },
  { name: "Neptune", color: "#1560BD", moons: 14 },
];

planets.forEach((planet) => {
  const planetDiv = document.createElement("div");
  planetDiv.classList.add("planet");

  planetDiv.style.backgroundColor = planet.color;

  planetDiv.style.color = "white";
  planetDiv.style.display = "flex";
  planetDiv.style.alignItems = "center";
  planetDiv.style.justifyContent = "center";
  planetDiv.style.fontSize = "12px";

  planetDiv.style.margin = "20px 10px";
  planetDiv.style.display = "inline-flex";

  solarSystem.appendChild(planetDiv);

  if (planet.moons > 0) {
    for (let i = 0; i < Math.min(planet.moons, 5); i++) {
      const moon = document.createElement("div");
      moon.classList.add("moon");

      moon.style.position = "absolute";

      const angle = (i / Math.min(planet.moons, 5)) * 2 * Math.PI;
      const radius = 60; 

      moon.style.left = `${50 + radius * Math.cos(angle) - 15}px`; 
      moon.style.top = `${50 + radius * Math.sin(angle) - 15}px`; 

      planetDiv.style.position = "relative"; 
      planetDiv.appendChild(moon);
    }
  }
});

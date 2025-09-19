const form = document.querySelector("#Form");
const results = document.querySelector("#results");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const latitude1 = document.querySelector("#latitude1").value;
  const longitude1 = document.querySelector("#longitude1").value;
  const latitude2 = document.querySelector("#latitude2").value;
  const longitude2 = document.querySelector("#longitude2").value;

  const url1 = `https://api.sunrise-sunset.org/json?lat=${latitude1}&lng=${longitude1}&formatted=0`;
  const url2 = `https://api.sunrise-sunset.org/json?lat=${latitude2}&lng=${longitude2}&formatted=0`;

  try {
    const [res1, res2] = await Promise.all([fetch(url1), fetch(url2)]);

    if (!res1.ok || !res2.ok) throw new Error("Network response was not ok");

    const data1 = await res1.json();
    const data2 = await res2.json();

    results.innerHTML = `
                    <p>City 1 Sunrise: ${new Date(
                      data1.results.sunrise
                    ).toLocaleTimeString()}</p>
                    <p>City 2 Sunrise: ${new Date(
                      data2.results.sunrise
                    ).toLocaleTimeString()}</p>
                `;
  } catch (error) {
    results.innerHTML = `<p>Error: ${error}</p>`;
  }
});

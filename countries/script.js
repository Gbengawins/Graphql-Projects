const continentSelect = document.getElementById("continent-select");
const countryList = document.getElementById("country-list");

queryFetch(`
query {
    continents {
        name
        code
    }
}
`).then(data => {
    data.data.continents.forEach(continent => {
        const option = document.createElement("option");
        option.value = continent.code;
        option.innerHTML = continent.name;
        continentSelect.appendChild(option);
    })
});

continentSelect.addEventListener("change", async (e) => {
    const continentCode = e.target.value;
    const countries = await getContinentCountries(continentCode);
    countryList.innerHTML = "";
    countries.forEach(country => {
        const element = document.createElement("div");
        element.innerText = country.name;
        countryList.appendChild(element);
    })
});


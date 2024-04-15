const inputCity = document.querySelector("[data-input-city]")
const btnCheck = document.querySelector("[btn-check]")
const resultsEl = document.querySelector("[data-results]")


btnCheck.addEventListener("click", (e) => {
    e.preventDefault()
    const searchTerm = inputCity.value
    console.log(`Searching for ${searchTerm}...`)
    inputCity.value = ""
    fetchWeatherAPI(searchTerm)
})

function fetchWeatherAPI(query) {
    const loadingEl = document.createElement("p")
    loadingEl.textContent = "Loading..."
    resultsEl.appendChild(loadingEl)
    fetch(`https://api.weatherapi.com/v1/current.json?key=939aa9914d71419180e11847241504&q=${query}`, {mode: 'cors'})
    .then(function(response) {
        return response.json()
    })
    .then(function(response) {
        processData(response)
    })
    .catch(function() {
        console.log("No result")
        displayError(query)
    })
}

function processData(response) {
    const appData = {
        "location": response.location.name,
        "country": response.location.country,
        "tempDegC": response.current.temp_c,
        "feelsDegC": response.current.feelslike_c,
        "lastUpdate": response.current.last_updated
    }
    renderResults(appData)
}

function renderResults(data) {
    clearResults()
    const locationEl = document.createElement("h2")
    const tempDegEl = document.createElement("p")
    const feelsDegEl = document.createElement("p")
    const updatedEl = document.createElement("p")
    locationEl.textContent = "Weather at " + data.location + ", " + data.country
    tempDegEl.textContent = "Current temperature (degC): " + data.tempDegC
    feelsDegEl.textContent = "Feels like (degC)): " + data.feelsDegC
    updatedEl.textContent = "Data updated on: " + data.lastUpdate
    resultsEl.appendChild(locationEl)
    resultsEl.appendChild(tempDegEl)
    resultsEl.appendChild(feelsDegEl)
    resultsEl.appendChild(updatedEl)
}

function displayError(query) {
    clearResults()
    const errorEl = document.createElement("p")
    errorEl.textContent = `Unable to search results for ${query}`
    resultsEl.appendChild(errorEl)
}

function clearResults() {
    while (resultsEl.firstChild) {
        resultsEl.removeChild(resultsEl.firstChild)
    }
}
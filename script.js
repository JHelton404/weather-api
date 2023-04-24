// global variables
var myAPI = "190787d50584e5551c9b2ac6dfe86037";
var cardContainer = document.getElementById("container")
var cityHistoryBox = document.getElementById("cityHistory")

//console.log(newForecastArr2)

// Initial fetch for the current day's weather card


// Function written for future forecast days, the next 5 days after today. 

// function forecast() {
//   fetch(apiCall).then((forecastResponse)=> {
//     return forecastResponse.json()
//   }).then((data)=> {

//     var days = 5; 
//     var dateIndices = [2, 10, 18, 26, 34]; 
    
//     for (var i = 1; i <= days; i++) {
//       var index = dateIndices[i - 1];
//       var variableName = "day" + i + "date";
//       window[variableName] = new Date(data.list[index].dt_txt);
//       console.log(Date)
//     }    


//   })
// }

function getTemps() {
  //FETCHES DATA
  var cityNames = document.getElementById("searchBar").value
  var apiCall = `http://api.openweathermap.org/data/2.5/forecast?q=${cityNames}&units=imperial&appid=${myAPI}&units=imperial`
  console.log(cityNames)

  fetch(apiCall).then((response)=> {
    return response.json()
  }).then((data)=> {
  console.log(data)
  displayWeather(data)
  // forecast()
  createButton(data.city.name)
  saveToLS(data.city.name)
  })
}

function createButton(city){
  //CREATES BUTTON
  var cityHistoryBTN = document.createElement("button")
  cityHistoryBTN.textContent = city
  cityHistoryBox.appendChild(cityHistoryBTN)
}

function displayWeather(data){
  //DISPLAYS WEATHER
  var cityName = data.city.name
  var cityTemp = data.list[0].main.temp
  var cityHumid = data.list[0].main.humidity
  var cityWind = data.list[0].wind.speed
  // Elements created in the page

  var weatherCard = document.createElement("div")
  var cardHeader = document.createElement("h2")
  var cardBodyTime = document.createElement("ol")
  var cardBodyTemp = document.createElement("ol")
  var cardBodyHumidity = document.createElement("ol")
  var cardBodyWind = document.createElement("ol")
  var currentDay = dayjs().format('DD/MM/YYYY')
  
  
  // Information populates on card bodies
  cardHeader.textContent = cityName
  cardBodyTime.textContent = currentDay
  cardBodyTemp.textContent = cityTemp + ' ' + 'F'
  cardBodyHumidity.textContent = cityHumid + '% humidity'
  cardBodyWind.textContent = cityWind + ' ' + 'MPH'

  cardContainer.innerHTML = ""
  cardContainer.appendChild(weatherCard)
    
  // Appends made to weather cards
  weatherCard.appendChild(cardHeader)
  weatherCard.appendChild(cardBodyTime)
  weatherCard.appendChild(cardBodyTemp)
  weatherCard.appendChild(cardBodyHumidity)
  weatherCard.appendChild(cardBodyWind)
}

function saveToLS(name){

}

function loadFromLS(){

}

document.getElementById("searchBTN").addEventListener("click", getTemps)
loadFromLS()

var stored = JSON.parse(localStorage.getItem("cities"))
if(!stored) {
  stored = []
}

localStorage.setItem("cities", JSON.stringify(stored))
const searchElement = document.querySelector('[data-city-search]')
const searchBox = new google.maps.places.SearchBox(searchElement)
searchBox.addListener('places_changed', () => {
  const place = searchBox.getPlaces()[0]
  if (place == null) return
  const latitude = place.geometry.location.lat()
  const longitude = place.geometry.location.lng()
  fetch('/weather', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },

    body: JSON.stringify({
      latitude: latitude,
      longitude: longitude
    })
  }).then(res => res.json()).then(data => {
    // console.log(data)
     setWeatherData(data, place.formatted_address)
  })

})

const locationElement = document.querySelector('[data-location]')
const statusElement = document.querySelector('[data-status]')
const temparatureElement = document.querySelector('[data-temparature]')
const precipitationElement = document.querySelector('[data-precipitation]')
const windElement = document.querySelector('[data-wind]')


function setWeatherData(data, place) {
  locationElement.textContent = place
  statusElement.textContent = data.summary
  temparatureElement.textContent = data.temparature
  precipitationElement.textContent = `${data.precipProbability * 100}%`
  windElement.textContent = data.windSpeed
}

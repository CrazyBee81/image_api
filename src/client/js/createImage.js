import {calculateCountdown} from "./updateSearch"
import {getAPIData, postData} from "./requestAPI";

function updateCards() {
    // remove existing cards from dom tree
    if (document.querySelector('.cards').childElementCount !== 0) {
        document.querySelector('.cards').innerHTML = ''
    }
    // get card data from server
    const getCardData = async () => {
        const response = await fetch('http://localhost:8081/all')
        try {
            const newData = await response.json()
            console.log(newData)
            return newData
        } catch (error) {
            console.log("error", error)
        }
    }

    const createCards = (projectData) => {
        const cardsContainer = document.querySelector('.cards')
        const tripsSection =document.querySelector('#my_trips')
        const htmlString = "<div class=\"property-card\"><div class=\"property-image\"><div class=\"property-image-title\"> <img src=\"\" alt=\"\" width=\"360\" height=\"240\"></div></div><div class=\"property-description\"><h5 class=\"titel\"></h5><div class=\"left\"><div class=\"cards-category flex-container\"></div><div class=\"location\"></div><div class=\"date\"></div><div class=\"countdown\"></div><div class=\"weather\"><p class=\"forecast\"></p> <img class=\"icon\" src=\"\" alt=\"icon\" width=\"90\" height=\"90\"><p class=\"description\"></p></div><div class=\"notes\"></div><div class=\"packlist\"></div></div></div></div>"
        if (projectData.length === 0) {
            tripsSection.classList.add('inactive')
        } else {
            tripsSection.classList.remove('inactive')
        }
        const createCard = (data, ind) => {
            let box = document.createElement('div')
            box.classList.add('card-box')
            box.id = `box-${ind}`
            box.innerHTML = htmlString
            switch(data.category) {
                case 'Sightseeing':
                    box.querySelector('.cards-category').innerHTML = '<i class=\"category-icon fas fa-archway\"></i><p class=\"category-description\">Sightseeing</p>'
                    break;
                case 'Hiking':
                    box.querySelector('.cards-category').innerHTML = '<i class=\"category-icon fas fa-hiking\"></i><p class=\"category-description\">Hiking</p>'
                    break;
                case 'Biking':
                    box.querySelector('.cards-category').innerHTML = '<i class=\"category-icon fas fa-biking\"></i><p class=\"category-description\">Biking</p>'
                    break;
                case 'Beach':
                    box.querySelector('.cards-category').innerHTML = '<i class=\"category-icon fas fa-umbrella-beach\"></i><p class=\"category-description\">Beach</p>'
                    break;
                default:
                    box.querySelector('.cards-category').innerHTML = '<i class=\"category-icon fas fa-suitcase\"></i><p class=\"category-description\">Traveling</p>'
            }
            box.querySelector('.property-image-title img').src = data.imgData.formatURL
            box.querySelector('.location').innerHTML = `<p><strong>My trip to: ${data.city},${data.countryCode}</strong></p>`
            box.querySelector('.date').innerHTML = `<p><strong>Departing: ${data.date}</strong></p>`
            box.querySelector('.countdown').innerHTML = `<p><strong>The trip to ${data.city} is ${calculateCountdown(data.date)} days away</strong></p>`
            box.querySelector('.weather .forecast').innerHTML = `Currently the weather in ${data.city} is`
            box.querySelector('.weather .description').innerHTML = `${data.weatherData.description}`
            box.querySelector('.weather .icon').src = `../media/${data.weatherData.icon}.png`
            box.querySelector('.packlist').innerHTML = `<p>${data.notes}</p>`
            box.querySelector('.notes').innerHTML = `<p>${data.packlist}</p>`
            cardsContainer.appendChild(box)
        }
        for (let ind in projectData) {
            let dataObj = projectData[ind]
            // updating weather data
            postData("http://localhost:8081/key", {"key": "weatherbit"}).then((response) => {
                    getAPIData(response, {
                        "city": dataObj.city,
                        "countryCode": dataObj.countryCode,
                        "api": "weatherbit"
                    }).then(function (response) {
                        dataObj.weatherData = {
                            "city_weather": response.data[0].city_name,
                            "country_weather": response.data[0].country_code,
                            "icon": response.data[0].weather.icon,
                            "description": response.data[0].weather.description
                        }
                    }).then(function (response) {
                        createCard(dataObj, ind)
                    })
                }
            )
        }
    }

    getCardData().then((response) => createCards(response))
}

export {updateCards}

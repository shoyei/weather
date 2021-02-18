(() => {
    //DOM selectors
    const inputForm = document.querySelector('#inputForm')
    const cityInput = document.querySelector('#cityInput')
    const title = document.querySelector('#title')
    const cityName = document.querySelector('#cityName')
    const temp = document.querySelector("#temp")
    const feelsLike = document.querySelector('#feelsLike')
    const condDesc = document.querySelector('#condDesc')
    const todayHigh = document.querySelector('#todayHigh')
    const todayLow = document.querySelector('#todayLow')
    const windSpeed = document.querySelector('#windSpeed')
    const humidity = document.querySelector('#humidity')
    const unitToggle = document.querySelector("#unitToggle")
    const f = document.querySelector("#f")
    const c = document.querySelector("#c")
    const weatherContainer = document.querySelector('#weatherContainer')

    //State
    let currentData = {};
    let currentCity = '';
    let currentUnit = 'imperial';

    inputForm.addEventListener('submit', (evt) => {
        evt.preventDefault();
        currentCity = cityInput.value
        requestWeather(currentCity, currentUnit);
        cityInput.value = "CITY...";
    })

    unitToggle.addEventListener('click', () => {
        console.log('hi')
        if (c.classList == 'inactive') {
            console.log('toggle f')
            currentUnit = 'metric';
            f.classList.toggle('inactive');
            c.classList.toggle('inactive');
            requestWeather(currentCity, currentUnit);
        }
        else if (f.classList == 'inactive') {
            console.log('toggle c')
            currentUnit = 'imperial';
            c.classList.toggle('inactive');
            f.classList.toggle('inactive');
            requestWeather(currentCity, currentUnit);
        }
    });



    async function requestWeather(city, unit) {
        try {
            const res = await fetch(`https://api.openweathermap.org/data/2.5/find?q=${city}&units=${unit}&appid=6b3efa385e129b52753539d9baf13410`);
            const data = await res.json();
            console.log(data);
            currentData.cityName = data.list[0].name;
            currentData.temp = data.list[0].main.temp;
            currentData.feelsLike = data.list[0].main.feels_like;
            currentData.condition = data.list[0].weather[0].main;
            currentData.condDesc = data.list[0].weather[0].description;
            currentData.todayHigh = data.list[0].main.temp_min;
            currentData.todayLow = data.list[0].main.temp_max;
            currentData.windSpeed = data.list[0].wind.speed;
            currentData.humidity = data.list[0].main.humidity;
            console.log(currentData);
            populateData(currentData);
        }
        catch (err) { console.log(err) };
    }

    function populateData(data) {
        
        title.textContent = `${data.temp}° & ${data.condition.toUpperCase()} IN`
        cityName.textContent = `${data.cityName.toUpperCase()}`
        feelsLike.textContent = `FEELS LIKE ${data.feelsLike}°`
        condDesc.textContent = `${data.condDesc.toUpperCase()}`
        todayHigh.textContent = `HI ${data.todayHigh}°`
        todayLow.textContent = `LO ${data.todayLow}°`
        windSpeed.textContent = `WIND SPEED ${data.windSpeed}`
        humidity.textContent = `HUMIDITY ${data.humidity}%`
        weatherContainer.style.opacity = '100%';
        console.log(weatherContainer);
    }

})();

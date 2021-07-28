document.addEventListener('DOMContentLoaded', function(event) {

    let apiKey = "c9cf2ad794f8f8bf0e51b15085e82a2a";
    // Город погода которого нужна
    let cityCode = "756135";
    // Формируем url для GET запроса
    let url = `http://api.openweathermap.org/data/2.5/weather?id=${cityCode}&lang=en&appid=${apiKey}`;

    let temperature = document.querySelectorAll('.location__temp');
    // console.log(temperature)
    let weatherNowIcon = document.querySelector('#weather-now')

  /*   let citySelect = document.querySelector('#city')
    console.log(citySelect) */
    // let mydata = JSON.parse(id);

    // let jsonFile = getFile('cityData.json'); 
    // var parsedJson = JSON.parse(jsonFile);
    // console.log('bug')
    // .then(data => {
    //     for (var i=0; i<data[0].length; i++){
    //         citySelect.appendChild('<option value='+ data[0][i].id + '>'+ data[0][i].name  +'</option>')
    //     }
    // })

   /*  fetch('./js/cityData.json')
        .then(results => results.json())
        .then(console.log)
        .then(data => {
            console.log({data});
            return data
        })
        .then(data => {
            for (var i=0; i<data[0].length; i++){
                        citySelect.appendChild('<option value='+ data[0][i].id + '>'+ data[0][i].name  +'</option>')
                    }
        }) */

    //Получаем прогноз в массив data
    fetch(url).then(function (resp) {return resp.json() }).then(function (data) {
        //добавляем название города
        document.querySelector('.location__city').textContent = data.name;
        // data.main.temp содержит значение в Кельвинах, отнимаем от  273, чтобы получить значение в градусах Цельсия
        //Добавляем описание погоды
        document.querySelector('.location__descr').textContent = data.weather[0]['description'];
        //Добавляем иконку погоды
        // document.querySelector('.forecast__icon').innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png">`;

        document.querySelector('.details__feels').innerHTML = Math.round(data.main.feels_like - 273) + '&deg;';

        document.querySelector('.details__pressure').innerHTML = data.main.pressure + ' hPA';

        document.querySelector('.details__wind').innerHTML = Math.floor(data.wind.speed * 100 / 100 ) + ' m/hr';

        document.querySelector('.details__humidity').innerHTML = data.main.humidity + '&#37;';

        weatherNowIcon.classList.add(data.weather[0].main.toLowerCase());

        for (var i=0; i<temperature.length; i++ ){
            temperature[i].innerHTML = Math.round(data.main.temp - 273) + '&deg;';
        };
        

    })
    .catch(function () {
        //Обрабатываем ошибки
    });

});

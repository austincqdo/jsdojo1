$(document).ready(function() {
    const url = 'https://api.openweathermap.org/data/2.5/weather?id=5391997&APPID=78811be888e9c375a27075adc048e637';
    $.ajax({
        url: url,
        dataType: 'json',
    }).done(function(data) {
        $('#weatherIcon').attr('src', 'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png');
        $('#temperature').text((Math.round(10 * (data.main.temp - 273.15)) / 10) + ' \xB0C');
        $('#humidity').text(data.main.humidity + '%');
        $('#wind').text(data.wind.speed + ' m/s');
    }).fail(function() {
        alert('Loading error.');
    });
});
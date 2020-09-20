const request = require('request')
const geoode = (address, callback) => {
    console.log(address);
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoidHVzaGFyazM5IiwiYSI6ImNrZjFnbmxmaDBzZW4ycWxuYmlyMjdkc28ifQ.tSw0MuxdkMBdRMZ7PUkU9Q&limit=1`

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to internet', undefined)
        }
        else if (response.body.features.length === 0) {
            callback('Invalid location!!', undefined)
        }
        else {
            callback(undefined, {
                lat: response.body.features[0].center[0],
                long: response.body.features[0].center[1],
                loc: response.body.features[0].place_name
            })
        }

    })
}

const weather = (lat, long, callback) => {
    const url = `https://api.darksky.net/forecast/94a3dc651a244d0524ad541e175ec634/${lat},${long}`;
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to Server', undefined)
        }
        else if (response.body.error) {
            callback("Invalid Location!",undefined)
        }
        else {
            callback(undefined,{
                temp : response.body.currently.temperature,
                precipProbability : response.body.currently.precipProbability
            })
        }
    })

}

module.exports = {
    geoode,
    weather
}
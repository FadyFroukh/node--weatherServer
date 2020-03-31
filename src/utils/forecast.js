const request = require('request')

const forecast = (lat , lang , callback)=>{
    const url = 'https://api.darksky.net/forecast/70a017e6f43f26a5d6b1b3c3ba7f9074/'+ encodeURIComponent(lat) +',' + encodeURIComponent(lang)

    request({url:url,json:true},(error , response)=>{
            if(error){
                callback('Unable to connect to weather services' , undefined)
            }
            else if(response.body.error){
                callback('Invalid location',undefined)
            }
            else {
                  callback(undefined,'its currently ' + response.body.currently.temperature + ' degrees out .  ' + 'there is a ' + response.body
                    .currently.precipProbability + '% chance of rain')
                    //callback(undefined,'summary is ' + response.body.daily.data[0].summary)

            }

    })
}

module.exports = forecast
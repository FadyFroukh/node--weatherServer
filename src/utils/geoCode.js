const request = require("request")

request
const geoCode = (address,callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiZmFkeWZyb3VraCIsImEiOiJjazg4d3IweWEwMHUxM3BwamE2NnJqYWZqIn0.EQeH9b88Z2Zfjp_1CA6u_A&limit=1'
    
    request({url:url,json:true},(error,response)=>{
        if(error){
            callback('Unable to connect to location services',undefined)
        }
        else if(response.body.features.length === 0){
            callback('unable to find location' , undefined)
        }
        else {
            callback(undefined,{
                latitude:response.body.features[0].center[1],
                longitude:response.body.features[0].center[0],
                location:response.body.features[0].place_name

            })
        }

    })
}
module.exports = geoCode
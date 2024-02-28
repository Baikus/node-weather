const request = require ("request")

const forecast = (latitude, longitude, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=d464ca9767831f6fb3f9a69f0ae4bddd&query="+ latitude+ ','+ longitude
 

    request ( {url, json: true}, (error, {body}) => { 
                 if (error){

                    callback("Forecast service unavailable!", undefined)
                }
                else if (body.error){                
                    callback("I cant find that place! D:, please check it out", undefined)                    
                }
                
                else{
                    callback(undefined,('At this moment is '+ body.current.weather_descriptions[0]) + ". It is currently " + (body.current.temperature) + " degrees and it feels as "+ (body.current.feelslike)
                                     )
                    }           }
            )
}

module.exports = forecast
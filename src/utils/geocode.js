const request = require ("request")

const geocode = (address, callback) => {
    const url = "http://api.positionstack.com/v1/forward?access_key=735c52d7ec84a38d421f5de96d480073&query="+encodeURIComponent(address) +"&limit=5" 

    request ( {url, json: true}, 
            (error, {body}) => { 
                if (error){

                    callback("unable to conect to weather service, check your internet and try again", undefined)
                }
                else if (!body.data){
                    callback("I cant find that place! D:, please try again", undefined)
                }
                else{
                    callback(undefined,{
                        "latitude": body.data[0].latitude,
                        "longitude": body.data[0].longitude,
                        "location": body.data[0].label                        
                    }                 )
                }}
            )
}

module.exports = geocode
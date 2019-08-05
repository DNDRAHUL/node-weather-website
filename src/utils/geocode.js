const request=require('request');
const geocode=(address,callback)=>{   
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoiZWpjYmVoaXVscmZoNHc0NjQ4IiwiYSI6ImNqeG1jOTIyZDAyOTEzbnBvNGFkaDhkeG8ifQ.U1AEAw6GtQvmwlagjpDwRA'    
    
     request({url,json:true}, (error, {body})=>{  
             if(error) 
               { 
                callback('Unable to connect to locations services!', undefined) 
               } 
                else if(body.features.length=== 0) 
                { 
                  callback('Unable to find locations. Try another Search',undefined) 
                } 
                else{ console.log('3rd error function')
                     callback(undefined, { 
                                      latitude:body.features[0].center[1],
                                      longitude:body.features[0].center[0],
                                      location:body.features[0].place_name
                                }
                              )
                        }
                }
        )
    } 
 module.exports=geocode 
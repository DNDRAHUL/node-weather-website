const request=require('request');
const forecast=(latitude,longitude,callback)=>{  
    const url='https://api.darksky.net/forecast/d4e3d3978f1548e1c09d73f0feca30a6/'+latitude+','+longitude

  request({url,json:true},(error,{body})=>{ 
       if(error)
         { 
           callback('Unable to connect weather service',undefined) 
         } 
         else if(body.error)
         { 
           callback('invalid user input',undefined)
         }
        else{
             callback(undefined,
             body.daily.data[0].summary + 'Its currently'+ body.currently.temperature + ' degrees out.There is '+ body.currently.precipProbability +'% chance of Rain'
             )
            }
          } 
        )
      }
   module.exports=forecast 

const path=require('path')
const  express=require('express')
const port =process.env.PORT||3000
const  app=express()
const  hbs=require('hbs')
const forecast=require('../src/utils/forecast')
const geocode=require('../src/utils/geocode')
  // definig for express config

const  pD=path.join(__dirname,'../public'), 
       viewsPAth=path.join(__dirname,'../templates/views'),
       partialPath=path.join(__dirname,'../templates/partials');
   
   // setup handlebars engine and View Locations

        app.set('view engine','hbs');
        app.set('views',partialPath);
        app.set('views', viewsPAth);

          hbs.registerPartials(partialPath);    
          app.use(express.static(pD));

           app.get('/',(req,res)=>{ 
           res.render('index',{name:'Rahul Yadav',
           title:'Weather'
          }
        )
      }
    )
     app.get('/weather',(req,res)=>{   
       if(!req.query.address)
           {
             return res.send({ 
             error:'Adddres not provided' 
            } 
          )
        } 
        else
        {
          geocode(req.query.address, (error, {latitude, longitude, location}={})=>{
            if(error)
            {
             return res.send({error}  
         ) 
       } 
         forecast(latitude, longitude,(error,forecastData)=>{
              if(error) 
               {
                  return res.send({ error } 
             )
           }
            res.send({
                   // Location:locations,
                   forecastData:forecastData,
                    location,
                   address:req.query.address
                }
               )
             } 
           )
         }
       )
      }
    }
  )
   app.get('/help',(req,res)=>{ 
         res.render('help',{name:'Rahul Ramesh Yadav',
         title:'this is the help center'
        }
      )
    }
  )
    app.get('/about',(req,res)=>{
          res.render('about',{
          title:'About Me',      
          name:'Rahul Yadav'
        }
      )
    }
  )
   
 
  app.get('/help/*',(req,res)=>{
    res.send('help article not found')
  })
  app.get('*',(req,res)=>{
    res.render('404',{
           title:'404',
           name:'Rahul Yadav',
           ErrorMessage:'Page Not Found'
    })
  })
    app.listen(port,()=>{  
        console.log('server listening on port'+port);
      }
    ) 
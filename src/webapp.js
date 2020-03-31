const path = require('path') // core module
const express = require('express') // express is only one function
const hbs = require('hbs')//its used for the partial and customizing not the main loading function , partials are basically for headers and footers to have a uniformed website
const request = require('request')
const geoCode = require('../src/utils/geoCode')
const forecast = require('../src/utils/forecast')
console.log(__dirname)
console.log(path.join(__dirname , '../public')) // to get  a specific path

const webApp = express() // to store the application
const publicDirPath = path.join(__dirname , '../public') 
const partialsPath = path.join(__dirname , '../partials')
webApp.use(express.static(publicDirPath)) // a way to customize the server , USED TO  TO LOAD STATIC HTML , public has them

//TO DEAL WITH DYNAMIC PAGES WE USE HANDLEBARS NPM  AND HBS,its a templating engine
 // express expects all your views to live in a specific folder which is in the root of the project(views)

//const viewsPath = path.join(__dirname ,'../templates' ) if the views are not stored in views
//webApp.set('view engine' , viewsPath)

 webApp.set('view engine' , 'hbs') // YOU NEED TO RUN FILE OUT OF SRC => src/webapp.js

    hbs.registerPartials(partialsPath) // how to use partials


    webApp.get('' , (req , res)=>{ 
        res.render('index' , {
            title:'weather',
            name:'fady'
        })// YOU PROVIDE THE NAME AND OBJECTS YOU WANT IT TO ACCESS
    })

    webApp.get('/about', (req,res)=>{
        res.render('about', {
            name:'fady'
        })
    })

// DYNAMIC !!

// webApp.com => the route riot
//webApp.com/help
//webApp.com/about

// webApp.get('', (req,res)=>{ // you can send text , html ... , json , files ...
//     //res.send('<h1>Weather</h1>')
    
// }) 


webApp.get('/weather',(req,res)=>{
    if(!req.query.address){
    
        return res.send({
            error:'You should provide a correct address'
        })
        }

        geoCode(req.query.address , (error , {latitude,longitude , location} ={})=>{
            if(error){
                return res.send({error})
            }

            forecast(latitude,longitude,(error,forecastData)=>{
                if(error){
                    return res.send({error})
                }
                res.send({
                    forecast:forecastData,
                    location,
                    address:req.query.address
                })
            })
        })
        // res.send({
        //     forecast:'its snowing',
        //     location:'Philidelphia',
        //     address:req.query.address
        // })
})
 // what the server should do when someone try to get the resources on the app
 //it takes the route and a function

//THIS IS FOR 404 AND IT SHOULD COME AT LAST

webApp.get('/help/*',(req,res)=>{ //THIS IS FOR A SPECIFIC PAGE  
    res.render('error',{
        title:'404',
        name:'Error Page',
        errorMsg:'help article not found'
    })
})


webApp.get('/products', (req , res)=>{ // To setup query string to deal with browser , for ex : localhost:3000/products?search = games &rating =5
    
    if(!req.query.search){
        return res.send({ // used with if rather than else
            error:'you must provide a search term'
        })
    }
    
    console.log(req.query)
})


webApp.get('*',(req,res)=>{ //THIS IS FOR ANY ABNORMAL PAGE IN-GENERAL
    res.render('error')
})

webApp.listen(3000,()=>{
    console.log('Server up on port 3000')
}) // to start the server on a specific port and a callback function , it only happens once

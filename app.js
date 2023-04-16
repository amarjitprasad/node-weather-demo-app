const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./src/utils/geocode');
const forecast = require('./src/utils/forecast');
const app = express();
const publicDirecory = path.join(__dirname+"/public") ;
const viewsPath = path.join(__dirname+"/templates/views");
const partialsPath = path.join(__dirname+"/templates/partials");

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);


app.use(express.static(publicDirecory));

app.get('', (req, res)=>{
    res.render('index',{title:'Weather App',footerText:"Created by Amarjit"});
});
app.get('/about', (req, res)=>{
    res.render('about',{title:'About',footerText:"Created by Amarjit"});
});
app.get('/help', (req, res)=>{
    res.render('help',{title:'Help',footerText:"Created by Amarjit"});
});

app.get('/weather', (req, res)=>{
    
    if(!req.query.address){
        return res.send({error : "You must provide an address"})
    }

    geocode(req.query.address, (error, {latitude, longitude, location}={})=>{
        if(error){
            return res.send({error: error});
        }
        forecast(latitude, longitude ,(error, forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                    forecast:forecastData,
                    location,
                    address: req.search.address
            })
        })
    });
});

app.get('/products',(req, res)=>{
    if(!req.query.search){
        return res.send({
            error: "You must provide a search term"
        })
    }
    res.send({
        products: []
    })
})

app.get('*', (req,res)=>{
    res.render('404',{title:'404', errorMessage:"Page not found",footerText:"Created by Amarjit"});
})

app.listen('3000', ()=>{
  console.log("Server is up on port 3000");
});


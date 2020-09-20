const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { geoode, weather } = require('./utils/geocode')
console.clear();

const app = express()

const port = process.env.PORT || 3000


// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templetes/views')
const partialsPath = path.join(__dirname, '../templetes/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Tushar Pandey'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Tushar Pandey'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Tushar Pandey'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.city) {
        return res.send({
            error: "Invalid Search!"
        })
    }
    geoode(req.query.city, (error, data) => {
        if (error) {
            res.send({
                error: error
            })
        }
        else {
            weather(data.lat, data.long, (er, dat) => {
                if (er) {
                    return res.send({
                        error: er
                    })
                }
                res.send({
                    lattitude: data.lat,
                    longitude: data.long,
                    location: data.loc,
                    temperature : dat.temp,
                    precipProbability:dat.precipProbability
                })
            })
        }
    })
})
app.get('/product', (req, res) => {
    if (!req.query.city) {
        return res.send({
            error: "You must provid a search term"
        })
    }
    console.log(req.query.city)
    let products = [];
    products.push(req.query.city)
    res.send({

        products: req.query
    })
})
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Tushar Pandey',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Tushar Pandey',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port.'+port)
})
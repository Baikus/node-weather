const path = require ('path')
const express = require ('express')
const hbs= require ('hbs')
const geocode = require ('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()

//definiendo paths para la configuracion de express
const publicDirectoryPath = path.join(__dirname,'../public/')
const viewsPath= path.join(__dirname, '../templates/views')
const partialsPath =path.join(__dirname, '../templates/partials')

//poniendo handlebars y locacion de views
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// configuracion de directorio estatico al serv
app.use(express.static(publicDirectoryPath))


//indice
app.get('', (req, res)=> {
    res.render('index', {
        tittle: 'Weather app',
        name: 'yo mero',
        tutor: 'Marco "lomo plateado, amo del codigo, programador Sr aunque el diga que no lo es" Mena'
    })

})

//pagina de about
app.get('/about', (req, res)=> {
res.render('about', {
    tittle: 'About me',
    name: 'yo mero',
    tutor: 'Marco "lomo plateado, amo del codigo, programador Sr aunque el diga que no lo es" Mena'
})
})

//pagina de ayuda
app.get('/help', (req, res)=> {
    res.render('help', {
        tittle: 'Help',
        name: 'yo mero',
        tutor: 'Marco "lomo plateado, amo del codigo, programador Sr aunque el diga que no lo es" Mena'
    })
    })
    app.get ('/help/*', (req,res)=>{
        res.render('404page', {
            tittle:'Error 404',
            errorname: 'Help articule not found.',
            name: 'yo mero',
            tutor: 'Marco "lomo plateado, amo del codigo, programador Sr aunque el diga que no lo es" Mena'

        })
    
    })

    app.get('/weather', (req, res) => {
        if (!req.query.address) {
            return res.send({
                error: 'You must provide an address'
            });
        }
    
        geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
            if (error) {
                return res.send({ error });
            }
    
            forecast(latitude, longitude, (error, forecastdata) => {
                if (error) {
                    return res.send({ error });
                }
    
                res.send({
                    address: req.query.address,
                    location,
                    forecastdata
                });
            });
        });
    });

app.get ('*', (req,res)=>{
    res.render('404page', {
        tittle:'Error 404',
        errorname: 'Page not found',
        name: 'yo mero',
        tutor: 'Marco "lomo plateado, amo del codigo, programador Sr aunque el diga que no lo es" Mena'
    })
})

app.listen(3000, ()=>{
 console.log('server is up on port 3000')

})
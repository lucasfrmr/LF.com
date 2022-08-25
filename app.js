const express = require('express')
const path = require('path')
const pretty = require("pretty");
const axios = require('axios');

//Scrapper
const cheerio = require("cheerio");
const res = require('express/lib/response');

// //Scrapper


  // axios.get('https://www.amazon.com/dp/B09YRJLNW1').then((response) => {
  //     const $ = cheerio.load(response.data)
  //     return $('.prodDetAttrValue').text()
  // })
  // .catch((error) => {
  //     console.log(error)
  // })


const app = express()

app.set('port', process.env.PORT || 3000)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.locals.pretty = true
app.disable('x-powered-by')

app.get('/', (req, res) => {
  res.render('index', {
    title:'LF'
  })
})

app.get('/sketches', (req, res) => {
  res.render('sketches', {
    title: "sketches"
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: "About"
  })
})

app.get('/bcode', (req, res) => {
  res.render('bcode', {
    title: "Bcode"
  })
})
app.get('/2bcode', (req, res) => {
  res.render('2bcode', {
    title: "2Bcode"
  })
})

app.get('/bindornaw', (req, res) => {
  res.render('bindornaw', {
    title: "bindornaw"
  })
})



app.get('/bindornaw_2',(req, res) => {
  axios.get('https://www.amazon.com/dp/B09YRJLNW1', {headers: {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:103.0) Gecko/20100101 Firefox/103.0'}}).then((response) => {
      const $ = cheerio.load(response.data)

      console.log($('.prodDetAttrValue').text().split(" "))
      res.render('bindornaw_2', {
        title: "Bind or naw v2",
        data: $('.prodDetAttrValue').text().split(" ")
        
    })
  })
  .catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
  })
})
  // console.log(pdata);



app.listen(app.get('port'), () => {
  console.log('NodeJS started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.')
})
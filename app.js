const express = require('express')
const path = require('path')

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
    title: "Bind or naw"
  })
})



// Route Files
// let sketches = require('./routes/sketches');
// app.use('/sketches', sketches);


app.listen(app.get('port'), () => {
  console.log('NodeJS started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.')
})
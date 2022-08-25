const express = require('express')
const path = require('path')
const pretty = require("pretty");

//Scrapper
const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const res = require('express/lib/response');

// //Scrapper




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
// const pdata = element.text();

  (async () => {
    const browser = await puppeteer.launch({
        headless: true,
    });
    const page = await browser.newPage();
    await page.goto("https://amazon-asin.com/asincheck/?product_id=B09YRJLNW1");

    await page.screenshot({ path: "image1.png"});

    const pageData= await page.evaluate(() => {
        return {
            html: document.documentElement.innerHTML,
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight,
        };

    });
    
    // console.log(pageData);

    const $ = cheerio.load(pageData.html);
    const element = $(".ng-binding")
    console.log(element.text());
    // pdata = element.text();
    return element.text();
    await browser.close();
  })();



app.get('/bindornaw',(req, res) => {

  res.render('bindornaw', {
    title: "Bind or naw",
    data: pdata()
  })
  console.log(pdata);
})



// Route Files
// let sketches = require('./routes/sketches');
// app.use('/sketches', sketches);


app.listen(app.get('port'), () => {
  console.log('NodeJS started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.')
})
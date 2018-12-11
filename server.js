const express = require('express')
const path = require('path')
const bodyparser = require('body-parser')
const cheerio = require('cheerio')
const axios = require('axios')
const app = express()

app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json())

const PORT = process.env.PORT ||3000
app.listen(3000, () => console.log (`listening on: http://localhost:${PORT}` ))

// require('./routes/apiRoutes')(app)



app.get('/saved', (req,res) => {
     axios.get('https://www.theguardian.com/us')
    .then (r => {
        const $ = cheerio.load(r.data)
        const artArray = []
        $('div.fc-item__header').each((i, elem) =>{
            if(i<5){
                artArray.push({
                    title: $(elem).children('h3').children('a').children('span').children('span').text(),
                    link: $(elem).children('h3').children('a').attr('href')
                })
            }
        })
        res.json(artArray)
    })
    .catch(e => console.log(e))
})
   

// $('div.fc-item__header').each((i, elem) =>{
//     if(i<5){
//         console.log($(elem).children('h3').children('a').children('span').children('span').text())
//         console.log($(elem).children('h3').children('a').attr('href'))
//         const articleItem = document.createElement('li')
//         articleItem.innerHTML = `
//         ${$(elem).children('h3').children('a').children('span').children('span').text()}
//         `
//         document.querySelector("#homeResults").appendChild(articleItem)

//     }
// })
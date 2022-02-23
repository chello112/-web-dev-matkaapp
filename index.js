const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

const matk1 = {
  id: 0,
  nimetus: "Suusamatk Kiviõlis",
  kirjeldus: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga eligendi accusantium ullam, earum, quis aliquid deserunt molestiae corrupti temporibus iusto, asperiores iste itaque! Debitis velit quasi rem ipsa libero quisquam.",
  pildiURL: "/assets-matk/matka-uudis3.jpg",
  osalejad: ['mati@matkaja.ee', 'kati@matkaja.ee']
}

const matk2 = {
  id: 1,
  nimetus: "Reis Alpidesse",
  kirjeldus: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga eligendi accusantium ullam, earum, quis aliquid deserunt molestiae corrupti temporibus iusto, asperiores iste itaque! Debitis velit quasi rem ipsa libero quisquam.",
  pildiURL: "/assets-matk/matka-uudis1.jpg",
  osalejad: ['klaabu@suurmeri.ee']
}

const matk3 = {
  id: 2,
  nimetus: "Suusasõit Kõrvemaal",
  kirjeldus: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga eligendi accusantium ullam, earum, quis aliquid deserunt molestiae corrupti temporibus iusto, asperiores iste itaque! Debitis velit quasi rem ipsa libero quisquam.",
  pildiURL: "/assets-matk/matka-uudis2.jpg",
  osalejad: ['kevin@gmail.com']
}

matkad = [
  matk1, 
  matk2,
  matk3
]

function naitaRegistreerimist(req, res) {
  const index = req.params.matk
  console.log("Valitud matk" + index);
  console.log(matkad[index])
  res.render('pages/registreerumine', {matk: matkad[index]})
}

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')

  .get('/', (req, res) => res.render('pages/index', {matkad: matkad}))
  .get('/uudised', (req, res) => res.render('pages/uudised'))
  .get('/kontakt', (req, res) => res.render('pages/kontakt'))
  .get('/registreerumine/:matk', naitaRegistreerimist)

  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

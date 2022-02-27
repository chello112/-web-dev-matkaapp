const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

const matk1 = {
  id: 0,
  nimetus: "Lauasõit Kiviõlis",
  kirjeldus: "Baltikumi pikimate nõlvadega suusakeskuses ootavad Sind neli 400-700 meetrist suusanõlva ning kaks õppenõlva “magic carpet” tõstukiga, kus tänu radade profiilile saad korraga nautida nii kiirust kui ka radade laiust. Lisaks pakub palju rõõmu tasemel lumepark oma erinevate hüpete ja obstaaklitega.",
  pildiURL: "/assets-matk/lauasoit-kiviolis.jpg",
  osalejad: ['mati@matkaja.ee', 'kati@matkaja.ee']
}

const matk2 = {
  id: 1,
  nimetus: "Reis Alpidesse",
  kirjeldus: "Alpide suusanõlvad tutvustamist ei vaja - suurepärased rajad, off-piste puuder ja seda ümbritsev melu. Seekord võtame sihiks ühe populaarseima kuurorti, mis asub Prantsusmaal: La Plagne. Kolmest keskusest (La Plagne, Les Arcs ja Peisey-Vallandry) koosnevas Paradiski kuurortis on radu igale tasemele ja kokku 425 km puhast sõidurõõmu! Sobib nii algajatele - terve kuurorti saab läbida sinise raskusega radadega - kui ka kogenud sõitjatele. Lisaks imelistele suusaradadele leidub hulgaliselt baare ja restorane, kus suusatamise vahepeal teha kosutav söögipaus või pärast pikka suusapäeva keerutada õlleklaasiga jalga after-ski’l.",
  pildiURL: "/assets-matk/reis-alpidesse.jpg",
  osalejad: ['klaabu@suurmeri.ee']
}

const matk3 = {
  id: 2,
  nimetus: "Suusasõit Kõrvemaal",
  kirjeldus: "Sportland Kõrvemaa Matka- ja Suusakeskus asub keset Põhja-Kõrvemaa imekaunist loodust ja ühendab endas matka- ja sportimisvõimalused seminaride, kokkutulekute ning saunaõhtute pidamisega. Nii suured  kui väikesed külalised on oodatud aastaringselt!",
  pildiURL: "/assets-matk/suusasoit-korvemaal.jpg",
  osalejad: ['kevin@gmail.com']
}

matkad = [
  matk1, 
  matk2,
  matk3
]

const uudis1 = {
  id: 0,
  pilt: "./assets-matk/matka-uudis1.jpg",
  tutvustus: "Kilimanjaro vallutaja memuaarid: vaatamata täielikule kurnatusele oli tippu jõudmise hetk unustamatu"
}
const uudis2 = {  
  id: 1,
  pilt: "./assets-matk/matka-uudis2.jpg",
  tutvustus: "Puhka Eestis soovitab: mida teha algaval nädalavahetusel?"
}
const uudis3 = {
  id: 2,
  pilt: "./assets-matk/matka-uudis3.jpg",
  tutvustus: "Ida-Viru talveseiklused"
}

uudised = [
  uudis1, 
  uudis2,
  uudis3
  ]

let matkajad = []

function naitaRegistreerimist(req, res) {
  const index = parseInt(req.params.matk)
  console.log("Valitud matk" + index);
  console.log(matkad[index])
  res.render('pages/registreerumine', {matk: matkad[index]})
}

function registreeriOsaleja(req, res) {
  console.log("Serverisse saadeti parameetrid:")
  console.log(req.query)

  if (!req.query.email) {
    return res.end("Palun lisage email!")
  }

  if (!req.query.nimi) {
    return res.end("Palun lisage nimi!")
  }
  

  if (!req.query.matkaId) {
    return res.end("Matka identifikaator puudub!")
  }


  const matk = matkad[req.query.matkaId]

  if (!matk) {
    return res.send("Matka index on vale!")
  }

const uusMatkaja = {
  nimi : req.query.nimi,
  email : req.query.email,
  teade : req.query.teade,
  id : req.query.matkaId,
  matkNimetus : matk.nimetus
}


matkajad.push(uusMatkaja)
matk.osalejad.push(uusMatkaja.email)

console.log("Kõik matkajad:")
console.log(matkajad)
res.send("Registreeritud!")
}


express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')

  .get('/', (req, res) => res.render('pages/index', {matkad: matkad}))
  .get('/uudised', (req, res) => res.render('pages/uudised', {uudised}))
  .get('/kontakt', (req, res) => res.render('pages/kontakt'))
  .get('/registreerumine/:matk', naitaRegistreerimist)
  .get('/kinnitus', registreeriOsaleja)

  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

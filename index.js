const express = require('express')
const { MongoClient, ObjectId } = require('mongodb')
const path = require('path')
const PORT = process.env.PORT || 5000


const salasona = "20011992Eku"
const andmebaas = "matkaApp"
const mongoURL = `mongodb+srv://matka-app:${salasona}@cluster0.kti3z.mongodb.net/${andmebaas}?retryWrites=true&w=majority`

const client = new MongoClient(mongoURL)

const matk1 = {
  id: 0,
  nimetus: "Lauasõit Kiviõlis",
  kirjeldus: "Baltikumi pikimate nõlvadega suusakeskuses ootavad Sind neli 400-700 meetrist suusanõlva ning kaks õppenõlva “magic carpet” tõstukiga, kus tänu radade profiilile saad korraga nautida nii kiirust kui ka radade laiust. Lisaks pakub palju rõõmu tasemel lumepark oma erinevate hüpete ja obstaaklitega.",
  pildiURL: "/assets-matk/lauasoit-kiviolis.jpg",
  osalejad: []
}

const matk2 = {
  id: 1,
  nimetus: "Reis Alpidesse",
  kirjeldus: "Alpide suusanõlvad tutvustamist ei vaja - suurepärased rajad, off-piste puuder ja seda ümbritsev melu. Seekord võtame sihiks ühe populaarseima kuurorti, mis asub Prantsusmaal: La Plagne. Kolmest keskusest (La Plagne, Les Arcs ja Peisey-Vallandry) koosnevas Paradiski kuurortis on radu igale tasemele ja kokku 425 km puhast sõidurõõmu! Sobib nii algajatele - terve kuurorti saab läbida sinise raskusega radadega - kui ka kogenud sõitjatele. Lisaks imelistele suusaradadele leidub hulgaliselt baare ja restorane, kus suusatamise vahepeal teha kosutav söögipaus või pärast pikka suusapäeva keerutada õlleklaasiga jalga after-ski’l.",
  pildiURL: "/assets-matk/reis-alpidesse.jpg",
  osalejad: []
}

const matk3 = {
  id: 2,
  nimetus: "Suusasõit Kõrvemaal",
  kirjeldus: "Sportland Kõrvemaa Matka- ja Suusakeskus asub keset Põhja-Kõrvemaa imekaunist loodust ja ühendab endas matka- ja sportimisvõimalused seminaride, kokkutulekute ning saunaõhtute pidamisega. Nii suured  kui väikesed külalised on oodatud aastaringselt!",
  pildiURL: "/assets-matk/suusasoit-korvemaal.jpg",
  osalejad: []
}

matkad = [
  matk1, 
  matk2,
  matk3
]

const uudis1 = {
  id: 0,
  pilt: "/assets-matk/matka-uudis1.jpg",
  tutvustus: "Kilimanjaro vallutaja memuaarid: vaatamata täielikule kurnatusele oli tippu jõudmise hetk unustamatu",
  sisu: "Mihkel Jürimaa veetis möödunud suvel kuu aega Tansaanias, kus töötas kaks nädalat kohviistanduses, matkas Kilimanjaro otsa ja lõpetuseks õppis Sansibaril vürtside kohta. Ta jagab oma kogutud teadmisi ja seiklusi ka Reisijuhi lugejaga. Täna saate lugeda tema unistuse täitumisest — Kilimanjaro vallutamisest. Kui sain kinnitust oma minekule Tansaania kohviistandusse vabatahtlikuks, olin kindel ka oma kauaaegse unistuse täitumises — Aafrika kõrgeima mäetipu Kilimanjaro vallutamises. Olin teinud üsna põhjaliku eeltöö, lugenud võimalikest ohtudest ja riskidest, milline rada on kõige parem ja suurema tõenäosusega, et matk ka õnnestuks."
}
const uudis2 = {  
  id: 1,
  pilt: "/assets-matk/matka-uudis2.jpg",
  tutvustus: "Puhka Eestis soovitab: mida teha algaval nädalavahetusel?",
  sisu: "Talispordialadest möödub nädalavahetus uisutamise tähe all. Tallinnas toimub pühapäevani nelja kontinendi mõõduvõtmine iluuisutamises. Kui nii eriline sündmus on juba koju kätte tulnud, tasub kogu perega minna kohapeale vaatama emotsiooniderohket ala, mida tavaliselt ju ainult teleri kaudu ja lühikeste uudislõikudena jälgida saab. Samuti toimub pühapäeval Mulgi Uisumaraton, kuhu registreerumine on juba suletud, kuid kaasa elama, üritusega tutvuma ning järgmiseks aastaks julgust ja motivatsiooni koguma minna on igati teretulnud. Viib ju uisumaraton looduslikule jääle ning kohtadesse, kuhu tavaliselt ligi ei pääse."
}
const uudis3 = {
  id: 2,
  pilt: "/assets-matk/matka-uudis3.jpg",
  tutvustus: "Ida-Viru talveseiklused",
  sisu: "Ida-Viru on seiklusmaa. See on koht, kus saab talvest viimast võtta! Selleks, et kõik hea ja parem ära näha, soovitame sul Ida-Viru avastamiseks võtta paaripäevase minipuhkuse. Meie juurest leiab tegevust nii lastega pere kui ka need, keda köidab kultuur ja ajalugu ning kes armastavad oma akusid looduses laadida.Ida-Viru turismiklastri turundusjuhi Meelis Kuuse sõnul on sel aastal talveseikluste seas mitmeid uusi atraktsioone ja ka temal kui kohalikul on avastamisrõõmu küllaga. Kindlasti tasub talvisel ajal külastada võimast juga Valastes ja nautida suusarõõme Kiviõli Suusakeskuses. Uue ja põneva avastamiseks on külastajate jaoks kokku pandud seikluslik otsingumäng Sillamäel, fotojaht Narvas ja eksklusiivne pimedate kaevanduskäikude tuur. Pärast tegusat päeva saab end kosutada, nautides kohalike toidu- ja majutuskohtade külalislahkust ning meenutada päeva saunas-spaas mõnuledes."
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

function naitaUudist(req, res) {
  const index = parseInt(req.params.uudis)
  console.log("Valitud uudis" + index);
  console.log(uudised[index])
  res.render('pages/uudiseSisu', {uudis: uudised[index]})
}



async function registreeriOsaleja(req, res) {
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
res.render("pages/reg-kinnitus", {matk: matk})

await client.connect()   ///////////////////////////////////Tunnis tehtud
const database = client.db(andmebaas) 
const registreerumised = database.collection("registreerumised")
const tulemus = await registreerumised.insertOne(uusMatkaja) //Mongo db käsklus lisamiseks
console.log("Lisati uus matkaja: " + tulemus.insertedId)

res.render("pages/reg-kinnitus", {matk: matk})
}

function tagastaMatkad(req, res) {
  res.send(matkad)
}

async function tagastaOsalejad(req, res) {
  let matkaIndeks = req.params.matk


const filter = {
  id: matkaIndeks
}


let vastusMassiiv = await loeOsalejad(filter)
client.close()

 res.send(vastusMassiiv)
}

async function loeOsalejad(filter) {
  await client.connect()  
  const database = client.db(andmebaas) 
  const registreerumised = database.collection("registreerumised")

let vastusMassiiv = await registreerumised.find(filter).toArray()
client.close()
return vastusMassiiv
}

async function naitaMatkasid(req, res) {
  const osalejad = await loeOsalejad({})

  for (indeks in osalejad) {
    const osaleja = osalejad[indeks]
    const matkaIndeks = parseInt(osaleja.id)
    const matk = matkad[matkaIndeks]
    matk.osalejad.push(osaleja.email)
  }

  console.log(osalejad)
  res.render('pages/index', {matkad: matkad})
}

async function eemaldaOsaleja(req, res) {
  const id = req.params.id
  console.log(id)
  await client.connect()  
  const database = client.db(andmebaas) 
  const registreerumised = database.collection("registreerumised")
  const result = await registreerumised.deleteOne( {"_id": ObjectId(id)})
  res.send({"staatus": "ok", detailid: result})
}


express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')

  .get('/', naitaMatkasid)
  .get('/', (req, res) => res.render('pages/index', {matkad: matkad}))
  .get('/uudised', (req, res) => res.render('pages/uudised', {uudised: uudised})) 
  .get('/uudiseSisu/:uudis', naitaUudist)
  .get('/kontakt', (req, res) => res.render('pages/kontakt'))
  .get('/registreerumine/:matk', naitaRegistreerimist)
  .get('/kinnitus', registreeriOsaleja)
  .get('/api/matk', tagastaMatkad)
  .delete('/api/osalejad/:id', eemaldaOsaleja)
  .get('/api/matkaja/:matk', tagastaOsalejad)

  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

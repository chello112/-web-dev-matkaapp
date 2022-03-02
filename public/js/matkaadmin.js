let matkad = []
async function loeMatkad() {
    let response = await fetch('/api/matk')
    matkad = await response.json()
    console.log(matkad)
    naitaMatkadeMenyyd(matkad)
    naitaOsaleijaid(0)
}

function naitaMatkadeMenyyd(matkad) {
    let vastus = ''
    for (let i in matkad) {
        vastus += `
        <button class="btn btn-link" onClick="naitaOsaleijaid(${matkad[i].id})">
          ${matkad[i].nimetus}
        </button>
        `
    }

    const menyyElement = document.getElementById("matkad-menyy")
    menyyElement.innerHTML = vastus
}

async function naitaOsaleijaid(matkaIndeks) {
    console.log("matk: " + matkaIndeks)
    let response = await fetch('/api/matkaja/' + matkaIndeks)
    const osalejad = await response.json()
    console.log(osalejad)

    let matk = matkad[matkaIndeks]

    let vastus = ''
    vastus += `
    <div class="pb-2">
        ${matk.kirjeldus}
    </div>
    <div class="row">
        <div class="col-4">Email</div>
        <div class="col-8">Nimi</div>
    </div>
    `

   
    for (i in osalejad) {
        vastus += `
       
        <div class="row">
            <div class="col-4">${osalejad[i].email}</div>
            <div class="col-8">${osalejad[i].nimi}</div>
            <div class="col-12">${osalejad[i].teade}</div>
        </div>    
        `
    }
    const matkajadElement = document.getElementById("matka-andmed")
    matkajadElement.innerHTML = vastus
}

loeMatkad()
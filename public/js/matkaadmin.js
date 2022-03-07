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
            <ul>       
                <li>${matkad[i].nimetus}</li>    
            </ul>  
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
    <h3>Matka kirjeldus:</h3>
    <div class="pb-2">
        ${matk.kirjeldus}
    </div>
    `
   
    for (i in osalejad) {
        vastus += `

<table>
  <tr>
    <th>Email</th>
    <th>Nimi</th>
    <th>Teade</th>
  </tr>
  <tr>
    <td>${osalejad[i].email}</td>
    <td>${osalejad[i].nimi}</td>
    <td>${osalejad[i].teade}</td>
    ${osalejad.teade}
    <a href="#" class="btn btn-link" onClick="kustutaOsaleja('${osalejad[i]._id}')">
    Kustuta
    </a>
  </tr>

</table>
        `
    }
    const matkajadElement = document.getElementById("matka-andmed")
    matkajadElement.innerHTML = vastus
}

async function kustutaOsaleja(id) {
    console.log("Kustuta: " + id)
    let response = await fetch('/api/osalejad/' + id, {method: 'DELETE'})
    tulemus = await response.json()
    console.log(tulemus)
    loeMatkad()
}

loeMatkad()
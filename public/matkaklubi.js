let uudis1 = {
        pilt: "./assets-matk/matka-uudis1.jpg",
        tutvustus: "Kilimanjaro vallutaja memuaarid: vaatamata täielikule kurnatusele oli tippu jõudmise hetk unustamatu"
    }
let uudis2 = {  
        pilt: "./assets-matk/matka-uudis2.jpg",
        tutvustus: "Puhka Eestis soovitab: mida teha algaval nädalavahetusel?"
    }
let uudis3 = {
        pilt: "./assets-matk/matka-uudis3.jpg",
        tutvustus: "Ida-Viru talveseiklused"
    }

    let uudised = [uudis1, uudis2, uudis3]

    function looUudisteHTML(uudis) {
        return `
            <div class="col-4 card">
            <img class="card-img-top" src="${uudis.pilt}"
            <div class="card-body">
                <div class="card-title">${uudis.tutvustus}</div>
            </div>
            </div>
        `
    }

    
    function naitaUudiseid() {
        let valjundElement = document.getElementById("valjund")
        let valjundHTML = ''
        valjundHTML += '<div class="row">'
        for(let i = 0; i < uudised.length; i++) {
            valjundHTML += looUudisteHTML(uudised[i])
        }
        valjundHTML += '</div>'
        valjundElement.innerHTML = valjundHTML
            }

            naitaUudiseid()
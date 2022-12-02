const BASE_URL = 'https://fathomless-shelf-54969.herokuapp.com';

    document.getElementById('sun').onclick = reply_click;
    document.getElementById('mercurius').onclick = reply_click;
    document.getElementById('venus').onclick = reply_click;
    document.getElementById('earth').onclick = reply_click;
    document.getElementById('mars').onclick = reply_click;
    document.getElementById('jupiter').onclick = reply_click;
    document.getElementById('saturnus').onclick = reply_click;
    document.getElementById('uranus').onclick = reply_click;
    document.getElementById('neptunus').onclick = reply_click;

//deklarera variabler
const pageOne = document.querySelector('#pageOne');
const pageTwo = document.querySelector('#pageTwo');
const buttons = document.querySelectorAll('button');
let planetNumber = 3;

//Här får vi nyckel
async function getKey() {
    const response = await fetch(`${BASE_URL}/keys`, { method: 'POST' });
    const data = await response.json();
    return data.key;
}

//har skriver vi ut datan till page2
async function getPlanets() {
    const key = await getKey();
    const response = await fetch(`${BASE_URL}/bodies`, {
        headers: {
            'x-zocom': key
        }
    });
    data = await response.json();
}   

function clickedPlanet(){
    const{name, latinName, desc, moons, distance, temp, circumference} = data.bodies[planetNumber]
    
    let nameElem = document.querySelector('#nameElem')
    let distanceElem = document.querySelector('#distanceElem')
    let descElem = document.querySelector('#descElem')
    let moonsElem = document.querySelector('#moonsElem')
    let circumferenceElem = document.querySelector('#circumferenceElem')
    let minTempElem = document.querySelector('#minTempElem')
    let maxTempElem = document.querySelector('#maxTempElem')
    let latinNameElem = document.querySelector('#latinNameElem')

    nameElem.innerHTML = (name.toUpperCase())
    latinNameElem.innerHTML = (latinName.toUpperCase())
    distanceElem.innerHTML = (`KM FRÅN SOLEN: <br> ${distance} km`)
    descElem.innerHTML = (`INFORMAITON <br> ${desc}`)
    moonsElem.innerHTML = (`MÅNAR <br> ${moons.join(', ')}`)
    maxTempElem.innerHTML = (`MAX TEMPERATUR <br> ${temp.night}`)
    minTempElem.innerHTML = (`MIN TEMPERATUR: <br> ${temp.day}`)
    circumferenceElem.innerHTML = (`OMKRETS: <br> ${circumference} km`)
} 

//Här visar eller inte visar vi sidan
function showOrHide(event) {
    pageOne.classList.toggle('hidePlanets'); // Om CSS - klassen hide finns tas den bort och vice versa
    pageTwo.classList.toggle('hide'); // Om CSS - klassen hide finns tas den bort och vice versa
    let planNr = event.target.getAttribute('id')
    if (planNr) {
    reply_click(planNr)
    clickedPlanet()            
    }

} 

pageTwo.addEventListener('click', (event) =>{
    showOrHide(event);
})

buttons.forEach((button) => {
    button.addEventListener('click', (event) => {
        showOrHide(event);
    });
})

//Här ska vi få ut ett värde av varje klick så sidan kan visa rätt information. 
function reply_click(planNr)
{
    if(planNr === 'sun'){
        planetNumber = 0
    }
    else if(planNr === 'mercurius'){
        planetNumber = 1
    }
    else if(planNr === 'venus'){
        planetNumber = 2
    }
    else if(planNr === 'earth'){
        planetNumber = 3
    }
    else if(planNr === 'mars'){
        planetNumber = 4
    }
    else if(planNr === 'jupiter'){
        planetNumber = 5
    }
    else if(planNr === 'saturnus'){
        planetNumber = 6
    }
    else if(planNr === 'uranus'){
        planetNumber = 7
    }
    else if(planNr === 'neptunus'){
        planetNumber = 8
    }
}
//Här startar funktionen
getPlanets();
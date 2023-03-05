export function removeFav(favorites, country, callback, key) {

    favorites.splice(favorites.indexOf(country.substring(1)), 1);
    favorites = Array.from(new Set(favorites));
    callback(key, favorites);
    let favItem = document.getElementById(country).parentElement;
    favItem.style.display = 'none';
    favItem.classList.remove('d-flex');
    return favorites;
}

export function addFav(favorites, draggedCountry, callback, key) {

    favorites.push(draggedCountry);
    favorites = Array.from(new Set(favorites));
    callback(key, favorites);
    return favorites;


}

export function onSearch(callBack) {


    document.getElementById('searchInput').addEventListener("keyup", async (event) => {
        // do something for debouncing

        callBack(event.target.value);

        // when we call the callback func, we return the logic to execute in the caller context
    });


}

export function onFilterChange(callBack) {
    let items = document.getElementsByClassName('dropdown-item');
    Object.keys(items).forEach(key => {
        items[key].addEventListener("click", async (event) => {
            // do something for debouncing
            document.getElementById("dropDown").innerHTML = event.target.textContent;
            callBack(event.target.textContent);

            // when we call the callback func, we return the logic to execute in the caller context
        });
    })


}


export function loadCountries(value) {

    let url = '';
    value ? url = `https://restcountries.com/v3.1/name/${value}` : url = `https://restcountries.com/v3.1/all`;
    return fetch(url)
        .then((response) => response.json());


}


export function render(countries, callback) {
    let countriesCard = document.getElementById("countries");
    countriesCard.innerHTML = "";

    let name, population, capital, flag, code, region;

    countries.forEach(c => {
        if (Array.isArray(c)) c = c[0];

        name = c.name.common;
        population = c.population;
        capital = c.capital;
        flag = c.flags.svg;
        code = c.cca3;
        region = c.region;

        countriesCard.innerHTML += `  <a id="${code}" draggable="true"  class=" country  col-lg-4   col-md-6  " href="details.html?id=${code}">
        <div class="rounded border-0 element-bg shadow-sm  h-100  " style="overflow: hidden;">
            <img draggable="false" class="card-img-top  " src="${flag}" alt="${name}" >
            <div class="text-color  pb-4 ps-3   fw-semibold mb-4">
                <div class="py-3 fs-5 fw-bold">${name}</div>
                <div class=" fs-7 fw-semibold">Population: <span class=" fw-light feature-value color-text">${population.toLocaleString()}</span></div>
                <div class=" fs-7 fw-semibold">Region: <span class=" feature-value fw-light">${region}</span></div>
                <div class=" fs-7 fw-semibold ">Capital: <span class=" feature-value fw-light">${capital}</span></div>
            </div>
        </div>
    </a>`;

    });

    callback();


}


export function filterCountries(countries, filter) {

    let filteredCountries = [];

    if (filter == 'No Filter') return (countries);

    else {
        let index = 0;
        countries.forEach(country => {
            if (country.region == filter) {
                filteredCountries[index++] = country;


            }
        });


        return filteredCountries;
    }
}


export function enableLight(r) {
    r.style.setProperty('--main-bg-color', '#fafafa');
    r.style.setProperty('--element-bg-color', '#ffffff');
    r.style.setProperty('--text-color', 'black');
    r.style.setProperty('--shadow', '33,37,41,0.075');


}

export function enableDark(root) {

    root.style.setProperty('--main-bg-color', '#202c37');
    root.style.setProperty('--element-bg-color', '#2b3945');
    root.style.setProperty('--text-color', 'white');
    root.style.setProperty('--shadow', '17,18,45,0.02');

}

export let setInLocalStorage = function (key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch {
        console.log('error');
    }
}

export let getFromLocalStorage = function (key) {
    try {
        return JSON.parse(localStorage.getItem(key));
    } catch {
        return undefined; // or load from memory/variable
    }
}

export function addDragEvent(cb) {
    let favItems = document.getElementsByClassName('country');
    ;
    Object.keys(favItems).forEach(key => {
        favItems[key].addEventListener("dragstart", (e) => {


            e.dataTransfer.setData("text", e.target.id);
            cb(e.target.id);
            e.target.style.opacity='0.5';


        });
        favItems[key].addEventListener('dragend',(e)=>{
            e.target.style.opacity='1';
        });


    });

}

export function onCountryDrop(callBack) {
    let favList = document.getElementById('favList');


    favList.addEventListener("dragover", (e) => {
        e.preventDefault();
        favList.classList.add("hovered");
    });
    favList.addEventListener("dragleave", () => {
        favList.classList.remove("hovered");
    });

    favList.addEventListener('drop', async (e) => {
        e.preventDefault();
        let data = e.dataTransfer.getData("text");

        favList.classList.remove("hovered");


        callBack();


    });
}

export function loadCountriesByCode(codes) {
    let countries = [];
    let url;
    let requests = [];

    Object.values(codes).forEach(code => {
        url = `https://restcountries.com/v3.1/alpha/${code}`;
        requests.push(fetch(url).then((response) => response.json()));

    });


    return Promise.all(requests);


}

export function showFavCountries(favCountries) {
    let favourites = document.getElementById('favItems');
    let x;
    favourites.innerText = '';
    favCountries.forEach(country => {

        x = `
<div class="d-flex justify-content-between mt-3 favItem">
                          <a href="details.html?id=${country[0].cca3}">
                            <div class="text-color">
                                <img class="rounded fav-img"  src="${country[0].flags.svg}" alt="">
                                <span class="fs-7 fw-semibold">${country[0].name.common}</span>
                            </div>
                            </a>
                            <i id='c${country[0].cca3}' class="bi bi-x-circle-fill text-color removeFav"></i>

        
                        </div>
                         `;
        favourites.innerHTML += x;
    });


}

export function onRemoveFav(callBack) {
    let btns = document.getElementsByClassName('removeFav');
    Object.keys(btns).forEach(key => {
        btns[key].addEventListener('click', (e) => {
            console.log(e.target.id);
            callBack(e.target.id);
        });
    });
}




let activeRequest = 0;

async function init() {
    let darkMode = document.getElementById("darkMode");
    let isDarkMode = localStorage.getItem("dark-mode");
    let r = document.querySelector(':root');

    let countries = [];
    let filter = "No Filter";


    darkMode.addEventListener("click", () => {
        isDarkMode = getFromLocalStorage("dark-mode");

        if (isDarkMode == "yes") {
            setInLocalStorage("dark-mode", "no");
            enableLight(r);
        } else {
            setInLocalStorage("dark-mode", "yes");
            enableDark(r);
        }


    });
    onSearch(async (searchValue) => {

        countries = await loadCountries(searchValue);
        render(filterCountries(countries, filter));

    });
    onFilterChange(async (selectedFilter) => {
         filter=selectedFilter;

        render(filterCountries(countries, filter));

    });


    countries = await loadCountries();
    filterCountries(countries, filter);
    render(filterCountries(countries, filter));

    isDarkMode == "yes" ? enableDark(r) : enableLight(r);

}

function onSearch(callBack) {


    document.getElementById('searchInput').addEventListener("keyup", async (event) => {
        // do something for debouncing

        callBack(event.target.value);

        // when we call the callback func, we return the logic to execute in the caller context
    });


}
function onFilterChange(callBack) {
   let items= document.getElementsByClassName('dropdown-item');

   for(let item of items){
       item.addEventListener("click",async (event) => {
           // do something for debouncing

           callBack(event.target.textContent);

           // when we call the callback func, we return the logic to execute in the caller context
       } );
   }




}








function loadCountries(value) {

    let url = '';
    value ? url = `https://restcountries.com/v3.1/name/${value}` : url = `https://restcountries.com/v3.1/all`;
    return fetch(url)
        .then((response) => response.json());


}


function render(countries) {
    let countriesCard = document.getElementById("countries");
    countriesCard.innerHTML = "";

    let name, population, capital, flag, code, region;


    for (let c of countries) {
        name = c.name.common;
        population = c.population;
        capital = c.capital;
        flag = c.flags.svg;
        code = c.cca3;
        region = c.region;
        countriesCard.innerHTML += `  <a   class=" country col-xl-3 col-md-4   " href="details.html?id=${code}">
        <div class="rounded border-0 element-bg shadow-sm  h-100  " style="overflow: hidden;">
            <img class="card-img-top  " src="${flag}" alt="${name}" >
            <div class="text-color pt-3 pb-4 ps-3   fw-semibold mb-4">
                <div class="card-title fs-5 fw-bold">${name}</div>
                <div class=" fw-semibold">Population: <span class=" fw-light feature-value color-text">${population.toLocaleString()}</span></div>
                <div class=" fw-semibold">Region: <span class=" feature-value fw-light">${region}</span></div>
                <div class="fw-semibold ">Capital: <span class=" feature-value fw-light">${capital}</span></div>
            </div>
        </div>
    </a>`;


    }


}


function filterCountries(countries, filter) {
    document.getElementById("dropDown").innerHTML = filter;
    let filteredCountries = [];

    if (filter == 'No Filter') return (countries);
    else {
        let index = 0;
        for (let c = 0; c < countries.length; c++) {
            if (countries[c].region == filter) {
                filteredCountries[index++] = countries[c];


            }
        }

        return filteredCountries;
    }
}



function enableLight(r) {
    r.style.setProperty('--main-bg-color', '#fafafa');
    r.style.setProperty('--element-bg-color', '#ffffff');
    r.style.setProperty('--text-color', 'black');
    r.style.setProperty('--shadow', '33,37,41,0.075');


}

function enableDark(root) {

    root.style.setProperty('--main-bg-color', '#202c37');
    root.style.setProperty('--element-bg-color', '#2b3945');
    root.style.setProperty('--text-color', 'white');
    root.style.setProperty('--shadow', '17,18,45,0.02');

}
let setInLocalStorage = function (key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    }
    catch {
        // handle error, usually to keep it in memory (variable)
    }
}

let getFromLocalStorage = function (key) {
    try {
        return JSON.parse(localStorage.getItem(key));
    }
    catch {
        return undefined; // or load from memory/variable
    }
}

init();


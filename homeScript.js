let searchBtn=document.getElementById("searchButton");
let searchInput=document.getElementById("searchInput");
let countriesCard = document.getElementById("countries");
let dropDownBtn=document.getElementById("dropDown");
let darkMode=document.getElementById("darkMode");
let isDarkMode = localStorage.getItem("dark-mode");
let countries=[];
const NO_FILTER ="No Filter";
let activeRequest =0;


let r = document.querySelector(':root');
getAllCountries();


if(isDarkMode=="yes"){
    enableDark(r);
}


function enableDark(root) {
    root.style.setProperty('--main-bg-color', '#202c37');
    root.style.setProperty('--element-bg-color', '#2b3945');
    root.style.setProperty('--text-color', 'white');

}

 function  loadCountries(url,render) {
    activeRequest++;
    let requestNumber=activeRequest;
    countries=[];
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
if(activeRequest==requestNumber) {
    for (let i = 0; i < data.length; i++) {
        countries[i] = data[i];
    }

    render(countries);
}

        });


}

function filterCountries(countries,filter){
    dropDownBtn.innerHTML=filter;
    let filteredCountries=[];

    if(filter==NO_FILTER)render(countries);
    else{
        let index=0;
        for(let c =0;c<countries.length;c++){
            if(countries[c].region ==filter){
                filteredCountries[index++]=countries[c];


            }
        }
        render(filteredCountries);
    }
}

function onFilterChange(value,filterCountries){
    filterCountries(countries,value);

}




function clear(){
    countriesCard.innerHTML="";

}

function showCard( code, flag, name, population, capital,region) {
    countriesCard.innerHTML += `  <a   class=" country col-xl-3 col-md-4   " href="details.html?id=${code}">
        <div class="card border-0 element-bg shadow-sm  h-100  " >
            <img class="card-img-top  " src="${flag}" alt="${name}" >
            <div class="text-color  card-body fw-semibold mb-4">
                <div class="card-title fs-5 fw-bold">${name}</div>
                <div class="card-text">Population: <span class=" feature-value text-muted">${population.toLocaleString()}</span></div>
                <div class="card-text">Region: <span class=" feature-value text-muted">${region}</span></div>
                <div class="card-text">Capital: <span class=" feature-value text-muted">${capital}</span></div>
            </div>
        </div>
    </a>`;
}

function render(countries) {
    clear();

    let name, population,  capital, flag,code,region;


    for(let c of countries){


        name = c.name.common;
        population = c.population;
        capital = c.capital;
        flag = c.flags.svg;
        code=c.cca3;
        region=c.region;
        showCard( code, flag, name, population, capital,region);


    }


}

function getAllCountries(){
    let url=`https://restcountries.com/v3.1/all`;

   loadCountries(url,render);


}

function onSearch(){
    //i=0;
   let searchValue=searchInput.value;
   if(searchValue==""){

       getAllCountries();

   }
   else{
       let url=`https://restcountries.com/v3.1/name/${searchValue}`;
       loadCountries(url,render);
   }



}


searchInput.addEventListener("keyup",onSearch);
searchBtn.addEventListener("click",onSearch);
darkMode.addEventListener("click",()=>{
   if(isDarkMode=="yes") {
       localStorage.setItem("dark-mode", "no");

   }
   else {
       localStorage.setItem("dark-mode", "yes");

   }

    enableDark(r);

});



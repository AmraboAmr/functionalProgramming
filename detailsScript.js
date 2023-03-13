import {onThemeChange} from "./theme.js";
import {getFromLocalStorage, setInLocalStorage} from "./LocalStorage.js";
import {DARK_KEY} from "./constans.js";

let details=document.getElementById("details");
let darkMode=document.getElementById("darkMode");
let isDarkMode = localStorage.getItem("dark-mode");
let body = document.body;
let url=new URLSearchParams(window.location.search);
let countryId=url.get('id');
onThemeChange(getFromLocalStorage(DARK_KEY)|| false,(isDarkMode)=>{
    setInLocalStorage(DARK_KEY,isDarkMode);
});
function getDetails(data) {
    let name,native,subRegion,tld,currencies,languages, population, region, capital, flag;



currencies="";
languages="";


        name = data.name.common;
        population = data.population;
        region = data.region;

        capital = data.capital;
        flag = data.flags.svg;




    native=data.name.nativeName[Object.keys(data.name.nativeName)[0]].official;

for(let cc =0;cc<Object.keys(data.currencies).length;cc++){
    if(cc==0) currencies+= data.currencies[Object.keys(data.currencies)[cc]].name;
   else currencies+=" , "+data.currencies[Object.keys(data.currencies)[cc]].name;
}
    for(let cc =0;cc<Object.keys(data.languages).length;cc++){
        if(cc==0)languages+=data.languages[Object.keys(data.languages)[cc]];

       else languages+=" , "+data.languages[Object.keys(data.languages)[cc]];
    }


    subRegion=data.subregion;
tld=data.tld[0];




        details.innerHTML += `
    <div id="flag" class="col-lg-6">
    <img  src="${flag}"  alt="${name}"></div>
            <div class="col-lg-6 py-4 h-75">
                <div class="fs-2   fw-bold ">${name}</div>
                <div class="fs-6 fw-semibold row justify-content-between ">

                    <div class="col col-lg-5 mt-4 text-color">


                        <div class="">Native Name: <span class="feature-value fw-light text-color">${native}</span></div>
                        <div class="">Population: <span class="feature-value fw-light text-color">${population.toLocaleString()}</span></div>
                        <div class="">Region: <span class="feature-value fw-light text-color">${region}</span></div>
                        <div class="">Sub Region: <span class=" feature-value fw-light text-color">${subRegion}</span></div>
                        <div class="">Capital: <span class="feature-value fw-light text-color">${capital}</span></div>

                    </div>
                    <div class="mt-4 col-lg-6 ">


                        <div class="">Top Level Domain: <span class="feature-value fw-light text-color">${tld}</span></div>

                        <div class="">Currencies: <span class="feature-value fw-light text-color">${currencies}</span></div>
                        <div class="">Languages: <span class="feature-value fw-light text-color">${languages}</span></div>


                    </div>
                </div>
                <div class="row justify-content-start g-3 mt-4" >
        <div  class="fw-semibold col-lg-auto mt-4 ">Border Countries: </div>
        <div id="borders" class="col-auto ">
          


    </div>

</div>
                
`;

getBorders(data);






}
function getBorders(country){
    let bordersDiv=document.getElementById("borders");
    let allRequests=[];
    bordersDiv.innerHTML=``;
    if(country.borders){
        for(let b of country.borders){
            allRequests.push( fetch(`https://restcountries.com/v3.1/alpha/${b}`)
                .then ((response)=> response.json()));


        }
        const allData = Promise.all(allRequests);
        allData.then((res) => {

            for(let border of res){
                bordersDiv.innerHTML+=` <button class="btn shadow-sm main-bg px-4 me-1 text-color" type="button">${border[0].name.common }</button>`;
            }
        });

    }




}


function getCountry(){
    let url=`https://restcountries.com/v3.1/alpha/${countryId}`;
    fetch(url)
        .then ((response)=> response.json())
        .then((data)=>{

            getDetails(data[0]);

        });



}
getCountry();



let searchBtn=document.getElementById("searchButton");
let searchInput=document.getElementById("searchInput");
let countries = document.getElementById("countries");
let dropDownBtn=document.getElementById("dropDown");
let darkMode=document.getElementById("darkMode");
let isDarkMode = localStorage.getItem("dark-mode");
let body = document.body;
let darkText=document.getElementById("darkText");

function enableDark() {

     body = document.body;
    let header = document.getElementById("hdr");
    let searchBar = document.getElementById("searchInput");
    let searchGroup = document.getElementById("inputGroup");
    let dropDown = document.getElementById("dropD");
    let dropBtn = document.getElementById("dropBtn");
    let dropDownItems = document.getElementsByClassName("dropdown-item");
    let dropLists = document.getElementsByClassName("dropdown-menu");
    let cards=document.getElementsByClassName('card');
    let countries=document.getElementsByClassName('country');
    let featureValue=document.getElementsByClassName("feature-value");
    let cardBody=document.getElementsByClassName("card-body");

    body.classList.toggle("bg-dark");
    body.classList.toggle("text-white");
    header.classList.toggle("bg-white");
    header.classList.toggle("bg-black");
    header.classList.toggle("shadow-white");
    header.classList.toggle("shadow-sm");

    searchBar.classList.toggle("bg-black");
    searchBar.classList.toggle("text-white");
    searchBar.classList.toggle("shadow-white");
    searchBar.classList.toggle("shadow-sm");

    searchGroup.classList.toggle("shadow-white");
    searchGroup.classList.toggle("shadow-sm");
    searchGroup.classList.toggle("bg-white");

    searchBtn.classList.toggle("shadow-white");

    searchBtn.classList.toggle("bg-dark");


    dropDown.classList.toggle("shadow-sm");
    dropDown.classList.toggle("bg-white");
    dropDown.classList.toggle("shadow-white");
    dropDown.classList.toggle("bg-black");
    dropDown.classList.toggle("text-white");

    dropBtn.classList.toggle("text-white");


    for (let item of dropDownItems) {
        item.classList.toggle("text-white");

    }
    for (let list of dropLists) {
        list.classList.toggle("bg-black");
        list.classList.toggle("shadow-sm");
        list.classList.toggle("shadow-white");


    }
    for (let card of cards) {
        card.classList.toggle("bg-black");
        card.classList.toggle("shadow-sm");
        card.classList.toggle("shadow-white");


    }
    for (let country of countries) {
        country.classList.toggle("text-white");
    }
    for (let f of featureValue) {
        f.classList.toggle("text-white-50");
        f.classList.toggle("text-muted");
    }
    for (let body of cardBody) {
        body.classList.toggle("text-black");
        body.classList.toggle("text-white");

    }

}


//let i=0;
//let e=20;
const NO_FILTER ="No Filter";
let filter={

};
filter=NO_FILTER;
function filtering(value){
   filter= value;
    dropDownBtn.innerHTML=value;
    let cards=document.getElementsByClassName("country")
    if(filter!=NO_FILTER){
        let filterCountries=document.getElementsByClassName(filter);
        for(let x of cards){
            x.style.display="none";
        }
        for(let x of filterCountries){
            x.style.display="block";
        }
    }
    else{
        for(let x of cards){
            x.style.display="block";
        }
    }
}
function clear(){
    countries.innerHTML="";

}
function getData(data) {
    isDarkMode = localStorage.getItem("dark-mode");
    let name, population, region, capital, flag;
let c,j;
// if(filter==NO_FILTER)e=20;
// else{
//     e=data.length;
// }


    //for( j=i ;j<i+e;j++){
    for(let c of data){
        // if(j>=c.length){
        //
        //     i=0;
        //     return;
        // }


        name = c.name.common;
        population = c.population;
        region = c.region;
        if(region !=filter &&filter!='No Filter') continue;
        capital = c.capital;
        flag = c.flags.svg;
if(isDarkMode=='no') {
    countries.innerHTML += `  <a   class=" country col-xl-3 col-md-4 ${region}  " href="details.html?id=${name}">
        <div class="card border-0 shadow-sm  h-100  " >
            <img class="card-img-top  " src="${flag}" alt="${name}" >
            <div class="text-black card-body fw-semibold mb-4">
                <div class="card-title fs-5 fw-bold">${name}</div>
                <div class="card-text">Population: <span class=" feature-value text-muted">${population}</span></div>
                <div class="card-text">Region: <span class=" feature-value text-muted">${region}</span></div>
                <div class="card-text">Capital: <span class=" feature-value text-muted">${capital}</span></div>
            </div>
        </div>
    </a>`;
}

else{
    countries.innerHTML += `  <a   class=" country col-xl-3 col-md-4 ${region}  " href="details.html?id=${name}">
        <div class="text-white bg-black card border-0 shadow-white  h-100  " >
            <img class="card-img-top  " src="${flag}" alt="${name}" >
            <div class="card-body text-white fw-semibold mb-4">
                <div class="card-title fs-5 fw-bold">${name}</div>
                <div class="card-text">Population: <span class="feature-value text-white-50">${population}</span></div>
                <div class="card-text">Region: <span class="feature-value text-white-50">${region}</span></div>
                <div class="card-text">Capital: <span class=" feature-value text-white-50">${capital}</span></div>
            </div>
        </div>
    </a>`;
}

    }
   // i=j;

}

function getCountries(){
    let url=`https://restcountries.com/v3.1/all`;
    fetch(url)
        .then ((response)=> response.json())
        .then((data)=>{

            getData(data);


        });
}
function search(){
    //i=0;
   let searchValue=searchInput.value;
   if(searchValue==""){
       clear();
       getCountries();
       return;
   }

    let url=`https://restcountries.com/v3.1/name/${searchValue}`;
    fetch(url)
        .then ((response)=> response.json())
        .then((data)=>{
            clear();
            console.log(data);
          getData(data);
        });
}
// window.onscroll = function() {
//     if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight) {
//
//        getCountries();
//
//     }
// }
searchInput.addEventListener("keyup",search);
searchBtn.addEventListener("click",search);
darkMode.addEventListener("click",()=>{
   if(isDarkMode=="yes") {
       localStorage.setItem("dark-mode", "no");

   }
   else {
       localStorage.setItem("dark-mode", "yes");

   }

    enableDark();

});

getCountries();


    if(isDarkMode=="yes"){
        enableDark();
    }


let searchBtn=document.getElementById("searchButton");
let searchInput=document.getElementById("searchInput");
let countries = document.getElementById("countries");
let dropDownBtn=document.getElementById("dropDown");
let i=0;
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

        countries.innerHTML += `  <a   class=" country col-xl-3 col-md-4 ${region}  " href="details.html?id=${name}">
        <div class="card border-0 shadow-sm  h-100  " >
            <img class="card-img-top  " src="${flag}" alt="${name}" >
            <div class="card-body fw-semibold">
                <div class="card-title fs-5 fw-bold">${name}</div>
                <div class="card-text">Population: <span class="text-muted">${population}</span></div>
                <div class="">Region: <span class="text-muted">${region}</span></div>
                <div class="">Capital: <span class="text-muted">${capital}</span></div>
            </div>
        </div>
    </a>`;

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
getCountries();

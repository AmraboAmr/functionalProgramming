
let searchInput=document.getElementById("searchInput");
let countries = document.getElementById("countries");
let dropDownBtn=document.getElementById("dropDown");
let filter={

};
filter='All';
function filtering(value){
   filter= value;
    dropDownBtn.innerHTML=value;
    search();
}
function clear(){
    countries.innerHTML="";

}
function getData(data) {
    let name, population, region, capital, flag;

    for (let c of data) {

        name = c.name.common;
        population = c.population;
        region = c.region;
        if(region !=filter &&filter!='No Filter') continue;
        capital = c.capital;
        flag = c.flags.svg;


        countries.innerHTML += `  <a onclick="getElementId(this.id)"  class="     col-xl-3 col-md-4   " href="details.html">
        <div class="card border-0 shadow-sm  h-100 " >
            <img class="card-img-top  " src="${flag}" alt="${name}" >
            <div class="card-body fw-semibold">
                <div class="card-title fs-5 fw-bold">${name}</div>
                <div class="card-text">Population: <span class="text-muted">${population}</span></div>
                <div class="">Region: <span class="text-muted">${region}</span></div>
                <div class="">Capital: <span class="text-muted">${capital}</span></div>
            </div>
        </div>
    </a>`;
break;
    }
}

function getAll(){
    let url=`https://restcountries.com/v3.1/all`;
    fetch(url)
        .then ((response)=> response.json())
        .then((data)=>{

            getData(data);


        });
}
function search(){
   let searchValue=searchInput.value;
   if(searchValue==""){
       clear();
       getAll();
       return;
   }

    let url=`https://restcountries.com/v3.1/name/${searchValue}`;
    fetch(url)
        .then ((response)=> response.json())
        .then((data)=>{
            clear();
          getData(data);
        });
}

searchInput.addEventListener("keyup",search);
getAll();

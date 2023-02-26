let details=document.getElementById("details");
let darkMode=document.getElementById("darkMode");
let isDarkMode = localStorage.getItem("dark-mode");
let body = document.body;
//let countryId = window.location.search.split('id=')[1];
let url=new URLSearchParams(window.location.search);
let countryId=url.get('id');
function enableDark() {

    body = document.body;
    let header = document.getElementById("hdr");
let btns=document.getElementsByClassName("btn");
    let featureValue=document.getElementsByClassName("feature-value");


    body.classList.toggle("bg-dark");
    body.classList.toggle("text-white");
    header.classList.toggle("bg-white");
    header.classList.toggle("bg-black");
    header.classList.toggle("shadow-white");
    header.classList.toggle("shadow-sm");
for(let b of btns){
    b.classList.toggle("text-white");
    b.classList.toggle("bg-black");
    b.classList.toggle("bg-white");
    b.classList.toggle("shadow-white");
    b.classList.toggle("shadow-sm");
}
    for (let f of featureValue) {
        f.classList.toggle("text-white-50");
        f.classList.toggle("text-muted");
    }

}
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
    if(isDarkMode=="yes"){
        details.innerHTML += `
    <div id="flag" class="col-lg-5">
    <img  src="${flag}"  alt="${name}"></div>
            <div class="col-lg-6 py-4 h-75">
                <div class="fs-2   fw-bold ">${name}</div>
                <div class="fs-6 fw-semibold row ">

                    <div class="col col-lg-6 mt-4">


                        <div class="">Native Name: <span class="feature-value text-white-50">${native}</span></div>
                        <div class="">Population: <span class="feature-value text-white-50">${population.toLocaleString()}</span></div>
                        <div class="">Region: <span class="feature-value text-white-50">${region}</span></div>
                        <div class="">Sub Region: <span class=" feature-value text-white-50">${subRegion}</span></div>
                        <div class="">Capital: <span class="feature-value text-white-50">${capital}</span></div>

                    </div>
                    <div class="mt-4 col-lg-6 ">


                        <div class="">Top Level Domain: <span class="feature-value text-white-50">${tld}</span></div>

                        <div class="">Currencies: <span class="feature-value text-white-50">${currencies}</span></div>
                        <div class="">Languages: <span class="feature-value text-white-50">${languages}</span></div>


                    </div>
                </div>
                <div class="row justify-content-start g-3 mt-4" >
        <div  class="fw-semibold col-lg-auto mt-4 ">Border Countries: </div>
        <div  class="col-auto ">
            <button class="btn shadow-white bg-black text-color px-4 me-1" type="button">France</button>
            <button class="btn shadow-white bg-black text-color px-4 me-1" type="button">Poland</button>
            <button class="btn shadow-white bg-black text-color px-4 me-1" type="button">Netherlands</button></div>


    </div>

</div>
                `;
    }
else
    {
        details.innerHTML += `
    <div id="flag" class="col-lg-5">
    <img  src="${flag}"  alt="${name}"></div>
            <div class="col-lg-6 py-4 h-75">
                <div class="fs-2   fw-bold ">${name}</div>
                <div class="fs-6 fw-semibold row ">

                    <div class="col col-lg-6 mt-4">


                        <div class="">Native Name: <span class="feature-value text-muted">${native}</span></div>
                        <div class="">Population: <span class="feature-value text-muted">${population.toLocaleString()}</span></div>
                        <div class="">Region: <span class="feature-value text-muted">${region}</span></div>
                        <div class="">Sub Region: <span class=" feature-value text-muted">${subRegion}</span></div>
                        <div class="">Capital: <span class="feature-value text-muted">${capital}</span></div>

                    </div>
                    <div class="mt-4 col-lg-6 ">


                        <div class="">Top Level Domain: <span class="feature-value text-muted">${tld}</span></div>

                        <div class="">Currencies: <span class="feature-value text-muted">${currencies}</span></div>
                        <div class="">Languages: <span class="feature-value text-muted">${languages}</span></div>


                    </div>
                </div>
                <div class="row justify-content-start g-3 mt-4" >
        <div  class="fw-semibold col-lg-auto mt-4 ">Border Countries: </div>
        <div id="borders" class="col-auto ">
          


    </div>

</div>
                
`;
    }
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
                bordersDiv.innerHTML+=` <button class="btn shadow-sm main-bg px-4 me-1" type="button">${border[0].name.common }</button>`;
            }
        });

    }




}


function getCountries(){
    let url=`https://restcountries.com/v3.1/alpha/${countryId}`;
    fetch(url)
        .then ((response)=> response.json())
        .then((data)=>{

            getDetails(data[0]);

        });



}
getCountries();
darkMode.addEventListener("click",()=>{
    if(isDarkMode=="yes") {
        localStorage.setItem("dark-mode", "no");

    }
    else {
        localStorage.setItem("dark-mode", "yes");

    }

    enableDark();

});

if(isDarkMode=="yes"){
    enableDark();
}
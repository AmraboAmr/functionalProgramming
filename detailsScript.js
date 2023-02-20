let details=document.getElementById("details");

let countryId = window.location.search.split('id=')[1];

function getDetails(data) {
    let name,native,subRegion,tld,currencies,languages, population, region, capital, flag;



currencies="";
languages="";

console.log(data);
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
    <div id="flag" class="col-lg-5">
    <img  src="${flag}"  alt="${name}"></div>
            <div class="col-lg-6 py-4 h-75">
                <div class="fs-2   fw-bold ">${name}</div>
                <div class="fs-6 fw-semibold row ">

                    <div class="col col-lg-6 mt-4">


                        <div class="">Native Name: <span class="text-muted">${native}</span></div>
                        <div class="">Population: <span class=" text-muted">${population}</span></div>
                        <div class="">Region: <span class="text-muted">${region}</span></div>
                        <div class="">Sub Region: <span class="text-muted">${subRegion}</span></div>
                        <div class="">Capital: <span class="text-muted">${capital}</span></div>

                    </div>
                    <div class="mt-4 col-lg-6 ">


                        <div class="">Top Level Domain: <span class="text-muted">${tld}</span></div>

                        <div class="">Currencies: <span class="text-muted">${currencies}</span></div>
                        <div class="">Languages: <span class="text-muted">${languages}</span></div>


                    </div>
                </div>
                <div class="row justify-content-start g-3 mt-4" >
                    <div  class="fw-semibold col-lg-auto mt-4 ">Border Countries: </div>
                    <div class="col-auto ">
                        <button class="btn shadow-sm bg-white px-4 me-1" type="button">France</button>
                        <button class="btn shadow-sm bg-white px-4 me-1" type="button">Poland</button>
                        <button class="btn shadow-sm bg-white px-4 me-1" type="button">Netherlands</button></div>


                </div>

            </div>
`;



}

function getCountries(){
    let url=`https://restcountries.com/v3.1/name/${countryId}`;
    fetch(url)
        .then ((response)=> response.json())
        .then((data)=>{

            getDetails(data[0]);

        });



}
getCountries();
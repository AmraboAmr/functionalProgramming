let oldRequest;
export function loadCountries(value) {
let newRequest=value || '';
oldRequest =newRequest;
return new Promise((resolve) =>{
    let url = '';
    value ? url = `https://restcountries.com/v3.1/name/${value}` : url = `https://restcountries.com/v3.1/all`;
    fetch(url)
        .then((response) => {
            if (oldRequest === newRequest){
                switch (response.status){
                    case 200:
                        resolve(response.json());
                        break;
                    default:
                        resolve([]);
                }
            }
        });

});



}

export function loadCountriesByCode(codes) {
    let url;
    let requests = [];

    Object.values(codes).forEach(code => {
        url = `https://restcountries.com/v3.1/alpha/${code}`;
        requests.push(fetch(url).then((response) => response.json()));

    });


    return Promise.all(requests);


}
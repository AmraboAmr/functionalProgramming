


export function darkModeListener(getFromLocalStorage,dark,light,callBack) {
    let darkMode = document.getElementById("darkMode");
    let root = document.querySelector(":root");
    getFromLocalStorage('dark-mode') ? dark(root) : light(root);
    darkMode.addEventListener("click", () => {



        if ( getFromLocalStorage('dark-mode')) {
            light(root);
            callBack('dark-mode',false);

        } else {
            dark(root);
            callBack('dark-mode',true);
        }


    });


}




export function loadCountries(value) {

    let url = '';
    value ? url = `https://restcountries.com/v3.1/name/${value}` : url = `https://restcountries.com/v3.1/all`;
    return fetch(url)
        .then((response) => response.json());


}


export function enableLight(root) {
    root.style.setProperty('--main-bg-color', '#fafafa');
    root.style.setProperty('--element-bg-color', '#ffffff');
    root.style.setProperty('--text-color', 'black');
    root.style.setProperty('--shadow', '33,37,41,0.075');


}

export function enableDark(root) {

    root.style.setProperty('--main-bg-color', '#202c37');
    root.style.setProperty('--element-bg-color', '#2b3945');
    root.style.setProperty('--text-color', 'white');
    root.style.setProperty('--shadow', '17,18,45,0.02');

}



export function addStarListener(add, remove){
    let stars =document.getElementsByClassName('addFav');
    Object.keys(stars).forEach(key =>{
        stars[key].addEventListener('click',(e)=>{
            e.target.classList.toggle('star-color');
            e.target.classList.contains('star-color')? add(e.target.id.substring(1)):remove(e.target.id);




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



export function onRemoveFav(callBack) {
    let btns = document.getElementsByClassName('removeFav');
    Object.keys(btns).forEach(key => {
        btns[key].addEventListener('click', (e) => {
            console.log(e.target.id);
            callBack(e.target.id);
        });
    });
}

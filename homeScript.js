
import {getFromLocalStorage, setInLocalStorage} from "./LocalStorage.js";
import {onFilterChange, onSearch, renderCountries, onFavDrop, renderFavCountries} from "./rendering.js";
import {DARK_KEY, FAV_KEY} from "./constans.js"
import {addFav, removeFav} from "./favorites.js";
import {filterCountries} from "./countries.js";
import {loadCountries} from "./apis.js";
import {onThemeChange} from "./theme.js";

let countries = [];
let favorites = getFromLocalStorage(FAV_KEY) || [];
let filter = "";
function removeFavHandler(countryCode) {
    let unFav = countries.find((country) => country.cca3 === countryCode);
    favorites = removeFav(favorites, unFav);
    favouritesUpdateHandler();


}

function favouritesUpdateHandler() {
    setInLocalStorage(FAV_KEY, favorites)
    renderFavCountries(favorites, removeFavHandler);
}

function addFavHandler(countryCode) {
    let draggedCountry = countries.find((country) => country.cca3 === countryCode);
    favorites = addFav(favorites, draggedCountry);
    favouritesUpdateHandler();

}

async function loadAndShowCountries(searchValue) {
    countries = await loadCountries(searchValue);
    renderCountries(filterCountries(countries, filter),favorites,addFavHandler,removeFavHandler);
}

async function init() {
   onThemeChange(getFromLocalStorage(DARK_KEY)|| false,(isDarkMode)=>{
        setInLocalStorage(DARK_KEY,isDarkMode);
    });

    onSearch( async (searchValue) => {
       await  loadAndShowCountries(searchValue, filter);
    });

    onFilterChange(async (selectedFilter) => {
        filter = selectedFilter;
        let favCountriesCodes = favorites.map((fav) => fav.cca3);

        renderCountries(filterCountries(countries, filter, favCountriesCodes));

    });


   await loadAndShowCountries(null);
   

    onFavDrop(async (droppedCountryCode) => {
        let alreadyFavCode = favorites.find((country) => country.cca3 === droppedCountryCode);
        if (!alreadyFavCode) {
            addFavHandler(droppedCountryCode);

        }
    });


    renderFavCountries(favorites, removeFavHandler);

}


init().then(() => {
});




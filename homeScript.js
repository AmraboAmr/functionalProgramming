import {
    enableDark,
    enableLight,
    loadCountries,
    onRemoveFav
    , addStarListener, darkModeListener
} from "./functionality.js";
import {getFromLocalStorage, setInLocalStorage} from "./LocalStorage.js";
import {onFilterChange, onSearch, renderCountries, onFavDrop, renderFavCountries} from "./rendering.js";
import {FAV_KEY} from "./constans.js"
import {addFav, removeFav} from "./favorites.js";
import {filterCountries} from "./countries.js";

let countries = [];
let favorites = getFromLocalStorage(FAV_KEY) || [];

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

async function init() {


    let filter = "";


    darkModeListener(getFromLocalStorage, enableDark, enableLight, setInLocalStorage);


    onSearch(async (searchValue) => {

        countries = await loadCountries(searchValue);
        renderCountries(filterCountries(countries, filter));
    });

    onFilterChange(async (selectedFilter) => {
        filter = selectedFilter;
        let favCountriesCodes = favorites.map((fav) => fav.cca3);

        renderCountries(filterCountries(countries, filter, favCountriesCodes));

    });


    countries = await loadCountries();
    renderCountries(filterCountries(countries, filter));

    addStarListener((country) => {
            favorites = addFav(favorites, country, setInLocalStorage, FAV_KEY);
        }, (country) => {
            favorites = removeFav(favorites, country, setInLocalStorage, FAV_KEY);
        }
    );

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




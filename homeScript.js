import {
    addDragEvent, addFav, enableDark,
    enableLight,
    filterCountries,
    loadCountries, loadCountriesByCode, onCountryDrop,
    onFilterChange, onRemoveFav, removeFav,
    render,
    setInLocalStorage, showFavCountries,onSearch,getFromLocalStorage
} from "./functionality.js";

let activeRequest = 0;
let loading = true;



async function init() {
    let draggedCountry;
    let darkMode = document.getElementById("darkMode");
    let isDarkMode = getFromLocalStorage("dark-mode");
    let r = document.querySelector(":root");


    let countries = [];
    let filter = "No Filter";
    const FAV = 'fav';
    let favorites = getFromLocalStorage(FAV);
    if (!favorites || !Object.keys(favorites).length) favorites = [];
    console.log(favorites);
    let favCountries = [];


    darkMode.addEventListener("click", () => {
        isDarkMode = getFromLocalStorage("dark-mode");

        if (isDarkMode == "yes") {
            setInLocalStorage("dark-mode", "no");
            enableLight(r);
        } else {
            setInLocalStorage("dark-mode", "yes");
            enableDark(r);
        }


    });
   onSearch(async (searchValue) => {

        countries = await loadCountries(searchValue);
        render(filterCountries(countries, filter), () => {

            addDragEvent((code) => {
                draggedCountry = code;

            });


        });
    });

    onFilterChange(async (selectedFilter) => {
        filter = selectedFilter;
        console.log(filter);
        if (filter == 'Favourites') {
            favCountries=await loadCountriesByCode(favorites);

            render(favCountries, () => {


                addDragEvent((code) => {
                    draggedCountry = code;


                });


            });
        } else {


            render(filterCountries(countries, filter), () => {

                addDragEvent((code) => {
                    draggedCountry = code;


                });


            });
        }
    });


    countries = await loadCountries();
    if (countries) loading = true;
    filterCountries(countries, filter);
    render(filterCountries(countries, filter), () => {

        addDragEvent((code) => {
            draggedCountry = code;

        });

    });
    isDarkMode == 'yes' ? enableDark(r) : enableLight(r);


    onCountryDrop(async () => {


        favorites = addFav(favorites, draggedCountry, setInLocalStorage, FAV);
        favCountries = await loadCountriesByCode(favorites)
        showFavCountries(favCountries);
        onRemoveFav(async (country) => {
            favorites = removeFav(favorites, country, setInLocalStorage, FAV);

        });
    });


    favCountries = await loadCountriesByCode(favorites);
    showFavCountries(favCountries);
    onRemoveFav(async (country) => {
        favorites = removeFav(favorites, country, setInLocalStorage, FAV);


    });

}


init().then(r =>{} );




export function removeFav(favorites, countryCode) {
    let favArray = [...favorites];
    favArray.splice(favArray.indexOf(favArray.find((fav) => fav.cca3 === countryCode)), 1);



    return favArray;
}

export function addFav(favorites, country) {
    let favArray = [...favorites];
    let alreadyFav = favArray.find((fav) => fav.cca3 === country.cca3);
    if (!alreadyFav) {

        favArray.push(country);

    }
    return favArray;
}
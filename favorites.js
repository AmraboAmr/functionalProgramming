export function removeFav(favorites, country) {
    let favArray = [...favorites];
    favArray.splice(favArray.indexOf(country), 1);

    let favItem = document.getElementById('c' + country.cca3).parentElement;
    favItem.style.display = 'none';
    favItem.classList.remove('d-flex');

    return favArray;
}

export function addFav(favorites, draggedCountry) {
    let favArray = [...favorites];
    let alreadyFavCode = favArray.find((country) => country.cca3 === draggedCountry.cca3);
    if (!alreadyFavCode) {

        favArray.push(draggedCountry);

    }
    return favArray;
}
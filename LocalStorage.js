export let setInLocalStorage = function (key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch {
        console.log('error');
    }
}

export let getFromLocalStorage = function (key) {
    try {
        return JSON.parse(localStorage.getItem(key));
    } catch {
        return undefined;
    }
}
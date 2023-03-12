export function onThemeChange(isDark, callBack) {
    let darkMode = document.getElementById("darkMode");
    let root = document.querySelector(":root");
    isDark ? enableDark(root) : enableLight(root);
    darkMode.addEventListener("click", () => {
        if (isDark) {
            isDark = false;
            enableLight(root);
        } else {
            isDark = true;
            enableDark(root);
        }
        callBack(isDark);
    });


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
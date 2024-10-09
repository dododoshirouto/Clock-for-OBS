function main() {
    datetime_format();

    if (do_realtime_refresh) requestAnimationFrame(main);
}

function datetime_format(date = new Date()) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let timeText = `${("0"+hours).slice(-2)}${seconds%2==0?":":" "}${("0"+minutes).slice(-2)}`;
    let timeElem = document.getElementById("clock")
    timeElem.innerText = timeText;
    timeElem.classList.remove("force-tnum-comp");

    let month = date.getMonth() + 1;
    let day = date.getDate();
    let dayOfWeek = date.getDay();
    let dateText = `${("0"+month).slice(-2)}/${("0"+day).slice(-2)} ${['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][dayOfWeek]}`;
    let dateElem = document.getElementById("date")
    dateElem.innerText = dateText;
    dateElem.classList.remove("force-tnum-comp");
    
    changeForceTNum();
}

function init() {
    clock_elems = document.querySelectorAll("#clock");
    requestAnimationFrame(main);

    setTitle();
    setURLParametersToBodyClass();
    getStyleFromURLParameters();
}
window.addEventListener("load", init);



function setTitle() {
    let title = document.getElementById("title");
    let urlParams = new URLSearchParams(window.location.search+document.location.hash);
    let titleText = urlParams.get('title');
    if (titleText) {
        title.innerText = document.title = decodeURIComponent(titleText).trim();
    } else {
        title.innerText = document.title = "LIVE";
    }
}



function changeForceTNum() {
    const elems = document.querySelectorAll(".force-tnum:not(.force-tnum-comp)");

    elems.forEach(elem => {
        let text = elem.innerText;
        elem.innerHTML = [...text].map(v=>`<span class="force-tnum-chara ${[':',' ','/'].includes(v)?'chara-half':''}">${v}</span>`).join('');
        elem.classList.add("force-tnum-comp");
    });
}



function setURLParametersToBodyClass() {
    let urlParams = new URLSearchParams(window.location.search+document.location.hash);
    [...urlParams].forEach(([key, value]) => {
        let c = decodeURIComponent(`${key}`).trim().replace(/\s/g, '-');
        document.body.classList.add(c);
        let c2 = decodeURIComponent(`${key}-${value}`).trim().replace(/\s/g, '-');
        document.body.classList.add(c2);
    });
}

var do_realtime_refresh = true;

function getStyleFromURLParameters() {
    let urlParams = new URLSearchParams(window.location.search+document.location.hash);
    let style = document.getElementById("style_from_script");
    [...urlParams].forEach(([key, value]) => {
        key = decodeURIComponent(`${key}`).trim();
        value = decodeURIComponent(`${value}`).trim();

        let style_text = ``;

        switch (key) {
            case "no-refresh":
                do_realtime_refresh = false;
                break;
            case "font-size":
                style_text = `#main_container { font-size: ${value}; }`;
                break;
            case "font-family":
                style_text = `#main_container { font-family: ${value}; }`;
                break;
            case "main-color":
                style_text = `#main_container { --main-color: ${value}; --border-color: var(--main-color); }`;
                break;
            case "bg-color":
                style_text = `#main_container { --bg-color: ${value}; }`;
                break;
            case "bg-opacity":
                style_text = `#main_container { --bg-opacity: ${value}; }`;
                break;
            case "bg-margin":
                style_text = `#main_container { --bg-margin: ${value}; }`;
                break;
            case "bg-border-radius":
                style_text = `#main_container { --bg-border-radius: ${value}; }`;
                break;
            case "tnum-chara-width":
                style_text = `#main_container { --tnum-chara-width: ${value}; }`;
                break;
            case "title-letter-spacing":
                style_text = `#main_container { --title-letter-spacing: ${value}; }`;
                break;
        }

        if (style_text) {
            style.innerHTML += style_text + "\n";
        }
    });
}
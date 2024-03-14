const responseElem = document.querySelector(".offers__row");
const arrowTop = document.querySelector(".arrow_top");
const arrowBottom = document.querySelector(".arrow_bottom");

const url = "https://veryfast.io/t/front_test_api.php";

var xhr = new XMLHttpRequest();
xhr.open("GET", url, true);
xhr.onreadystatechange = callback;
xhr.send();

function callback() {
    if (xhr.readyState == 4 && xhr.status == 200) {
        var response = JSON.parse(xhr.responseText);
        response.result.elements.forEach(e => {
            responseElem.innerHTML += `
                <div class="offers__column d-flex justify-content-center">
                    <div class="item-offers d-flex flex-column justify-content-between align-items-center">
                        <div class="item-price d-flex flex-column justify-content-center align-items-center">
                            ${e.is_best ?
                            `<div class="item-price__additional__best fw-bold">Best Value</div>` :
                            e.price_key.indexOf('%') > -1 ?
                            `<div class="item-price__additional__sale"><div class="item-price__additional__value">50% </div> <div class=class="item-price__additional__text">OFF</div></div>` : ``}
                            <div class="item-actual-price d-flex align-items-end">
                                <div class="item-price__value fw-bold fs-2">$${e.amount}</div>
                                <div class="item-price__period fw-bold ">${e.name_display.indexOf('monthly') > -1 ? `/MD` : `/PER YEAR`}</div>
                            </div>
                            <div>
                                ${e.amount_html ? `<div class="item-price__previous crossed">${e.amount_html.replace(/<.+/g, '')}</div>` : ``}
                            </div>
                        </div>

                        <div class="item-description">
                            <div class="item-description__title">${e.name_display.replace(/ \d.+/g, '')}</div>
                            <div class="item-description__text fw-bold text-center">${e.name_display.replace(/.+Protection /g, '')}</div>
                        </div>

                        <div class="item-button">
                            <button class="item-button__handler text-white">DOWNLOAD</button>
                            <img class='btn__img' src="../images/upload.png" alt="upload" />
                        </div>

                        <div></div>
                    </div>
                </div>
            `
        });

        const downloadBtns = document.querySelectorAll(".item-button__handler");
        downloadBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                if (navigator.userAgent.includes("Chrome")) {
                    arrowTop.style.display = 'block'
                } else {
                    arrowBottom.style.display = 'block'
                }
            });
        });
    }
}




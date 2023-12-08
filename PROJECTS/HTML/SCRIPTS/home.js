function modifySearchBar(firstName) {
    const searchBar = document.getElementById("searchBar");
    
    if (!searchBar) {
        addErrorMessage("Search bar missing.");
        return;
    }

    searchBar.placeholder = `What would you like to do, ${firstName}?`;
}

function addErrorMessage(message) {
    console.log(message);
}

let userId = localStorage.getItem("user-id");
if (!userId) {
    window.location.href = "../signin.html";
}
userId = 12; // TODO: remove this once a valid API is used. The test API doesn't save all new users.

if (userId) {
    const URL = `https://reqres.in/api/users/${userId}`;
    const request = new XMLHttpRequest();
    request.open('GET', URL);
    request.onload = pageLoaded; 
    request.onerror = requestError;
    request.send();

    function pageLoaded() {
        if (request.status === 200) {
            const response = JSON.parse(request.response);
            firstName = response.data.first_name;
            modifySearchBar(firstName);
        }
    }

    function requestError() {
        console.log("Request failed");
    }
}

function createRow() {
    const row = document.createElement("div");
    row.classList.add("row");
    return row;
}

function createCard(cardInfo) {
   
    const card = document.createElement("div");
    card.classList.add("col-md-4");

    const innerDiv = document.createElement("div");
    innerDiv.classList.add("card");

    card.appendChild(innerDiv);

    const cardImageDiv = document.createElement("div");
    cardImageDiv.classList.add("card-image");

    const cardBodyDiv = document.createElement("div");
    cardBodyDiv.classList.add("card-body");

    innerDiv.appendChild(cardImageDiv);
    innerDiv.appendChild(cardBodyDiv);

    const img = document.createElement("img");
    img.classList.add("card-img-top");
    img.src = cardInfo.imageUrl;
    img.alt = cardInfo.imageDesc;

    cardImageDiv.appendChild(img);

    const h5 = document.createElement("h5");
    h5.classList.add("card-tittle");
    h5.innerText = cardInfo.title;

    const p = document.createElement("p");
    p.classList.add("card-text");
    p.innerText = cardInfo.text;

    const a = document.createElement("a");
    a.classList.add("btn", "btn-primary", "btn-grad-blue");
    a.href = cardInfo.url;
    a.innerText = "See more";

    cardBodyDiv.appendChild(h5);
    cardBodyDiv.appendChild(p);
    cardBodyDiv.appendChild(a);
    
    return card;
}

function initializeCardsSection(cardsInfoList) {
    const cardsSection = document.getElementById("cardsSection");

    const nRows = Math.ceil(cardsInfoList.length / 3);

    for (let rowIx = 0; rowIx < nRows; rowIx++) {
        const row = createRow();
        for (let cardIx = 0; cardIx < 3; cardIx++) {
            const cardIndex = rowIx * 3 + cardIx;
            if (cardIndex >= cardsInfoList.length) {
                break;
            }
            const card = createCard(cardsInfoList[cardIndex]);
            row.appendChild(card);
        }
        cardsSection.appendChild(row);
    }
}

cardsInfoList = [
    {
        "imageUrl": src = "IMAGES/allocation.png",
        "imageDesc": "Card image cap",
        "title": "BUDGETING",
        "text": "The Only Way to Plan and Prosper",
        "url": "budget.html"
    },
    {
        "imageUrl": "IMAGES/exchange-rate.png",
        "imageDesc": "Card image cap",
        "title": "CURRENCY CONVERTER",
        "text": "Navigate Our Exchange Rates with Ease.",
        "url": "currency.html"
    },
    {
        "imageUrl": "IMAGES/bill.png",
        "imageDesc": "Card image cap",
        "title": "BILL PAYMENT",
        "text": "Streamlined Bill Settlements.",
        "url": "bill.html"
    },
    {
        "imageUrl": "IMAGES/investment.png",
        "imageDesc": "Card image cap",
        "title": "INVESTMENTS",
        "text": "Grow Your Wealth Wisely.",
        "url": "#"
    }
    
]

initializeCardsSection(cardsInfoList);

function logout() {
    localStorage.removeItem("user-id");
    window.location.replace("signin.html");
}
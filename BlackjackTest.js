gameState = 0

function Name(card) {
    card = parseInt(card)
    if (card < 11 && card > 1) {
        return String(card)
    } else if (parseInt(card) == 11) {
        return "J"
    } else if (parseInt(card) == 12) {
        return "Q"  
    } else if (parseInt(card) == 13) {
        return "K"
    } else if (parseInt(card) == 1) {
        return "A"
    }
}

function Value(card) {
    card = parseInt(card)
    if (card > 10) {
        return 10
    } else if (card === 1) {
        return 11
    } else {
        return card
    }
}

function toggleButton(variable) {
    const button = document.getElementById(variable)
    button.disabled = !button.disabled;
}

let currentCards=[]

function Card() {
    let cardPath = "PNG/"
    let ft = ".png"
    let cards = ["1","2","3","4","5","6","7","8","9","10","11","12","13"]
    let suits = ["S","C","H","D"]

    let cardactual, suit, cardvalue

    do {
        let randomindex = Math.floor(Math.random() * cards.length)
        cardvalue = cards[randomindex]

        let randomnotindex = Math.floor(Math.random() * suits.length)
        suit = suits[randomnotindex]

        let name = Name(cardvalue)

        cardactual = name + suit
        
    } while (currentCards.includes(cardactual))

    currentCards.push(cardactual)
    let value = Value(cardvalue)

    cardPath += cardactual + ft

    return [cardPath, value]
    
}

let aceCounter = 0
let aceDealer = 0

function deal() {
    toggleButton("deal")
    toggleButton("hit")
    toggleButton("stay")

    const image2 = document.getElementById("card2");
    let [card1, value1] = Card()
    let [card2, value2] = Card()

    if (card1[4] == "A" || card2[4] == "A") {
        aceCounter ++;
    }

    document.getElementById("card1").src = card1
    document.getElementById("card2").src = card2

    if (aceCounter > 0 && (value1+value2) != 21){
        document.getElementById("p").innerHTML = `${value1 + value2}, ${(value1 + value2)-10}`
    } else {
        document.getElementById("p").innerHTML = value1 + value2
    }

    if (value1 + value2 == 21) {
        setTimeout(() => {stay()}, 500)
    }
    
// Player above, Dealer below

    let [dealer1, dealvalue1] = Card()

    if (dealer1[4] == "A") {
        aceDealer ++;
    }
    dealerCard1 = document.getElementById("dealerCard1")
    dealerCard1.src = dealer1
    dealerCard1.className = "card"
    dealerCard2=document.getElementById("dealerCard2")
    dealerCard2.src = "PNG/red_back.png"
    dealerCard2.className = "card"

    document.getElementById("test").innerHTML = dealvalue1


    const img1 = document.getElementById("card1");
    const img2 = document.getElementById("card2");

    img1.style.display = "flex";
    img2.style.display = "flex";
    dealerCard1.style.display = "flex";
    dealerCard2.style.display = "flex";

    img1.src = card1;
    img2.src = card2;

    img1.classList.remove("dealAnimation");
    img2.classList.remove("dealAnimation");
    void img1.offsetWidth;
    void img2.offsetWidth;
    img1.classList.add("dealAnimation");
    img2.classList.add("dealAnimation");

    dealerCard1.classList.remove("dealerAnimation");
    dealerCard2.classList.remove("dealerAnimation");
    void img1.offsetWidth;
    void img2.offsetWidth;
    dealerCard1.classList.add("dealerAnimation");
    dealerCard2.classList.add("dealerAnimation");


}

let counter = 3

function hit() {

    let cardDiv = document.getElementById("cardsDiv");
    let [newCard, newCardVal] = Card()
    let img = document.createElement("img");
    img.src = newCard;
    img.className = "card"
    img.id = "card" + counter
    cardDiv.appendChild(img);
    let total = document.getElementById("p").innerHTML;
    if (aceCounter > 0) {
        document.getElementById("p").innerHTML = `${parseInt(total) + newCardVal}, ${(parseInt(total) + newCardVal) - 10}`
    } else {
        document.getElementById("p").innerHTML = parseInt(total) + newCardVal
    }

    if (newCard[4] == "A") {
        aceCounter ++;
    }

// AUTO TILT -- BROKEN RN
    /*let rangeBottom = -15
    let rangeTop = 15
    
    let step = (rangeTop - rangeBottom) / (counter - 1)

    for (let i = 0; i < counter; i++) {
        let cardRotate = document.getElementById("card" + (i + 1));
        let rotate = rangeBottom + (i * step)
        let center = (counter - 1)/2;
        let centerDistance = 0
        if (i == 0 || i == (counter - 1)) {
            centerDistance = Math.abs(i-center) * 1.7;
        } else {
            centerDistance = Math.abs(i-center);
        }
        let lift = (center - centerDistance) * 5;
        cardRotate.style.transform = `rotate(${rotate}deg) translateY(${-lift}px)`;
    }*/
   
    counter ++;

    img.classList.add("dealAnimation")
    img.style.display = "flex";

    total = parseInt(document.getElementById("p").innerHTML);
    if (total > 21 && aceCounter > 0) {
        document.getElementById("p").innerHTML = total -= 10
        aceCounter--;
    }else if (total > 21){
        let container = document.getElementById("cardsDiv")
        let children = container.querySelectorAll("*")
        document.getElementById("result").innerHTML = "lose"
        setTimeout(() => {
            children.forEach(el => el.classList.add("loseBorder"))
            gameState = 1
            toggleButton("hit")
            toggleButton("stay")
            toggleButton("deal")
        }, 1000)
        /*setTimeout(() => {
        window.location.href = "you-lose.html"
        }, 1500)*/
    }else if (total == 21){
        setTimeout(() => {stay()}, 500)
    }
}


let dealCounter = 3

function stay() {
    toggleButton("hit")
    toggleButton("stay")
    let [dealer2, dealvalue2] = Card()

    if (dealer2[4] == "A") {
        aceDealer ++;
    }

    document.getElementById("dealerCard2").src = dealer2
    let dealertotal = parseInt(document.getElementById("test").innerHTML)
    document.getElementById("test").innerHTML = dealertotal + dealvalue2
    
    dealerLogic()

}

function dealerLogic() {
    let container = document.getElementById("cardsDiv")
    let children = container.querySelectorAll("*")

    let total = parseInt(document.getElementById("p").innerHTML);
    let dealertotal = parseInt(document.getElementById("test").innerHTML);

    if (dealertotal < 17) {
        let dealerDiv = document.getElementById("dealerDiv");
        let [newdeal, dealvalue] = Card();

        if (newdeal[4] === "A") {
            aceDealer++;
        }

        let newDealCard = document.createElement("img");
        newDealCard.src = newdeal;
        newDealCard.className = "card";
        newDealCard.id = "Card" + dealCounter;
        newDealCard.classList.add("dealerAnimation")
        newDealCard.style.display = "flex";

        setTimeout(() => {
            dealerDiv.appendChild(newDealCard);
            dealertotal = parseInt(document.getElementById("test").innerHTML);
            dealertotal += dealvalue;
            if (dealertotal > 21 && aceDealer > 0) {
                dealertotal -= 10;
                aceDealer--;
            }

            document.getElementById("test").innerHTML = dealertotal
            setTimeout(() => { dealerLogic(); }, 1000);
        }, 1300);

        dealCounter++;
    } else {
        if (dealertotal > 21 && aceDealer > 0) {
            dealertotal -= 10;
            aceDealer--;
            document.getElementById("test").innerHTML = dealertotal;
            setTimeout(() => { dealerLogic(); }, 1000);
        } else if (dealertotal > 21) {
            document.getElementById("result").innerHTML = "dealer bust"
            gameState = 1
            setTimeout(() => {
                children.forEach(el => el.classList.add("winBorder"))
                toggleButton("deal")
            },300)
            
        } else if (dealertotal < 22 && total > dealertotal) {
            document.getElementById("result").innerHTML = "win"
            gameState = 1
            setTimeout(() => {
                children.forEach(el => el.classList.add("winBorder"))
                toggleButton("deal")
            },300)
            
        } else if (dealertotal < 22 && total < dealertotal) {
            document.getElementById("result").innerHTML = "lose"
            gameState = 1
            setTimeout(() => {
                children.forEach(el => el.classList.add("loseBorder"))
                toggleButton("deal")
            },300)
            
        } else if (dealertotal === total) {
            document.getElementById("result").innerHTML = "push"
            gameState = 1
            setTimeout(() => {
                children.forEach(el => el.classList.add("pushBorder"))
                toggleButton("deal")
            },300)
            
        }
    }
}


function dealButton() {
    if (gameState == 0) {
        deal()
    } else {
        clearGame()
        document.getElementById("deal").disabled = true;
        setTimeout(() => {
            resetGameState()
        }, 1200);
        setTimeout(() => {
            deal()
        },1600);
    }
}

function clearGame() {
    let container1 = document.getElementById("cardsDiv")
    let children1 = container1.querySelectorAll("*")
    let container2 = document.getElementById("dealerDiv")
    let children2 = container2.querySelectorAll("*")

    children1.forEach(el => {
        el.classList.remove("winBorder", "loseBorder", "pushBorder")
        el.classList.add("fadeAnim")
});
    children2.forEach(el => {
        el.classList.add("fadeAnim")
});
    
}

function resetGameState() {
    currentCards = [];
    aceCounter = 0;
    aceDealer = 0;
    counter = 3;
    dealCounter = 3;
    gameState = 0;
    
    // Hide all cards and remove dynamically created ones
    const allCards = document.querySelectorAll('.card');
    allCards.forEach(card => {
        card.style.display = 'none';
        card.className = 'card'; // Remove all animation classes
        if (parseInt(card.id.replace(/\D/g, '')) > 2) {
            card.remove(); // Remove dynamically created cards
        }
    });
    
    // Reset scores
    document.getElementById("p").innerHTML = "Player Score";
    document.getElementById("test").innerHTML = "Dealer Score";
    document.getElementById("result").innerHTML = "RESULT";
    
    // Reset buttons
    document.getElementById("deal").disabled = false;
    document.getElementById("hit").disabled = true;
    document.getElementById("stay").disabled = true;
}
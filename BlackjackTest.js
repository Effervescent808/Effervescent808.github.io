let playerName=''
let balance = 0;

let dealbutton = document.getElementById("deal")
let hitbutton = document.getElementById("hit")
let staybutton = document.getElementById("stay")
let doublebutton = document.getElementById("doubleDown")
let splitbutton = document.getElementById("split")
let submitbutton = document.getElementById("submit")
let betamount = document.getElementById("betAmount")
let allInButton = document.getElementById("allIn")

playerName = sessionStorage.getItem("Current Player");
if (!playerName) {
    alert("No player logged in — redirecting to login page.");
    window.location.href = "login.html";
}
balance = parseInt(localStorage.getItem(playerName)) || 0;
document.getElementById("player").textContent = `Player: ${playerName}`;
document.getElementById("balance").textContent = `Balance: ${balance}`;

let gameState = 0

let newBalance = 0
let bet = 0

const form = document.getElementById("bet_submit")

form.onsubmit = function(event) {
    event.preventDefault();
    handleSubmit();
  }

function handleSubmit() {
    bet = 0
    let betInput = document.getElementById("betAmount").value
    bet = parseInt(betInput)
    if (isNaN(bet) || bet<= 0 || bet>balance) {
        alert("Please place a valid bet");
        return;
    }
    submitbutton.disabled = true;
    dealbutton.disabled = false;
    allInButton.disabled = true;
    console.log(bet);
    newBalance = balance - bet;
    document.getElementById('balance').innerHTML = `Balance: ${newBalance}`;
    betamount.disabled = true;
}

function allIn() {
    document.getElementById("betAmount").value = `${balance}`;
    setTimeout(() => {handleSubmit()},300);
}

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
let offRip21 = false

function deal() {
    dealbutton.disabled = true
    hitbutton.disabled = false
    staybutton.disabled = false
    doublebutton.disabled = false

    const image2 = document.getElementById("card2");
    let [card1, value1] = Card()
    let [card2, value2] = Card()

    if (card1[4] == "A") {
        aceCounter ++;
    } else if(card2[4] == "A") {
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
        offRip21 = true
        setTimeout(() => {stay()}, 500)
    }
    
// Player above, Dealer below

    let [dealer1, dealvalue1] = Card()

    if (dealer1[4] == "A") {
        aceDealer ++;
    }
    let dealerCard1 = document.getElementById("dealerCard1")
    dealerCard1.src = dealer1
    dealerCard1.className = "card"
    let dealerCard2=document.getElementById("dealerCard2")
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
    doublebutton.disabled = true;
    splitbutton.disabled - true;
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

// AUTO TILT -- BROKEN RN -- Works after hand ends? probably smth with the card class
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
        localStorage.setItem(playerName, newBalance)
        document.getElementById("resultInt").innerHTML = `-${bet}`;
        document.getElementById("resultInt").style.color = "red";
        balance = parseInt(localStorage.getItem(playerName)) || 0;
        document.getElementById("balance").textContent = `Balance: ${balance}`;
        setTimeout(() => {
            children.forEach(el => el.classList.add("loseBorder"))
            gameState = 1
            hitbutton.disabled = true
            staybutton.disabled = true

            betamount.disabled = false
            submitbutton.disabled = false
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
    hitbutton.disabled = true
    staybutton.disabled = true
    doublebutton.disabled = true

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
            gameState = 1
            if (offRip21 == true) {
                localStorage.setItem(playerName, (newBalance + (bet*2.5)));
                document.getElementById("resultInt").innerHTML = `${bet*1.5}`;
                document.getElementById("resultInt").style.color = "green";
            } else {
                localStorage.setItem(playerName, (newBalance + (bet*2)));
                document.getElementById("resultInt").innerHTML = `${bet}`;
                document.getElementById("resultInt").style.color = "green";
            }
            balance = parseInt(localStorage.getItem(playerName)) || 0;
            document.getElementById("balance").textContent = `Balance: ${balance}`;
            setTimeout(() => {
                children.forEach(el => el.classList.add("winBorder"))
                betamount.disabled = false
                submitbutton.disabled = false
            },300)
            
        } else if (dealertotal < 22 && total > dealertotal) {
            gameState = 1
            if (offRip21 == true) {
                localStorage.setItem(playerName, (newBalance + (bet*2.5)));
                document.getElementById("resultInt").innerHTML = `${bet*1.5}`;
                document.getElementById("resultInt").style.color = "green";   
            } else {
                localStorage.setItem(playerName, (newBalance + (bet*2)));
                document.getElementById("resultInt").innerHTML = `${bet}`;
                document.getElementById("resultInt").style.color = "green";
            }
            balance = parseInt(localStorage.getItem(playerName)) || 0;
            document.getElementById("balance").textContent = `Balance: ${balance}`;
            setTimeout(() => {
                children.forEach(el => el.classList.add("winBorder"));
                betamount.disabled = false
                submitbutton.disabled = false
            },300)
            
        } else if (dealertotal < 22 && total < dealertotal) {
            gameState = 1
            localStorage.setItem(playerName, newBalance)
            document.getElementById("resultInt").innerHTML = `-${bet}`;
            document.getElementById("resultInt").style.color = "red";
            balance = parseInt(localStorage.getItem(playerName)) || 0;
            document.getElementById("balance").textContent = `Balance: ${balance}`;
            setTimeout(() => {
                children.forEach(el => el.classList.add("loseBorder"));
                betamount.disabled = false
                submitbutton.disabled = false
            },300)
            
        } else if (dealertotal === total) {
            gameState = 1
            document.getElementById("balance").textContent = `Balance: ${balance}`;
            document.getElementById("resultInt").innerHTML = 0;
            document.getElementById("resultInt").style.color = "yellow";
            setTimeout(() => {
                children.forEach(el => el.classList.add("pushBorder"));
                betamount.disabled = false
                submitbutton.disabled = false
            },300)
            
        }
    }
}

function doubleDown() {
    if (balance < bet *2)
        alert("Insuficient Funds")
    else { 
        newBalance -= bet;
        bet = bet * 2;
        document.getElementById('balance').innerHTML = `Balance: ${newBalance}`;
        
        hit();
        
        setTimeout(() => {
            if (gameState === 0) { 
                stay();
            }
        }, 1200);
    }
}

/* 

HOW TO MAKE SPLIT:

1. Figure out how to split "card1" and "card2"
    - translateX()?
    - create 2 divs?
    - increase margin on .card then create a new class for the split cards?

2. Figure out how to hit once per side of the split
    - Use splitTrue as split toggle and send score to one side at a time

3. Figure out how to split the Player Score bubble into 2
    - Animation?
    - Create a second bubble and have it start in the same spot

4. Research Logic for win/loss/tie with splits
    - Implement said logic

*/

let splitTrue = false;

function split() {
    splitTrue = true;

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
    offRip21 = false;
    currentCards = [];


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
    
    // Reset buttons
    document.getElementById("deal").disabled = true;
    document.getElementById("hit").disabled = true;
    document.getElementById("stay").disabled = true;
    allInButton.disabled = false;
}
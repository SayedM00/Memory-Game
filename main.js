document.querySelector(".game-start span").onclick = function () {
    let userName = prompt("Please Enter Your Name.");
    userName == null || userName == "" || userName == " " ? document.querySelector(".player .info span").textContent = "Funny Guy" : document.querySelector(".player .info span").textContent = userName;
    document.querySelector(".game-start span").parentElement.remove();
}

let blcokContainer = document.querySelector(".memory-game-block");
let myCards = document.querySelectorAll(".memory-game-block .card");
let rangeArray = [...Array(myCards.length).keys()]
let players = [];

function randomArray(array) {
    let current = array.length,
    stash,
    random;
    while (current > 0) {
        random = Math.floor(Math.random() * current); 
        current--;
        stash = array[current];
        array[current] = array[random];
        array[random] = stash
    }
    return array
}

randomArray(rangeArray)

myCards.forEach((ele, index) => {
    ele.style.order = rangeArray[index];
    ele.onclick = function () {
        addFliped(ele)
    }
})

function addFliped(eleFliped) {
    eleFliped.classList.add("is-filped");

    let allFlipped = Array.from(myCards).filter((ele) => {
        return ele.classList.contains("is-filped")
    })

    if (allFlipped.length === 2) {
        stopPointer()
        chechMatches(allFlipped[0], allFlipped[1]) 
    }

}

function stopPointer() {
    blcokContainer.classList.add("no-pointer") 
    setTimeout(()=> {
        blcokContainer.classList.remove("no-pointer")

    }, 1000)
    
}


function chechMatches(first, second) {
    if(first.getAttribute("data-social") === second.getAttribute("data-social")) {
        first.classList.remove("is-filped");
        second.classList.remove("is-filped");

        first.classList.add("is-matched");
        second.classList.add("is-matched");
    } else {
        document.querySelector(".tries span").innerHTML = parseInt(document.querySelector(".tries span").innerHTML) + 1
        setTimeout(function () {
            first.classList.remove("is-filped");
            second.classList.remove("is-filped");
        }, 1000)
    }
}

window.onmouseover = function() {
    let count = Array.from(myCards).filter((ele) => {
        return ele.classList.contains("is-matched")
    })
    if (count.length == myCards.length) {
        document.querySelector(".game-done").style.cssText = "display:flex; justify-content:center; align-items:center";
        document.querySelector(".game-done button").addEventListener("click", function () {
            window.location.reload()
        })
        
        let user = {
            name : document.querySelector(".player .info span").innerHTML,
            score : document.querySelector(".player .tries span").innerHTML
        }
        players.push(user);
        localStorage.setItem("players",JSON.stringify(players));
    }
}

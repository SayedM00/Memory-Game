document.querySelector(".game-start span").onclick = function () {
    let userName = prompt("Please Enter Your Name.");
    userName == null || userName == "" || userName == " " ? document.querySelector(".player .info span").textContent = "Funny Guy" : document.querySelector(".player .info span").textContent = userName;
    document.querySelector(".game-start span").parentElement.remove();
}
let blcokContainer = document.querySelector(".memory-game-block");
let myCards = document.querySelectorAll(".memory-game-block .card");
let rangeArray = [...Array(myCards.length).keys()]

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

        first.classList.add("is-filped");
        second.classList.add("is-matched");
    } else {
        setTimeout(function () {
            first.classList.remove("is-filped");
            second.classList.remove("is-filped");
        }, 1000)
    }
}

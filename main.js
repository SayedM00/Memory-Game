document.querySelector(".game-start span").onclick = function () {
    let userName = prompt("Please Enter Your Name.");
    userName == null || userName == "" || userName == " " ? document.querySelector(".player .info span").textContent = "Funny Guy" : document.querySelector(".player .info span").textContent = userName;
    document.querySelector(".game-start span").parentElement.remove();
}

let rangeArray = [...Array(document.querySelectorAll(".memory-game-block .card").length).keys()]

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

document.querySelectorAll(".memory-game-block .card").forEach((ele, index) => {
    ele.style.order = rangeArray[index];
    ele.addEventListener("click", function(e) {
        if(e.target.classList.contains("is-filped")) {
            e.target.classList.add("is-filped")
        } else {
            e.target.classList.add("is-filped")
        }
    })
})


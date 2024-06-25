const quoteText = document.querySelector(".quote"),
    authorName = document.querySelector(".author span"),
    quoteBtn = document.getElementById("newQuoteBtn"), // Updated selector
    soundBtn = document.querySelector(".sound"),
    copyBtn = document.querySelector(".copy"),
    twitterBtn = document.querySelector(".twitter");

function randomQuote() {
    quoteBtn.classList.add("Loading");
    quoteBtn.innerText = "Loading Quote..!";

    fetch("https://api.quotable.io/random")
        .then(res => res.json())
        .then(result => {
            console.log(result);
            quoteText.innerText = result.content;
            authorName.innerText = "-- " + result.author;
        })
        .catch(error => {
            console.error("Error fetching quote:", error);
        })
        .finally(() => {
            quoteBtn.classList.remove("Loading");
            quoteBtn.innerText = "New Quote";
        });
}

soundBtn.addEventListener("click" , ()=>{
    let utterance = new SpeechSynthesisUtterance(`${quoteText.innerText}`);
    speechSynthesis.speak(utterance);
});
copyBtn.addEventListener("click", ()=>{
    navigator.clipboard.writeText(quoteText.innerText);
})
twitterBtn.addEventListener("click", ()=>{
    let tweetUrl = `https://twitter.com/intent/tweet?text=${quoteText.innerText}`;
    window.open(tweetUrl,"_blank")
});


quoteBtn.addEventListener("click", randomQuote);

const button = document.querySelector(".btn__admin__add");
const inputImg = document.querySelector('.admin__add-img');
const inputTitle = document.querySelector('.admin__add-title');
const inputText = document.querySelector('.admin__add-text');

async function newNews(img, title, text) {
    const form = document.querySelector("form");
    const formData = new FormData(form);
    await fetch("http://localhost:5173/news/", {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
            img,
            title,
            text
        })
    })
    .then(res => res.json())
    .then(data => console.log(data));
}

button.addEventListener("submit", (e) => {
    e.preventDefault();
    newNews(inputImg.value, inputTitle.value, inputText.value);
})
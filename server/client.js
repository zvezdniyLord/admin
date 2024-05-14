document.addEventListener("DOMContentLoaded", () => {
    res();
})
const btn = document.querySelector("button");
async function res() {
    const response = await fetch('http://127.0.0.1:3000/api/news', );
if(response.ok) {
    const result = await response.json()
    .then(data => setData(data));
} else {
    console.log(`response ne ok`);
}
}

const setData = data => {
    data.map(d => {
        document.querySelector(".news__blocks").insertAdjacentHTML("afterbegin", `
        <div class="news-hover">
        <div class="news__block">
            <picture>
                <img loading="lazy" class="news__block-image" src="./media/Innoprom_2023.png" alt="баннер">
            </picture>
            <h3 class="news__block-title">${d.title}</h3>
            <p class="news__block-text" style="margin-top: 0.7rem">${d.text}</p>
            <p class="news__block-text"></p>
        </div>
    </div>
        `)
    });
};




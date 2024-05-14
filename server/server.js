const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3001 || process.env.PORT;
const pg = require('./database');
app.use(express.json());
app.use(cors());


app.get("/news", async (req, res) => {
    const news = await pg.query("SELECT * FROM news");
    console.log(news);
    res.json(news.rows);
});

app.post("/news", async (req, res) => {
    const {img, title, text} = req.body;
    const createNews = await pg.query(`INSERT INTO news (img, title, text) VALUES ($1, $2, $3)`, [img, title, text], (err, results) => {
        if(err) {
            throw err;
        }
    res.send(createNews);
    });

});

app.put('/news/:id', async(req, res) => {
    const id = req.params.id;
    const {img, title, text} = req.body;
    const updateNews = await pg.query('UPDATE news set img = $1, title = $2, text = $3 WHERE id = $4', [img, title, text, id]);
    res.json(updateNews.rows);
});

app.delete("/news/:id", async(req, res) => {
    const id = req.params.id;
    const deleteNews = await pg.query("DELETE FROM news WHERE id = $1", [id]);
    if(!deleteNews) {
        throw new Error("not news");
    }
    res.json(deleteNews);
})


app.listen(PORT, () => console.log(`work:${PORT}`));

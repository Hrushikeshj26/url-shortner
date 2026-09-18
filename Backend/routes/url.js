const express = require("express");
const router = express.Router();
const shortid = require("shortid");
const Url = require("../models/Url");

router.post("/shorten", async (req, res) => {
  const { longUrl } = req.body;
  const baseUrl = process.env.BASE_URL;

  if (!baseUrl) return res.status(500).json("Server error: BASE_URL missing");

  const urlCode = shortid.generate();

  try {
    let url = await Url.findOne({ longUrl });

    if (url) {
      res.json(url);
    } else {
      const shortUrl = `${baseUrl}/${urlCode}`;

      url = new Url({
        longUrl,
        shortUrl,
        urlCode,
        date: new Date(),
      });

      await url.save();
      res.json(url);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json("Server error");
  }
});

module.exports = router;

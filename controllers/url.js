// Importing modules
const uniqId = require("uniqid");

const Url = require("../models/Url");

const isValidUrl = /^(https?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
const hasHttp = /^(https?:\/\/.)(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

exports.getIndex = (req, res, next) => {
  res.render("index", {
    pageTitle: "Free URL Shortener"
  });
};

exports.getKey = async (req, res, next) => {
  const { key } = req.params;
  try {
    const longUrl = await Url.findOne({ key });
    if (!longUrl) return res.redirect("/");
    res.redirect(longUrl.url);
  } catch (error) {
    console.log(error);
    res.render("index", {
      pageTitle: "Free URL Shortener",
      error: `Sorry! Can not find http://${req.get("host")}/${key}`
    });
  }
};

exports.postNew = async (req, res, next) => {
  try {
    let { longUrl } = req.body;
    if (isValidUrl.test(longUrl)) {
      if (!hasHttp.test(longUrl)) {
        longUrl = "http://" + longUrl;
      }
      const newUrl = new Url({
        url: longUrl,
        key: uniqId()
      });
      await newUrl.save();
      res.render("index", {
        pageTitle: "Free URL Shortener",
        key: newUrl.key,
        host: req.get("host"),
        success: "See, That's so easy!"
      });
    } else {
      res.render("index", {
        pageTitle: "Free URL Shortener",
        error: "That's incorrect URL!"
      });
    }
  } catch (error) {
    console.log(error);

    res.redirect("/");
  }
};

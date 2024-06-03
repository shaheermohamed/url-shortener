const ShortUniqueId = require("short-unique-id");
const Url = require("../model/urlSchema");
const uid = new ShortUniqueId({ length: 10 });
const urlCreation = async (req, res) => {
  const { originalUrl } = req.body;
  const urlCode = uid.rnd();
  const shortUrl = `${req.protocol}://${req.get("host")}/api/${urlCode}`;

  const newUrl = new Url({
    originalUrl,
    shortUrl,
    urlCode,
  });

  await newUrl.save();
  res.json(newUrl);
};

const getUrl = async (req, res) => {
  const { urlCode } = req.params;
  //   console.log(res)
  const url = await Url.findOne({ urlCode });
  if (url) {
    return res.redirect(url.originalUrl);
  } else {
    return res.status(404).json({ error: "Url not found" });
  }
};

module.exports = { urlCreation, getUrl };

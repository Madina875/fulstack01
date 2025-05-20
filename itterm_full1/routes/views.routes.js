const { createViewPage } = require("../helpers/create_view.page");
const Author = require("../schemas/Author");
const Dict = require("../schemas/Dict");
const Topic = require("../schemas/Topic"); //mongodb dagi malumotlar sxemasi

const router = require("express").Router(); //marshrut
/*
responce - bu "template ni och va uni foydalanuvchiga ko‘rsat" degani.
res — bu javob (response) obyektidir.
Express'da foydalanuvchiga ma'lumot jo‘natish uchun ishlatiladi.

res.render(<name>) — faylini topib, uni HTML qilib brauzerga jo‘natadi
*/

router.get("/", (req, res) => {
  res.render(createViewPage("index"), {
    title: "Asosiy sahifa", //sahifada chiquvchi so'z
    isHome: true,
  });
});

router.get("/authors", async (req, res) => {
  let authors = await Author.find();
  res.render(createViewPage("authors"), {
    title: "Mualliflar sahifasi",
    isAuthor: true,
    authors,
  });
});

router.get("/dictionary", async (req, res) => {
  let dictionary = await Dict.find().lean();
  res.render(createViewPage("dictionary"), {
    title: "lug'atlat sahifasi",
    isTopic: true,
    dictionary,
  });
});

router.get("/topics", async (req, res) => {
  let topics = await Topic.find().lean();
  res.render(createViewPage("topics"), {
    title: "Mavzular sahifasi",
    isTopic: true,
    topics,
  });
});

router.get("/login", (req, res) => {
  res.render(createViewPage("login"), {
    title: "Login",
    isLogin: true,
  });
});

module.exports = router;

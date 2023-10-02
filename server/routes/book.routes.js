const express = require("express");
const router = express.Router();

const bookController = require("../controllers/book.controller");

router.post("/", bookController.saveBook);
router.put("/:id", bookController.updateBook);
router.get("/", bookController.fetchBooks);

module.exports = router;

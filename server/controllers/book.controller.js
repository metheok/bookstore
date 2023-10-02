const Book = require("../models/book");

// code to validate incoming book data
const validateBookData = (data) => {
  const genres = ["fiction", "novel", "nonfiction", "poetry", "other"];
  var errors = [];
  var bookData = {};
  if (!data.name || typeof data.name !== "string") {
    errors.push("name error");
  } else {
    bookData.name = data.name;
  }
  if (!data.author || typeof data.author !== "string") {
    errors.push("author error");
  } else {
    bookData.author = data.author;
  }
  if (
    !data.genre ||
    typeof data.genre !== "string" ||
    !genres.includes(data.genre)
  ) {
    errors.push("genre error");
  } else {
    bookData.genre = data.genre;
  }
  if (!typeof data.quantity === "number") {
    bookData.quantity = 0;
  } else {
    bookData.quantity = data.quantity;
  }
  return [data, errors];
};

class CompanyController {
  fetchBooks = async (req, res, next) => {
    try {
      const { category, page, limit, sortBy } = req.query;
      const filter = category ? { category } : {};
      const skip = page ? (parseInt(page) - 1) * parseInt(limit) : 0;
      const sort = sortBy ? { [sortBy]: 1 } : {};
      const books = await Book.find(filter)
        .skip(skip)
        .limit(parseInt(limit))
        .sort(sort);
      res.json({
        books,
        count: books.length,
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  saveBook = async (req, res, next) => {
    try {
      const { data } = req.body;
      if (!data) {
        return res.status(400).json({ error: "Data is required" });
      }
      const [validatedData, err] = validateBookData(data);
      if (err && err.length > 0) {
        return res.status(400).json({ error: err });
      }

      // Create a new company
      const bookData = {
        ...validatedData,
        updatedAt: new Date(),
      };
      const book = new Book(bookData);

      await book.save();
      res.status(201).json({
        book: {
          ...book.toJSON(),
        },
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  updateBook = async (req, res, next) => {
    const { data } = req.body;
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "Id is required" });
    }
    if (!data) {
      return res.status(400).json({ error: "Data is required" });
    }
    const [validatedData, err] = validateBookData(data);
    if (err && err.length > 0) {
      return res.status(400).json({ error: err });
    }

    try {
      const updatedBook = await Book.findByIdAndUpdate(
        id,
        { ...validatedData, updatedAt: new Date() },
        {
          new: true,
        }
      );

      if (!updatedBook) {
        return res.status(404).json({ error: "Book not found" });
      }

      res.status(201).json({
        book: updatedBook,
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Internal server error" });
    }
  };
}

module.exports = new CompanyController();

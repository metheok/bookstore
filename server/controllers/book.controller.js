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
  fetchABook = async (req, res, next) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ error: "Id is required" });
      }
      const book = await Book.findOne({ _id: id });
      if (!book) {
        return res.status(404).json({ error: "Book not found" });
      }
      res.json({
        data: book,
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  fetchBooks = async (req, res, next) => {
    try {
      const { genre, page, sortBy, query } = req.query;
      let filter = genre && genre !== "null" ? { genre } : {};
      const skip =
        page && page !== "null" ? (parseInt(page) - 1) * parseInt(10) : 0;
      if (query && query !== "null") {
        filter = { ...filter, name: { $regex: query, $options: "i" } };
      }
      const sort =
        sortBy && sortBy !== "null" ? { [sortBy]: -1 } : { updatedAt: -1 };
      const count = await Book.countDocuments(filter);
      const books = await Book.find(filter)
        .skip(skip)
        .limit(parseInt(10))
        .sort(sort);

      res.json({
        data: books,
        count: books.length,
        totalPages: Math.ceil(count / parseInt(10)),
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
        createdAt: new Date(),
      };
      const book = new Book(bookData);

      await book.save();
      res.status(201).json({
        data: {
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
        data: updatedBook,
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Internal server error" });
    }
  };
}

module.exports = new CompanyController();

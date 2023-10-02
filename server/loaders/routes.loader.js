/* Routes */
const bookRouter = require("../routes/book.routes");


class RoutesLoader {
  static initRoutes(app) {
    app.use(`/application-test-v1.1/books`, bookRouter);

    app.use("/", async (req, res) => {
      res.status(404).send("No such route found in the API.");
    });
  }
}

module.exports = { RoutesLoader };

require("dotenv").config();

const express = require("express");
const schema = require("./GraphQL/Schema");
const mongoose = require("mongoose");

const { createHandler } = require("graphql-http/lib/use/express");
const authenticate = require("./middlewares/auth.middleware");

const app = express();
app.use(express.json());
app.use(authenticate);

const formatError = (err) => {
  if (!err.originalError) {
    return err;
  } else {
    const data = err.originalError.data;
    const code = err.originalError.code;
    const message = err.message;
    return {
      message,
      code,
      data,
    };
  }
};

app.get("/", (req, res, next) => {
  res.status(200).send("Welcome to Product API");
});
app.use("/graphql", (req, res) => {
  return createHandler({
    schema,
    formatError,
    context: () => ({ req }),
  })(req, res);
});

mongoose.set("debug", function (collectionName, method, query, doc) {
  console.log(
    `Mongoose: ${collectionName}.${method}(${JSON.stringify(query)}, ${JSON.stringify(doc)})`,
  );
});

const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.DATABASE_CONNECTION_STRING)
  .then(async () => {
    console.log("Database connected");
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  })
  .catch((err) => {
    console.log(`DB Error: ${err}`);
  });

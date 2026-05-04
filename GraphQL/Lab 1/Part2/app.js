const express = require("express");
const cors = require("cors");
const { Schema } = require("./GraphQL/Schema");

const { createHandler } = require("graphql-http/lib/use/express");
const app = express();
app.use(cors());

app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});
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
app.all(
  "/graphql",
  createHandler({
    schema: Schema,
    formatError,
  }),
);
app.get("/", (req, res) => {
  res.send("Welcome to Product API");
});
app.listen(3000, () => console.log("Server started on port 3000"));

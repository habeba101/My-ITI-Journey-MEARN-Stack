const express = require("express");

const { graphqlHTTP } = require("express-graphql");
const graphqlSchema = require("./graphql/schema");
const graphqlResolver = require("./graphql/resolver");

const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    graphiql: true,
    formatError(err) {
      if (!err.originalError) {
        return err;
      } else {
        let originalError = err.originalError;
        return {
          message: originalError.message,
          code: originalError.code,
          data: originalError.data,
        };
      }
    },
  }),
);

app.get("/", (req, res) => {
  res.send("Welcome to my api");
});

app.listen(3000, () => console.log("Server started on port 3000"));

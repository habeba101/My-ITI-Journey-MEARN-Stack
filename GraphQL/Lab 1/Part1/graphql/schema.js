const { buildSchema } = require("graphql");
module.exports = buildSchema(`
  type product {
    id:ID
    name: String,
    price: Int
    categoryId: ID
  }
  input productDto {
    id: ID
    name: String,
    price: Int
    categoryId: ID
  }
  input bookbyId{
   id: ID
  }

  type RootQuery{
    GetProductbyId(filter: bookbyId) :[product]
    GetProducts: [product]
  }
  type RootMutation {
        createProduct(productInput:productDto ): product!
        updateProduct(productInput:productDto ): product!
    }
    
    schema {
        query: RootQuery
        mutation: RootMutation
    }
  `);

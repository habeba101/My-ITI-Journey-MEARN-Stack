const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLNonNull,
} = require("graphql");

const { products } = require("../Data");
const ProductSchema = require("../Schemas/Product.Schema");

let productData = products;
//=============Product=============
const product = new GraphQLObjectType({
  name: "Products",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    price: { type: GraphQLInt },
    categoryId: { type: GraphQLID },
  }),
});
//============= New Product =============

const productDto = new GraphQLInputObjectType({
  name: "productDto",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    price: { type: GraphQLInt },
    categoryId: { type: GraphQLID },
  }),
});
//============= Id to filter =============

const BookById = new GraphQLInputObjectType({
  name: "getProduct",
  fields: () => ({
    id: { type: GraphQLID },
  }),
});
//=============Root Query =============
// we use it to get Data
const RootQuery = new GraphQLObjectType({
  name: "ProductQuery",
  fields: () => ({
    GetProductbyId: {
      type: new GraphQLList(product),
      args: {
        filter: { type: BookById },
      },
      resolve(_, { filter }) {
        console.log(filter);
        let bookData = productData.filter((elm) => {
          return String(elm.id) === String(filter.id);
        });
        console.log({ bookData });
        return bookData;
      },
    },
    GetProducts: {
      type: new GraphQLList(product),
      args: {},
      async resolve() {
        return productData;
      },
    },
  }),
});

const RootMutation = new GraphQLObjectType({
  name: "RootMutation",
  fields: () => ({
    createProduct: {
      type: product,
      args: {
        productInput: { type: new GraphQLNonNull(productDto) },
      },
      async resolve(_, { productInput }) {
        const { error, value } = ProductSchema.validate(productInput);
        if (error) {
          // throw new Error(error);
          const customError = new Error("Error validating the Products schema");
          customError.code = 400; // Status Code 400 Bad Request
          customError.data = error;
          throw customError;
        }

        const { id, name, price, categoryId } = value;
        productData.push({ id, name, price, categoryId });
        return { id, name, price, categoryId };
      },
    },
    updateProduct: {
      type: product,
      args: {
        productInput: { type: new GraphQLNonNull(productDto) },
      },
      async resolve(_, { productInput }) {
        const { error, value } = ProductSchema.validate({ ...productInput });
        if (error) {
          // throw new Error(error);
          const customError = new Error("Error validating the Products schema");
          customError.code = 400; // Status Code 400 Bad Request
          customError.data = error;
          throw customError;
        }

        const { id, name, price, categoryId } = value;

        productData = productData.map((elm) => {
          if (String(elm.id) === String(id)) {
            elm.name = name;
            elm.categoryId = Number(categoryId);
            elm.price = price;
          }
          console.log(elm);
          return elm;
        });

        let updatedValue = productData.find((elm) => {
          return String(elm.id) === String(id);
        });
        console.log("Updated Value", updatedValue);
        return updatedValue;
      },
    },
  }),
});

module.exports.Schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});

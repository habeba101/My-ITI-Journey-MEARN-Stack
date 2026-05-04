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
const { AuthPayload, UserType } = require("./user.type");
const jwt = require("jsonwebtoken");
const { products } = require("../Data");
const ProductSchema = require("../Schemas/Product.Schema");
const { Schema } = require("mongoose");
const User = require("../model/user");
const Product = require("../model/product");
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

const productById = new GraphQLInputObjectType({
  name: "getProduct",
  fields: () => ({
    id: { type: GraphQLID },
  }),
});
//============= min price to filter =============

const productByPrice = new GraphQLInputObjectType({
  name: "getProductbyminprice",
  fields: () => ({
    price: { type: GraphQLInt },
  }),
});
//============= category to filter =============
const getProductbycategoryId = new GraphQLInputObjectType({
  name: "getProductbycategory",
  fields: () => ({
    categoryId: { type: GraphQLID },
  }),
});
//============= name to filter =============
const getProductbyname = new GraphQLInputObjectType({
  name: "getProductbyname",
  fields: () => ({
    name: { type: GraphQLString },
  }),
});
//=============Root Query =============
const RootQuery = new GraphQLObjectType({
  name: "ProductQuery",
  fields: () => ({
    GetProductbyId: {
      type: new GraphQLList(product),
      args: {
        filter: { type: productById },
      },
      async resolve(_, { filter }, { req }) {
        if (!req.user) {
          const customError = new Error("Not Authorized");
          customError.code = 401;
          customError.data = null;
          throw customError;
        }
        return await Product.find({ _id: filter.id });
      },
    },
    GetProductbyname: {
      type: new GraphQLList(product),
      args: {
        filter: { type: getProductbyname },
      },
      async resolve(_, { filter }, { req }) {
        if (!req.user) {
          const customError = new Error("Not Authorized");
          customError.code = 401;
          customError.data = null;
          throw customError;
        }
        return await Product.find({ name: new RegExp(filter.name, "i") });
      },
    },
    GetProductbyCategoryId: {
      type: new GraphQLList(product),
      args: {
        filter: { type: getProductbycategoryId },
      },
      async resolve(_, { filter }, { req }) {
        if (!req.user) {
          const customError = new Error("Not Authorized");
          customError.code = 401;
          customError.data = null;
          throw customError;
        }
        return await Product.find({ categoryId: filter.categoryId });
      },
    },
    GetProductbyminPrice: {
      type: new GraphQLList(product),
      args: {
        filter: { type: productByPrice },
      },
      async resolve(_, { filter }, { req }) {
        if (!req.user) {
          const customError = new Error("Not Authorized");
          customError.code = 401;
          customError.data = null;
          throw customError;
        }
        return await Product.find({ price: { $lt: filter.price } });
      },
    },
    GetProductbymaxPrice: {
      type: new GraphQLList(product),
      args: {
        filter: { type: productByPrice },
      },
      async resolve(_, { filter }, { req }) {
        if (!req.user) {
          const customError = new Error("Not Authorized");
          customError.code = 401;
          customError.data = null;
          throw customError;
        }
        return await Product.find({ price: { $gt: filter.price } });
      },
    },
    GetProducts: {
      type: new GraphQLList(product),
      args: {},
      async resolve(_, { args }, { req }) {
        if (!req.user) {
          const customError = new Error("Not Authorized");
          customError.code = 401;
          customError.data = null;
          throw customError;
        }
        return await Product.find({ createdby: req.user.userId });
      },
    },
    getUserDetails: {
      type: UserType,
      args: {},
      async resolve(_, { args }, { req }) {
        if (!req.user) {
          const customError = new Error("Not Authorized");
          customError.code = 401;
          customError.data = null;
          throw customError;
        }
        const user = await User.findById(req.user.userId);
        if (!user) throw new Error("User not found");
        return user;
      },
    },
  }),
});

const RootMutation = new GraphQLObjectType({
  name: "RootMutation",
  fields: () => ({
    register: {
      type: AuthPayload,
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async (_, { email, password, name }) => {
        const existing = await User.findOne({ email });
        if (existing) {
          throw new Error("User already exists");
        }
        const user = new User({
          email,
          password,
          name,
        });

        await user.save();

        const token = jwt.sign(
          { userId: user._id, email: user.email, name: user.name },
          process.env.JWT_SECRET,
          { expiresIn: "1h" },
        );

        return { token, user };
      },
    },
    login: {
      type: AuthPayload,
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async (_, { email, password }) => {
        const user = await User.findOne({ email });
        if (!user) {
          throw new Error("Invalid Email");
        }

        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
          throw new Error("Invalid Password");
        }

        const token = jwt.sign(
          { userId: user._id, email: user.email, name: user.name },
          process.env.JWT_SECRET,
          { expiresIn: "1h" },
        );

        return { token, user };
      },
    },
    createProduct: {
      type: product,
      args: {
        productInput: { type: new GraphQLNonNull(productDto) },
      },
      async resolve(_, { productInput }, { req }) {
        const { error, value } = ProductSchema.validate(productInput);
        if (error) {
          const customError = new Error("Error validating the Products schema");
          customError.code = 400;
          customError.data = error;
          throw customError;
        }
        if (!req.user) {
          const customError = new Error("Not Authorized");
          customError.code = 401;
          customError.data = null;
          throw customError;
        }
        const { id, name, price, categoryId } = value;
        const createdby = req.user.userId;
        let newProduct = new Product({
          id,
          name,
          price,
          categoryId,
          createdby,
        });
        await newProduct.save();
        return newProduct;
      },
    },
    updateProduct: {
      type: product,
      args: {
        productInput: { type: new GraphQLNonNull(productDto) },
      },
      async resolve(_, { productInput }, { req }) {
        const { error, value } = ProductSchema.validate({ ...productInput });
        if (error) {
          const customError = new Error("Error validating the Products schema");
          customError.code = 400;
          customError.data = error;
          throw customError;
        }
        if (!req.user) {
          const customError = new Error("Not Authorized");
          customError.code = 401;
          customError.data = null;
          throw customError;
        }
        const { id, name, price, categoryId } = value;

        const updated = await Product.findByIdAndUpdate(
          id,
          { name, price, categoryId },
          { new: true },
        );
        if (!updated) throw new Error("Product not found");
        return updated;
      },
    },
  }),
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});
module.exports = schema;

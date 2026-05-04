const ProductSchema = require("../schema/product.schema");
let productData = require("../data");
module.exports = {
  GetProductbyId({ filter }) {
    console.log(filter);
    console.log({ ...productData });
    let bookData = productData.filter((elm) => {
      return String(elm.id) === String(filter.id);
    });
    console.log({ ...bookData });
    return bookData;
  },
  async GetProducts(_) {
    return productData;
  },
  createProduct: async function ({ productInput }) {
    let { error, value } = ProductSchema.validate(productInput);
    if (error) {
      // throw new Error(error);
      const customError = new Error("Error validating the Products schema");
      customError.code = 400; // Status Code 400 Bad Request
      customError.data = error;
      throw customError;
    }

    let { id, name, price, categoryId } = value;
    id = Number(id);
    productData.push({ id, name, price, categoryId });
    return { id, name, price, categoryId };
  },

  updateProduct: async function ({ productInput }) {
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
};

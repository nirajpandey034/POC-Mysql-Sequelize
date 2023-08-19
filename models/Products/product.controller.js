const ProductModel = require("./product.model");

const sync = () => {
  ProductModel.sync({
    alter: true,
  });
};
const addProduct = async (data) => {
  try {
    const response = ProductModel.create(data);
    return response;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

const getProducts = async () => {
  try {
    const response = ProductModel.findAll();
    return response;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};
module.exports = { addProduct, getProducts };

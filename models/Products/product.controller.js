const ProductModel = require("./product.model");
const logger = require("../../logger");

const addProduct = async (data) => {
  try {
    const response = await ProductModel.create(data);
    return response;
  } catch (err) {
    logger.error({ operation: "addProduct", error: err.message });
    return err.message;
  }
};

const updateProduct = async ({ data, id }) => {
  try {
    const response = await ProductModel.update(data, { where: { id: id } });
    return response;
  } catch (err) {
    logger.error({ operation: "addProduct", error: err.message });
    return err.message;
  }
};
const getProducts = async () => {
  try {
    const response = await ProductModel.findAll();
    return response;
  } catch (err) {
    logger.error({ operation: "addProduct", error: err.message });
    return err.message;
  }
};
module.exports = { addProduct, getProducts, updateProduct };

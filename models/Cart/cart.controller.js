const CartModel = require("./cart.model");
const logger = require("../../logger");

const addToCart = async (data) => {
  try {
    const response = await CartModel.create(data);
    return response;
  } catch (err) {
    logger.error({ operation: "addProduct", error: err.message });
    return err.message;
  }
};

module.exports = {
  addToCart,
};

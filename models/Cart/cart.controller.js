const CartModel = require("./cart.model");
const logger = require("../../logger");

const getCart = async (id) => {
  try {
    const response = await CartModel.findOne({ where: { id: id } });
    return response;
  } catch (err) {
    logger.error({ operation: "getCart", error: err.message });
    return err.message;
  }
};
const addToCart = async (data) => {
  try {
    const foundItem = await getCart(data.id);
    if (!foundItem) {
      const response = await CartModel.create(data);
      return response;
    }
    const response = await CartModel.update(data, { where: { id: data.id } });
    return response;
  } catch (err) {
    logger.error({ operation: "addToCart", error: err.message });
    return err.message;
  }
};

const clearCart = async (id) => {
  try {
    const response = await CartModel.destroy({ where: { id: id } });
    return response;
  } catch (err) {
    logger.error({ operation: "deleteFromCart", error: err.message });
    return err.message;
  }
};

module.exports = {
  addToCart,
  getCart,
  clearCart,
};

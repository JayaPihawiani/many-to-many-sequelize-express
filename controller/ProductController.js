import Product from "../models/Product.js";
import User from "../models/User.js";
import UserProduct from "../models/UserProduct.js";

class ProductController {
  createProduct = async (req, res) => {
    const { name, desc, qty } = req.body;
    if (!name || !desc || !qty)
      return res.json({ msg: "Field ada yang kosong!" });

    try {
      const response = await Product.create({ name, desc, qty });
      await UserProduct.create({ userId: req.user.id, productId: response.id });
      res.json(response);
    } catch (error) {
      res.json({ msg: error.message });
    }
  };

  getProduct = async (req, res) => {
    try {
      const response = await Product.findAll({
        include: {
          model: User,
          where: { id: req.user.id },
          attributes: ["id", "name", "email"],
          through: {
            attributes: [],
          },
        },
      });

      res.json(response);
    } catch (error) {
      res.json({ msg: error.message });
    }
  };

  getProductById = async (req, res) => {
    try {
      const response = await Product.findOne({
        where: { id: req.params.id },
        include: {
          model: User,
          where: { id: req.user.id },
          attributes: ["id", "name", "email"],
          through: { attributes: [] },
        },
      });
      if (!response)
        return res.status(404).json({ msg: "Produk tidak ditemukan!" });

      res.json(response);
    } catch (error) {
      res.json({ msg: error.message });
    }
  };

  deleteProduct = async (req, res) => {
    try {
      const response = await Product.findOne({
        where: { id: req.params.id },
        include: {
          model: User,
          where: { id: req.user.id },
          attributes: ["id", "name", "email"],
          through: { attributes: [] },
        },
      });
      if (!response)
        return res.status(404).json({ msg: "Produk tidak ditemukan!" });

      await Product.destroy({ where: { id: response.id } });
      res.json({ msg: "Berhasil menghapus product!" });
    } catch (error) {
      res.json({ msg: error.message });
    }
  };

  updateProduct = async (req, res) => {
    const { name, desc, qty } = req.body;
    try {
      const response = await Product.findOne({
        where: { id: req.params.id },
        include: {
          model: User,
          where: { id: req.user.id },
          attributes: ["id", "name", "email"],
          through: { attributes: [] },
        },
      });
      if (!response)
        return res.status(404).json({ msg: "Produk tidak ditemukan!" });

      await Product.update({ name, desc, qty }, { where: { id: response.id } });

      res.json({ msg: "Berhasil menghapus product!" });
    } catch (error) {
      res.json({ msg: error.message });
    }
  };
}

export default ProductController;

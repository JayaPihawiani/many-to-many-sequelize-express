import Product from "../models/Product.js";
import User from "../models/User.js";
import UserProduct from "../models/UserProduct.js";

class ProductController {
  createProduct = async (req, res) => {
    const { name, desc, qty } = req.body;
    if (req.user.role !== "admin") return res.sendStatus(403);
    if (!name || !desc || !qty)
      return res.json({ msg: "Field ada yang kosong!" });

    try {
      const response = await Product.create({
        name,
        desc,
        qty,
      });
      await UserProduct.create({
        userId: req.user.id,
        productId: response.id,
        status: "create",
      });
      res.json(response);
    } catch (error) {
      res.json({ msg: error.message });
    }
  };

  createReqByUser = async (req, res) => {
    try {
      if (req.user.role === "admin")
        return res.status(400).json({
          msg: "Warning! Tidak bisa membuat request karena status Anda adalah `admin`!",
        });

      const product = await Product.findByPk(req.params.id);
      if (!product)
        return res.status(404).json({ msg: "Product tidak ditemukan!" });

      const isReqExist = await UserProduct.findOne({
        where: {
          userId: req.user.id,
          productId: req.params.id,
          status: "request",
        },
      });

      if (isReqExist)
        return res.status(400).json({ msg: "Request sudah ada!" });

      await UserProduct.create({
        userId: req.user.id,
        productId: product.id,
        status: "request",
      });
      res.json({ msg: "Berhasil membuat request produk." });
    } catch (error) {
      res.json({ msg: error.message });
    }
  };

  getReqByUser = async (req, res) => {
    try {
      const response = await Product.findAll({
        include: {
          model: User,
          attributes: ["id", "name", "email"],
          where: { id: req.user.id },
          through: { attributes: ["status"], where: { status: "request" } },
        },
      });
      res.json(response);
    } catch (error) {
      res.json({ msg: error.message });
    }
  };

  getProduct = async (req, res) => {
    try {
      let response;
      if (req.user.role === "admin") {
        response = await Product.findAll({
          include: {
            model: User,
            attributes: ["name", "email", "role"],
            through: {
              attributes: ["status"],
            },
          },
        });
      } else if (req.user.role === "user") {
        response = await Product.findAll({});
      }

      res.json(response);
    } catch (error) {
      res.json({ msg: error.message });
    }
  };

  getProductById = async (req, res) => {
    try {
      const response = await Product.findOne({
        where: { id: req.params.id },
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

      res.json({ msg: "Berhasil mengupdate product!" });
    } catch (error) {
      res.json({ msg: error.message });
    }
  };
}

export default ProductController;

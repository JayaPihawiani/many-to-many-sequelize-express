import User from "../models/User.js";
import argon from "argon2";
import jwt from "jsonwebtoken";

class UserController {
  createUser = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.json({ msg: "Field ada yang kosong" });
    const checkEmail = await User.findOne({ where: { email } });
    if (checkEmail) return res.json({ msg: "Email ini sudah digunakan!" });
    if (password.length < 8)
      return res.json({ msg: "Password terlalu pendek. Minimal 8 karakter" });

    const hashed = await argon.hash(password);
    try {
      await User.create({ name, email, password: hashed });

      res.json({ msg: "Berhasil membuat akun" });
    } catch (error) {
      res.json(error.message);
    }
  };

  loginUser = async (req, res) => {
    const { password } = req.body;
    try {
      const checkEmail = await User.findOne({
        where: { email: req.body.email },
      });
      if (!checkEmail) return res.json({ msg: "Email ini tidak terdaftar!" });
      const verifyPassword = await argon.verify(checkEmail.password, password);
      if (!verifyPassword)
        return res.json({ msg: "Password yang dimasukkan salah!" });
      const { id, name, email } = checkEmail.dataValues;
      const token = jwt.sign(
        { id, name, email },
        "sdnoqjbdoqwjbfioabkclfowigfbo",
        {
          expiresIn: "15m",
        }
      );
      res.json({ token });
    } catch (error) {
      res.json({ msg: error.message });
    }
  };
}

export default UserController;

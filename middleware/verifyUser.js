import jwt from "jsonwebtoken";

const verifyUser = (req, res, next) => {
  const headers = req.headers["authorization"];
  const token = headers && headers.split(" ")[1];
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, "sdnoqjbdoqwjbfioabkclfowigfbo", (err, decoded) => {
    if (err) return res.sendStatus(403);
    req.user = decoded;
    next();
  });
};

export default verifyUser;

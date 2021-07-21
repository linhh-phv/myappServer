let isAuth = async (req, res, next) => {
  const tokenFromClient = req.headers["authorization"];

  if (tokenFromClient) {
    try {
      const decoded = String(tokenFromClient).trim().split(" ")[1];
      req.token = decoded;

      next();
    } catch (error) {
      return res.status(401).json({
        message: "Unauthorized. " + error,
      });
    }
  } else {
    return res.sendStatus(403);
  }
};

module.exports = {
  isAuth,
};

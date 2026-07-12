const jwt = require("jsonwebtoken");
const asyncHandler = require("../utils/asyncHandler");
const prisma = require("../config/prismaClient");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token provided");
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    res.status(401);
    throw new Error("Not authorized, token invalid or expired");
  }

  const user = await prisma.user.findUnique({ where: { id: decoded.id } });
  if (!user) {
    res.status(401);
    throw new Error("Not authorized, user no longer exists");
  }

  req.user = { id: user.id, email: user.email, role: user.role };
  next();
});

const authorize = (...roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    res.status(403);
    throw new Error(`Role '${req.user?.role}' is not permitted to access this resource`);
  }
  next();
};

module.exports = { protect, authorize };
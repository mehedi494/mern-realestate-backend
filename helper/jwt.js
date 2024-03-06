import jwt from "jsonwebtoken";

const createToken = (payload, secret, expireTime) => {
  return jwt.sign(payload, secret, {
    expiresIn: expireTime,
  });
};

const verifyToken = (token, secret) => {
  return jwt.verify(token, secret);
};

const decodeUser = (token, secret) =>{
  return jwt.decode(token, secret);
}

export const jwtHelpers = {
  createToken,
  verifyToken,
  decodeUser
};

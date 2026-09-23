const jwt = require('jsonwebtoken');

const generateToken = (username) => {
  return jwt.sign(
    { sub: username },
    process.env.JWT_SECRET,
    { expiresIn: Math.floor((process.env.JWT_EXPIRATION_MS || 3000000) / 1000) }
  );
};

const generateJwtCookie = (username) => {
  const token = generateToken(username);
  const isProduction = process.env.NODE_ENV === 'production' || process.env.RENDER === 'true';
  return {
    token,
    cookieOptions: {
      httpOnly: false,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
      maxAge: 24 * 60 * 60 * 1000,
      path: '/',
    },
  };
};

module.exports = { generateToken, generateJwtCookie };

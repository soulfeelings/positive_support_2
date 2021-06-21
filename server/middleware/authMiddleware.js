import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Auth error' });
    } else {
      const decoded = jwt.verify(token, process.env.SC);
    req.user = decoded;
    next() };
  } catch (e) {
    return res.status(401).json({ message: 'Auth error' });
  }
};

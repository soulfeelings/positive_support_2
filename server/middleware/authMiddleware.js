import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }
  try {
    const token = req.headers.authorization.split(' ')[1];
    console.log('token', token);
    if (!token) {
      return res.status(401).json({ message: 'Auth error' });
    } else {
      console.log(process.env.SC);
      const decoded = jwt.verify(token, process.env.SC);
      console.log(decoded);
    req.user = decoded;
    next() };
  } catch (e) {
    return res.status(401).json({ message: 'Auth error' });
  }
};

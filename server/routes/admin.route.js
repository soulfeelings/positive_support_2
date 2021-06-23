import { Router } from 'express';
import jwt from 'jsonwebtoken';
// import { authMiddleware } from '../middleware/authMiddleware.js';
import Admin from '../models/admin.model.js';
import User from '../models/user.model.js';

const adminRouter = Router();

adminRouter.post('/login', async (req, res) => {
  // const newAdmin = await Admin.create({ name: req.body.nickName, password: req.body.password })
  // console.log(newAdmin);
  try {
    const admin = await Admin.findOne({ name: req.body.nickName });
    console.log(admin);
    if (admin.password === req.body.password) {
      const token = await jwt.sign({ id: admin._id }, process.env.SC, { expiresIn: '1h' });
      res.status(200).send({admin: {status: "admin"}, token});
    } else {
      res.status(403).send({admin: false});
    }
  } catch (error) {
    console.log(error);
    res.status(401).send(error);
  }
});

 adminRouter.get('/getUsers', async (req, res) => {
    try {
      const users = await User.find({})
      res.status(200).send(users)
    } catch (error) {
      res.status(404)
    }
  })

  adminRouter.post('/banUser', async (req, res) => {
    const { userId, isBan } = req.body;
    try {
      const user = await User.findByIdAndUpdate(userId,  {$set: { isBan: !isBan }}, {new: true})
      res.status(200).send(user)
    } catch (error) {
      res.status(404)
    }
  })

export default adminRouter;

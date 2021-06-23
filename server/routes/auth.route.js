// рут для авторизации
import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { authMiddleware } from '../middleware/authMiddleware.js';
import Admin from '../models/admin.model.js';
import User from '../models/user.model.js';

const authRouter = Router();

authRouter.post('/create', async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    await res.status(201).send({ message: 'успешно зарегистрированы' });
  } catch (error) {
    await res.status(501).send({ message: 'Ошибка регистрации' });
  }
});

authRouter.post('/login', async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { chatId: req.body.chatId },
      { $set: { secretId: req.body.secretId } },
    );
  } catch (error) {
    console.log(error);
  }
});

authRouter.get('/auth', authMiddleware, async (req, res) => {
  try {
    let user = await User.findById(req.user.id);

    // if (user) {
      const token = await jwt.sign({ id: user.id }, process.env.SC, { expiresIn: '1h' });
      res.status(200).send({ user, token });
    // } else {
    //   const admin = await Admin.findById(req.user.id);
    //   user = {status: "admin"}
    //   const token = await jwt.sign({ id: admin.id }, process.env.SC, { expiresIn: '1h' });
    //   return res.status(200).send({ user, token });
    // }
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: 'Что-то пошло не так! Автовизируйтесь снова.' });
  }
});

authRouter.post('/auth', async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { secretId: req.body.secretId },
      { $set: { secretId: '' } },
    );
    const token = await jwt.sign({ id: user._id }, process.env.SC, { expiresIn: '1h' });
    res.status(200).send({ user, token });
  } catch (error) {
    console.log(error);
    res.status(401).send({ message: 'ссылка неверна или устарела!' });
  }
});

export default authRouter;

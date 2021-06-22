import { Router } from 'express';
import Circle from '../models/circle.model.js';
import User from '../models/user.model.js';

const circlesRouter = Router();

circlesRouter.route('/')
  .get((req, res) => {
    Circle.find({}).populate('connected_users')
      .exec()
      .then((data) => res.json({ data }));
});

circlesRouter.route('/follow')
  .post(async (req, res) => {
    const circle = await Circle.findById(req.body.id);
    await circle.connected_users.push(req.body.currentUser);
    await circle.save();

    const user = await User.findById(req.body.currentUser._id);
    await user.connected_circles.push(circle);
    await user.save();

    res.status(200).json({circle, user})
});

circlesRouter.route('/unfollow')
  .post(async (req, res) => {
    const circle = await Circle.findById(req.body.id);
    const idx =  circle.connected_users.indexOf(req.body.currentUser._id);
    await circle.connected_users.splice(idx, 1)
    await circle.save();

    const user = await User.findById(req.body.currentUser._id);
    const index =  user.connected_circles.indexOf(req.body.id);
    await user.connected_circles.splice(index, 1)
    await user.save();

    res.status(200).json({circle, user})
});

circlesRouter.route('/getCurrent') 
  .post(async (req, res) => {
    const circle = await Circle.findById(req.body.circleId);
    res.status(201).send(circle)
  })

export default circlesRouter;

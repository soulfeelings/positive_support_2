import { Router } from 'express';
import Circle from '../models/circle.model.js';

const circlesRouter = Router();

circlesRouter.route('/')
  .get((req, res) => {
    Circle.find({})
      .exec()
      .then((data) => res.json({ data }));
});

circlesRouter.route('/follow')
  .post(async (req, res) => {
    const circ = await Circle.findById(req.body.id);
    await circ.connected_users.push(req.body.currentUser);
    await circ.save();
    res.status(200).json(circ)
});

circlesRouter.route('/unfollow')
  .post(async (req, res) => {
    const circ = await Circle.findById(req.body.id);
    const idx =  circ.connected_users.indexOf(req.body.currentUser._id);
    await circ.connected_users.splice(idx, 1)
    await circ.save();
    res.status(200).json(circ)
});

export default circlesRouter;

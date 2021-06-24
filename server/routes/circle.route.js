import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import bot from '../bot/bot.js';
import { krugovert } from '../bot/krugovert.js';
import Circle from '../models/circle.model.js';
import User from '../models/user.model.js';
import { followCircleBotMessage, unfollowCircleBotMessage } from '../bot/bot.js'

const circlesRouter = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/files');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

circlesRouter.route('/').get((req, res) => {
  Circle.find({})
    .populate('connected_users')
    .exec()
    .then((data) => res.json({ data }));
});

circlesRouter.route('/follow').post(async (req, res) => {
  const { currentUser, id } = req.body;

  const circle = await Circle.findById(id);
  await circle.connected_users.push(currentUser);
  await circle.save();

  const user = await User.findById(currentUser._id);
  await user.connected_circles.push(circle._id);
  await user.save();

  followCircleBotMessage(currentUser, circle);

  res.status(200).json({ circle, user });
});

circlesRouter.route('/unfollow').post(async (req, res) => {
  const { currentUser, id } = req.body;

  const circle = await Circle.findById(id);
  const idx = circle.connected_users.indexOf(currentUser._id);
  await circle.connected_users.splice(idx, 1);
  await circle.save();

  const user = await User.findById(currentUser._id);
  const index = user.connected_circles.indexOf(id);
  await user.connected_circles.splice(index, 1);
  await user.save();

  unfollowCircleBotMessage(currentUser, circle);

  res.status(200).json({ circle, user });
});

circlesRouter.route('/getCurrent').post(async (req, res) => {
  const circle = await Circle.findById(req.body.circleId);
  res.status(201).send(circle);
});


circlesRouter.route('/delete/:id').delete(async (req, res) => {
  const circle = await Circle.findByIdAndDelete(req.params.id);
  res.status(201).json(circle);
});

circlesRouter
  .route('/add')
  .post(upload.single('file'), async (req, res, next) => {
    const newCircle = await Circle.create({
      name: req.body.name,
      img: req.file.path,
    });
    res.status(201).send(newCircle);
  });

circlesRouter.route('/start')
  .post(async (req, res) => {
    try {
      await krugovert(bot, req.body.name)
      res.status(200).send({message: `круговорот ${req.body.name} запущен`})
    } catch (error) {
      console.log(error);
      res.status(500).send({message: `Не удалось запустить круговорот ${req.body.name}!`})
    }
  })


// circlesRouter.delete("/getCurrent/:id", async (req, res) => {
//   const { id } = req.params;
//   console.log(req.params);
//   await Circle.findByIdAndDelete(id, (error, circleToDelete) => {
//     if (error) {
//       res.status(400).json({ delete: false, error });
//     } else if (!circleToDelete) {
//       res.status(404).json({ delete: false });
//     } else {
//       res.status(200).json({ delete: true, id });
//     }
//   });
// });


export default circlesRouter;

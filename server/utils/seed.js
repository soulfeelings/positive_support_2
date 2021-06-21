import faker from 'faker';
import mongoose from 'mongoose';
import Circle from '../models/circle.model.js';

const circles = [
  {
    name: 'Программирование',
    img: `${faker.image.nature()}?random=${Date.now()}`,
  },
  {
    name: 'Похудение',
    img: `${faker.image.nature()}?random=${Date.now()}`,
  },
  {
    name: 'Учеба',
  },
  {
    name: 'Отношения',
  },
  {
    name: 'Спорт',
  },
];

for (let i = 0; i < circles.length; i++) {
  const element = circles[i];
  element.img = '';
  element.img = `${faker.image.nature()}?random=${Date.now() + i}`;
}

mongoose.connect(
  'mongodb+srv://Kirill:WPmEU1z2C3GdymZy@positivesupport.8boxh.mongodb.net/support?authSource=admin&replicaSet=atlas-utqweu-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true,
  }
).then(() => {
  Circle.insertMany(circles);
})


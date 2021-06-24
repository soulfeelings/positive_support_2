import shedule from 'node-schedule';
import Circle from '../models/circle.model.js';
import bot from './bot.js';
import { krugovert } from './krugovert.js';

function startSheduler() {
  const job = shedule.scheduleJob('0 9 * * *', async function() {
    const circles = await getAllCircles();

    for (let i = 0; i < circles.length; i++) {
      const circle = circles[i];
      if(canKrugovert(circle)) {
        krugovert(bot, circle.name);
      }
    }
    
  })
  return job;
}

async function getAllCircles() {
  return await Circle.find({});
}

function canKrugovert(circle) {
  return (circle.connected_users.length < 2) ? false : true;
}

export default startSheduler

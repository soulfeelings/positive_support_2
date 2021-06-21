import TelegramBot from 'node-telegram-bot-api';
import axios from 'axios';
import { commonkeyboard } from './keyboards.js';
import {
  commontext,
  errorcallback,
  letsgotosite,
  nocommand,
  youaddedtocommon,
} from './texts.js';
import Circle from '../models/circle.model.js';
import User from '../models/user.model.js';
import arrayShuffle from 'array-shuffle';

const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, {
  polling: true,
});

// Фича круговорота

// Circle.findOne({ name: 'common' })
//   .populate('connected_users')
//   .then((circle) => {
//     const { connected_users } = circle;

//     let last = null;
//     (connected_users.length % 2)
//       ? last = connected_users.pop()
//       : last = null;
    
//     const middle = connected_users.length / 2;

//     let firstArray = connected_users.slice(0, middle);
//     let secondArray = connected_users.slice(middle, connected_users.length);
    
//     firstArray = arrayShuffle(firstArray);
//     secondArray = arrayShuffle(secondArray);

//     mailing(firstArray, secondArray);
    
//     const shuffleSecondArray = arrayShuffle(secondArray);

//     mailing(shuffleSecondArray, firstArray);

//     if(last) {
//       const randomperson = shuffleSecondArray.pop();
//       bot.sendMessage(last.chatId, `Поддержи сегодня: ${randomperson.firstName} ${randomperson.lastName}, вот его телеграм - @${randomperson.name}`);
//       bot.sendMessage(randomperson.chatId, `Поддержи сегодня пожалуйста еще одного человека: ${last.firstName} ${last.lastName}, вот его телеграм - @${last.name}`)
//     }
    
//   });

// function mailing(from, to) {
//   for (let i = 0; i < from.length; i++) {
//     const person = from[i];
//     const partner = to[i];
//     bot.sendMessage(person.chatId, `Поддержи сегодня: ${partner.firstName} ${partner.lastName}, вот его телеграм - @${partner.name}`)
//   }
// }

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const { text } = msg;

  switch (text) {
    case '/start':
      regUser(msg);
      break;
    case '/Войти на сайт':
      giveMeLink(chatId);
      break;
    default:
      bot.sendMessage(chatId, nocommand);
  }
});

bot.on('callback_query', async (query) => {
  const { type, answer } = JSON.parse(query.data);
  const { id } = query.from;

  switch (type) {
    // Ловим выбор вступать или нет в общий круговорот
    case 'common':
      if (answer === 'yes') {
        try {
          const user = await User.findOne({ chatId: id });
          const circle = await Circle.updateOne(
            { name: 'common' },
            { $addToSet: { connected_users: user._id } }
          ).exec();
          if (circle.n) {
            bot.sendMessage(id, youaddedtocommon);
          }
        } catch (error) {
          bot.sendMessage(id, 'Какая-то ошибка с базой, типа ' + error.message);
          console.log(error);
        }
      } else if (answer === 'no') {
        bot.sendMessage(id, letsgotosite);
      }
      break;
    default:
      bot.sendMessage(id, errorcallback);
      break;
  }
});

async function giveMeLink(chatId) {
  const res = await linkgenerator(`${chatId}`);
  await bot.sendMessage(id, `http://localhost:3000/profile/${res}`);
  axios.post('http://localhost:4000/user', { id, secretId: res });
}

async function regUser(msg) {
  const {
    id: chatId,
    username: name,
    first_name: firstName,
    last_name: lastName,
  } = msg.chat;

  let person_name = '';

  if (name) {
    person_name = name;
  } else if (firstName) {
    person_name = firstName;
  }

  sendTimoutMessage(0, chatId, `Привет, ${person_name}!`);
  sendTimoutMessage(700, chatId, `Секунду, пытаюсь Вас зарегистрировать.`);

  axios
    .post('http://localhost:4000/', {
      name,
      firstName,
      lastName,
      chatId,
    })
    .then(async (res) => {
      await sendTimoutMessage(
        2000,
        chatId,
        `${person_name} вы ${res.data.message}!`
      );
      await sendTimoutMessage(2000, chatId, commontext, {
        reply_markup: {
          inline_keyboard: commonkeyboard,
        },
      });
    })
    .catch((err) => {
      bot.sendMessage(chatId, 'Какая-то ошибка ' + err);
    });
}

function sendTimoutMessage(timeout, chatId, msg, options = {}) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      bot.sendMessage(chatId, msg, options).then(() => resolve());
    }, timeout);
  });
}

export default bot;

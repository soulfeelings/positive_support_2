import TelegramBot from 'node-telegram-bot-api';
import { commonkeyboard } from './keyboards.js';
import {
  commontext,
  errorcallback,
  letsgotosite,
  nocommand,
  starttext,
  youaddedtocommon,
} from './texts.js';
import Circle from '../models/circle.model.js';
import User from '../models/user.model.js';
import Apeal from '../models/apeal.model.js';
import { linkgenerator } from '../middleware/linkgenerator.js';
import saveUserSecretId from '../utils/saveUserSecretId.js';

const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, {
  polling: true,
});

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const { text } = msg;

  if (await checkAppel(text, chatId))
    return sendTimoutMessage(1000, chatId, 'Ваша жалоба зарегистрирована');

  switch (text) {
    case '/start':
      bot.sendMessage(chatId, starttext, { parse_mode: 'MarkdownV2' });
      break;
    case '/reg':
      if (await userExists(chatId)) {
        return bot.sendMessage(chatId, 'А вы уже с нами:)');
      }
      let userProfile = bot.getUserProfilePhotos(msg.from.id);
      console.log("userProfile", userProfile);
      userProfile.then(function (res) {
        let file_id = res.photos[0][0].file_id;
        console.log("file_id", file_id);
        let file = bot.getFile(file_id);
        console.log("file", file);
        file.then(function (result) {
          let file_path = result.file_path;
          let photo_url = `https://api.telegram.org/file/bot${token}/${file_path}`; // получаем фото юзера из телеграма
          regUser({ msg, photo_url }); // регистрируем пользователя
        });
      }).catch((err) => {
        return bot.sendMessage(chatId, 'Похоже у вас стоят настройки приватности фотографии')
      })
      break;
    case 'Войти':
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
        addUserToCommonGroup(id);
      } else if (answer === 'no') {
        bot.sendMessage(id, letsgotosite);
        await sendTimoutMessage(1000, id, 'Лови ссылку');
        giveMeLink(id);
      }
      break;
    default:
      bot.sendMessage(id, errorcallback);
      break;
  }
});

async function checkAppel(text, chatId) {
  const result = text.match(/#жалоба/gm);

  if (result) {
    try {
      const user = await User.findOne({ chatId }).exec();
      const apeal = await Apeal.create({ text, fromUser: user._id });
      return apeal;
    } catch (error) {
      console.log(error);
      bot.sendMessage(chatId, 'Ошибка на сервере');
    }
  }

  return null;
}

async function addUserToCommonGroup(id) {
  try {
    const user = await userExists(id);
    if (!user) {
      return bot.sendMessage(id, 'Вам похоже надо зарегистрироваться');
    }

    const updatingCircle = await Circle.updateOne(
      { name: 'Общее' },
      { $addToSet: { connected_users: user._id } }
    ).exec();

    const circle = await Circle.findOne({ name: 'Общее' });
    if (!circle) {
      return bot.sendMessage(
        id,
        'Почему-то нет общего сообщества с именем "Общее". Нужна помощь администратора'
      );
    }

    const updatingUser = await User.updateOne(
      { chatId: id },
      { $addToSet: { connected_circles: circle._id } }
    ).exec();

    if (updatingCircle.n && updatingUser.n) {
      bot.sendMessage(id, youaddedtocommon);
      sendTimoutMessage(
        1000,
        id,
        'Поздравляю. Скоро тебя ждет первое взаимодействие в нашем сервисе. Тебе придет чей-то никнейм. Поддержи это человека. И также твой никнейм придет кому-то и тебя обязательно поддержат. До связи!'
      );
    }
  } catch (error) {
    bot.sendMessage(id, 'Какая-то ошибка с базой, типа ' + error.message);
    console.log(error);
  }
}

// По хорошему сделать статическим методом модели User
async function userExists(chatId) {
  return await User.findOne({ chatId }).exec();
}

async function giveMeLink(chatId) {
  const res = await linkgenerator(`${chatId}`);
  // При нормальной ссылке будет все хорошо, но пока не кликабельна
  await bot.sendMessage(
    chatId,
    `<a href="https://positive-support-2.herokuapp.com/profile/${res}">https://positive-support-2.herokuapp.com/profile/${res}</a>`,
    {
      parse_mode: 'HTML',
    }
  );
  saveUserSecretId(chatId, res);
}

async function regUser({ msg, photo_url }) {
  const {
    id: chatId,
    username: name,
    first_name: firstName,
    last_name: lastName,
  } = msg.chat;

  if (!name) {
    await sendTimoutMessage(
      1000,
      chatId,
      `В твоем телеграм аккаунте не заполнен username`
    );
    await sendTimoutMessage(
      2000,
      chatId,
      `Вся логика программы построена на этом`
    );
    await sendTimoutMessage(
      500,
      chatId,
      `Заполни его, пожалуйста, в настройках и возвращайся`
    );
    return;
  }

  await sendTimoutMessage(0, chatId, `Привет, ${name}!`);
  await sendTimoutMessage(
    700,
    chatId,
    `Секунду, пытаюсь Вас зарегистрировать.`
  );

  const userData = {
    name,
    firstName,
    lastName,
    chatId,
    photo_url,
  }
  User.create(userData).then(async (user) => {
    await sendTimoutMessage(2000, user.chatId, `${user.name} вы успешно зарегистрированы!`);
    await sendTimoutMessage(2000, user.chatId, commontext, {
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

export function followCircleBotMessage(currentUser, circle) {
  bot.sendMessage(
    currentUser.chatId,
    `Вы вступили в круговорот ${circle.name}`
  );
}

export function unfollowCircleBotMessage(currentUser, circle) {
  bot.sendMessage(currentUser.chatId, `Вы вышли из круговорота ${circle.name}`);
}

export default bot;

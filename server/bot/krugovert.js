// Фича круговорота

import Circle from '../models/circle.model.js';
import arrayShuffle from 'array-shuffle';
import bot from './bot.js';

export async function krugovert(bot, name) {
  const circ = Circle.findOne({ name })
    .populate('connected_users')
    .then((circle) => {
      const { connected_users } = circle;
      // try {
      //   if (connected_users.length < 2) {
      //     throw 'В круговороте меньше двух человек';
      //   }
      // } catch (error) {
      //   console.log(error, 'trycatch');
      //   return error;
      // }
      const last = checkForLeftOver(connected_users);

      const middle = connected_users.length / 2;

      let firstArray = connected_users.slice(0, middle);
      let secondArray = connected_users.slice(middle, connected_users.length);

      firstArray = arrayShuffle(firstArray);
      secondArray = arrayShuffle(secondArray);

      const shuffleSecondArray = arrayShuffle(secondArray);
      console.log(secondArray);
      mailing(firstArray, secondArray);
      mailing(shuffleSecondArray, firstArray);

      // Если у нас нечетный список, то останется один человек и вот это для него
      if (last) {
        const randomperson = shuffleSecondArray.pop();

        bot.sendMessage(
          last?.chatId,
          `Поддержи сегодня: ${randomperson?.firstName} ${randomperson?.lastName}, вот его телеграм - @${randomperson?.name}`,
        );
        setTimeout(() => {
          bot.sendMessage(
            randomperson?.chatId,
            `Поддержи сегодня пожалуйста еще одного человека: ${last?.firstName} ${last?.lastName}, вот его телеграм - @${last?.name}`,
          );
        }, 5000);
      }
    });

  function checkForLeftOver(connected_users) {
    return connected_users.length % 2 ? connected_users.pop() : null;
  }

  function mailing(from, to) {
    for (let i = 0; i < from.length; i++) {
      const person = from[i];
      const partner = to[i];
      bot.sendMessage(
        person?.chatId,
        `Поддержи сегодня: ${partner?.firstName} ${partner?.lastName}, вот его телеграм - @${partner?.name}`,
      );
    }
  }
}

// Фича круговорота

import Circle from '../models/circle.model.js';
import arrayShuffle from 'array-shuffle';
import bot from './bot.js';

export async function krugovert(bot, name) {
  const circ = Circle.findOne({ name })
    .populate('connected_users')
    .then((circle) => {
      const { connected_users } = circle;
      const shuffled_connected_users = arrayShuffle(connected_users);
      
      const last = checkForLeftOver(shuffled_connected_users);

      const middle = shuffled_connected_users.length / 2;

      let firstArray = shuffled_connected_users.slice(0, middle);
      let secondArray = shuffled_connected_users.slice(middle, shuffled_connected_users.length);

      firstArray = arrayShuffle(firstArray);
      secondArray = arrayShuffle(secondArray);

      const shuffleSecondArray = arrayShuffle(secondArray);

      mailing(firstArray, secondArray);
      mailing(shuffleSecondArray, firstArray);

      // Если у нас нечетный список, то останется один человек и вот это для него
      if (last) {
        const randomperson = shuffleSecondArray.pop();
        
        let message = `
          Поддержи сегодня: ${randomperson.firstName} ${randomperson.lastName}, вот его телеграм - @${randomperson.name}
        `;

        if (randomperson.situation) {
          message += `
            Его ситуация: ${randomperson.situation}
          `;
        }
        console.log("LAST - шлем LASTU", randomperson.chatId);
        bot.sendMessage(last.chatId, message);

        setTimeout(() => {
          let message = `
            Поддержи сегодня пожалуйста еще одного человека: ${last.firstName} ${last.lastName}, вот его телеграм - @${last.name}
          `;

          if (last.situation) {
            message += `
              Его ситуация: ${last.situation}
            `;
          }
          console.log("LAST - шлем RANDOMU", randomperson.chatId);
          bot.sendMessage(randomperson.chatId, message);
        }, 0);
      }
    });

  function checkForLeftOver(connected_users) {
    return connected_users.length % 2 ? connected_users.pop() : null;
  }

  function mailing(from, to) {
    for (let i = 0; i < from.length; i++) {
      const person = from[i];
      const partner = to[i];

      let message = `
        Поддержи сегодня: ${partner.firstName} ${partner.lastName}, вот его телеграм - @${partner.name}
      `;

      if (partner.situation) {
        message += `
          Его ситуация: ${partner.situation}
        `;
      }

      bot.sendMessage(person.chatId, message);
    }
  }
}

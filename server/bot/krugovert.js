// Фича круговорота

import Circle from "../models/circle.model.js";
import arrayShuffle from 'array-shuffle';

export function krugovert(bot) {
  Circle.findOne({ name: 'common' })
    .populate('connected_users')
    .then((circle) => {
      const { connected_users } = circle;

      const last = checkForLeftOver(connected_users);
      
      const middle = connected_users.length / 2;

      let firstArray = connected_users.slice(0, middle);
      let secondArray = connected_users.slice(middle, connected_users.length);
      
      firstArray = arrayShuffle(firstArray);
      secondArray = arrayShuffle(secondArray);
      
      const shuffleSecondArray = arrayShuffle(secondArray);

      mailing(firstArray, secondArray);
      mailing(shuffleSecondArray, firstArray);


      // Если у нас нечетный список, то останется один человек и вот это для него 
      if(last) {
        const randomperson = shuffleSecondArray.pop();
        let message = `
          Поддержи сегодня: ${randomperson.firstName} ${randomperson.lastName}, вот его телеграм - @${randomperson.name}
        `;

        if(randomperson.situation) {
          message += `
            Его ситуация: ${randomperson.situation}
          `
        }
        bot.sendMessage(last.chatId, message);

        setTimeout(() => {
          let message = `
            Поддержи сегодня пожалуйста еще одного человека: ${last.firstName} ${last.lastName}, вот его телеграм - @${last.name}
          `;

          if(last.situation) {
            message += `
              Его ситуация: ${last.situation}
            `
          }

          bot.sendMessage(randomperson.chatId, message)
        }, 5000);
      }
      
    });

  function checkForLeftOver(connected_users) {
    return (connected_users.length % 2) ? connected_users.pop(): null;
  }

  function mailing(from, to) {
    for (let i = 0; i < from.length; i++) {
      const person = from[i];
      const partner = to[i];
      bot.sendMessage(person.chatId, `Поддержи сегодня: ${partner.firstName} ${partner.lastName}, вот его телеграм - @${partner.name}`)
    }
  }
}


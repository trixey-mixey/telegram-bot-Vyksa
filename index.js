const TelegramApi = require('node-telegram-bot-api');
const token = '7031942482:AAG3J6xv6K6KBAzuO8bHJKmzwMWsFQ0iRfI';

const bot = new TelegramApi(token, { polling: true });

bot.on('message', (msg) => {
  console.log(msg);
  const chatId = msg.chat.id;
  const adminChatId = '1403602537';
  if (msg.text === '/start') {
    bot.sendMessage(
      chatId,
      'Добро пожаловать в бот Признания Выкса! Вы можете написать сюда свою новость для того, чтобы предложить ее к публикации!'
    );
  }

  if (msg.text !== '/start') {
    bot.sendMessage(chatId, 'Вы отправили Вашу новость!');
    bot.sendMessage(adminChatId, `Новость от @${msg.chat.username}`);
    setTimeout((e) => {
      bot.forwardMessage(adminChatId, msg.from.id, msg.message_id);
    }, 100);
  }
});

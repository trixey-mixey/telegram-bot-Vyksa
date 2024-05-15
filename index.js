const TelegramBot = require('node-telegram-bot-api');
const adminChatId1 = '1403602537';
// const adminChatId1 = '475941083';
const adminChatId2 = '1745508294';
const token = '7031942482:AAG3J6xv6K6KBAzuO8bHJKmzwMWsFQ0iRfI';
const bot = new TelegramBot(token, { polling: true });

let lastMessageTime = {};

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;

  if (msg.text === '/start') {
    bot.sendMessage(
      chatId,
      'Добро пожаловать в бот Признания Выкса! Вы можете прислать сюда свою новость для того, чтобы предложить ее к публикации!'
    );
  } else if (
    lastMessageTime[userId] &&
    Date.now() - lastMessageTime[userId] < 3600000
  ) {
    bot.sendMessage(
      chatId,
      'Извините, вы можете отправлять сообщения только раз в час.'
    );
  } else {
    console.log(msg);
    bot.sendMessage(chatId, 'Вы отправили новость!');
    bot.sendMessage(adminChatId1, `Новость от: @${msg.chat.username}`);
    setTimeout(() => {
      bot.forwardMessage(adminChatId1, msg.from.id, msg.message_id);
    }, 100);
    bot.sendMessage(adminChatId2, `Новость от: @${msg.chat.username}`);
    setTimeout(() => {
      bot.forwardMessage(adminChatId2, msg.from.id, msg.message_id);
    }, 100);
    bot.sendMessage(adminChatId1, ``);
    lastMessageTime[userId] = Date.now();
  }
});

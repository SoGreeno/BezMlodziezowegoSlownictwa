const { Telegraf } = require('telegraf');

const bot = new Telegraf('95784356:646566696e797479776e69652061706920646f206d6f6a65676f20626f7461');

// ochydne mlodziezowe slowa ktore chcemy cenzurowac
const wordReplies = {
    'rel': 'utożsamiam się',
    'bambik': 'żółtodziób',
    'fr': 'do prawdy',
    'randomowy': 'losowy',
    'bff': 'najlepszy kolega',
    'pov': 'wyobraz sobie, że',
    'cringe': 'żenada',
    'imo': 'myśle, że',
    'r/woooosh': 'nie zrozumiałeś żartu',
    'i use arch btw': 'jestem denerwujący i nudzi mnie sie w życiu', // tak na wypadek
    'gyatt': 'dupa',
    'rizz': 'charyzmat',
};

bot.use(async (ctx, next) => {
  if (ctx.message && ctx.message.text) {
    let modifiedText = ctx.message.text;
    for (const word of Object.keys(wordReplies)) {
      const regex = new RegExp(`\\b${word}\\b`, 'gi'); // bawimy sie regexem, bo chcemy tylko usunac "te" slowa
      modifiedText = modifiedText.replace(regex, wordReplies[word]);
    }

    if (modifiedText !== ctx.message.text) {
      await ctx.deleteMessage(ctx.message.message_id);// kasujemy ta wiadomosc...
      await ctx.reply(`@${ctx.message.from.username}: ${modifiedText}`); // ... i dajemy naprawiona
    }
  }

  // nie ma mlodziezowego slowa, ignorujemy
  await next();
});

bot.launch();

const { Telegraf } = require('telegraf');

const bot = new Telegraf('95784356:646566696e797479776e69652061706920646f206d6f6a65676f20626f7461');

// jesli sa tacy co cie wnerwiaja tym slownictwem, mozesz im dac tymczasowego muta, co prawda jeszcze tego nie zrobiłem, więc to poprostu pusta zmienna
const punishUsers = false;

// ochydne mlodziezowe slowa ktore chcemy cenzurowac
const wordReplies = {
    'rel': 'utożsamiam się',
    'bambik': 'żółtodziób',
    'fr': 'do prawdy',
    'randomowy': 'losowy',
    'randomowo': 'losowo',
    'bff': 'najlepszy kolega',
    'pov': 'wyobraź sobie, że',
    'imo': 'myśle, że',
    'gyatt': 'dupa',
    'rizz': 'charyzmat',
    'goat': 'najlepszy wszechczasów',
    'low key': 'po cichu',
    'lowkey': 'po cichu',
    'npc': 'prostak',
    'npcty': 'prostacy',
    'side eye': 'wzrok bazyliszka',
    'side-eye': 'wzrok bazyliszka',
    'sideeye': 'wzrok bazyliszka',
    'slay': 'świetnie',
    'cringe': 'żenada',
    'ez': 'łatwizna',
    'es': 'łatwizna',
    'essa': 'łatwizna',
    'delulu': 'zwidy',
    'odklejka': 'sen na jawie',
    'odklejke': 'sen na jawie',
    'odklejkę': 'sen na jawie',
    'kys': 'uważaj na siebie', //nie chcemy rozprzestrzeniać przemocy!
    'legitny': 'prawdziwy',
    'legitne': 'prawdziwe',
    'żal.pl': "żałosne",
    'prank': 'żart',
    'pranka': 'żart',
    'naura': 'na razie',
    'nara': 'na razie',
    'narka': 'na razie',
    'jesieniara': 'lubiąca jesień',
    'jesieniarz': 'lubiący jesień',
    //'baza': 'i ja to rozumiem',
    //'^': 'zgadzam sie z stwierdzeniem powyżej'
    //'+1': 'zgadzam sie z tobą'
    //'-1': 'nie zgadzam sie z tobą'
};

bot.command('karaj', (ctx) => {
    punishUsers == true;
    ctx.reply(`Dobra! Od teraz będę karać uciszeniem każdego, co powie z młodzieżowych słów.`);
  });

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
        if (punishUsers == true) {
            //pozniej zrobie tak ze dostajesz muta
        }
    }
  }

  // nie ma mlodziezowego slowa, ignorujemy
  await next();
});

bot.launch();

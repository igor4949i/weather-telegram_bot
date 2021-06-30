/* eslint-disable space-before-function-paren */
/* eslint-disable arrow-parens */
/* eslint-disable max-len */
/* eslint-disable indent */
/* eslint-disable object-curly-spacing */
/* eslint-disable semi */
const functions = require('firebase-functions')
const { Telegraf } = require('telegraf')
const axios = require('axios')
let config = require('./env.json')

if (Object.keys(functions.config()).length) {
  config = functions.config()
}

const params = {
  access_key: config.service.access_key,
};

const bot = new Telegraf(config.service.telegram_key)
bot.start((ctx) => ctx.reply('Welcome'))
bot.help((ctx) => ctx.reply('Send me a sticker'))
bot.on('sticker', (ctx) => ctx.reply('👍'))
bot.hears('hi', (ctx) => ctx.reply('Hey there'))

bot.on('text', (ctx) => {
  params.query = ctx.message.text

  axios.get('http://api.weatherstack.com/current', { params })
    .then(response => {
      const apiResponse = response.data;
      return ctx.reply(`
  Поточна температура у ${apiResponse.location.name} становить ${apiResponse.current.temperature}℃
      `)
    }).catch((error) => {
      console.log(error);
      return ctx.reply('Місто не знайдено', error)
    })
});


bot.launch();
// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.https.onRequest((request, response) => {

})

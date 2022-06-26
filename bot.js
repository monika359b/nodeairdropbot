const { Telegraf, session, Extra, Markup, Scenes, wizard } = require('telegraf');
const { BaseScene, Stage } = Scenes
const mongo = require('mongodb').MongoClient;
const { enter, leave } = Stage
const coinpayments = require('coinpayments');
const stage = new Stage();
const Scene = BaseScene
const bot = new Telegraf('5476547580:AAGhVC-IPnGoPJ-Tvob52Z5do222Z0Xk17U');
let channel1 = "@INRTRANSACTION";
let channel2 = "@hhgytryst";
var admin = '2031621826'
let db
function rndFloat(min, max) {
  return (Math.random() * (max - min + 1)) + min
}
function rndInt(min, max) {
  return Math.floor(rndFloat(min, max))
}
var ref_bonus = 5
var bot_cur = 'metacar'
var bot_name = 'Nodejs_airdrop_bot'

// const  bot = new Telegraf(data.bot_token)
mongo.connect('mongodb+srv://rohit:rohit@cluster0.idklavz.mongodb.net/?retryWrites=true&w=majority', { useUnifiedTopology: true }, (err, client) => {
  if (err) {
    console.log(err)
  }

  db = client.db('sfvddvzrsz')
  bot.telegram.deleteWebhook().then(success => {
    success && console.log('🤖 is listening to your commands')
    bot.launch()
  })
})
bot.use(session())
bot.use(stage.middleware())

const onCheck = new Scene('onCheck')
stage.register(onCheck)

const getWallet = new Scene('getWallet')
stage.register(getWallet)

const getMsg = new Scene('getMsg')
stage.register(getMsg)

const twiterhandle = new Scene('twiterhandle')
stage.register(twiterhandle)
const fbhandle = new Scene('fbhandle')
stage.register(fbhandle)
const adreshandle = new Scene('adreshandle')
stage.register(adreshandle)


const botStart = async (ctx) => {
  try {

    if (ctx.message.chat.type != 'private') {
      return
    }
    let dbData = await db.collection('allUsers').find({ userId: ctx.from.id }).toArray()
    let bData = await db.collection('vUsers').find({ userId: ctx.from.id }).toArray()

    let q1 = rndInt(1, 50)
    let q2 = rndInt(1, 50)
    let ans = q1 + q2

    if (bData.length === 0) {
      if (ctx.startPayload && ctx.startPayload != ctx.from.id) {
        let ref = ctx.startPayload * 1
        db.collection('pendUsers').insertOne({ userId: ctx.from.id, inviter: ref })
      } else {
        db.collection('pendUsers').insertOne({ userId: ctx.from.id })
      }

      db.collection('allUsers').insertOne({ userId: ctx.from.id, virgin: true, paid: false })
      db.collection('balance').insertOne({ userId: ctx.from.id, balance: 0})
      db.collection('checkUsers').insertOne({ userId: ctx.from.id, answer: ans })
      await ctx.replyWithMarkdown('➡️*Hi, before you start the bot, please prove you are human by answering the question below.*\nPlease answer: ' + q1 + ' + ' + q2 + ' =\n*Send your answer now*', { reply_markup: { keyboard: [['⚪️ Try Again']], resize_keyboard: true } })
      ctx.scene.enter('onCheck')
    } else {
      let joinCheck = await findUser(ctx)
      if (joinCheck) {
        let pData = await db.collection('pendUsers').find({ userId: ctx.from.id }).toArray()
        if (('inviter' in pData[0]) && !('referred' in dbData[0])) {
          let bal = await db.collection('balance').find({ userId: pData[0].inviter }).toArray()
          console.log(bal)
          var ref_bonus = 5

          var cal = bal[0].balance * 1
          var sen = ref_bonus * 1
          var see = cal + sen
          var bot_cur = 'tom'
          var bot_name = 'nodejsairdropbot'
          bot.telegram.sendMessage(pData[0].inviter, '➕ New Referral on your link you received 100 RichTom', { parse_mode: 'markdown' })
          db.collection('allUsers').updateOne({ userId: ctx.from.id }, { $set: { inviter: pData[0].inviter, referred: 'surenaa' } }, { upsert: true })
          db.collection('joinedUsers').insertOne({ userId: ctx.from.id, join: true })
          db.collection('balance').updateOne({ userId: pData[0].inviter }, { $set: { balance: see } }, { upsert: true })

          ctx.replyWithMarkdown(
            '*Hello ' + ctx.from.first_name + ' || Our Airdrop LittleI= Information *\n\n *Rich Tom Airdrops bot welcomes you , \n\n 1 richtom = $0.024$ \n Get 100 rich tom per refer* ', { reply_markup: { keyboard: [['📘 Submit my details']], resize_keyboard: true } }
          )

        } else {
          db.collection('joinedUsers').insertOne({ userId: ctx.from.id, join: true })


          ctx.replyWithMarkdown(
            '*Hello ' + ctx.from.first_name + ' || Our Airdrop LittleI= Information *\n\n *Rich Tom Airdrops bot welcomes you , \n\n 1 richtom = $0.024$ \n Get 100 rich tom per refer* ', { reply_markup: { keyboard: [['📘 Submit my details']], resize_keyboard: true } }
          )

        }
      } else {
        mustJoin(ctx)
      }
    }
  } catch (e) {
    sendError(e, ctx)
  }
}

bot.start(botStart)
bot.hears(['⬅️ Back', '🔙 back'], botStart)






bot.hears('⚪️ Try Again', async (ctx) => {
  try {
    let bData = await db.collection('vUsers').find({ userId: ctx.from.id }).toArray()

    if (bData.length === 0) {

      let q1 = rndInt(1, 50)
      let q2 = rndInt(1, 50)
      let ans = q1 + q2
      db.collection('checkUsers').updateOne({ userId: ctx.from.id }, { $set: { answer: ans } }, { upsert: true })

      await ctx.replyWithMarkdown('➡️*Hi, before you start the bot, please prove you are human by answering the question below.*\nPlease answer: ' + q1 + ' + ' + q2 + ' =\nSend your answer now', { reply_markup: { keyboard: [['⚪️ Try Again']], resize_keyboard: true } })
      ctx.scene.enter('onCheck')
    } else {
      starter(ctx)
      return
    }

  } catch (err) {
    sendError(err, ctx)
  }
})



onCheck.hears(['⚪️ Try Again', '/start'], async (ctx) => {
  try {

    let bData = await db.collection('vUsers').find({ userId: ctx.from.id }).toArray()

    if (bData.length === 0) {
      ctx.scene.leave('onCheck')


      let q1 = rndInt(1, 50)
      let q2 = rndInt(1, 50)
      let ans = q1 + q2
      db.collection('checkUsers').updateOne({ userId: ctx.from.id }, { $set: { answer: ans } }, { upsert: true })

      await ctx.replyWithMarkdown('➡️*Hi, before you start the bot, please prove you are human by answering the question below.*\nPlease answer: ' + q1 + ' + ' + q2 + ' =\nSend your answer now', { reply_markup: { keyboard: [['⚪️ Try Again']], resize_keyboard: true } })
      ctx.scene.enter('onCheck')
    } else {
      return
    }
  } catch (err) {
    sendError(err, ctx)
  }
})

onCheck.on('text', async (ctx) => {
  try {
    let dbData = await db.collection('checkUsers').find({ userId: ctx.from.id }).toArray()
    let bData = await db.collection('pendUsers').find({ userId: ctx.from.id }).toArray()
    let dData = await db.collection('allUsers').find({ userId: ctx.from.id }).toArray()
    let ans = dbData[0].answer * 1


    if (ctx.from.last_name) {
      valid = ctx.from.first_name + ' ' + ctx.from.last_name
    } else {
      valid = ctx.from.first_name
    }

    if (!isNumeric(ctx.message.text)) {
      ctx.replyWithMarkdown('😑 _I thought you were smarter than this, try again_ ')
    } else {
      if (ctx.message.text == ans) {
        db.collection('vUsers').insertOne({ userId: ctx.from.id, answer: ans, name: valid })
        ctx.deleteMessage()

        ctx.scene.leave('onCheck')
        let joinCheck = await findUser(ctx)
        if (joinCheck) {
          let pData = await db.collection('pendUsers').find({ userId: ctx.from.id }).toArray()
          if (('inviter' in pData[0]) && !('referred' in dData[0])) {
            let bal = await db.collection('balance').find({ userId: pData[0].inviter }).toArray()
            var ref_bonus = 5

            var cal = bal[0].balance * 1
            var sen = ref_bonus * 1
            var see = cal + sen
            var bot_cur = 'tom'
            var bot_name = 'nodejsairdropbot'
            bot.telegram.sendMessage(pData[0].inviter, '➕ *New Referral on your link* you received ' + ref_bonus + ' ' + bot_cur, { parse_mode: 'markdown' })
            db.collection('allUsers').updateOne({ userId: ctx.from.id }, { $set: { inviter: pData[0].inviter, referred: 'surenaa' } }, { upsert: true })
            db.collection('joinedUsers').insertOne({ userId: ctx.from.id, join: true })
            db.collection('balance').updateOne({ userId: pData[0].inviter }, { $set: { balance: see } }, { upsert: true })

            ctx.replyWithMarkdown(
              '*Hello ' + ctx.from.first_name + ' || Our Airdrop LittleI= Information *\n\n *Rich Tom Airdrops bot welcomes you , \n\n 1 richtom = $0.024$ \n Get 100 rich tom per refer* ', { reply_markup: { keyboard: [['📘 Submit my details']], resize_keyboard: true } }
            )

          } else {
            db.collection('joinedUsers').insertOne({ userId: ctx.from.id, join: true })



            ctx.replyWithMarkdown(
              '*Hello ' + ctx.from.first_name + ' || Our Airdrop LittleI= Information *\n\n *Rich Tom Airdrops bot welcomes you , \n\n 1 richtom = $0.024$ \n Get 100 rich tom per refer* ', { reply_markup: { keyboard: [['📘 Submit my details']], resize_keyboard: true } }
            )

          }
        } else {
          mustJoin(ctx)
        }
      } else {
        ctx.replyWithMarkdown(' _Wrong Answer! Try Again to get another question_')
      }
    }
  } catch (err) {
    sendError(err, ctx)
  }
})



// bot.hears('refer', async (ctx) => {
//   try {
//     if (ctx.message.chat.type != 'private') {
//       return
//     }
//     let bData = await db.collection('vUsers').find({ userId: ctx.from.id }).toArray()
//     if (bData.length === 0) {
//       return
//     }
//     var ref_bonus = 5
//     var bot_cur = 'tom'
//     var bot_name = 'nodejsairdropbot'
//     let allRefs = await db.collection('allUsers').find({ inviter: ctx.from.id }).toArray() // all invited users
//     ctx.reply(
//       '<b>👥 You Invited: </b>' + allRefs.length + ' referrals\n<b>🔗 Your referral link:</b> https://t.me/' + bot_name + '?start=' + ctx.from.id + '\n\n💰 <b>Per Referral ' + ref_bonus.toFixed(8) + ' ' + bot_cur + '</b> - <i>Share Your referral link to your Friends & earn unlimited ' + bot_cur + '</i>\n\n⚠️ <b>Note</b>\n<i>Fake, empty or spam users are deleted after checking.</i>', { parse_mode: 'html' })
//   } catch (err) {
//     sendError(err, ctx)
//   }
// })


// bot.hears('bala', async (ctx) => {
//   try {
//     let thisUsersData = await db.collection('balance').find({ userId: ctx.from.id }).toArray()
//     let sum
//     sum = thisUsersData[0].balance

//     ctx.reply('💰 *Your Account Balance:*   \n\n_' + sum + ' ' + bot_cur + '_', { parse_mode: 'markdown' })

//   } catch (error) {
//     console.log(error)
//   }
// })


bot.hears('🟢 Joined', async (ctx) => {
  try {
    let bData = await db.collection('vUsers').find({ userId: ctx.from.id }).toArray()
    if (bData.length === 0) {
      return
    }

    if (ctx.message.chat.type != 'private') {
      ctx.leaveChat()
      return
    }
    let pData = await db.collection('pendUsers').find({ userId: ctx.from.id }).toArray()
    let dData = await db.collection('allUsers').find({ userId: ctx.from.id }).toArray()
    let joinCheck = await findUser(ctx)
    if (joinCheck) {
      if (('inviter' in pData[0]) && !('referred' in dData[0])) {
        let bal = await db.collection('balance').find({ userId: pData[0].inviter }).toArray()
        var cal = bal[0].balance * 1
        var sen = ref_bonus * 1
        var see = cal + sen
        bot.telegram.sendMessage(pData[0].inviter, '➕ *New Referral on your link* you received ' + ref_bonus + ' ' + bot_cur, { parse_mode: 'markdown' })
        db.collection('allUsers').updateOne({ userId: ctx.from.id }, { $set: { inviter: pData[0].inviter, referred: 'surenaa' } }, { upsert: true })
        db.collection('joinedUsers').insertOne({ userId: ctx.from.id, join: true })
        db.collection('balance').updateOne({ userId: pData[0].inviter }, { $set: { balance: see } }, { upsert: true })
        ctx.replyWithMarkdown(
          '*Hello ' + ctx.from.first_name + ' || Our Airdrop LittleI= Information *\n\n *Rich Tom Airdrops bot welcomes you , \n\n 1 richtom = $0.024$ \n Get 100 rich tom per refer* ', { reply_markup: { keyboard: [['📘 Submit my details']], resize_keyboard: true } }
        )
      } else {
        db.collection('joinedUsers').insertOne({ userId: ctx.from.id, join: true })
        ctx.replyWithMarkdown(
          '*Hello ' + ctx.from.first_name + ' || Our Airdrop LittleI= Information *\n\n *Rich Tom Airdrops bot welcomes you , \n\n 1 richtom = $0.024$* \n* Get 100 rich tom per refer* ', { reply_markup: { keyboard: [['📘 Submit my details']], resize_keyboard: true } }
        )
      }
    } else {
      mustJoin(ctx)
    }
  } catch (err) {
    sendError(err, ctx)
  }

})

bot.hears('📘 Submit my details', ctx => {
  var forjoinairdrop = '*Hello ' + ctx.from.first_name + ' || Our Airdrop Information : *\n\n*🎎 RichTom Airdrop Bot Welcomes you*\n\n*🔸 1 RICHTOM = $0.02\n🔸 Get 1000 RICHTOM = $20  when you join\n🔸 Get 100 RICHTOM = $2  for every valid referral*\n\n *Join Our* [Telegram Channel](https://t.me/fortniteairdrop)\n*Join Our* [Telegram Group](https://t.me/fortniteairdrop)\n\n* By Participating you are agreeiing to the richtom airdrops terms and condotion. Plesase see the pinned post for more inforation.*\n\n* Click On check button to continue*'
  ctx.replyWithMarkdown(forjoinairdrop, { disable_web_page_preview: true, reply_markup: { keyboard: [['✅ Check']], resize_keyboard: true } })
})


// bot.hears('Check' , async ctx => {
//   let res = await bot.telegram.getChatMember('@fortniteairdrop', ctx.from.id)
//         let result = res.status
//         if ((result == 'creator' || result == 'administrator' || result == 'member')){

//           let aftercheck = '*Hello '+ctx.from.first_name+' || now *\n\n* Follow Our*[Twiter Handel](https://t.me/fortniteairdrop)\n\n *Submit Your Twitter Profile Link*'
//         ctx.replyWithMarkdown(aftercheck , {disable_web_page_preview : true })
//         ctx.scene.enter('twiterhandle')
//         }else{
//           ctx.replyWithMarkdown('*You Must Join our channel')
//         }
//       var regex = new RegExp('.*')
//         twiterhandle.hears(regex , async (ctx) => {
//         var first = db.collection('UserInformation').find({userId: ctx.from.id})
//         if (first.length == 0){
//         db.collection('UserInformation').insertOne({userId: ctx.from.id , twiter : ctx.message.text})
//         ctx.reply('data inserted')
//       }else{
//         db.collection('UserInformation').updateOne({userId: ctx.from.id}, {$set: {twiter: ctx.message.text}}, {upsert: true})
//         ctx.reply('dtaat updated')

//       } 

//           // await ctx.replyWithMarkdown('recieved your name as ' + ctx.message.text)
//           await ctx.scene.leave();
//         })
// })
bot.hears('✅ Check', async ctx => {
  let res = await bot.telegram.getChatMember('@fortniteairdrop', ctx.from.id)
  let result = res.status
  if ((result == 'creator' || result == 'administrator' || result == 'member')) {
    ctx.scene.enter('twiterhandle')
    await ctx.replyWithMarkdown('*📁Hello ' + ctx.from.first_name + ' || now *\n\n *🔹Follow Our*[Twiter Handel](https://twitter.com/fortniteairdrop)\n🔹*Retweet Pinned Post And Like *\n\n *📝 Submit your Twitter profile link*\n(Example: https://www.twitter.com/yourusername)', { disable_web_page_preview: true, reply_markup: { remove_keyboard: true } })
  } else {
    ctx.replyWithMarkdown('*You Must Join our channel*')
  }
})

twiterhandle.on('text', async (ctx) => {
  var first = await db.collection('balance').find({ userId: ctx.from.id })
  if (first.length == 0) {
    await db.collection('balance').insertOne({ userId: ctx.from.id, twiter: ctx.message.text })
  } else {
    await db.collection('balance').updateOne({ userId: ctx.from.id }, { $set: { twiter: ctx.message.text } }, { upsert: true })

  }
  ctx.scene.leave();
  await ctx.replyWithMarkdown('*📁Hello ' + ctx.from.first_name + ' || now *\n\n *🔹Follow Our*[Facebook Handel](https://t.me/fortniteairdrop)\n\n *Submit Your  Facebook Profile Link*', { disable_web_page_preview: true, reply_markup: { remove_keyboard: true } })
  ctx.scene.enter('fbhandle');

})

fbhandle.on('text', async (ctx) => {
  var second = await db.collection('balance').find({ userId: ctx.from.id })
  if (second.length == 0) {
    db.collection('balance').insertOne({ userId: ctx.from.id, fbhandle: ctx.message.text })
  } else {
    db.collection('balance').updateOne({ userId: ctx.from.id }, { $set: { fbhandle: ctx.message.text } }, { upsert: true })
  }
  ctx.scene.leave();
  await ctx.replyWithMarkdown('*Submit BEP20 Address (Binance Chain)*\n\n _You can find this wallet address on Trustwallet (❌ Dont use Binance or other exchanges Address)_', { disable_web_page_preview: true, reply_markup: { remove_keyboard: true } })
  ctx.scene.enter('adreshandle');
})
adreshandle.on('text', async (ctx) => {
  var second = await db.collection('balance').find({ userId: ctx.from.id })
  if (second.length == 0) {
    db.collection('balance').insertOne({ userId: ctx.from.id, Address: ctx.message.text })
  } else {
    db.collection('balance').updateOne({ userId: ctx.from.id }, { $set: { address: ctx.message.text } }, { upsert: true })
  }
  ctx.scene.leave();
  await ctx.replyWithMarkdown('*📁Hello ' + ctx.from.first_name + ' || now *\n\n *Follow Our*[Promoter channel](https://t.me/fortniteairdrop)\n\n *Submit Your Twitter Profile Link*', { disable_web_page_preview: true, reply_markup: { keyboard: [['☑️ Done'], ['Skip']] , resize_keyboard: true }})
})
bot.hears(['☑️ Done','📊 Statistics' , 'Skip'] , async ctx => {
  let maindata = await db.collection('balance').find({ userId: ctx.from.id }).toArray()
  let twiter = maindata[0].twiter
  let  fb = maindata[0].fbhandle
  let address = maindata[0].address
  let sum =  maindata[0].balance
 ctx.replyWithMarkdown('*👋Hello '+ctx.from.first_name+' || Here is your statics*\n\n💰Airdrop Reward Bonus Balance :* 1000 TOM*\n\n*📊Refferal Balance '+sum+' *\n\n *👨‍✈️Your telegram Name* -'+ctx.from.first_name+' \n\n *📪Your Twiter Link *:'+twiter+'\n\n*📱Your facebook link* : '+fb+'\n\n*🏦Your Bep20 Wallet Address*: '+address+'\n\n _If your submitted data wrong then you can restart the bot and resubmit the data again by clicking /start before airdrop end._' , { reply_markup: { keyboard: [['📊 Statistics','📎 Referral Link']] , resize_keyboard: true }})
})
bot.hears('📎 Referral Link' , async  ctx => {
  let allRefs = await db.collection('allUsers').find({ inviter: ctx.from.id }).toArray() // all invited users
  ctx.replyWithMarkdown('*🎀Congratulations '+ctx.from.first_name+'||*\n\n* 🎉 Share This link to earn per  refer 5 tom *\n\n*⛅️Your refer Link *:- https://t.me/' + bot_name + '?start=' + ctx.from.id + ' \n\n *▪️Your Total Referrals* :- ' + allRefs.length + '\n\n_⚠️ Note: Dont submit any Wrong information. If you try to cheat/fraud, Your payment will not be made in distribution time._')
})
















function sendError(err, ctx) {
  ctx.reply('An Error Happened ☹️: ' + err.message)
  bot.telegram.sendMessage(admin, `Error From [${ctx.from.first_name}](tg://user?id=${ctx.from.id}) \n\nError: ${err}`, { parse_mode: 'markdown' })
}


function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
async function findUser(ctx) {
  let isInChannel = true;
  let cha = '@demobotnode'
  for (let i = 0; i < cha.length; i++) {
    const chat = '@demobotnode'
    let tgData = await bot.telegram.getChatMember(chat, ctx.from.id)

    const sub = ['creator', 'adminstrator', 'member'].includes(tgData.status)
    if (!sub) {
      isInChannel = false;
      break;
    }
  }
  return isInChannel
}
function mustJoin(ctx) {

  msg = '\n\n<b>Click 🟢 Joined to continue join @demobotnode</b>'
  ctx.replyWithHTML(msg, {
    reply_markup: {
      keyboard: [['🟢 Joined']],
      resize_keyboard: true
    }
  })
}

function starter(ctx) {
  ctx.replyWithMarkdown(
    '*🏠 Main Menu ok *',
  )

}

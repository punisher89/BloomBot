"◎☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱( Ⓒ𝐁𝐥𝐨𝐨𝐦𝐁𝐨𝐭 (𝐦𝐮𝐥𝐭𝐢-𝐝𝐞𝐯𝐢𝐜𝐞) 𝐛𝐲 𝐌𝐚𝐠𝐧𝐞𝐮𝐦™ )☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱◎";
//  ╔⧉༻ Ⓒ𝐁𝐥𝐨𝐨𝐦𝐁𝐨𝐭 (𝐦𝐮𝐥𝐭𝐢-𝐝𝐞𝐯𝐢𝐜𝐞) 𝐛𝐲 𝐌𝐚𝐠𝐧𝐞𝐮𝐦™
//  ║>>  is a whatsapp user-bot with automation, moderation, music, games and more of 200+ commands!
//  ║
//  ║
//  ║⦁> 🌟 A versatile whatsApp multi-purpose bot designed for group management and user convenience.
//  ║⦁> 🚀 Simplifies group management tasks and enhances the overall user experience.
//  ║⦁> ⚠️ Please note: Engaging in spamming activities may lead to account suspension. Use responsibly!
//  ║⦁> 🎉 BloomBot is intended for fun and convenience, but we're not responsible for account bans.
//  ║⦁> 🔀 forking the repository is allowed, but customized versions or modified plugins are unsupported.
//  ║⦁> ⚠️ Exercise caution and take responsibility for any modifications made to the bot.
//  ║⦁> 📞 Need assistance or have issues? Contact our developers.
//  ║⦁> 🔄 We'll continue providing updates and support for the original version of the bot.
//  ║⦁> 👉 Enjoy the features and functionality of BloomBot responsibly! Make the most out of your
//  ║    whatsApp group management experience! 🎉
//  ║
//  ║     🚨𝐔𝐬𝐚𝐠𝐞 𝐍𝐨𝐭𝐢𝐜𝐞🚨
//  ║⦁>    ⒸBloomBot is in no way affiliated with, authorized, maintained,
//  ║⦁>    sponsored or endorsed by whatsApp or any of its affiliates or
//  ║⦁>    subsidiaries. This is an independent and unofficial software.
//  ║⦁>    Use at your own risk.
//  ║
//  ╚◎ ⚙️Developers: +918436686758, +918250889325
"◎☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱( Ⓒ𝐁𝐥𝐨𝐨𝐦𝐁𝐨𝐭 (𝐦𝐮𝐥𝐭𝐢-𝐝𝐞𝐯𝐢𝐜𝐞) 𝐛𝐲 𝐌𝐚𝐠𝐧𝐞𝐮𝐦™ )☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱◎";
require("@/config/index.js");

module.exports = async (BloomBot, store, logger) => {
  BloomBot.ev.on("group-participants.update", async (update) => {
    let metadata = await BloomBot.groupMetadata(update.id);
    let participants = update.participants;
    logger.info(update);
    for (let sperson of participants) {
      let imåge;
      try {
        imåge = await BloomBot.profilePictureUrl(sperson, "image");
      } catch {
        imåge = BloomBot.display;
      }

      let buffer = Buffer.isBuffer(imåge)
        ? imåge
        : /^data:.*?\/.*?;base64,/i.test(imåge)
        ? Buffer.from(imåge.split(",")[1], "base64")
        : /^https?:\/\//.test(imåge)
        ? await BloomBot.getBuffer(imåge)
        : BloomBot.fs.existsSync(imåge)
        ? BloomBot.fs.readFileSync(imåge)
        : Buffer.alloc(0);

      let action = update.action;
      let mentions = sperson;

      switch (action) {
        case "add":
          await BloomBot.sendMessage(chatkey.chat, {
            image: buffer,
            caption: `*🌻 Welcome to the Group! 🌻*\n\n👋 Hi @${sperson.replace(
              /['@s whatsapp.net']/g,
              ""
            )}!\n\n✨ Congratulations on finding your way to this awesome group! I'm BloomBot, your cheerful WhatsApp bot here to assist you.\n\n🎉 Get ready to have fun, learn, and connect with other amazing individuals. If you ever have any questions or need assistance, don't hesitate to ask.\n\n📚 To get started, you can type ${
              BloomBot.prefix
            }menu or use the buttons below to explore different features.\n\n🌼 *Buttons:*\n1. ${
              BloomBot.prefix
            }Git - Access the GitHub page.\n2. ${
              BloomBot.prefix
            }Menu - Access the command menu.\n3. ${
              BloomBot.prefix
            }Dashboard - Access the dashboard.\n4. ${
              BloomBot.prefix
            }home - Learn more about BloomBot.\n\n🌈 Let's make this group a vibrant and engaging community together!\n*Ⓒ BloomBot by Magneum™*\n*💻 homepage:* bit.ly/magneum`,
            mentions: mentions,
          }).catch((e) => console.log(e));
          break;

        case "remove":
          await BloomBot.sendMessage(chatkey.chat, {
            image: buffer,
            caption: `*🌻 Farewell! 🌻*\n\n👋 @${sperson.replace(
              /['@s whatsapp.net']/g,
              ""
            )}, we're sad to see you leave.\n\n😔 Although you won't be with us in the group anymore, your presence and contributions will be missed. We hope you had a great time here and wish you all the best on your future endeavors.\n\n✨ Remember, the door is always open for you. If you ever decide to come back, we'll be here to welcome you with open arms.\n\n🌈 Take care and stay amazing!\n*Ⓒ BloomBot by Magneum™*\n*💻 homepage:* bit.ly/magneum`,
            mentions: mentions,
          }).catch((e) => console.log(e));
          break;

        default:
          break;
      }
    }
  });
  return BloomBot;
};

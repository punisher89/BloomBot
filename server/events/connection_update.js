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
const { Boom } = require("@hapi/boom");
const { exec } = require("child_process");
const dbdata = require("@/config/dbdata.js");
const purgepg = require("@/client/purgepg.js");
const { DisconnectReason } = require("@whiskeysockets/baileys");

module.exports = async (BloomBot, magneum, logger) => {
  const dbrem = async () => {
    if (dbdata.DATABASE_URL.includes("postgres")) {
      try {
        await purgepg();
      } catch (error) {
        logger.error("❌ Error occurred while purging the database: ", error);
      }
      process.exit(0);
    } else {
      exec("rm -rf ./server/database/sql/auth.db");
      process.exit(0);
    }
  };

  BloomBot.ev.on("connection.update", async (update) => {
    const {
      qr,
      connection,
      isNewLogin,
      lastDisconnect,
      receivedPendingNotifications,
    } = update;

    switch (connection) {
      case "connecting":
        logger.info("📢 Connecting to WhatsApp.");
        break;
      case "open":
        logger.info("📢 Login successful! Connection to WhatsApp established.");
        break;
      case "close":
        let reason = new Boom(lastDisconnect?.error)?.output.statusCode;
        logger.info(reason);
        switch (reason) {
          case DisconnectReason.badSession:
            logger.error("❌ Bad Session File detected.");
            await dbrem();
            await magneum();
            break;
          case DisconnectReason.connectionClosed:
            logger.error(
              "❌ Connection closed unexpectedly. Reconnecting to WhatsApp."
            );
            await magneum();
            break;
          case DisconnectReason.connectionLost:
            logger.error(
              "❌ Connection lost from the server. Reconnecting to WhatsApp."
            );
            await magneum();
            break;
          case DisconnectReason.connectionReplaced:
            logger.error(
              "❌ Connection replaced. Another new session is opened. Please close the current session first before establishing a new connection."
            );
            break;
          case DisconnectReason.loggedOut:
            logger.error(
              "❌ Device logged out. Please scan again and run the program to establish a new session."
            );
            await dbrem();
            await magneum();
            break;
          case DisconnectReason.restartRequired:
            logger.debug("🐞 Restart required. Restarting the program.");
            await magneum();
            break;
          case DisconnectReason.timedOut:
            logger.error("❌ Connection timed out. Reconnecting to WhatsApp.");
            await magneum();
            break;
          default:
            logger.error("❌ Unknown DisconnectReason: " + reason, connection);
            await dbrem();
            await magneum();
            break;
        }
        break;
      case true:
        logger.debug("📢 User is online. WhatsApp connection is active.");
        break;
      case false:
        logger.error("📢 User is offline. WhatsApp connection is inactive.");
        break;
      default:
        if (receivedPendingNotifications === true) {
          logger.debug("📢 Received pending notifications. Processing.");
        } else if (receivedPendingNotifications === false) {
          logger.error("📢 No pending notifications received.");
        } else if (isNewLogin === true) {
          logger.debug(
            "📢 New login detected. User has successfully logged in."
          );
        } else if (isNewLogin === false) {
          logger.error("📢 User is not performing a new login.");
        } else if (qr) {
          logger.info(
            "QR code received. Please scan the following QR code to log in:"
          );
          console.log(qr);
        } else {
          logger.info("📢 Connection event received:", update);
        }
        break;
    }
  });

  return BloomBot;
};

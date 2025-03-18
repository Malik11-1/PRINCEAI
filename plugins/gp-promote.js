var handler = async (m, { conn, usedPrefix, command, text }) => {

  if (isNaN(text) && !text.match(/@/g)) {
    // If the input is not a number and does not contain an @ symbol
  } else if (isNaN(text)) {
    var number = text.split`@`[1]; // Extract the number after the @ symbol
  } else if (!isNaN(text)) {
    var number = text; // If input is a number
  }

  if (!text && !m.quoted) 
    return conn.reply(m.chat, `🚩 *Please respond to a group member to assign them as admin.*`, m, rcanal);

  if (number.length > 13 || (number.length < 11 && number.length > 0)) 
    return conn.reply(m.chat, `✨️ *You must reply to or mention a person to use this command.*`, m, fwc);

  try {
    if (text) {
      var user = number + '@s.whatsapp.net'; // Assign the WhatsApp user ID
    } else if (m.quoted.sender) {
      var user = m.quoted.sender; // Get the sender from the quoted message
    } else if (m.mentionedJid) {
      var user = number + '@s.whatsapp.net'; // Assign the mentioned user
    }
  } catch (e) {
    // Handle errors gracefully
  } finally {
    conn.groupParticipantsUpdate(m.chat, [user], 'promote'); // Promote the user to admin
    conn.reply(m.chat, `✅ *Successfully promoted as group admin.*`, m, fwc);
  }
};

handler.help = ['promote'];
handler.tags = ['group'];
handler.command = ['promote', 'makeadmin', 'p'];

handler.group = true; // Command works only in groups
handler.admin = true; // The user running the command must be an admin
handler.botAdmin = true; // The bot must be an admin
handler.fail = null;

export default handler;

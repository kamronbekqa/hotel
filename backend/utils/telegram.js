import dotenv from 'dotenv';
dotenv.config();

/**
 * Sends a notification message to the configured Telegram chat
 * @param {string} message - The message to send
 * @returns {Promise<boolean>} - Success status
 */
export const sendTelegramMessage = async (message) => {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.warn('Telegram Bot Token or Chat ID not configured. Notification skipped.');
    return false;
  }

  try {
    const url = `https://api.telegram.org/bot${token}/sendMessage`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML',
      }),
    });

    const data = await response.json();
    
    if (!data.ok) {
      console.error('Telegram API Error:', data.description);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Failed to send Telegram message:', error);
    return false;
  }
};

/**
 * Formats a booking object into a readable Telegram message
 * @param {Object} booking - The booking object from database
 * @returns {string} - Formatted HTML message
 */
export const formatBookingMessage = (booking) => {
  const checkIn = new Date(booking.checkIn).toLocaleDateString();
  const checkOut = new Date(booking.checkOut).toLocaleDateString();
  
  return `
🏡 <b>Yangi Bron!</b>

👤 <b>Mijoz:</b> ${booking.name}
📞 <b>Telefon:</b> ${booking.phone || 'Ko\'rsatilmagan'}
✉️ <b>Email:</b> ${booking.email}

📍 <b>Dacha:</b> ${booking.dachaId?.title || 'Noma\'lum'}
💵 <b>Narxi:</b> $${booking.dachaId?.price || 0} / kun

📅 <b>Sana:</b> ${checkIn} — ${checkOut}
👥 <b>Mehmonlar:</b> ${booking.guests} kishi

💬 <b>Xabar:</b> <i>${booking.message || 'Yo\'q'}</i>

✅ <i>Tasdiqlash uchun admin panelga o'ting.</i>
  `.trim();
};

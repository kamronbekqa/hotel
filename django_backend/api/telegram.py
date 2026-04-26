import os
import requests
from django.conf import settings

def send_telegram_message(message):
    token = '8738276484:AAGNcPudaPY_ZkQ8m0oGUhBqyHi6SqxMZCs'
    chat_id = '6001392724'

    if not token or not chat_id:
        print('Telegram Bot Token or Chat ID not configured. Notification skipped.')
        return False

    url = f"https://api.telegram.org/bot{token}/sendMessage"
    payload = {
        'chat_id': chat_id,
        'text': message,
        'parse_mode': 'HTML',
    }

    try:
        response = requests.post(url, json=payload)
        response.raise_for_status()
        data = response.json()
        if not data.get('ok'):
            print('Telegram API Error:', data.get('description'))
            return False
        return True
    except requests.RequestException as e:
        print('Failed to send Telegram message:', e)
        return False

def format_booking_message(booking):
    check_in = booking.check_in.strftime('%d.%m.%Y')
    check_out = booking.check_out.strftime('%d.%m.%Y')
    
    dacha_title = booking.dacha.title if booking.dacha else "Noma'lum"
    dacha_price = booking.dacha.price if booking.dacha else 0

    message = f"""
🏡 <b>Yangi Bron!</b>

👤 <b>Mijoz:</b> {booking.name}
📞 <b>Telefon:</b> {booking.phone or "Ko'rsatilmagan"}
✉️ <b>Email:</b> {booking.email or "Ko'rsatilmagan"}

📍 <b>Dacha:</b> {dacha_title}
💵 <b>Narxi:</b> ${dacha_price} / kun

📅 <b>Sana:</b> {check_in} — {check_out}
👥 <b>Mehmonlar:</b> {booking.guests} kishi

💬 <b>Xabar:</b> <i>{booking.message or "Yo'q"}</i>

✅ <i>Tasdiqlash uchun admin panelga o'ting.</i>
"""
    return message.strip()

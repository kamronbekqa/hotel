import React, { useState, useEffect } from 'react';
import { Bot, X, MessageCircle, HelpCircle } from 'lucide-react';
import './AssistantBot.css';

const AssistantBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTip, setCurrentTip] = useState(0);
  const [showNotification, setShowNotification] = useState(false);

  const tips = [
    "Xush kelibsiz! Nook AI yordamchisiman. 👋",
    "3D dachani aylantirish uchun sichqonchadan foydalaning! 🔄",
    "Yaqinlashtirish (Zoom) uchun wheelni aylantiring. 🔍",
    "Tog' havosi va zamonaviy dachalardan zavqlaning! 🏔️",
    "Bizda 6 ta eksklyuziv dacha mavjud. Ularni 'Stays'da ko'ring! 🏠",
    "Admin panelga kirish uchun /admin sahifasiga o'ting. 🔑",
    "Savollaringiz bo'lsa, men har doim shu yerdaman! ✨"
  ];

  useEffect(() => {
    // Show notification and auto-open after a delay
    const notifyTimer = setTimeout(() => setShowNotification(true), 2000);
    const openTimer = setTimeout(() => setIsOpen(true), 5000);
    
    return () => {
      clearTimeout(notifyTimer);
      clearTimeout(openTimer);
    };
  }, []);

  const nextTip = () => {
    setCurrentTip((prev) => (prev + 1) % tips.length);
  };

  return (
    <div className="assistant-container">
      {/* Robot Trigger */}
      <div 
        className={`robot-icon ${showNotification ? 'bounce' : ''}`} 
        onClick={() => {
            setIsOpen(!isOpen);
            setShowNotification(false);
        }}
      >
        <div className="robot-head">
          <div className="robot-eyes">
            <div className="eye"></div>
            <div className="eye"></div>
          </div>
        </div>
        {!isOpen && showNotification && (
          <div className="notification-badge">1</div>
        )}
      </div>

      {/* Speech Bubble / Chat Interface */}
      {isOpen && (
        <div className="assistant-bubble">
          <button className="close-bot" onClick={() => setIsOpen(false)}>
            <X size={16} />
          </button>
          <div className="bubble-content">
            <div className="bot-name">Nook AI Helper</div>
            <p>{tips[currentTip]}</p>
            <div className="bubble-actions">
              <button onClick={nextTip} className="next-tip-btn">
                Keyingi maslahat
              </button>
            </div>
          </div>
          <div className="bubble-tail"></div>
        </div>
      )}
    </div>
  );
};

export default AssistantBot;

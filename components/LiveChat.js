import { useState, useEffect, useRef } from 'react'
import styles from './LiveChat.module.css'

const USERNAMES = [
  'starwatcher99','techfan2026','xXnightOwlXx','LiveStreamKing',
  'SakuraTanaka','MiguelCruz_','AmeliaDubois','ZaraOkonkwo',
  'BoJackson4','codewitch_','priya_streams','hyperwave42',
]
const BOT_MSGS = [
  "This stream quality is incredible 🔥",
  "Welcome everyone! Grab your popcorn 🍿",
  "Anyone else getting goosebumps right now?",
  "The production value here is insane!",
  "Let's goooo! Been waiting for this all week",
  "Sound quality is perfect tonight 👌",
  "This is way better than I expected",
  "Shoutout from Mumbai! 🇮🇳",
  "First time here — already subscribed!",
  "The crowd energy is unreal rn",
  "4K stream no lag, respect to the tech team",
  "Who else is watching from Asia? 🌏",
  "Absolutely legendary performance fr",
  "My whole family is watching together!",
  "Can we get this to 100K viewers??",
  "Stream is silky smooth tonight",
  "This is going to be clip of the year 🏆",
  "POV you discovered this stream at midnight 😂",
]

const USER_COLORS = [
  '#a78bfa','#34d399','#f472b6','#60a5fa',
  '#fbbf24','#fb7185','#4ade80','#38bdf8',
]

let msgCounter = 0

function makeMsg(text, user, isOwn = false) {
  msgCounter++
  return {
    id: `${Date.now()}-${msgCounter}`,
    user: user || USERNAMES[msgCounter % USERNAMES.length],
    text,
    time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    color: isOwn ? '#7857ff' : USER_COLORS[msgCounter % USER_COLORS.length],
    isOwn,
  }
}

export default function LiveChat() {
  const [msgs, setMsgs] = useState(() =>
    Array.from({ length: 10 }, (_, i) => makeMsg(BOT_MSGS[i], null))
  )
  const [input, setInput] = useState('')
  const [viewerCount, setViewerCount] = useState(14200)
  const messagesRef = useRef(null)
  const counterRef = useRef(msgs.length)

  useEffect(() => {
    const id = setInterval(() => {
      const idx = counterRef.current
      setMsgs(prev => {
        const next = [...prev, makeMsg(BOT_MSGS[idx % BOT_MSGS.length], null)]
        counterRef.current = idx + 1
        return next.length > 120 ? next.slice(-100) : next
      })
      setViewerCount(v => v + Math.floor(Math.random() * 6) - 2)
    }, 2600)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    if (!messagesRef.current) return
    messagesRef.current.scrollTo({ top: messagesRef.current.scrollHeight, behavior: 'smooth' })
  }, [msgs])

  const send = () => {
    const text = input.trim()
    if (!text) return
    setMsgs(prev => [...prev, makeMsg(text, 'You', true)])
    setInput('')
  }

  return (
    <div className={styles.chat}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <span className={styles.liveDot} />
          <span className={styles.title}>Live Chat</span>
        </div>
        <span className={styles.viewers}> 
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
            <circle cx="12" cy="12" r="3"/>
          </svg>
          {viewerCount.toLocaleString()}
        </span>
      </div>

      <div className={styles.messages} ref={messagesRef}>
        {msgs.map(m => (
          <div key={m.id} className={`${styles.msg} ${m.isOwn ? styles.ownMsg : ''}`}>
            <span className={styles.user} style={{ color: m.color }}>{m.user}</span>
            <span className={styles.text}>{m.text}</span>
            <span className={styles.time}>{m.time}</span>
          </div>
        ))}
      </div>

      <div className={styles.inputArea}>
        <input
          className={styles.input}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
          placeholder="Say something..."
          maxLength={200}
        />
        <button className={styles.sendBtn} onClick={send} aria-label="Send message">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"/>
            <polygon points="22 2 15 22 11 13 2 9 22 2"/>
          </svg>
        </button>
      </div>
    </div>
  )
}

import { useState } from 'react'
import { useRouter } from 'next/router'
import { TAG_META } from '../data/events'
import styles from './EventCard.module.css'

function Tag({ label }) {
  const meta = TAG_META[label] || { bg: '#222', text: '#aaa', dot: '#aaa' }
  return (
    <span className={styles.tag} style={{ background: meta.bg, color: meta.text }}>
      <span className={styles.tagDot} style={{ background: meta.dot }} />
      {label}
    </span>
  )
}

function HeartBtn({ liked, onToggle }) {
  const [animating, setAnimating] = useState(false)
  const handle = (e) => {
    e.stopPropagation()
    setAnimating(true)
    setTimeout(() => setAnimating(false), 400)
    onToggle()
  }
  return (
    <button
      className={`${styles.iconBtn} ${liked ? styles.liked : ''} ${animating ? styles.heartAnim : ''}`}
      onClick={handle}
      title="Like"
      aria-label={liked ? 'Unlike' : 'Like'}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill={liked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    </button>
  )
}

function ShareBtn({ title }) {
  const [copied, setCopied] = useState(false)
  const handle = (e) => {
    e.stopPropagation()
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }
  return (
    <button
      className={`${styles.iconBtn} ${copied ? styles.shared : ''}`}
      onClick={handle}
      title="Share"
      aria-label="Share event"
    >
      {copied ? (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      ) : (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
        </svg>
      )}
    </button>
  )
}

export default function EventCard({ event, liked, onLike }) {
  const router = useRouter()

  const handleView = (e) => {
    e.preventDefault()
    router.push(`/event/${event.id}`)
  }

  const viewersLabel = event.viewers >= 1000
    ? `${(event.viewers / 1000).toFixed(1)}K`
    : event.viewers

  return (
    <article className={styles.card} onClick={handleView} role="button" tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleView(e)}
      aria-label={`View ${event.title}`}
    >
      <div className={styles.imgWrap}>
        <img
          src={event.img}
          alt={event.title}
          className={styles.img}
          loading="lazy"
        />
        <div className={styles.imgOverlay} />

        <div className={styles.topLeft}>
          {event.tags.map(t => <Tag key={t} label={t} />)}
        </div>

        <div className={styles.topRight}>
          <span className={styles.liveBadge}>
            <span className={styles.liveDot} />
            {viewersLabel} watching
          </span>
        </div>

        <div className={styles.bottomLeft}>
          <span className={styles.categoryBadge}>{event.category}</span>
        </div>

        <div className={styles.playOverlay}>
          <div className={styles.playBtn}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5,3 19,12 5,21"/>
            </svg>
          </div>
        </div>
      </div>

      <div className={styles.body}>
        <h3 className={styles.title}>{event.title}</h3>

        <div className={styles.meta}>
          <span className={styles.metaItem}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            {event.date}
          </span>
          <span className={styles.metaDivider} />
          <span className={styles.metaItem}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
            </svg>
            {event.time}
          </span>
        </div>

        <div className={styles.actions}>
          <div className={styles.actionLeft}>
            <HeartBtn liked={liked} onToggle={() => onLike(event.id)} />
            <ShareBtn title={event.title} />
          </div>
          <button
            className={styles.watchBtn}
            onClick={handleView}
            aria-label={`Watch ${event.title}`}
          >
            Watch Live
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </button>
        </div>
      </div>
    </article>
  )
}

import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Navbar from '../../components/Navbar'
import LiveChat from '../../components/LiveChat'
import { EVENTS, TAG_META } from '../../data/events'
import styles from '../../styles/Event.module.css'

function Tag({ label }) {
  const meta = TAG_META[label] || { bg: '#222', text: '#aaa', dot: '#aaa' }
  return (
    <span className={styles.tag} style={{ background: meta.bg, color: meta.text }}>
      <span className={styles.tagDot} style={{ background: meta.dot }} />
      {label}
    </span>
  )
}

export default function EventPage({ event }) {
  const router = useRouter()
  const [liked, setLiked] = useState(false)
  const [copied, setCopied] = useState(false)

  if (router.isFallback || !event) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner} />
        <p>Loading event…</p>
      </div>
    )
  }

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(typeof window !== 'undefined' ? window.location.href : '')
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const stats = [
    { label: 'Live Viewers', value: `${(event.viewers / 1000).toFixed(1)}K` },
    { label: 'Category', value: event.category },
    { label: 'Date', value: event.date },
    { label: 'Start Time', value: event.time },
    { label: 'Hosted By', value: event.host },
  ]

  const relatedEvents = EVENTS.filter(e => e.id !== event.id && e.category === event.category).slice(0, 3)

  return (
    <>
      <Head>
        <title>{event.title} — StreamFest</title>
        <meta name="description" content={event.desc} />
        <meta property="og:title" content={event.title} />
        <meta property="og:image" content={event.img} />
      </Head>

      <Navbar />

      <main className={styles.main}>
        <div className={styles.breadcrumb}>
          <Link href="/" className={styles.breadLink}>← All Events</Link>
          <span className={styles.breadSep}>/</span>
          <span className={styles.breadCurrent}>{event.title}</span>
        </div>

        <div className={styles.streamLayout}>
          {/* LEFT: Video + Info */}
          <div className={styles.leftCol}>
            {/* Video Player */}
            <div className={styles.videoWrap}>
              <iframe
                className={styles.videoIframe}
                src={`https://www.youtube.com/embed/${event.videoId}?rel=0&modestbranding=1&color=white`}
                title={event.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>

            {/* Title Row */}
            <div className={styles.titleRow}>
              <div className={styles.titleLeft}>
                <div className={styles.tags}>
                  {event.tags.map(t => <Tag key={t} label={t} />)}
                </div>
                <h1 className={styles.title}>{event.title}</h1>
                <div className={styles.metaRow}>
                  <span className={styles.metaChip}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/>
                      <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                    {event.date}
                  </span>
                  <span className={styles.metaChip}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                    </svg>
                    {event.time}
                  </span>
                  <span className={styles.metaChip}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                    </svg>
                    {(event.viewers / 1000).toFixed(1)}K watching
                  </span>
                  <span className={styles.metaChip}>{event.category}</span>
                </div>
              </div>

              <div className={styles.actionBtns}>
                <button
                  className={`${styles.actionBtn} ${liked ? styles.likedBtn : ''}`}
                  onClick={() => setLiked(p => !p)}
                  aria-label={liked ? 'Unlike' : 'Like'}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill={liked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                  {liked ? 'Liked' : 'Like'}
                </button>

                <button
                  className={`${styles.actionBtn} ${copied ? styles.copiedBtn : ''}`}
                  onClick={handleShare}
                  aria-label="Share"
                >
                  {copied ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
                      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
                      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                    </svg>
                  )}
                  {copied ? 'Copied!' : 'Share'}
                </button>
              </div>
            </div>

            {/* Divider */}
            <div className={styles.divider} />

            {/* Description */}
            <section className={styles.descSection}>
              <h2 className={styles.sectionTitle}>About this event</h2>
              <p className={styles.desc}>{event.desc}</p>
            </section>

            {/* Stats Grid */}
            <div className={styles.statsGrid}>
              {stats.map(s => (
                <div key={s.label} className={styles.statCard}>
                  <span className={styles.statLabel}>{s.label}</span>
                  <span className={styles.statValue}>{s.value}</span>
                </div>
              ))}
            </div>

            {/* Related Events */}
            {relatedEvents.length > 0 && (
              <section className={styles.related}>
                <h2 className={styles.sectionTitle}>More in {event.category}</h2>
                <div className={styles.relatedGrid}>
                  {relatedEvents.map(ev => (
                    <Link href={`/event/${ev.id}`} key={ev.id} className={styles.relatedCard}>
                      <img src={ev.img} alt={ev.title} className={styles.relatedImg} loading="lazy" />
                      <div className={styles.relatedInfo}>
                        <p className={styles.relatedTitle}>{ev.title}</p>
                        <p className={styles.relatedMeta}>{ev.date} · {ev.time}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* RIGHT: Chat */}
          <aside className={styles.chatCol}>
            <LiveChat />
          </aside>
        </div>
      </main>
    </>
  )
}

export async function getStaticPaths() {
  const paths = EVENTS.map(e => ({ params: { id: String(e.id) } }))
  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const event = EVENTS.find(e => e.id === Number(params.id)) || null
  return event
    ? { props: { event } }
    : { notFound: true }
}

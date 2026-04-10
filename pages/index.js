import { useState, useMemo } from 'react'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import EventCard from '../components/EventCard'
import { EVENTS, CATEGORIES } from '../data/events'
import styles from '../styles/Home.module.css'

export default function Home() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [sort, setSort] = useState('trending')
  const [liked, setLiked] = useState({})

  const toggleLike = (id) => setLiked(prev => ({ ...prev, [id]: !prev[id] }))

  const filtered = useMemo(() => {
    return EVENTS
      .filter(e => {
        const matchCat = category === 'All' || e.category === category
        const q = search.toLowerCase()
        const matchSearch = !q || e.title.toLowerCase().includes(q) || e.category.toLowerCase().includes(q) || e.host.toLowerCase().includes(q)
        return matchCat && matchSearch
      })
      .sort((a, b) => {
        if (sort === 'trending') {
          const scoreA = (a.tags.includes('Trending') ? 3 : 0) + (a.tags.includes('Hot') ? 2 : 0) + (a.tags.includes('Live') ? 1 : 0)
          const scoreB = (b.tags.includes('Trending') ? 3 : 0) + (b.tags.includes('Hot') ? 2 : 0) + (b.tags.includes('Live') ? 1 : 0)
          return scoreB - scoreA || b.viewers - a.viewers
        }
        if (sort === 'viewers') return b.viewers - a.viewers
        return a.id - b.id
      })
  }, [search, category, sort])

  const liveCount = EVENTS.filter(e => e.tags.includes('Live')).length
  const totalViewers = EVENTS.reduce((s, e) => s + e.viewers, 0)

  return (
    <>
      <Head>
        <title>StreamFest — Live Events & Streams</title>
        <meta name="description" content="Discover and watch live events, concerts, sports, conferences and more." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main className={styles.main}>
        {/* HERO */}
        <section className={styles.hero}>
          <div className={styles.heroBg}>
            <div className={styles.orb1} />
            <div className={styles.orb2} />
          </div>
          <div className={styles.heroContent}>
            <div className={styles.heroBadge}>
              <span className={styles.heroLiveDot} />
              {liveCount} events live now
            </div>
            <h1 className={styles.heroTitle}>
              Watch the World<br />
              <span className={styles.heroGradient}>Happen Live</span>
            </h1>
            <p className={styles.heroSub}>
              Music, sports, tech, gaming — stream it all in real time with{' '}
              {(totalViewers / 1000).toFixed(0)}K+ live viewers worldwide.
            </p>
          </div>
        </section>

        {/* CONTROLS */}
        <div className={styles.controls}>
          <div className={styles.controlsInner}>
            <div className={styles.searchWrap}>
              <svg className={styles.searchIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input
                className={styles.search}
                type="text"
                placeholder="Search events, categories, hosts…"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              {search && (
                <button className={styles.clearBtn} onClick={() => setSearch('')} aria-label="Clear search">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              )}
            </div>

            <select
              className={styles.sortSelect}
              value={sort}
              onChange={e => setSort(e.target.value)}
            >
              <option value="trending">🔥 Trending</option>
              <option value="viewers">👁 Most Viewers</option>
              <option value="id">📅 Latest Added</option>
            </select>
          </div>

          <div className={styles.filters}>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                className={`${styles.filterPill} ${category === cat ? styles.filterActive : ''}`}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* GRID */}
        <div className={styles.gridSection}>
          <div className={styles.gridHeader}>
            <span className={styles.resultCount}>
              {filtered.length} event{filtered.length !== 1 ? 's' : ''}
              {category !== 'All' && ` in ${category}`}
              {search && ` matching "${search}"`}
            </span>
          </div>

          {filtered.length === 0 ? (
            <div className={styles.empty}>
              <div className={styles.emptyIcon}>🔍</div>
              <p className={styles.emptyTitle}>No events found</p>
              <p className={styles.emptySub}>Try a different search term or category</p>
              <button className={styles.emptyReset} onClick={() => { setSearch(''); setCategory('All') }}>
                Clear filters
              </button>
            </div>
          ) : (
            <div className={styles.grid}>
              {filtered.map((event, i) => (
                <div
                  key={event.id}
                  className={styles.cardWrap}
                  style={{ animationDelay: `${Math.min(i * 0.05, 0.4)}s` }}
                >
                  <EventCard
                    event={event}
                    liked={!!liked[event.id]}
                    onLike={toggleLike}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <span className={styles.footerLogo}>StreamFest</span>
          <span className={styles.footerMeta}>© 2026 Pragada Sai Ramesh </span>
        </div>
      </footer>
    </>
  )
}

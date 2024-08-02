type Page = {
  title: string
  subtitle: string
  path: string
  thumbnail_path: string
}

export const pages: Page[] = [
  {
    title: 'Stonks',
    subtitle: 'Trades',
    path: '/stonks/trades',
    thumbnail_path: '/img/thumbnail-trades.png',
  },
  {
    title: 'Stonks',
    subtitle: 'Dates',
    path: '/stonks/dates',
    thumbnail_path: '/img/thumbnail-dates.png',
  },
  {
    title: 'Stonks',
    subtitle: 'Import',
    path: '/stonks/import',
    thumbnail_path: '/img/thumbnail-import.png',
  },
]

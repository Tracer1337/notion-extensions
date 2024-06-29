import TradesChart from 'modules/stonks/components/TradesChart'
import {
  Bilanz,
  Trade,
  fetchBilanz,
  fetchTrades,
} from 'modules/stonks/lib/notion'
import { GetServerSideProps } from 'next'

type TradesPageProps = {
  trades: Trade[]
  bilanz: Bilanz
}

export default function TradesPage({ trades, bilanz }: TradesPageProps) {
  return <TradesChart trades={trades} bilanz={bilanz} />
}
export const getServerSideProps: GetServerSideProps<
  TradesPageProps
> = async () => {
  const [trades, bilanz] = await Promise.all([fetchTrades(), fetchBilanz()])

  return { props: { trades, bilanz } }
}

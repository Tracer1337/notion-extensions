import DatesChart from 'modules/stonks/components/DatesChart/DatesChart'
import { Trade, fetchTrades } from 'modules/stonks/lib/notion'
import { GetServerSideProps } from 'next'

type DatesPageProps = {
  trades: Trade[]
}

export default function DatesPage({ trades }: DatesPageProps) {
  return <DatesChart trades={trades} />
}
export const getServerSideProps: GetServerSideProps<
  DatesPageProps
> = async () => {
  const trades = await fetchTrades()

  return { props: { trades } }
}

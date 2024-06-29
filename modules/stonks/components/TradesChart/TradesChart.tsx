import 'chart.js/auto'
import { Bilanz, Trade } from 'modules/stonks/lib/notion'
import dynamic from 'next/dynamic'
import { useTradesChartData } from './hooks/useTradesChartData'
import { useTradesChartOptions } from './hooks/useTradesChartOptions'

const Bar = dynamic(() => import('react-chartjs-2').then((mod) => mod.Bar), {
  ssr: false,
})

export default function TradesChart({
  trades,
  bilanz,
}: {
  trades: Trade[]
  bilanz: Bilanz
}) {
  const options = useTradesChartOptions({ trades })

  const data = useTradesChartData({ trades, bilanz })

  return <Bar options={options} data={data} />
}

import 'chart.js/auto'
import { Trade } from 'modules/stonks/lib/notion'
import dynamic from 'next/dynamic'
import { useDatesChartData } from './hooks/useDatesChartData'
import { useDatesChartOptions } from './hooks/useDatesChartOptions'

const Bar = dynamic(() => import('react-chartjs-2').then((mod) => mod.Bar), {
  ssr: false,
})

export default function DatesChart({ trades }: { trades: Trade[] }) {
  const options = useDatesChartOptions()

  const data = useDatesChartData({ trades })

  return <Bar options={options} data={data} />
}

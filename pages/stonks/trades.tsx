import {
  Bilanz,
  Trade,
  fetchBilanz,
  fetchTrades,
  formulaAuszahlung,
  formulaRendite,
} from 'lib/notion'
import { GetServerSideProps } from 'next'
import dynamic from 'next/dynamic'
import 'chart.js/auto'
import { ChartData, ChartOptions } from 'chart.js/auto'

const Bar = dynamic(() => import('react-chartjs-2').then((mod) => mod.Bar), {
  ssr: false,
})

type TradesPageProps = {
  trades: Trade[]
  bilanz: Bilanz
}

export default function TradesPage({ trades, bilanz }: TradesPageProps) {
  const options: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (item) =>
            item.formattedValue +
            (item.dataset.yAxisID === 'profit' ? '€' : '%'),
          footer: (items) =>
            !items[0] || items[0].dataset.type === ('line' as any)
              ? ''
              : trades[items[0].dataIndex].Position,
        },
      },
    },
    scales: {
      profit: {
        type: 'logarithmic',
        position: 'left',
        title: {
          display: true,
          text: 'Profit',
        },
        ticks: {
          callback: (value) => `${value}€`,
        },
      },
      rendite: {
        type: 'logarithmic',
        position: 'right',
        title: {
          display: true,
          text: 'Rendite',
        },
        ticks: {
          callback: (value: any) => `${value}%`,
        },
      },
    },
  }

  const data: ChartData<'bar'> = {
    labels: trades.map((trade) =>
      new Date(trade.Kaufdatum).toLocaleDateString('de-DE')
    ),
    datasets: [
      {
        data: trades.map((trade) => trade.Profit),
        yAxisID: 'profit',
      },
      {
        data: trades.map((trade) => trade.Rendite),
        yAxisID: 'rendite',
      },
      {
        data: trades.map((_trade, i) => formulaAuszahlung(bilanz, trades, i)),
        yAxisID: 'profit',
        type: 'line' as any,
      },
      {
        data: trades.map((_trade, i) => formulaRendite(bilanz, trades, i)),
        yAxisID: 'rendite',
        type: 'line' as any,
      },
    ],
  }

  return <Bar options={options} data={data} />
}

export const getServerSideProps: GetServerSideProps<
  TradesPageProps
> = async () => {
  const [trades, bilanz] = await Promise.all([fetchTrades(), fetchBilanz()])

  return { props: { trades, bilanz } }
}

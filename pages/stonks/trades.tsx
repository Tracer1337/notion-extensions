import { Trade, fetchTrades } from 'lib/notion'
import { GetServerSideProps } from 'next'
import dynamic from 'next/dynamic'
import 'chart.js/auto'
import { ChartData, ChartOptions } from 'chart.js/auto'

const Bar = dynamic(() => import('react-chartjs-2').then((mod) => mod.Bar), {
  ssr: false,
})

type TradesPageProps = {
  trades: Trade[]
}

export default function TradesPage({ trades }: TradesPageProps) {
  const options: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      profit: {
        type: 'linear',
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
        type: 'linear',
        position: 'right',
        title: {
          display: true,
          text: 'Rendite',
        },
        ticks: {
          callback: (value: any) => `${value * 100}%`,
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
    ],
  }

  return <Bar options={options} data={data} />
}

export const getServerSideProps: GetServerSideProps<
  TradesPageProps
> = async () => {
  const trades = await fetchTrades()

  return { props: { trades } }
}

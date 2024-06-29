import { ChartOptions } from 'chart.js/auto'
import { Trade } from 'modules/stonks/lib/notion'

export function useTradesChartOptions({ trades }: { trades: Trade[] }) {
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
  return options
}

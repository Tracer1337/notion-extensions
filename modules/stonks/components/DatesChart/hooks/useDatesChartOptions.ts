import { ChartOptions } from 'chart.js/auto'

export function useDatesChartOptions() {
  const options: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: 'Trades',
        },
      },
    },
  }
  return options
}

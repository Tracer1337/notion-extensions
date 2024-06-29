import { ChartData } from 'chart.js/auto'
import { eachMonthOfInterval, getMonth } from 'date-fns'
import { first, last } from 'lodash'
import { Trade } from 'modules/stonks/lib/notion'

export function useDatesChartData({ trades }: { trades: Trade[] }) {
  const data: ChartData<'bar'> = {
    labels: eachMonthOfInterval({
      start: first(trades)!.Kaufdatum,
      end: last(trades)!.Kaufdatum,
    }).map((date) => date.toLocaleDateString('de-DE', { month: 'long' })),
    datasets: [
      {
        data: eachMonthOfInterval({
          start: first(trades)!.Kaufdatum,
          end: last(trades)!.Kaufdatum,
        })
          .map((date) => getMonth(date))
          .map(
            (a) =>
              trades
                .map((trade) => getMonth(trade.Kaufdatum))
                .filter((b) => a === b).length
          ),
      },
    ],
  }

  return data
}

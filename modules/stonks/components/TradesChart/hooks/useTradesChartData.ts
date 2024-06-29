import { ChartData } from 'chart.js/auto'
import {
  Bilanz,
  Trade,
  formulaAuszahlung,
  formulaRendite,
} from 'modules/stonks/lib/notion'

export function useTradesChartData({
  trades,
  bilanz,
}: {
  trades: Trade[]
  bilanz: Bilanz
}) {
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

  return data
}

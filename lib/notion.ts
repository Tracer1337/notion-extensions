import { Client } from '@notionhq/client'
import { slice, sumBy } from 'lodash'

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

export type Trade = {
  Position: string
  Anteile: number
  Kaufdatum: string
  Kaufpreis: string
  Verkaufsdatum: string
  Verkaufspreis: string
  Gebühren: number
  Profit: number
  Rendite: number
}

export async function fetchTrades(): Promise<Trade[]> {
  const mapResultToRow = (result: Record<string, any>): Trade => ({
    Position: result['Position'].title[0].plain_text,
    Anteile: result['Anteile'].number,
    Kaufdatum: result['Kaufdatum'].date.start,
    Kaufpreis: result['Kaufpreis'].number,
    Verkaufsdatum: result['Verkaufsdatum'].date.start,
    Verkaufspreis: result['Verkaufspreis'].number,
    Gebühren: result['Gebühren'].number,
    Profit: result['Profit'].formula.number,
    Rendite: result['Rendite'].formula.number * 100,
  })

  return await notion.databases
    .query({
      database_id: process.env.NOTION_TRADES_DB_ID ?? '',
      sorts: [
        {
          property: 'Kaufdatum',
          direction: 'ascending',
        },
      ],
    })
    .then((response) =>
      response.results
        .map((result: any) => result.properties)
        .map(mapResultToRow)
    )
}

export type Bilanz = {
  Einzahlung: number
}

export async function fetchBilanz(): Promise<Bilanz> {
  const mapResultToRow = (result: Record<string, any>): Bilanz => ({
    Einzahlung: result['Einzahlung'].number,
  })

  return await notion.databases
    .query({
      database_id: process.env.NOTION_BILANZ_DB_ID ?? '',
    })
    .then(
      (response) =>
        response.results
          .map((result: any) => result.properties)
          .map(mapResultToRow)[0]
    )
}

export function formulaNettoGewinn(trades: Trade[], i: number): number {
  return (
    sumBy(slice(trades, 0, i + 1), 'Profit') -
    sumBy(slice(trades, 0, i + 1), 'Gebühren')
  )
}

export function formulaAuszahlung(
  bilanz: Bilanz,
  trades: Trade[],
  i: number
): number {
  return bilanz.Einzahlung + formulaNettoGewinn(trades, i)
}

export function formulaRendite(
  bilanz: Bilanz,
  trades: Trade[],
  i: number
): number {
  return (formulaNettoGewinn(trades, i) / bilanz.Einzahlung) * 100
}

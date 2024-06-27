import { Client } from '@notionhq/client'

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

export type Trade = {
  Kaufdatum: string
  Profit: number
  Rendite: number
}

export async function fetchTrades(): Promise<Trade[]> {
  const mapResultToRow = (result: Record<string, any>): Trade => ({
    Kaufdatum: result['Kaufdatum'].date.start,
    Profit: result['Profit'].formula.number,
    Rendite: result['Rendite'].formula.number,
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

import { openai } from 'lib/openai'
import { createTrade, Trade } from 'modules/stonks/lib/notion'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(404).send(null)
  }

  if (req.headers.authorization !== process.env.TOKEN) {
    return res.status(403).send(null)
  }

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o',
    max_tokens: 1024,
    temperature: 0.1,
    response_format: {
      type: 'json_object',
    },
    messages: [
      {
        role: 'user',
        content: prompt.replace('{0}', JSON.stringify(req.body)),
      },
    ],
  })

  const responseText = completion.choices[0].message.content

  if (!responseText) {
    throw new Error('Received invalid chat completion')
  }

  const response: { trades: Omit<Trade, 'Gebühren'>[] } =
    JSON.parse(responseText)

  await Promise.all(
    response.trades.map((trade) =>
      createTrade({
        ...trade,
        Gebühren: 2,
      })
    )
  )

  return res.status(200).send({ status: 'success' })
}

const prompt = `
Jeweils zwei Abrechnungen gehören zu einem Trade, eine Abrechnung zum Kauf und eine zum Verkauf. Die Abrechnungen wurden als pdf eingelesen und an dich im JSON-Format weitergegeben. Gib die Trades in folgendem Format aus:

{
  trades: Array<{
      Position: string
      Anteile: number
      Kaufdatum: string
      Kaufpreis: string
      Verkaufsdatum: string
      Verkaufspreis: string
  }>
}

Gib Datumswerte im Format YYYY-mm-ddTHH:mm:ss aus
Gib den Kaufpreis und Verkaufspreis pro Anteil an
Achte darauf ein Array an Trades zurückzugeben, auch wenn nur ein einzelner Trade erkannt wurde

{0}
`

import * as pdfjs from 'pdfjs-dist/legacy/build/pdf.min.mjs'
import { TextItem } from 'pdfjs-dist/types/src/display/api'

pdfjs.GlobalWorkerOptions.workerSrc =
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.5.136/pdf.worker.min.mjs'

export async function triggerImport() {
  const files = await importFiles()

  if (files.length === 0) {
    return
  }

  const invoices = await Promise.all(files.map((file) => parseInvoice(file)))

  await fetch('/api/import', {
    method: 'POST',
    headers: {
      authorization: new URLSearchParams(location.search).get('token') ?? '',
    },
    body: JSON.stringify(invoices),
  })
}

async function parseInvoice(
  file: File
): Promise<{ text: string; transform: number[] }[]> {
  const doc = await pdfjs.getDocument(await file.arrayBuffer()).promise
  const content = await doc.getPage(1).then((page) => page.getTextContent())
  return (content.items as TextItem[]).map((item) => ({
    text: item.str,
    transform: item.transform,
  }))
}

function importFiles(): Promise<File[]> {
  return new Promise((resolve) => {
    const input = document.createElement('input')

    input.type = 'file'
    input.multiple = true
    input.accept = 'application/pdf'

    input.addEventListener('change', () => {
      if (!input.files) {
        resolve([])
        return
      }
      const files: File[] = []
      for (let i = 0; i < input.files.length; i++) {
        files.push(input.files[i])
      }
      resolve(files)
    })

    input.addEventListener('cancel', () => {
      resolve([])
    })

    input.click()
  })
}

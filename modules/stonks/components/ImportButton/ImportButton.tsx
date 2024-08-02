import { LoadingButton } from '@mui/lab'
import { triggerImport } from 'modules/stonks/lib/import'
import { useState } from 'react'

export default function ImportButton() {
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = () => {
    setIsLoading(true)
    triggerImport().finally(() => setIsLoading(false))
  }

  return (
    <LoadingButton
      variant="contained"
      color="primary"
      onClick={handleClick}
      loading={isLoading}
    >
      Import
    </LoadingButton>
  )
}

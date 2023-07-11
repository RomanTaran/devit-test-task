import { CSSProperties } from 'react'
import { RingLoader } from 'react-spinners'

const override: CSSProperties = {
  display: 'block',
  margin: '100px auto',
  borderColor: 'green',
}
export default function Spinner() {
  return (
    <RingLoader
      color='green'
      size={150}
      cssOverride={override}
      aria-label='Loading Spinner'
      data-testid='loader'
    />
  )
}

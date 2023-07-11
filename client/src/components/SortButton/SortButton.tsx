import NorthIcon from '@mui/icons-material/North'
import SouthIcon from '@mui/icons-material/South'
import { Button } from '@mui/material'

import { useRecoilState } from 'recoil'

import { sortByState } from '../../state'

export default function SortButton() {
  const [sortBy, setSortBy] = useRecoilState(sortByState)

  const handleClick = () => {
    setSortBy((prevState) => (prevState === 'title:asc' ? 'title:desc' : 'title:asc'))
  }

  return (
    <Button
      variant='contained'
      endIcon={sortBy === 'title:asc' ? <NorthIcon /> : <SouthIcon />}
      onClick={handleClick}
    >
      Sort by title
    </Button>
  )
}

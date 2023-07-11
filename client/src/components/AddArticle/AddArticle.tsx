import { useNavigate } from 'react-router-dom'

import AddIcon from '@mui/icons-material/Add'
import { Button } from '@mui/material'
import { GridToolbarContainer } from '@mui/x-data-grid'

export default function AddArticle() {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate('/dashboard/create')
  }

  return (
    <GridToolbarContainer>
      <Button color='primary' startIcon={<AddIcon />} onClick={handleClick}>
        Add article
      </Button>
    </GridToolbarContainer>
  )
}

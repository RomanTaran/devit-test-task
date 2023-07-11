import { useState } from 'react'

import { GridPaginationModel } from '@mui/x-data-grid'

export default function usePagination() {
  const [pages, setPages] = useState(1)
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 9,
  })

  const handlePaginationModelChange = async (newPaginationModel: GridPaginationModel) => {
    setPaginationModel(newPaginationModel)
    const page = newPaginationModel.page + 1
    setPages(page)
  }
  return { pages, paginationModel, handlePaginationModelChange }
}

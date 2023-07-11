import { useState } from 'react'

import useGetArticle from './useGetArticle'

export default function useOpenEditArticle() {
  const [openEdit, setOpenEdit] = useState<boolean>(false)
  const [selectedArticleId, setSelectedArticleId] = useState<string>('')
  const { data: editArticleData, isLoading: isEditArticleLoading } =
    useGetArticle(selectedArticleId)
  const handleEditClick = (id: string) => {
    setSelectedArticleId(id)
    setOpenEdit(true)
  }
  return { openEdit, editArticleData, isEditArticleLoading, setOpenEdit, handleEditClick }
}

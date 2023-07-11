import { useState } from 'react'

import useGetArticle from './useGetArticle'

export default function usePreviewArticle() {
  const [openPreview, setOpenPreview] = useState<boolean>(false)
  const [selectedArticleId, setSelectedArticleId] = useState<string>('')
  const { data: previewArticleData, isLoading: isPreviewArticleLoading } =
    useGetArticle(selectedArticleId)
  const handlePreviewClick = (id: string) => {
    setSelectedArticleId(id)
    setOpenPreview(true)
  }

  return {
    openPreview,
    previewArticleData,
    isPreviewArticleLoading,
    setOpenPreview,
    handlePreviewClick,
  }
}

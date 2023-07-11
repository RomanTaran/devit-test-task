import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'

import DeleteIcon from '@mui/icons-material/DeleteOutlined'
import EditIcon from '@mui/icons-material/Edit'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { Box, Container, IconButton, Paper } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'

import useDeleteArticle from '../../hooks/useDeleteArticle'
import usePagination from '../../hooks/usePagination'
import usePreviewArticle from '../../hooks/usePreviewArticle'
import { IArticle } from '../../models/IArticle'
import ArticleService from '../../services/ArticleService'
import AddArticle from '../AddArticle'
import ShowArticle from '../ShowArticle'
import Spinner from '../Spinner'

export default function Dashboard() {
  const navigate = useNavigate()

  const columns: GridColDef[] = [
    {
      field: 'title',
      headerName: 'Title',
      sortable: false,
      width: 300,
    },
    {
      field: 'pubDate',
      headerName: 'Publication Date',
      sortable: false,
      width: 210,
    },
    {
      field: 'url',
      headerName: 'Link',
      sortable: false,
      flex: 1,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      width: 150,
      renderCell: (params) => (
        <>
          <IconButton
            onClick={() => handlePreviewClick(params.row.id)}
            color='primary'
            aria-label='view'
          >
            <VisibilityIcon />
          </IconButton>
          <IconButton
            onClick={() => navigate(`/dashboard/${params.row.id}`)}
            color='success'
            aria-label='edit'
          >
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={() => deleteArticle(params.row.id)}
            color='error'
            aria-label='delete'
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ]

  const { pages, paginationModel, handlePaginationModelChange } = usePagination()
  const { deleteArticle } = useDeleteArticle()
  const {
    openPreview,
    previewArticleData,
    isPreviewArticleLoading,
    setOpenPreview,
    handlePreviewClick,
  } = usePreviewArticle()

  const { data, isLoading } = useQuery(['articles', pages], () =>
    ArticleService.getArticles(pages, '', 'title:asc'),
  )

  if (isLoading) return <Spinner />

  return (
    <Container>
      <Paper elevation={4} sx={{ mt: 3 }}>
        <Box sx={{ height: '75%', width: '100%' }}>
          <DataGrid
            rows={data?.data.results as IArticle[]}
            columns={columns}
            rowCount={data?.data.totalResults}
            pageSizeOptions={[9]}
            paginationModel={paginationModel}
            paginationMode='server'
            onPaginationModelChange={handlePaginationModelChange}
            disableColumnMenu
            slots={{
              toolbar: AddArticle,
            }}
          />
        </Box>
      </Paper>
      <ShowArticle
        openPreview={openPreview}
        previewArticleData={previewArticleData}
        isPreviewArticleLoading={isPreviewArticleLoading}
        setOpenPreview={setOpenPreview}
      />
    </Container>
  )
}

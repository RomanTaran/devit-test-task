import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'

import { Box, Container, Grid, Pagination } from '@mui/material'

import { useRecoilValue } from 'recoil'

import ArticleService from '../../services/ArticleService'
import { searchState, sortByState } from '../../state'
import Article from '../Article'
import SortButton from '../SortButton'
import Spinner from '../Spinner'

export default function Articles() {
  const [page, setPage] = useState<number>(1)
  const searchValue = useRecoilValue(searchState)
  const sortBy = useRecoilValue(sortByState)
  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }
  const { data, isLoading } = useQuery(['articles', page, searchValue, sortBy], () =>
    ArticleService.getArticles(page, searchValue, sortBy),
  )

  useEffect(() => {
    setPage(1)
  }, [searchValue])

  if (isLoading) return <Spinner />

  return (
    <Container
      sx={{
        mt: 2,
        mb: 2,
      }}
    >
      <Box
        sx={{
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', mr: 3, ml: 3 }}>
          <SortButton />
          <Pagination count={data?.data.totalPages} page={page} onChange={handleChange} />
        </Box>
        <Grid container spacing={2}>
          {data?.data.results.map((article) => (
            <Grid item xs={12} sm={4} key={article.id}>
              <Article article={article} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  )
}

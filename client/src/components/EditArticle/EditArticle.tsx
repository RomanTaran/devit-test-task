import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import useEditArticle from '../../hooks/useEditArticle'
import ArticleService from '../../services/ArticleService'
import Spinner from '../Spinner'

export default function EditArticle() {
  const { id } = useParams()
  const { handleSubmit, onSubmit, register, errors, navigate } = useEditArticle(id as string)
  const { data, isLoading } = useQuery(['article'], () => ArticleService.getArticle(id as string))

  if (isLoading) return <Spinner />
  return (
    <Container component='main' maxWidth='xl'>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component='h1' variant='h5'>
          Edit Article
        </Typography>
        <Box component='form' onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                {...register('title')}
                defaultValue={data?.data.title}
                margin='normal'
                required
                fullWidth
                id='title'
                label='Title'
                name='title'
                error={!!errors.title}
              />
              <Typography variant='inherit' color='red'>
                {errors.title?.message}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...register('pubDate')}
                defaultValue={data?.data.pubDate}
                margin='dense'
                required
                name='pubDate'
                id='pubDate'
                label='Publication Date'
                type='text'
                fullWidth
                error={!!errors.pubDate}
              />
              <Typography variant='inherit' color='red'>
                {errors.pubDate?.message}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...register('image')}
                defaultValue={data?.data.image}
                margin='dense'
                required
                name='image'
                id='image'
                label='Image URL'
                type='text'
                fullWidth
                error={!!errors.image}
              />
              <Typography variant='inherit' color='red'>
                {errors.image?.message}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...register('contentSnippet')}
                defaultValue={data?.data.contentSnippet}
                margin='dense'
                required
                name='contentSnippet'
                id='contentSnippet'
                label='Content'
                type='text'
                fullWidth
                error={!!errors.contentSnippet}
              />
              <Typography variant='inherit' color='red'>
                {errors.contentSnippet?.message}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...register('url')}
                defaultValue={data?.data.url}
                margin='dense'
                required
                name='url'
                id='url'
                label='URL'
                type='text'
                fullWidth
                error={!!errors.url}
              />
              <Typography variant='inherit' color='red'>
                {errors.url?.message}
              </Typography>
            </Grid>
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'end' }}>
            <Button type='submit' variant='contained' sx={{ mt: 3, mb: 2 }}>
              Confirm
            </Button>
            <Button
              variant='contained'
              sx={{ mt: 3, mb: 2, ml: 3 }}
              onClick={() => {
                navigate('/dashboard')
              }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  )
}

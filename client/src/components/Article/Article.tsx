import { Card, CardContent, CardHeader, CardMedia, Paper, Typography } from '@mui/material'

import { IArticle } from '../../models/IArticle'

export default function Article({ article }: { article: IArticle }) {
  return (
    <div>
      {article && (
        <Paper sx={{ maxWidth: 345 }} elevation={8}>
          <Card sx={{ maxWidth: 345 }}>
            <CardHeader
              title={
                <a
                  href={article.url}
                  target='_blank'
                  rel='noreferrer'
                  style={{ textDecoration: 'none' }}
                >
                  {article.title}
                </a>
              }
              subheader={article.pubDate}
            />
            <CardMedia component='img' height='194' image={article.image} alt='Article image' />
            <CardContent>
              <Typography variant='body2' color='text.secondary'>
                {article.contentSnippet}
              </Typography>
            </CardContent>
          </Card>
        </Paper>
      )}
    </div>
  )
}

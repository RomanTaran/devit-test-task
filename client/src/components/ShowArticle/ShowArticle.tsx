import * as React from 'react'

import CloseIcon from '@mui/icons-material/Close'
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@mui/material'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'

import { AxiosResponse } from 'axios'

import { IArticle } from '../../models/IArticle'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}))

export interface DialogTitleProps {
  id: string
  children?: React.ReactNode
  onClose: () => void
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label='close'
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  )
}

interface IShowArticle {
  openPreview: boolean
  previewArticleData: AxiosResponse<IArticle> | undefined
  isPreviewArticleLoading: boolean
  setOpenPreview: (open: boolean) => void
}

export default function ShowArticle({
  openPreview,
  previewArticleData,
  isPreviewArticleLoading,
  setOpenPreview,
}: IShowArticle) {
  return (
    <BootstrapDialog open={openPreview} onClose={() => setOpenPreview(false)}>
      <BootstrapDialogTitle id='customized-dialog-title' onClose={() => setOpenPreview(false)}>
        Article Preview
      </BootstrapDialogTitle>
      <DialogContent dividers>
        {!isPreviewArticleLoading && (
          <Card sx={{ maxWidth: 345 }}>
            <CardHeader
              title={
                <a
                  href={previewArticleData?.data.url}
                  target='_blank'
                  rel='noreferrer'
                  style={{ textDecoration: 'none' }}
                >
                  {previewArticleData?.data.title}
                </a>
              }
              subheader={previewArticleData?.data.pubDate}
            />
            <CardMedia
              component='img'
              height='194'
              image={previewArticleData?.data.image}
              alt='Paella dish'
            />
            <CardContent>
              <Typography variant='body2' color='text.secondary'>
                {previewArticleData?.data.contentSnippet}
              </Typography>
            </CardContent>
          </Card>
        )}
      </DialogContent>
    </BootstrapDialog>
  )
}

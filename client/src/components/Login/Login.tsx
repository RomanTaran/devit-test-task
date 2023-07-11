import { NavLink } from 'react-router-dom'

import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import useRegisterUser from '../../hooks/useRegisterUser'
import AuthService from '../../services/AuthService'

export default function Login() {
  const { handleSubmit, onSubmit, register, errors } = useRegisterUser(AuthService.login)

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Login
        </Typography>
        <Box component='form' onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                {...register('email')}
                margin='normal'
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                autoComplete='email'
                error={!!errors.email}
              />
              <Typography variant='inherit' color='red'>
                {errors.email?.message}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...register('password')}
                margin='normal'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='current-password'
                error={!!errors.password}
              />
              <Typography variant='inherit' color='red'>
                {errors.password?.message}
              </Typography>
            </Grid>
          </Grid>
          <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
            Login
          </Button>
          <Grid container>
            <Grid item>
              <NavLink to={'/signup'}>{"Don't have an account? Sign Up"}</NavLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}

import { useState } from 'react'
import { NavLink } from 'react-router-dom'

import { AccountCircle } from '@mui/icons-material'
import MenuIcon from '@mui/icons-material/Menu'
import { Button, Container, IconButton, Menu, MenuItem, Tooltip } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/styles'

import { useRecoilValue } from 'recoil'

import { authState } from '../../state'
import Logout from '../Logout'
import Search from '../Search'

const MainLink = styled(NavLink)({
  textDecoration: 'none',
  color: 'white',
})

const SettingsLink = styled(NavLink)({
  textDecoration: 'none',
  color: 'black',
})
export default function MainBar() {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)
  const auth = useRecoilValue(authState)
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  return (
    <AppBar position='static'>
      <Container>
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <MenuItem onClick={handleCloseNavMenu} sx={{ backgroundColor: '#1976d2' }}>
                <Typography textAlign='center'>
                  <MainLink to={'/'}>News</MainLink>
                </Typography>
              </MenuItem>
              {auth && (
                <MenuItem onClick={handleCloseNavMenu} sx={{ backgroundColor: '#1976d2' }}>
                  <Typography textAlign='center'>
                    <MainLink to={'/dashboard'}>Dashboard</MainLink>
                  </Typography>
                </MenuItem>
              )}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }}>
              <MainLink to={'/'}>News</MainLink>
            </Button>
            {auth && (
              <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }}>
                <MainLink to={'/dashboard'}>Dashboard</MainLink>
              </Button>
            )}
          </Box>
          <Container>
            <Search />
          </Container>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title='Open settings'>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, mr: 4, color: 'white' }}>
                <AccountCircle />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id='menu-appbar'
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {!auth && (
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign='center'>
                    <SettingsLink to='/login'>Login</SettingsLink>
                  </Typography>
                </MenuItem>
              )}
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign='center'>
                  <SettingsLink to='/signup'>SignUp</SettingsLink>
                </Typography>
              </MenuItem>
              {auth && <Logout handleCloseUserMenu={handleCloseUserMenu} />}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

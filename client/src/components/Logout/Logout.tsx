import { MenuItem } from '@mui/material'
import Typography from '@mui/material/Typography'

import useLogout from '../../hooks/useLogout'

export default function Logout({ handleCloseUserMenu }: { handleCloseUserMenu: () => void }) {
  const { handleClick } = useLogout(handleCloseUserMenu)
  return (
    <MenuItem onClick={handleClick}>
      <Typography textAlign='center'>Logout</Typography>
    </MenuItem>
  )
}

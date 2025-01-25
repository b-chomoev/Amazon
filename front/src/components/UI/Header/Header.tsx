import { Link } from 'react-router-dom';
import { Box, AppBar, Typography, Toolbar, Container } from '@mui/material';
import { useAppSelector } from '../../../app/hooks';
import UserMenu from './UserMenu';
import AnonymousMenu from './AnonymousMenu';
import { selectUser } from '../../../features/users/usersSlice';

const Header = () => {
  const user = useAppSelector(selectUser);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ mb: 5, backgroundColor: '#131921'}}>
        <Container>
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Typography component={Link} to="/" variant="h4" sx={{color: 'inherit', textDecoration: 'none',}}>Amazon</Typography>
            <Box>
              {user ? <UserMenu user={user} /> : <AnonymousMenu/>}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};

export default Header;
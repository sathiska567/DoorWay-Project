import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import useAuthStore from '../hooks/authStore';
import { Navigate, useNavigate } from 'react-router-dom';

function NavBar() {
  const [authToken, setAuthToken] = useState(null);
  const [userInfo, setUserInfo] = useState({ username: '', email: '' });
  const navigate = useNavigate()
  const token = useAuthStore((state) => state.token);
  const username = useAuthStore((state) => state.username);
  const email = useAuthStore((state) => state.email);
  const removeToken = useAuthStore((state) => state.removeToken);

  useEffect(() => {
    setAuthToken(token);
    setUserInfo({ username, email });
  }, [token, username, email]);

  const handleLogout = () => {
    removeToken();
    localStorage.clear();
    navigate("/login")
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#"
            sx={{
              mr: 2,
              display: {md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.05rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            {userInfo.email}
          </Typography>

          <Box sx={{ flexGrow: 0, ml: 'auto' }}> {/* Align to the right */}
            <Button
              onClick={handleLogout}
              sx={{ color: 'white' }}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar;

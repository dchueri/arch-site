import { useAuth } from "../../context/AuthProvider/useAuth";
import Button from '@mui/material/Button'
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import { message } from "antd";

export function NavBar() {
  const auth = useAuth();

  async function logout() {
    try {
      await auth.logout();
    } catch (e) {
      message.error("E-mail ou senha inválidos");
    }
  }

  return (
    <AppBar position="static">
        <Toolbar>
          <IconButton size='large' edge='start' color='inherit' aria-label='logo'>
            <MapsHomeWorkIcon/>
          </IconButton>
          <Typography variant="h6" component='div' sx={{flexGrow: 1}}>
            ArchApp
          </Typography>
          <Button
          onClick={() => {
            logout();
          }}
          variant='contained'
          color='primary'
        >
          Logout
        </Button>
        </Toolbar>
    </AppBar>
  );
}

import { AuthProvider } from "./context/AuthProvider";
import { useAuth } from "./context/AuthProvider/useAuth";

import { createTheme } from "@mui/material";
import { NavBar } from "./components/NavBar";
import { IndexRoutes } from "./routes";

function App() {
  const auth = useAuth();
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <AuthProvider>
      <>
        <NavBar />
        <IndexRoutes />
      </>
    </AuthProvider>
  );
}

export default App;

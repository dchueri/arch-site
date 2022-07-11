import { AuthProvider } from "./context/AuthProvider";
import { useAuth } from "./context/AuthProvider/useAuth";

import { createTheme } from "@mui/material";
import { IndexRoutes } from "./routes/routes";

function App() {
  const auth = useAuth();
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <AuthProvider>
      <IndexRoutes/>
    </AuthProvider>
  );
}

export default App;

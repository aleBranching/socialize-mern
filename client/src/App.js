import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "scenes/homePage";
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";

function App() {
  const mode = useSelector((state) => state.mode);
  const isAuth = Boolean(useSelector((state) => state.token));

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline></CssBaseline>
          <Routes>
            <Route path="/" element={<LoginPage></LoginPage>}></Route>
            <Route
              path="/home"
              element={
                isAuth ? <HomePage></HomePage> : <Navigate to="/"></Navigate>
              }
            ></Route>
            <Route
              path="/profile/:userId"
              element={
                isAuth ? (
                  <ProfilePage></ProfilePage>
                ) : (
                  <Navigate to="/"></Navigate>
                )
              }
            ></Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;

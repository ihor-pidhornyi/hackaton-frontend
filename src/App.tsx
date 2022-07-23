import React from 'react'
import './App.css'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { GlobalContextProvider } from './shared/context/GlobalContext'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage'
import TreesPage from './pages/TreesPage/TreesPage'
import RegisterPage from './pages/RegisterPage/RegisterPage'
import LoginPage from './pages/LoginPage/LoginPage'
import Header from './components/Header/Header'

function App() {
  const theme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        dark: '#9EB23B',
        main: '#C7D36F',
        light: '#FCF9C6',
      },
    },
  })

  return (
    <ThemeProvider theme={theme}>
      <GlobalContextProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/trees" element={<TreesPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/:x,:y" element={<HomePage />} />
            <Route path="/" element={<HomePage />} />
          </Routes>
        </Router>
      </GlobalContextProvider>
    </ThemeProvider>
  )
}

export default App

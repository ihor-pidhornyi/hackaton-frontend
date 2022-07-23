import React from 'react'
import './App.css'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { GlobalContextProvider } from './shared/context/GlobalContext'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage'
import TreesPage from './pages/TreesPage/TreesPage'


const API_KEY = process.env.REACT_APP_API_KEY

const center = {
  lat: 49.23244,
  lng: 28.484131,
}

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
          <Routes>
            <Route path="/trees" element={<TreesPage />} />
            <Route path="/:x,:y" element={<HomePage />} />
            <Route path="/" element={<HomePage />} />
          </Routes>
        </Router>
      </GlobalContextProvider>
    </ThemeProvider>
  )
}

export default App

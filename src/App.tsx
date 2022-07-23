import React from 'react'
import './App.css'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage'
import TreesPage from './pages/TreesPage/TreesPage'

function App() {
  const theme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        dark: '#9EB23B',
        main: '#C7D36F',
        light: '#FCF9C6',
      },
    },
  })

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/trees" element={<TreesPage />} />
          <Route path="/:x,:y" element={<HomePage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App

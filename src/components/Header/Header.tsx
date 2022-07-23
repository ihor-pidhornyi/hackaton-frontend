import React from 'react'
import { AppBar, Toolbar } from '@mui/material'
import { Link } from 'react-router-dom'
import { HomeIcon, NavList } from './Header.styled'

function Header() {
  return (
    <AppBar position="fixed">
      <Toolbar variant="dense">
        <NavList>
          <li>
            <Link to="/users">
              <HomeIcon />
            </Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li className="logout">
            <Link to="/login">Log out</Link>
          </li>
        </NavList>
      </Toolbar>
    </AppBar>
  )
}

export default Header

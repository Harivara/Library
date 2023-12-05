import React from 'react'
import {
  AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Button, Tooltip, MenuItem
} from "@mui/material"

import { Route, Routes, Navigate, Link, useNavigate } from 'react-router-dom'
import AdbIcon from "@mui/icons-material/Adb"
import Bookslist from '../book-list/booklist'
import { LoginDialog } from '../login/logindailouge'
import { useState, useEffect } from 'react'
import { useUser } from '../../context/user-contex.js'
import { WithLoginProtector } from '../access-control/login-protector.js'
import { WithAdminProtector } from '../access-control/admin-protector.js'
import { BookForm } from '../forms/book-form.js'

const Applayout = () => {

  const [openLoginDialog, setOpenLoginDialog] = useState(false)

  const { user, isAdmin, loginUser, logoutUser } = useUser()

  const [anchorElUser, setAnchorElUser] = useState(null)

  const navigate = useNavigate()

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const handleLoginSubmit = (username, password) => {
    // console.log(username,password)
    loginUser(username, password)
    setOpenLoginDialog(false)
  }
  const handleLoginClose = () => {
    setOpenLoginDialog(false)
  }

  const handleLogout = () => {
    logoutUser()
    handleCloseUserMenu()
  }

  useEffect(() => {
    if (!user) {
      navigate("/")
    } else if (isAdmin) {
      navigate("/admin/books/add")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isAdmin])

  return (
    <>
      <AppBar position='static'>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >

              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Library Management System
              </Typography>


              {user ? (

                <>

                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar> U </Avatar>
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">Dashboard</Typography>
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                      <Typography textAlign="center">Logout</Typography>
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <Button
                  onClick={() => {
                    setOpenLoginDialog(true)
                  }}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  Login
                </Button>
              )}
            </Toolbar>
          </AppBar>
        </Box>

      </AppBar>

      <Routes>
        <Route path="/books" exact element={<Bookslist />}></Route>

        <Route path='/admin/books/add' exact element={
          <WithLoginProtector>
            <WithAdminProtector>
              <BookForm />
            </WithAdminProtector>
          </WithLoginProtector>
        }></Route>
        {console.log(isAdmin)}
        <Route path='/admin/books/:id/edit' exact element={
          <WithLoginProtector>
            <WithAdminProtector>
              <BookForm />
            </WithAdminProtector>
          </WithLoginProtector>
        }></Route>

        <Route path="*" element={<Navigate to="/books" replace />}> </Route>
      </Routes>
      <LoginDialog
        open={openLoginDialog}
        handleSubmit={handleLoginSubmit}
        handleClose={handleLoginClose}
      />
    </>
  )
}

export default Applayout
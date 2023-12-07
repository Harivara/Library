import React from 'react'
import {
  AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Button, Tooltip, MenuItem
} from "@mui/material"

import { Route, Routes, Navigate, Link, useNavigate } from 'react-router-dom'
import AdbIcon from "@mui/icons-material/Adb"
import Bookslist from '../book-list/booklist'
import { LoginDialog } from '../login/logindailouge'
import { RegisterDialog } from '../login/registerdailouge.js'
import { useState, useEffect } from 'react'
import { useUser } from '../../context/user-contex.js'
import { WithLoginProtector } from '../access-control/login-protector.js'
import { WithAdminProtector } from '../access-control/admin-protector.js'
import { BookForm } from '../forms/book-form.js'
import { Book } from '../book-component/book-comp.js'
import Profile from '../login/profile.js'
import { NotificationManager } from 'react-notifications'

const Applayout = () => {

  const [openLoginDialog, setOpenLoginDialog] = useState(false)
  const [openRegisterDialog, setOpenRegisterDialog] = useState(false)
  // const [openChangePassword, setOpenChangePassword] = useState(false)

  const { user, isAdmin, loginUser, logoutUser, RegisterUser} = useUser()

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
  const handleRegisterSubmit = (username, password, name) => {
    
    RegisterUser(username, password, name)
    setOpenRegisterDialog(false)
  }
  // const handleChangePasswordSubmit = (oldpassword, newpassword, confirmpassword) => {
  
  //   ChangePassword(oldpassword, newpassword, confirmpassword)
  //   setOpenChangePassword(false)
  // }
  const handleLoginClose = () => {
    setOpenLoginDialog(false)
  }
  const handleRegisterClose = () => {
    setOpenRegisterDialog(false)
  }
  // const handleChangePasswordClose = () => {
  //   setOpenChangePassword(false)
  // }

  const handleLogout = () => {
    logoutUser()
    handleCloseUserMenu()
  }
  // const changingpassword = () => {
  //   setOpenChangePassword(true);
  // };
  const profileview =()=>{
    

  }

  useEffect(() => {
    if (!user) {
      navigate("/")
    } else if (isAdmin) {
      navigate("/admin/books/add")
    }
    else if(user){
      navigate("/books")
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
{console.log(user, "user")}
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
                    <MenuItem onClick={profileview()}>
                      <Typography textAlign="center">Profile</Typography>

                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                      <Typography textAlign="center">Logout</Typography>
                    </MenuItem>
                    {/* <MenuItem onClick={changingpassword}>
                  
                      <Typography textAlign="center">ChangePassword</Typography>
                    </MenuItem> */}
                  </Menu>
                </>
              ) : (
                <>
                <Button
                  onClick={() => {
                    setOpenLoginDialog(true)
                  }}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  Login
                </Button>
                <Button
                  onClick={() => {
                    setOpenRegisterDialog(true)
                  }}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  Register
                </Button>
                </>
              )}
            </Toolbar>
          </AppBar>
        </Box>

      </AppBar>

      <Routes>
        <Route path="/books" exact element={<Bookslist />}></Route>
        <Route path="/books/:id" element={
          <WithLoginProtector>
            <Book/>
          </WithLoginProtector>
        }></Route>
        

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
        <Route path="/profile/:id" exact element={
        <WithLoginProtector>
          <Profile/>
            </WithLoginProtector>
      }></Route>
      </Routes>
      <LoginDialog
        open={openLoginDialog}
        handleSubmit={handleLoginSubmit}
        handleClose={handleLoginClose}
      />
      <RegisterDialog
      open={openRegisterDialog}
      handleSubmit={handleRegisterSubmit}
      handleClose={handleRegisterClose}
      />
      {/* <ChangePassword>
        open= {openChangePassword}
        handleSubmit={handleChangePasswordSubmit}
        handleClose = {handleChangePasswordClose}
      </ChangePassword>
      */}

    </>
  )
}

export default Applayout
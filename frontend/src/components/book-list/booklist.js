import React from 'react'
import { useState, useEffect } from "react"
import { Link as RouterLink } from "react-router-dom"
import {
    Button,Paper,Table,TableBody,TableCell,TableContainer,
    TableHead,TableRow,Modal,Card,CardContent,CardActions,
    Typography,TablePagination,
} from "@mui/material"

import classes from "./styles.module.css"
import BackendApi from '../../backend-api-calls'
import { useUser } from '../../context/user-contex'


const Booklist = () => {
 const [books, setbooks] = useState([])
 const [page, setPage] = useState(0)
 const [rowsPerPage, setRowsPerPage] = useState(10)
 const [activeBookId, setActiveBookId] = useState("")
 const [openModal, setOpenModal] = useState(false)
 const {isAdmin,user}=useUser()
 const [userBookData, setUserBookData] =useState([{}])



  const fetchBooks = async () => {
    const  {books} = await BackendApi.book.getAllBooks()
      setbooks(books)
} 


const fetchBooksData = async (bookIDs) => {
    try {
        const bookDataArray = [];

      for (const bookID of bookIDs) {
        const response = await BackendApi.book.getBookByid(bookID);
        
        if (!response.error) {
          
          bookDataArray.push(response.book);
        } else {

          console.error(`Error fetching book data for ID: ${bookID}`);
        }
      }
      setUserBookData(bookDataArray);
    } catch (error) {
    
      console.error("Error fetching book data:", error);
      setUserBookData([])    }
  };
  useEffect(() => {
    
    if (user && user.BooksReserved) {
        const bookIDs = user.BooksReserved;
        fetchBooksData(bookIDs);
    } else {

        console.error("No BooksReserved data available for the user");
    
        setUserBookData([]);
    }
}, [user]); 




const deleteBook = () => {
    if (activeBookId && books.length) {
        BackendApi.book.deleteBook(activeBookId).then(({ success }) => {
            fetchBooks().catch(console.error)
            setOpenModal(false)
            setActiveBookId("")
        })
    }
}
   useEffect(()=>{
      fetchBooks().catch(console.error)
      
   }, [user]) 

  return (
 
                <>
                <div className={`${classes.pageHeader} ${classes.mb2}`}>
                <Typography variant="h5">Book List</Typography>
                {isAdmin && (
                    <Button variant="contained" color="primary" component={RouterLink} to="/admin/books/add">
                        Add Book
                    </Button>
                )}
            </div>
                {books.length > 0 ? (
                    <>
                        <div className={classes.tableContainer}>
                            <TableContainer component={Paper}>
                                <Table stickyHeader>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Name</TableCell>
                                            <TableCell align="right">id</TableCell>
                                            <TableCell align="right">Author</TableCell>
                                            <TableCell align="right">Quantity</TableCell>
                                            <TableCell align="right">Status</TableCell>
                                            <TableCell align="right">Publication</TableCell>
                                            <TableCell>Action</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {(rowsPerPage > 0
                                            ? books.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            : books
                                        ).map((book) => (
                                            <TableRow key={book._id}>
                                                <TableCell component="th" scope="row">
                                                    {book.title}
                                                </TableCell>
                                                <TableCell align="right">{book._id}</TableCell>
                                                <TableCell align="right">{book.Author}</TableCell>
                                                
                                                <TableCell align="right">{book.Avaibilityquantity}</TableCell>
                                                <TableCell align="right">{book.Status}</TableCell>
                                                <TableCell align="right">{book.Publication}</TableCell>
                                               
                                          
                                                <TableCell>
                                                    <div className={classes.actionsContainer}>
                                                        <Button
                                                            variant="contained"
                                                            component={RouterLink}
                                                            size="small"
                                                            to={`/books/${book._id}`}
                                                        >
                                                            View
                                                        </Button>
                                                    
                                                        {isAdmin && (
                                                        <>
                                                            <Button
                                                                variant="contained"
                                                                color="primary"
                                                                component={RouterLink}
                                                                size="small"
                                                                to={`/admin/books/${book._id}/edit`}
                                                            >
                                                                Edit
                                                            </Button>
                                                           
                                                            <Button
                                                                variant="contained"
                                                                color="secondary"
                                                                size="small"
                                                                onClick={(e) => {
                                                                    setActiveBookId(book._id)
                                                                    setOpenModal(true)
                                                                }}
                                                            >
                                                                Delete
                                                            </Button>
                                                        </>
                                                    )}
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <TablePagination
                                onRowsPerPageChange={(e) => {
                                    setRowsPerPage(parseInt(e.target.value, 10))
                                    setPage(0)
                                }}
                                component="div"
                                count={books.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={(e, newPage) => setPage(newPage)}
                            />
                             <Modal open={openModal} onClose={(e) => setOpenModal(false)}>
                            <Card className={classes.conf_modal}>
                                <CardContent>
                                    <h2>Are you sure?</h2>
                                </CardContent>
                                <CardActions className={classes.conf_modal_actions}>
                                    <Button variant="contained" onClick={() => setOpenModal(false)}>
                                        Cancel
                                    </Button>
                                    <Button variant="contained" color="secondary" onClick={deleteBook}>
                                        Delete
                                    </Button>
                                </CardActions>
                            </Card>
                        </Modal>

                           
                        </div>
                    </>
                ) : (
                    <Typography variant="h5">No books found!</Typography>
                )}
    


       {
                user && !isAdmin && (
                    <>
                        <div className={`${classes.pageHeader} ${classes.mb2}`}>
                            <Typography variant="h5">Reserved Books</Typography>
                        </div>
                        {userBookData.length > 0 ? (
                            <>
                                <div className={classes.tableContainer}>
                                    <TableContainer component={Paper}>
                                        <Table stickyHeader>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Name</TableCell>
                                                    <TableCell align="right">id</TableCell>
                                                    <TableCell>Author</TableCell>
                                                    <TableCell align="right">Quantity</TableCell>
                                    
                                                    <TableCell></TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {userBookData.map((book) => (
                                                    <TableRow key={book._id}>
                                                        <TableCell component="th" scope="row">
                                                            {book.title}
                                                        </TableCell>
                                                        <TableCell align="right">{book._id}</TableCell>
                                                        <TableCell>{book.Author}</TableCell>
                                                        <TableCell align="right">{book.Avaibilityquantity}</TableCell>
                                                    
                                                        <TableCell>
                                                            <div className={classes.actionsContainer}>
                                                                <Button
                                                                    variant="contained"
                                                                    component={RouterLink}
                                                                    size="small"
                                                                    to={`/books/${book._id}`}
                                                                >
                                                                    View
                                                                </Button>
                                                            </div>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </div>
                            </>
                        ) : (
                            <Typography variant="h5">No books Reserved!</Typography>
                        )}
                    </>
                )
            }
        </>
  )
}


export default Booklist

import { useEffect, useState } from "react"
import { useParams, useNavigate, Link as RouterLink } from "react-router-dom"
import {
    Tabs,
    Tab,
} from "@mui/material"
import {
    Button,Paper,Table,TableBody,TableCell,TableContainer,
    TableHead,TableRow,Modal,Card,CardContent,CardActions,
    Typography,TablePagination,
} from "@mui/material"
import { NotificationManager } from "react-notifications"
import BackendApi from "../../backend-api-calls"
import { useUser } from "../../context/user-contex"
import { TabPanel } from "./tabs"
import classes from "./styles.module.css"

export const Book = () => {
    const { id } = useParams()
    const { user, isAdmin } = useUser()
    const navigate = useNavigate()
    const [book, setBook] = useState(null)
    const [openTab, setOpenTab] = useState(0)
    const [userBookData, setUserBookData] = useState([]);

    
    
    
    const ReserveBook = () => {
        const token = localStorage.getItem('token');
            if (book && user) {
                console.log(token ,"sending id")
                console.log(book,"book")
                BackendApi.user
                    .reserveBook(book._id)
                    .then(({ book, error }) => {
                        if (error) {
                            NotificationManager.error(error)
                        } else {
                            setBook(book)
                        }
                    })              
                    .catch(console.error)
            }
        }

    
        

    const UnReserveBook = () => {
        if (book && user) {
            BackendApi.user
                .unreserveBook(book._id)
                .then(({ book, error }) => {
                    if (error) {
                        NotificationManager.error(error)
                    } else {
                        setBook(book)
                    }
                })
                .catch(console.error)
        }
    }

    useEffect(() => {
        if (id) {
            BackendApi.book
                .getBookByid(id)
                .then(({ book, error }) => {
                    if (error) {
                        NotificationManager.error(error)
                    } else {
                        setBook(book)
                    }
                })
                .catch(console.error)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    // const userbooks=()=>{
    //     if(user){
    //     BackendApi.user.getuserbooks(user._id)
    //     .then(({books,error})=>{
    //         if(error){
    //             NotificationManager.error(error)
    //         }
    //         else{
    //             setBooks(books)
    //         }
    //     })
    //     .catch(console.error)
    //     }
    // }

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

//   const  bookIDs= user.BooksReserved
//   fetchBooksData(bookIDs)
//     .then((bookDataArray) => {
//       console.log("Book Data:", bookDataArray);
      
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//     });
    
  
console.log(userBookData[0], "data")
    
    return (
        book && (
            <div className={classes.wrapper}>
                <Typography variant="h5" align="center" style={{ marginBottom: 20 }}>
                    Book Details
                </Typography>
                <Card>
                    <Tabs
                        value={openTab}
                        indicatorColor="primary"
                        textColor="primary"
                        onChange={(e, tabIndex) => {
                            setOpenTab(tabIndex)
                            if (book && tabIndex > 0) {
                               console.log("tab1")
                            }
                        }}
                        centered
                    >
                        <Tab label="Book Details" tabIndex={0} />
                        <Tab label="Reserved By" tabIndex={1} />
                        <Tab label="Reserved History" tabIndex={2} />
                    </Tabs>

                    <TabPanel value={openTab} index={0}>
                        
                        <CardContent>
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell variant="head" component="th" width="200">
                                            Name
                                        </TableCell>
                                        <TableCell>{book.title}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell variant="head" component="th">
                                            id
                                        </TableCell>
                                        <TableCell>{book._id}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell variant="head" component="th">
                                            Author
                                        </TableCell>
                                        <TableCell>${book.Author}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell variant="head" component="th">
                                            Quantity
                                        </TableCell>
                                        <TableCell>${book.Avaibilityquantity}</TableCell>
                                    </TableRow>
                                    
                                    <TableRow>
                                        <TableCell variant="head" component="th">
                                            Status
                                        </TableCell>
                                        <TableCell>{book.Status}</TableCell>
                                    </TableRow>
                                    
                                </TableBody>
                            </Table>
                        </CardContent>
                    </TabPanel>

                    <TabPanel value={openTab} index={1}>
                    <TableContainer component={Paper}>
                                <Table stickyHeader>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Name</TableCell>
                                            <TableCell align="right"></TableCell>
                                            <TableCell align="right">Author</TableCell>
                                            <TableCell align="right">Quantity</TableCell>
                                            <TableCell align="right">Status</TableCell>
                                            <TableCell align="right">Publication</TableCell>
                                            <TableCell>Action</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {userBookData.map((item) => (
                        
                                            <TableRow key={item._id}>
                                                <TableCell component="th" scope="row">
                                                    {item.title}
                                                </TableCell>
                                                <TableCell align="right">{item._id}</TableCell>
                                                <TableCell align="right">{item.Author}</TableCell>
                                                
                                                <TableCell align="right">{item.Avaibilityquantity}</TableCell>
                                                <TableCell align="right">{item.Status}</TableCell>
                                                <TableCell align="right">{item.Publication}</TableCell>
                                               
                                        
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        
                    </TabPanel>

                    <TabPanel value={openTab} index={2}>
                        <CardContent>
                          
                        </CardContent>
                    </TabPanel>

                    <CardActions disableSpacing>
                        <div className={classes.btnContainer}>
                            {isAdmin ? (
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    component={RouterLink}
                                    to={`/admin/books/${book._id}/edit`}
                                >
                                    Edit Book
                                </Button>
                            ) : (
                                <>
                               
                                    <Button
                                        variant="contained"
                                        onClick={ReserveBook}
                                        disabled={book && user && book.ReservedBy.includes(user._id)}
                                    
                                    >
                                        Reserve 
                                    </Button>
                                    <Button
                                        variant="contained"
                                        onClick={UnReserveBook}
                                        disabled={book && user && !book.ReservedBy.includes(user._id)}
                                    >
                                        UnReserve
                                    </Button>
                                </>
                            )}
                            <Button type="submit" variant="text" color="primary" onClick={() => navigate(-1)}>
                                Go Back
                            </Button>
                        </div>
                    </CardActions>
                </Card>
            </div>
        )
    )
}

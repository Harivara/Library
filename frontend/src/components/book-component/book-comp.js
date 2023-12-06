
import { useEffect, useState } from "react"
import { useParams, useNavigate, Link as RouterLink } from "react-router-dom"
import {
    Button,
    Card,
    CardContent,
    CardActions,
    Typography,
    Tabs,
    Tab,
    Table,
    TableBody,
    TableCell,
    TableRow,
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
 
    const ReserveBook = () => {
            if (book && user) {
                BackendApi.user
                    .borrowBook(book.isbn, user._id)
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
                .unreserveBook(book._id, user._id)
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

                    {/* <TabPanel value={openTab} index={1}>
                        <CardContent>
                            {book && book.ReservedBy.length > 0 ? (
                                console.log(book.ReserveBook)
                            ) : (
                                <h3>No history found!</h3>
                            )}
                        </CardContent>
                    </TabPanel>

                    <TabPanel value={openTab} index={2}>
                        <CardContent>
                            {book && book.ReserveBookHistory.length > 0 ? (
                                console.log(book.ReserveBookHistory)
                            ) : (
                                <h3>No history found!</h3>
                            )}
                        </CardContent>
                    </TabPanel> */}

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
                                {console.log(book.ReservedBy)}
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

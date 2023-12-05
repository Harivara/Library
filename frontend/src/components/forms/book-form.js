import React, { useState, useEffect } from "react"
import * as dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import { useParams, useNavigate } from "react-router-dom"
import {
    Paper,
    Container,
    Button,
    TextField,
    FormGroup,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Typography,
} from "@mui/material"

import classes from "./style.module.css"
import BackendApi from "../../backend-api-calls"

dayjs.extend(utc)

export const BookForm = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [book, setBook] = useState({
        title: "",
        quantity: 0,
        Author: "",
        Publication:"",
    })
    const [errors, setErrors] = useState({
        title: "",
        quantity: "",
        Author: "",
        Publication:"",
    })

    const isInvalid =
        book.title?.trim() === "" || book.id?.trim() === ""

    const formSubmit = (event) => {
        event.preventDefault()
        if (!isInvalid) {
            if (id) {
              
                BackendApi.book
                    .updateBookByid(id, {
                        ...book,
                    })
                    .then(() => navigate(-1))
            } else {
                BackendApi.book
                    .createBook({
                        ...book,
                    })
                    .then(() => navigate("/"))
            }
        }
    }

    const updateBookField = (event) => {
        const field = event.target
        setBook((book) => ({ ...book, [field.name]: field.value }))
    }

    const validateForm = (event) => {
        const { name, value } = event.target
        if (["name", "quantity", "Author", "Publication"].includes(name)) {
            setBook((prevProd) => ({ ...prevProd, [name]: value?.trim() }))
            if (!value?.trim()?.length) {
                setErrors({ ...errors, [name]: `${name} can't be empty` })
            } else {
                setErrors({ ...errors, [name]: "" })
            }
        }
        if (["quantity"].includes(name)) {
            if (isNaN(Number(value))) {
                setErrors({ ...errors, [name]: "Only numbers are allowed" })
            } else {
                setErrors({ ...errors, [name]: "" })
            }
        }
    }

    useEffect(() => {
        if (id) {
            BackendApi.book.getBookByid(id).then(({ book, error }) => {
                if (error) {
                    navigate("/")
                } else {
                    setBook(book)
                }
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    return (
        <>
            <Container component={Paper} className={classes.wrapper}>
                <Typography className={classes.pageHeader} variant="h5">
                    {id ? "Update Book" : "Add Book"}
                </Typography>
                <form noValidate autoComplete="off" onSubmit={formSubmit}>
                    <FormGroup>
                        <FormControl className={classes.mb2}>
                            <TextField
                                label="Name"
                                name="name"
                                required
                                value={book.name}
                                onChange={updateBookField}
                                onBlur={validateForm}
                                error={errors.name?.length > 0}
                                helperText={errors.name}
                            />
                        </FormControl>
                        <FormControl className={classes.mb2}>
                            <TextField
                                label="Publication"
                                name="Publication"
                                required
                                value={book.Publication}
                                onChange={updateBookField}
                                onBlur={validateForm}
                                error={errors.Publication?.length > 0}
                                helperText={errors.isbn}
                            />
                        </FormControl>
                     
                        <FormControl className={classes.mb2}>
                            <TextField
                                label="Author"
                                name="Author"
                                required
                                value={book.Author}
                                onChange={updateBookField}
                                onBlur={validateForm}
                                error={errors.Author?.length > 0}
                                helperText={errors.Author}
                            />
                        </FormControl>
                        <FormControl className={classes.mb2}>
                            <TextField
                                label="Quantity"
                                name="quantity"
                                type="number"
                                value={book.quantity}
                                onChange={updateBookField}
                                onBlur={validateForm}
                                error={errors.quantity?.length > 0}
                                helperText={errors.quantity}
                            />
                        </FormControl>
                    </FormGroup>
                    <div className={classes.btnContainer}>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => {
                                navigate(-1)
                            }}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" variant="contained" color="primary" disabled={isInvalid}>
                            {id ? "Update Book" : "Add Book"}
                        </Button>
                    </div>
                </form>
            </Container>
        </>
    )
}
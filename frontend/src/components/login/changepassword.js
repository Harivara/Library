import { useState, forwardRef } from "react"
import {
Button,TextField,Dialog,DialogActions,DialogContent,DialogTitle,Slide,} from "@mui/material"

const Transition = forwardRef(function Transition(props, ref){

return <Slide direction="up" ref={ref} {... props} />
})

export const ChangePassword = ({ open, handleClose, handleSubmit })=>{

const [oldpassword,setOldpassword] = useState("") 
const [newpassword, setNewpassword] = useState("")
const [confirmpassword, setConfirmpassword] = useState("")

const onSubmit = (event)=> { 
    event.preventDefault()
    handleSubmit(oldpassword,newpassword,confirmpassword)
}

const handleEnterKeyDown = (event)=> { 
    if (event.key=== "Enter") {
         onSubmit(event)
    }
}

return  (
    <Dialog
    open = {open}
    TransitionComponent={Transition}
    keepMounted
    onClose={handleClose}
    onKeyDown={handleEnterKeyDown}
>   
    <DialogTitle>ChangePassword</DialogTitle>
    <DialogContent>
             <TextField
                autoFocus
                margin="dense"
                id="oldpassword"
                type="text"
                label="Old Password"
                fullWidth
                variant="standard"
                value={oldpassword}
                onChange={(e)=>setOldpassword(e.target.value)}
                />
             <TextField
                autoFocus
                margin="dense"
                id="newpassword"
                type="text"
                label="New Password"
                fullWidth
                variant="standard"
                value={newpassword}
                onChange={(e)=>setNewpassword(e.target.value)}
                />
             <TextField
                autoFocus
                margin="dense"
                id="confirmpassword"
                type="text"
                label="Confirm Password"
                fullWidth
                variant="standard"
                value={confirmpassword}
                onChange={(e)=>setConfirmpassword(e.target.value)}
                />
    </DialogContent>
    <DialogActions>
        <Button variant="text" onClick={handleClose}>
            Cancel
        </Button>
        <Button variant="contained" type="submit" onClick={onSubmit}> Submit </Button>
    </DialogActions>
    </Dialog>
)
}
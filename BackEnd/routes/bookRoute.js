const express =require("express")
const { createbook, getbookdetails, getAllBooks, updatebook, deletebook, reservebook, user_reserved } = require("../controllers/bookController")
const { isAuthenticatedUser, authorizedRoles } = require("../middleware/auth")

const router=express.Router()

router.route("/admin/createbook").put(createbook)
router.route("/getbookdetails/:id").get(getbookdetails)
router.route("/getallbooks").get(getAllBooks)  
router.route("/admin/updatebook/:id").post(updatebook)
router.route("/admin/deletebook/:id").delete( deletebook)
// router.route("/user/reservebook/:id").put(isAuthenticatedUser,reservebook)


module.exports =router
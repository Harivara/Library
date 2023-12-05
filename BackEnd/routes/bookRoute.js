const express =require("express")
const { createbook, getbookdetails, getAllBooks, updatebook } = require("../controllers/bookController")
const { isAuthenticatedUser, authorizedRoles } = require("../middleware/auth")

const router=express.Router()

router.route("/admin/createbook").put(isAuthenticatedUser,authorizedRoles("admin"),createbook)
router.route("/getbookdetails/:id").get(isAuthenticatedUser,getbookdetails)
router.route("/getallbooks").get(getAllBooks)
router.route("/admin/updatebook/:id").post(isAuthenticatedUser,authorizedRoles("admin"),updatebook)

module.exports =router
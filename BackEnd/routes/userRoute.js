const express =require("express")
const { createUser, loginUser, logoutUser, getUserDetails, updateUserPassword, updateUserProfile, getAllUsers, getSingleUser, upadateUserRole, deleteUser,  reservebook } = require("../controllers/userController")
const { isAuthenticatedUser, authorizedRoles } = require("../middleware/auth")

const router=express.Router()

router.route("/createuser").post(createUser)

router.route("/loginuser").post(loginUser)

router.route("/logoutuser").get(logoutUser)
router.route("/me/details").get(isAuthenticatedUser,getUserDetails)
// isAuthenticatedUser function present in auth.js file verifies the token created while log in the user
// So while retriving userDetails we have to import isAuthenticatedUser function also
router.route("/password/update").put(isAuthenticatedUser,updateUserPassword)
router.route("/profile/update").put(isAuthenticatedUser,updateUserProfile)

router.route("/admin/users").get(isAuthenticatedUser,authorizedRoles("admin"),getAllUsers)
router.route("/admin/user/:id").get(isAuthenticatedUser,authorizedRoles("admin"),getSingleUser)
router.route("/admin/user/:id").get(isAuthenticatedUser,authorizedRoles("admin"),getSingleUser)
router.route("/admin/updateuser/:id")
.put(isAuthenticatedUser,authorizedRoles("admin"),upadateUserRole)
.get(isAuthenticatedUser,authorizedRoles("admin"),deleteUser)
router.route("/reservebook/:id").put(isAuthenticatedUser,reservebook)

module.exports =router
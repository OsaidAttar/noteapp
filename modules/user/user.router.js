import { Router } from "express";
import * as userController from './controller/user.controller.js'
import {auth} from "../middelware/auth.middelware.js";
const router =Router()
router.get('/profile',auth,userController.getUser)
router.delete('/delete',auth,userController.deleteUser)
router.put('/update',auth,userController.updateUser)
router.patch('/change_password',auth,userController.changePassword)
export default router
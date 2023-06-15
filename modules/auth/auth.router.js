import { Router } from "express";
import * as authController from './controller/auth.controller.js'
import { asyncHandler } from "../Services/asyncHandler.js";
const router =Router()
router.post('/signup',asyncHandler( authController.signUp))
router.post('/signin',asyncHandler( authController.signIn))

export default router
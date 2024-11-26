import { Router } from "express";
import { Login, SignUp } from "../../controllers/auth/index.js";
import { UserValidator, validateUser } from "../../middlewares/LoginValidator.js";


const router = Router()

router.post('/login',UserValidator, validateUser, Login)
router.post('/signup', SignUp)


export default router

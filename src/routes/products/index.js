import { Router } from "express";
import { supabase } from "../../supabase/db.js";
import { addProduct, getAllProducts } from "../../controllers/Product.js";
import { ProductError, ProductPick, validateProduct } from "../../middlewares/ProductValidate.js";


const router = Router()

router.get('/', getAllProducts)
router.post('/',ProductPick,ProductError, validateProduct, addProduct)

export default router
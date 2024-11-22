import { Router } from "express";
import { supabase } from "../../supabase/db.js";
import { addProduct, getAllProducts } from "../../controllers/Product.js";
import { ProductPick, validateProduct } from "../../middlewares/ProductValidate.js";


const router = Router()

router.get('/', getAllProducts)
router.post('/',ProductPick, validateProduct, addProduct)

export default router
import { Router } from "express";
import { supabase } from "../../supabase/db.js";
import { productEdit, ProductError, ProductPick, validateProduct, validateProductEdit } from "../../middlewares/ProductValidate.js";
import { addProduct, AlterProduct, getAllProducts, getProductById } from "../../controllers/product/index.js";

const router = Router()

// get all products
router.get('/', getAllProducts)
// get product by id
router.get('/:id', getProductById)
// edit product
router.put('/:id',productEdit,validateProductEdit, AlterProduct)

// add product
router.post('/',ProductPick,ProductError, validateProduct, addProduct)

export default router
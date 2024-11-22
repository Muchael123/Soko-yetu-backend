import { body, validationResult } from "express-validator";

const ProductValidation = [
    body('price')
    .isNumeric().withMessage('Product price must be a number').custom((value) => {
        if (value < 0) {
          throw new Error('Product price must be greater than 0');
        }
        return true;
      })
    .notEmpty().withMessage('Product price is required'),

    body('name').isString().withMessage('Product name must be a string')
    .notEmpty().withMessage('Product name is required'),

    body('description')
    .isArray().withMessage('Description must be an array of strings')
    .isLength({ min: 1 }).withMessage('At least one tag is required')
    .custom((value) => {
      if (!value.every((tag) => typeof tag === 'string')) {
        throw new Error('Each description must be a string');
      }
      return true;
    }).optional(),

    body('imageUrl')
    .isString().withMessage('Product imageUrl must be a string')
    .notEmpty().withMessage('Product imageUrl is required'),
    
    body('category').isString().withMessage('Product category must be a string').notEmpty().withMessage('Product category is required').optional(),
    
    body('stock_quantity')
    .isNumeric().withMessage('Product stock_quantity must be a number').custom((value) => {
        if (value < 1) {
          throw new Error('Product stock_quantity must be greater than 0');
        }
        return true;
      })
]

export const validateProduct = (req, res, next) => {
  console.log("Running Product validation...", req.body)
  const errors = validationResult(req);  
  console.log("error...", errors)
  if (errors.isEmpty()) {
    console.log("No errors found")
    return next()
  }
  return res.status(400).json({ errors: errors.array() })
}

export const ProductPick = (req, res, next) => {
  console.log(req.body)
  const { name, price, description, category, imageUrl, stock_quantity } = req.body
  if (!name || !price || !description || !category || !imageUrl || !stock_quantity) {
    return res.status(400).json({ error: "All fields are required." })
  }
  req.body = { name, price, description, category, imageUrl, stock_quantity }
  next()
}

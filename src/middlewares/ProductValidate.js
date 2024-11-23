import { body, validationResult } from "express-validator";

export const ProductError = [
  body('price')
    .isNumeric().withMessage('Product price must be a number')
    .custom((value) => {
      if (value < 0) {
        throw new Error('Product price must be greater than 0');
      }
      return true;
    })
    .notEmpty().withMessage('Product price is required'),

  body('name')
    .isString().withMessage('Product name must be a string')
    .notEmpty().withMessage('Product name is required'),

  body('description')
    .optional()
    .isArray().withMessage('Description must be an array of strings')
    .custom((value) => {
      if (!value.every((tag) => typeof tag === 'string')) {
        throw new Error('Each description must be a string');
      }
      return true;
    }),

  body('imageUrl')
    .isString().withMessage('Product imageUrl must be a string')
    .notEmpty().withMessage('Product imageUrl is required'),

  body('category')
    .isString().withMessage('Product category must be a string')
    .notEmpty().withMessage('Product category is required'),

  body('stock_quantity')
    .isNumeric().withMessage('Product stock_quantity must be a number')
    .custom((value) => {
      if (value < 1) {
        throw new Error('Product stock_quantity must be greater than 0');
      }
      return true;
    })
    .notEmpty().withMessage('Product stock_quantity is required'),
];

export const validateProduct = (req, res, next) => {

  const errors = validationResult(req); 
  if (errors.isEmpty()) {
    console.log("No errors found");
    return next();
  }

  return res.status(400).json({ errors: errors.array() });
};

export const ProductPick = (req, res, next) => {
  
  const { name, price, description, category, imageUrl, stock_quantity } = req.body;
  console.log(typeof description, description);
  if (!name || !price || !description || !category || !imageUrl || !stock_quantity) {
    return res.status(400).json({ error: "All fields are required." });
  }

  req.body = { name, price, description, category, imageUrl, stock_quantity };
  next();
};

export const productEdit = [
  body('price')
    .optional()
    .isNumeric().withMessage('Product price must be a number')
    .custom((value) => {
      if (value < 0) {
        throw new Error('Product price must be greater than 0');
      }
      return true;
    }),

  body('name')
    .optional()
    .isString().withMessage('Product name must be a string'),

  body('description')
    .optional()
    .isArray().withMessage('Description must be an array of strings')
    .custom((value) => {
      if (!value.every((tag) => typeof tag === 'string')) {
        throw new Error('Each description must be a string');
      }
      return true;
    }),

  body('imageUrl')
    .optional()
    .isString().withMessage('Product imageUrl must be a string'),

  body('category')
    .optional()
    .isString().withMessage('Product category must be a string'),

  body('stock_quantity')
    .optional()
    .isNumeric().withMessage('Product stock_quantity must be a number')
    .custom((value) => {
      if (value < 1) {
        throw new Error('Product stock_quantity must be greater than 0');
      }
      return true;
    }),
]

export const validateProductEdit = (req, res, next) => {
  const errors = validationResult(req); 
  if (errors.isEmpty()) {
    console.log("No errors found");
    return next();
  }

  return res.status(400).json({ errors: errors.array() });
};

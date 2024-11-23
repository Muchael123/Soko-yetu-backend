import { check, validationResult } from 'express-validator';
export const UserValidator = [
    check('email').isEmail().withMessage('Email is required'),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
]

export const validateUser = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        console.log("No errors found");
        return next();
    }
    return res.status(400).json({ errors: errors.array() });
};
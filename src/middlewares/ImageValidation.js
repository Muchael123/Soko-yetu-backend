import multer from "multer"

//validate image and check if it is an image

const ValidateImage = (req, res, next) => {
    const file = req.file
    if (!file) {
        return res.status(400).json({error: "Image is required."})
    }
    if (!file.mimetype.startsWith('image')) {
        return res.status(400).json({error: "File must be an image."})
    }
    next()
}


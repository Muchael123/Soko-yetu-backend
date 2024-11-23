import { supabase } from "../../supabase/db.js"

 const addProduct = async (req, res) => {
    
    if(req.file){
        
    }
    const {name, price, description, category, imageUrl, stock_quantity} = req.body
    console.log(typeof description, description)
    const {data, error} = await supabase.from('product')
    .insert({name, price, description, category, imageUrl, stock_quantity}).select()
    if (data) {
        return res.status(201).json({message: "Product added successfully", data: data[0]})
    }
    if (error) {
        console.log(error)
        return res.status(503).json({Message: "Service is temporarily unavailable. Please try again later."})
    }
    return res.status(500).json({error: "Something went wrong. Try again later."})
    
}

export default addProduct

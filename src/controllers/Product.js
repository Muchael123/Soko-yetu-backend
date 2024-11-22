import { supabase } from "../supabase/db.js"

export const getAllProducts = async (req, res) => {
        const {data, error} = await supabase.from('product').select()
       if (data.length === 0) {
            return res.status(404).json({error: "No products found."})
            } else{
            return res.status(200).json(data)
            }
        console.log(error)
          return res.status(500).json({error: "Something went wrong. Try again later."})
      }

export const addProduct = async (req, res) => {
    console.log("body...\n", req.body)
    if(req.file){
        
    }
    const {name, price, description, category, imageUrl, stock_quantity} = req.body
    console.log("name...",name)
    const {data, error} = await supabase.from('product')
    .insert({name, price, description, category, imageUrl, stock_quantity}).select()
    console.log("data...",data)
    if (data) {
        return res.status(201).json({message: "Product added successfully", data: data[0]})
    }
    if (error) {
        console.log(error)
        return res.status(500).json({error: "Failed to add product. Try again later."})
    }
    return res.status(500).json({error: "Something went wrong. Try again later."})
    
}


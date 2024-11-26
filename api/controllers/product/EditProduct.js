import { supabase } from "../../supabase/db.js"

const AlterProduct = async (req, res) => {
    
    const {id} = req.params
    const Id = parseInt(id, 10)
    if(!id){
        return res.status(400).json({error: "Product ID is required."})
    }
    try{
        const {data, error} = await supabase.from('product').update(req.body).eq('id', Id).select()
        if (data) {
            return res.status(200).json({message: "Product updated successfully", data: data[0]})
        }
        if (error) {
            console.log(error)
            return res.status(503).json({Message: "Service is temporarily unavailable. Please try again later."})
        }
        return res.status(500).json({error: "Something went wrong. Try again later."})

    }catch(error){
        console.log(error)
        return res.status(500).json({error: "Something went wrong. Try again later."})
    }
}

export default AlterProduct

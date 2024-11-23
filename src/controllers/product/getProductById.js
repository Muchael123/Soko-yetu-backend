import { supabase } from "../../supabase/db.js"

const getProductById = async (req, res) => {
    const {id} = req.params
    try{
        const {data, error} = await supabase.from('product').select().eq('id', id)
        console.log(data, error)
        if (data?.length === 0) {
            return res.status(404).json({error: "Product not found."})
        } else {
            console.log(typeof data[0]?.description)
            return res.status(200).json(data[0])
        }
        return res.status(503).json({Message: "Service is temporarily unavailable. Please try again later."})
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: "Something went wrong. Try again later."})
    }
}
export default getProductById
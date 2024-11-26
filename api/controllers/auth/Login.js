import { supabase } from "../../supabase/db.js"

const Login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const {data, error} =  await supabase.auth.signInWithPassword({
            email: email,
            password: password})
            if(data.user && data.session){
                return res.status(200).json({Message: "Login successful", data: data})
            }else{
                return res.status(401).json({Message: "Login failed. Check your credentials"})
            }
    if (error) {
        console.log(error)
        return res.status(503).json({Message: "Service is temporarily unavailable. Please try again later."})
    }
} catch(e){
    console.log(e)
    return res.status(500).json({error: "Something went wrong. Try again later."})
}
}

export default Login



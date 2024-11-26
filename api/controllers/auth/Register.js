import AddUser from "../../lib/AddUsers.js";
import { supabase } from "../../supabase/db.js";

const SignUp = async (req, res) => {
    const { email, password } = req.body;
    try {
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password
        })
        if (data) {
            const user = data.user
            const User = AddUser(user?.id, user?.email)
            return res.status(200).json({ message: "Registration successful", data: user?.email })
        }
        if (error) {
            console.log(error)
            return res.status(503).json({ message: "Service is temporarily unavailable. Please try again later." })
        }
    } catch (e) {
        console.log(e)
        return res.status(500).json({ error: "Something went wrong. Try again later." })
    }
}

export default SignUp
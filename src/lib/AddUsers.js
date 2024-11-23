import { supabase } from "../supabase/db.js"

const AddUser = async (id,userEmail) => {
    console.log("Add user with id", id, "userEmail", userEmail)
    try {
        const { data, error } = await supabase
            .from('users')
            .insert([
                {user_email: userEmail , user_id: id}
            ])
        if (data) {
            console.log("data from signup db", data, error)
            return data
        }
        if (error) {
            console.log(error)
            return error
        }
    } catch (e) {
        console.log(e)
        return e
    }
}

export default AddUser

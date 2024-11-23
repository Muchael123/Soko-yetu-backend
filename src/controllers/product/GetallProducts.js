import { supabase } from "../../supabase/db.js";

const getAllProducts = async (req, res) => {
  const { page = 1, limit = 10 } = req.query; 

  const currentPage = parseInt(page, 10);
  const pageSize = parseInt(limit, 10);

  const start = (currentPage - 1) * pageSize; 
  const end = start + pageSize - 1;

  console.log(`Page: ${currentPage}, Limit: ${pageSize}, Range: ${start}-${end}`);

  try {
    const { data, error } = await supabase
      .from("product")
      .select("*")
      .range(start, end);

    if (error) {
      console.error("Supabase Error:", error);
      return res.status(503).json({
        error: "Service is temporarily unavailable. Please try again later.",
      });
    }

    if (!data || data.length === 0) {
      return res.status(404).json({ error: "No products found." });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error("Server Error:", error);
    return res.status(500).json({
      error: "Something went wrong. Try again later.",
    });
  }
};

export default getAllProducts;

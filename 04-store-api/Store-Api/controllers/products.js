const Product = require("../models/product")

const getAllProductsStatic =  async (req,res)=>{
    const products = await Product.find({}).sort("name").select("name company").limit(10).skip(2)
    res.status(200).json({products,nbHits:products.length})

}


const getAllProducts = async (req,res)=>{

    const {featured,name,company, sort,fields} = req.query
    const queryObject = {}
    if(featured){ //checks if user passes in featured and return the appropriate response
      queryObject.featured = featured === "true" ? true :false

    }
    if(company){
        queryObject.company =  company
      } 
    if (name){
        queryObject.name = {$regex: name , $options: "i"} // uses regex to match the names if the contain some characters in the query because user may not type the ful name everytime
    }
     console.log(queryObject)
    let result  = Product.find(queryObject)
    // const product = await Product.find(queryObject)

    if (sort){
       const sortList = sort.split(",").join(" ")
       result = result.sort(sortList)//if user passes sort the sort the array
       console.log("this is me " + sort)
       console.log("sortlist",sortList)
       console.log(result)
    }else{
        result = result.sort("createdAt")
    }

    if(fields){ 
        const fieldtList = sort.split(",").join(" ")
        result = result.select(fieldtList)
    }
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page -1) * limit
 
    const products = await  result
    res.status(200).json({products,nbHits:products.length})
}


module.exports = {
    getAllProducts,
    getAllProductsStatic
}

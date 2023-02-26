const Product = require("../Model/products");



//functions
//create product admin only
module.exports.createProduct = (reqBody) => {
    let newProduct = new Product({
        name : reqBody.name,
        description : reqBody.description,
        price : reqBody.price
    })
    return newProduct.save()
    .then((product, error) => {
        if (error){
            return error.message
        } else {
            return `Successfully added product ${product.name}`
        }
    })
}

//retrieve all active products
module.exports.getActiveProducts = () => {
    return Product.find({})
    .then(result => {
        if (result.length > 0){
            return result
        }else {
            return "There are no active products"
        }
    })
}
//update product information admin only
module.exports.updateProduct = (reqParams, reqBody) => {
    let updatedProduct = {
        name : reqBody.name,
        description : reqBody.description,
        price : reqBody.price
    }
    return Product.findByIdAndUpdate(reqParams, updatedProduct)
    .then((newProduct, error) => {
        if (error) {
            return error.message
        } else {
            return `${newProduct.name} has been updated`
        }
    });
}
//retrieve single product
module.exports.getProduct = (reqParams) => {
    return Product.find({_id : reqParams})
    .then(result => {
        if (result.length === 0){
            return `Product not found`
        } else {
           return result
        }
    })
}
//archive product admin only {isActive: !this.isActive}
module.exports.archiveProduct = (reqParams) => {
    return Product.findByIdAndUpdate(reqParams, [{$set:{isActive:{$eq:[false,"$isActive"]}}}])
    .then(result => {
        if(result.length === 0){
            return "Product not found"
        } else {
            return `${result.name} has been archived`
        }
    })
}

//non admin user checkout, create order


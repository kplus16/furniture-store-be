const Order = require("../Model/orders");
const Product = require("../Model/products");

//retrieve all orders admin only
module.exports.getAllOrders = () => {
    return Order.find({})
    .then(result => {
        if (result.length > 0){
            return result
        }else {
            return "No Orders yet"
        }
    })
}

//retrieve orders for specific user
module.exports.getMyOrders = (userId) => {
    return Order.find({userId : userId})
    .then(result => {
        if (result.length > 0){
            return result
        }else {
            return "User doesn't have orders yet"
        }
    })
}

//createOrder
module.exports.createOrder = async (userId, orderDetails) => {
        

        const productIds = orderDetails.map(product => product.productId);
        const quantities = orderDetails.map(product => product.quantity);

        const products = await Product.find({ _id : {$in : productIds}})

        const productDetails = products.map((product, index) => ({
            productId : product._id,
            productName : product.name,
            quantity : quantities[index],
            price : product.price
        }))

        const totalAmount = productDetails.reduce((sum, product) => sum + (product.price * product.quantity), 0);

        let newOrder = new Order({
            userId : userId,
            products : productDetails,
            totalAmount : totalAmount
        });

        

        return newOrder.save().then((order, error) => {
            if (error) {
                return error.message
            } else {
                return order
            }
        })
       
        
}

        // const products1 = [
        //     { productId: "63d63fc97dfe2d5e83362969", quantity: 4 },
        //     { productId: "63d65d3b197bd07f380d3c5a", quantity: 3 },
        // ];
 
        // await Product.find({ _id : {$in : productIds}})
        //         .then(result => {
        //             return {
        //                 productId : result._id,
        //                 productName : result.name,
        //                 quantity : 1,
        //                 price : result.price
        //             }
        //         }).catch(error => {
        //             return error.message;
        // });

        

        // let newOrder = new Order({
        //     userId : "63d63c5d5266c842dc63baf4",
        //     products : productDetails,
        //     totalAmount : 0
        // });

        // return newOrder.save().then((order, error) => {
        //     if (error) {
        //         return error.message
        //     } else {
        //         return order
        //     }
        // })


        
    // Product.find({ _id: { $in: productId } }, (err, products) => {
    //     if (err) return handleError(err);

    //     // Create an array of product details
    //     const productDetails = products.map(product => ({
    //         productId: product._id,
    //         productName: product.name,
    //         quantity: quantities[index],
    //         price: product.price
    //     }));

    //     //calculate the total amount 
    //     const totalAmount = productDetails.reduce((sum, product) => sum + (product.price * product.quantity), 0);

    //     // Create a new Order document with the product details
    //     const newOrder = new Order({
    //         userId : userId,
    //         product: productDetails,
    //         totalAmount: totalAmount
    //     });

    //     // Save the Order document to the database
    //     newOrder.save((err) => {
    //         if (err) return handleError(err);
    //         console.log('Order saved successfully!');
    //     });
    // });
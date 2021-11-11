const quantityCheck = (newQuantity, limit, currentQuantity, response) => {
    if (newQuantity < 1) {
        // Handle less than one
        response.json({
            status: 'ERROR',
            message: 'At least 1 product'
        })
        return null;
    }
    // Default 0 is unlimited
    else if (limit > 0 && newQuantity > limit && limit <= currentQuantity) {
        // Handle out of maximum can buy
        response.json({
            status: 'ERROR',
            message: `Maximum purchase quantity for this product is ${limit}`
        })
        return null;
    }
    else if (newQuantity > currentQuantity) {
        // Handle out of quantity
        response.json({
            status: 'ERROR',
            message: `The remaining quantity of the product is ${currentQuantity}`
        })
        return null;
    }
    return newQuantity;
};

module.exports = quantityCheck;
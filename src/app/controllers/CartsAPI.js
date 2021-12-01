const Cart = require('../models/Cart');
const Product = require('../models/Product');
const quantityCheck = require('../../utils/cartQuantityCheck');

class CartsAPI {
    // [GET] /carts
    async findAll(req, res) {
        try {
            const cart = await Cart
                .find({ userId: req.user._id })
                .sort({ createdAt: -1 });
            let result = [];
            await Promise.all(cart.map(async item => {
                const product = await Product
                    .findOne({ _id: item.productId });
                result.push({
                    _id: item._id,
                    productId: product._id,
                    name: product.name,
                    slug: product.slug,
                    images: product.images,
                    price: product.price,
                    discount: product.discount,
                    quantity: product.quantity,
                    VATFee: product.VATFee,
                    limit: product.limit,
                    amount: item.quantity,
                    checked: item.checked
                });
            }));
            const totalItem = result.length;
            res.json({
                cart: result,
                totalItem
            });
        } catch (error) {
            console.log(error);
        }
    };

    // [POST] /carts
    async insertCart(req, res) {
        try {
            const { productId, quantity } = req.body;
            const product = await Product
                .findOne({
                    _id: productId
                });
            const inforItem = {
                productId: product._id,
                name: product.name,
                slug: product.slug,
                images: product.images,
                price: product.price,
                discount: product.discount,
                quantity: product.quantity,
                VATFee: product.VATFee,
                limit: product.limit
            };
            if (product.quantity > 0) {
                const cartItem = await Cart
                    .findOne({
                        productId: product._id,
                        userId: req.user._id
                    });
                // Already have this item in cart
                if (cartItem) {
                    const newQuantity = quantityCheck(cartItem.quantity + quantity, product.limit, product.quantity, res);
                    if (!newQuantity) return;
                    cartItem.quantity = newQuantity;
                    await cartItem.save();
                    res.json({
                        status: 'SUCCESS',
                        message: 'Added product successfully!',
                        item: {
                            _id: cartItem._id,
                            amount: cartItem.quantity,
                            checked: cartItem.checked,
                            ...inforItem
                        },
                        quantity: newQuantity
                    })
                } else {
                    const newQuantity = quantityCheck(quantity + quantity, product.limit, product.quantity, res);
                    if (!newQuantity) return;
                    const cart = new Cart({
                        ...req.body,
                        userId: req.user._id
                    });
                    await cart.save();
                    res.json({
                        status: 'SUCCESS',
                        message: 'Added product successfully!',
                        item: {
                            _id: cart._id,
                            amount: cart.quantity,
                            checked: cart.checked,
                            ...inforItem
                        },
                        quantity
                    })
                }
            };
        } catch (error) {
            console.log(error);
        }
    };

    // [PATCH] /carts/check/:cartId/:isCheckedAll
    async toggleCheck(req, res) {
        try {
            const { cartId, isCheckedAll } = req.params;
            // Toggle all checkboxes
            if (cartId === 'null') {
                await Cart
                    .updateMany({
                        userId: req.user._id
                    }, {
                        checked: isCheckedAll
                    });
                res.json({
                    _id: null
                });
            } else {
                const cart = await Cart
                    .findOne({
                        _id: cartId,
                        userId: req.user._id
                    });
                cart.checked = !cart.checked;
                await cart.save();
                res.json({
                    _id: cart._id
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    // [PATCH] /carts/quantity/:cartId/:amount/:volatility
    async updateQuantity(req, res) {
        try {
            const { cartId, amount, volatility } = req.params;
            const cart = await Cart
                .findOne({
                    _id: cartId,
                    userId: req.user._id
                });
            const product = await Product
                .findOne({
                    _id: cart.productId
                });
            let newQuantity = volatility === 'null' ? parseInt(amount)
                : volatility === 'inc' ? cart.quantity + parseInt(amount)
                    : volatility === 'dec' ? cart.quantity - parseInt(amount)
                        : cart.quantity;
            if (newQuantity < 1) {
                // Handle less than one
                newQuantity = 1;
            }
            // Default 0 is unlimited
            else if (product.limit > 0 && newQuantity > product.limit && product.limit <= product.quantity) {
                // Handle out of maximum can buy
                newQuantity = product.limit;
            }
            else if (newQuantity > product.quantity) {
                // Handle out of quantity
                newQuantity = product.quantity;
            }
            cart.quantity = newQuantity;
            await cart.save();
            res.json({
                _id: cartId,
                newQuantity
            });
        } catch (error) {
            console.log(error);
        }
    };

    // [DELETE] /carts/:cartId
    async removeCart(req, res) {
        try {
            const { cartId } = req.params;
            // Remove all checked boxes
            if (cartId === 'null') {
                await Cart
                    .deleteMany({
                        userId: req.user._id,
                        checked: true
                    });
                res.json({
                    _id: null
                });
            } else {
                await Cart
                    .deleteOne({
                        _id: cartId,
                        userId: req.user._id
                    });
                res.json({
                    _id: cartId
                });
            }
        } catch (error) {
            console.log(error);
        }
    };
};

module.exports = new CartsAPI;
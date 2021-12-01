const Category = require('../models/Category');

class CategoriesAPI {
    // [GET] /categories
    async findAll(req, res) {
        try {
            const categories = await Category
                .find({ status: 'active' })
                .sort({ 'displayOrder': 1 });
            res.json(categories);
        } catch (error) {
            console.log(error);
        }
    };

    // [GET] /categories/:slugCategory
    async findBySlug(req, res) {
        try {
            const { slugCategory } = req.params;
            const category = await Category
                .findOne({
                    slug: slugCategory,
                    status: 'active'
                });
            const parents = [];
            let parent = await Category
                .findOne({
                    _id: category.parentId,
                    status: 'active'
                })
                .select('title slug parentId');
            while (parent !== null) {
                parents.push(parent);
                const prevParent = await Category
                    .findOne({
                        _id: parent.parentId,
                        status: 'active'
                    })
                    .select('title slug parentId');
                parent = prevParent;
            };
            const children = await Category
                .find({
                    parentId: category._id,
                    status: 'active'
                })
                .sort({ 'displayOrder': 1 })
                .select('title slug');
            res.json({
                ...(category.toObject()),
                parents,
                children
            });
        } catch (error) {
            console.log(error);
        }
    };

    // [POST] /categories
    async insertCategory(req, res) {
        try {
            const category = new Category(req.body);
            await category.save();
            res.json({
                status: 'success',
                message: 'Create category successfully!'
            });
        } catch (error) {
            console.log(error);
        }
    };
};

module.exports = new CategoriesAPI;
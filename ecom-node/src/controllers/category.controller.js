const Category = require('../models/category.model');
const { paginate, buildPageResponse } = require('../utils/pagination.utils');
const { getCache, setCache, clearCachePrefix } = require('../utils/cache.utils');

// GET /api/public/categories
const getAllCategories = async (req, res) => {
  try {
    const { pageNumber = 0, pageSize = 50, SortBy = 'categoryName', sortOrder = 'asc' } = req.query;
    const cacheKey = `category_all_${pageNumber}_${pageSize}_${SortBy}_${sortOrder}`;
    const cached = getCache(cacheKey);

    if (cached) {
      res.set('Cache-Control', 'public, max-age=120, stale-while-revalidate=600');
      res.set('X-Cache', 'HIT');
      return res.status(200).json(cached);
    }

    const { skip, limit, sort } = paginate(pageNumber, pageSize, SortBy, sortOrder);
    const [categories, total] = await Promise.all([
      Category.find().sort(sort).skip(skip).limit(limit),
      Category.countDocuments(),
    ]);
    if (!categories.length) {
      return res.status(400).json({ message: 'No category created till now.', status: false });
    }

    // FORMAT with categoryId so frontend can read it
    const formatted = categories.map(c => ({
      categoryId: c._id,
      categoryName: c.categoryName,
    }));

    const response = buildPageResponse(formatted, total, pageNumber, pageSize);
    setCache(cacheKey, response, 600); // 10 min TTL
    res.set('Cache-Control', 'public, max-age=120, stale-while-revalidate=600');
    res.set('X-Cache', 'MISS');
    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// POST /api/admin/categories
const createCategory = async (req, res) => {
  try {
    const { categoryName } = req.body;
    
    if (!categoryName) {
        return res.status(400).json({ message: "Category name is missing!", status: false });
    }

    const existing = await Category.findOne({ categoryName: categoryName });
    if (existing) {
      return res.status(400).json({ message: `Category with the name ${categoryName} already exists !!!`, status: false });
    }
    const category = await Category.create({ categoryName: categoryName });
    clearCachePrefix('category_');
    clearCachePrefix('products_');
    return res.status(201).json({ categoryId: category._id, categoryName: category.categoryName });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// DELETE /api/admin/categories/:categoryId
const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.categoryId);
    if (!category) {
      return res.status(404).json({ message: `Category not found with categoryId:${req.params.categoryId}`, status: false });
    }
    await category.deleteOne();
    clearCachePrefix('category_');
    clearCachePrefix('products_');
    return res.status(200).json({ categoryId: category._id, categoryName: category.categoryName });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// PUT /api/admin/categories/:categoryId
const updateCategory = async (req, res) => {
  try {
    const { categoryName } = req.body;

    if (!categoryName) {
        return res.status(400).json({ message: "Category name is missing!", status: false });
    }

    const category = await Category.findByIdAndUpdate(
      req.params.categoryId,
      { categoryName: categoryName },
      { new: true, runValidators: true }
    );
    if (!category) {
      return res.status(404).json({ message: `Category not found with categoryId:${req.params.categoryId}`, status: false });
    }
    clearCachePrefix('category_');
    clearCachePrefix('products_');
    return res.status(200).json({ categoryId: category._id, categoryName: category.categoryName });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = { getAllCategories, createCategory, deleteCategory, updateCategory };

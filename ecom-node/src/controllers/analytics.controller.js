const Product = require('../models/product.model');
const Order = require('../models/order.model');
const { getCache, setCache } = require('../utils/cache.utils');

// GET /api/admin/app/analytics
const getAnalytics = async (req, res) => {
  try {
    const cacheKey = 'admin_analytics';
    const cached = getCache(cacheKey);
    if (cached) {
      return res.status(200).json(cached);
    }

    const [productCount, totalOrders, revenueResult] = await Promise.all([
      Product.countDocuments(),
      Order.countDocuments(),
      Order.aggregate([{ $group: { _id: null, total: { $sum: '$totalAmount' } } }]),
    ]);
    const totalRevenue = revenueResult.length ? revenueResult[0].total : 0;
    const analyticsData = {
      productCount: String(productCount),
      totalOrders: String(totalOrders),
      totalRevenue: String(totalRevenue),
    };

    setCache(cacheKey, analyticsData, 60);

    return res.status(200).json(analyticsData);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = { getAnalytics };

const productmodel = require('../model/product.model');
const { success, failed } = require('../helper/respon');

const product = {

  getlist: (req, res) => {
    try {
      const { query } = req;
      const search = query.search === undefined ? '' : query.search;
      const field = query.field === undefined ? 'id' : query.field;
      const typeSort = query.sort === undefined ? 'ASC' : query.sort;
      const limit = query.limit === undefined ? 5 : query.limit;
      const offset = query.page === undefined || query.page === 1 ? 0 : (query.page - 1) * limit;
      productmodel.getlist(search, field, typeSort, limit, offset).then(async (result) => {
        const alldata = await productmodel.getAllData();
        const response = {
          data: result,
          totalpage: Math.ceil(alldata.length / limit),
          limit,
          page: req.query.page,
        };
        //    res.json(result)
        success(res, response, 'success');
      }).catch((err) => {
        res.json(err);
      });
    } catch (error) {
      // res.json(error)
      failed(res, 404);
    }
  },
  getdetail: (req, res) => {
    const { id } = req.params;
    try {
      const { query } = req;
      const limit = query.limit === undefined ? 5 : query.limit;
      const offset = query.page === undefined || query.page === 1 ? 0 : (query.page - 1) * limit;
      productmodel.getdetail(id, limit, offset).then((result) => {
        const response = {
          data: result,
          limit,
          page: req.query.page,
        };
        success(res, response, 'success');
      }).catch((err) => {
        failed(res, 404, err);
      });
    } catch (error) {
      failed(res, 401, error);
    }
  },
  insert: (req, res) => {
    try {
      const { body } = req;
      const idproduct = body.id;
      const { Product } = body;
      const { price } = body;
      const { description } = body;
      const { category } = body;
      const { stock } = body;
      productmodel.insert(idproduct, Product, price, description, category, stock)
        .then((result) => {
          success(res, result, 'success');
        }).catch((err) => {
          failed(res, 404, err);
        });
    } catch (err) {
      failed(res, 401, err);
    }
  },
  destroy: (req, res) => {
    try {
      const { id } = req.params;
      productmodel.destroy(id).then((result) => {
        success(res, result, 'success');
      }).catch((err) => {
        failed(res, 404, err);
      });
    } catch (err) {
      failed(res, 401, err);
    }
  },
  update: (req, res) => {
    try {
      const { body } = req;
      const idproduct = req.params.id;
      const { Product } = body;
      const { price } = body;
      const { description } = body;
      const { category } = body;
      const { stock } = body;
      productmodel.update(idproduct, Product, price, description, category, stock)
        .then((result) => {
          success(res, result, 'success');
        }).catch((err) => {
          failed(res, 404, err);
        });
    } catch (err) {
      failed(res, 401, err);
    }
  },
};
module.exports = product;

const response = {

  success: (res, data, message) => {
    const Response = {
      success: true,
      data,
      code: 200,
      message,
    };
    res.json(Response);
  },
  failed: (res, code) => {
    if (code === 404) {
      const failed = {
        success: false,
        data: null,
        code: 404,
        message: 'data not found',
      };
      res.json(failed);
    } if (code === 401) {
      const failed = {
        success: false,
        data: null,
        code: 401,
        message: 'unauthorized',
      };
      res.json(failed);
    } if (code === 402) {
      const failed = {
        success: false,
        data: null,
        code: 402,
        message: 'payment requirement',
      };
      res.json(failed);
    } if (code === 400) {
      const failed = {
        success: false,
        data: null,
        code: 400,
        message: 'bad request',
      };
      res.json(failed);
    }
  },
};

module.exports = response;

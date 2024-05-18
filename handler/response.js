const responseHandler = () => {
  return async (ctx, next) => {
    ctx.response.ok = (message, data = {}) => {
      ctx.status = 200;
      ctx.body = { message, data };
    };

    ctx.response.created = (message, data = {}) => {
      ctx.status = 201;
      ctx.body = { message, data };
    };

    ctx.response.conflict = (message, data = {}) => {
      ctx.status = 409;
      ctx.body = { message, data };
    };

    ctx.response.internalServreError = (message, data = {}) => {
      ctx.status = 500;
      ctx.body = { message, data };
    };

    await next();
  };
};

module.exports = responseHandler;

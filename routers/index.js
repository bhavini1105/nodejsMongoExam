const { Router } = require("express");
const userRouter = require("./userRouter");

const indexRouter = Router();

indexRouter.use('/',userRouter);

module.exports = indexRouter;
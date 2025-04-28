const { Router } = require("express");
const { login ,navigation, register, registerPage ,task ,taskAdd, taskList, deleteTask, editPage, edit} = require("../controllers/userController");

const userRouter = Router();

userRouter.get('/',navigation);
userRouter.get('/login',login);
userRouter.get('/register',register);
userRouter.post('/register',registerPage);

userRouter.get('/task',task);
userRouter.post('/task',taskAdd);

userRouter.get('/tasklist',taskList);
userRouter.get('/delete/:id',deleteTask);
userRouter.get('/edit/:id',editPage);
userRouter.post('/edit/:id',edit);


module.exports = userRouter;
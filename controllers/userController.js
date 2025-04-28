const User = require("../models/user");
require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Task = require("../models/task");

module.exports.login =(req,res)=>{
    return res.render('pages/login');
}

module.exports.navigation = (req,res)=>{
    return res.render('pages/index');
}

module.exports.register =(req,res)=>{
    return res.render('pages/register');
}

module.exports.registerPage = async(req,res)=>{
    try {

        let{password ,confirmpassowrd ,name , email} = req.body;
        
        console.log(req.body);

        if(password === confirmpassowrd){
            await User.create(req.body);
            return res.redirect('/login');
        }
        else{
            return res.redirect('/register');
        }

    } catch (error) {
        console.log(error.message);
      return res.redirect("/register");   
    }
}

module.exports.login = async(req, res) => {
    try {
        const { name, password ,role} = req.body;
        let user = await User.findOne({ name });

        if (user) {
            let isValid = await bcrypt.compare(password, user.password);

            if (isValid) {
                let payload = {
                    name: user.name,
                    email: user.email,
                    role: user.role
                };

                let token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: "1h" });

                res.cookie('token', token); 
                res.set('Authorization', 'Bearer ' + token);

                
                if (user.role === 'admin') {
                    return res.redirect('/index');
                } else {
                    return res.redirect('/index');
                }
            } else {
                return res.redirect('/index');
            }
        }
    } catch (error) {
        console.log(error.message);
        return res.redirect("/login");
    }
};

module.exports.task =(req,res)=>{
    return res.render('pages/taskform');
}

module.exports.taskAdd =async(req,res)=>{
    try {
        let{ task } = req.body ;
        
        console.log(task);
        await Task.create(req.body);
        
        return res.redirect('/task');
    } catch (error) {
        return res.redirect('/task');
        
    }
}

module.exports.taskList =async(req,res)=>{
    try {
        let taskList = await Task.find();

        return res.render('pages/tasklist',{taskList});
    } catch (error) {
        return res.render('pages/tasklist',{taskList:[]});
        
    }
}

module.exports.deleteTask = async(req,res)=>{
    try {
        let{id}=req.params;

        await Task.findByIdAndDelete(id);
        return res.redirect('/tasklist');
    } catch (error) {
        console.log(error.message);
        return res.redirect('/tasklist');
        
    }
}

module.exports.editPage = async (req, res) => {
    try {
        let { id } = req.params;
        let task = await Task.findById(id);
        return res.render('pages/taskedit', {task});

    } catch (error) {
        console.log(error.message);
        return res.render('pages/taskedit', { task: [] });
    }
}

module.exports.edit = async(req,res)=>{
    try {
        let{id}=req.params;

        let task = await User.findByIdAndUpdate(id,req.body);
        return res.redirect('/tasklist')
    } catch (error) {
        return res.redirect('/tasklist')
        
    }
}
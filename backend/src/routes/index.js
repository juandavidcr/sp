const {Router}=require('express');
const router = Router();

const User = require('../models/Users');
const jwt = require('jsonwebtoken');

router.get('/',(req,res)=>res.send('Hola mundo'))

router.post('/signup', async (req,res)=>{
    // console.log(req.body);
    const {email,password}=req.body;
    const newUser = new User({email:email,password:password});
   // console.log(newUser);
    await newUser.save();
    const token = jwt.sign({_id: newUser._id},"secretkey"); //llave privada secretkey
    res.status(200).json({token});
   // res.send('register');
});

router.post('/signin', async (req,res)=>{
    const {email,password}=req.body;
    const user = await User.findOne({email})
    //validaciones
    //sino existe el correo
    if(!user) return res.status(401).send("The email doesn´t exists");
    //sino coinciden las contraseñas
    if(user.password !== password) return res.status(401).send("Wrong password");
    //responderemos con un token
    const token = jwt.sign({_id: user._id},'secretkey');
    return res.status(200).json({token});
});

//datos publicos
router.get('/tasks',(req,res)=>{
    res.json([
        {
            _id:   1,
            name:'Task One',
            description:'Lorem ipsum',
            date:"2020-03-23T23:34:34.075Z"
        },
        {
            _id:   2,
            name:'Task Two',
            description:'Lorem ipsum',
            date:"2020-03-23T23:34:34.075Z"
        },
        {
            _id:   3,
            name:'Task Three',
            description:'Lorem ipsum',
            date:"2020-03-23T23:34:34.075Z"
        }
    ])
});

router.get('/private-tasks',verifyToken,(req,res)=>{
    res.json([
        {
            _id:   1,
            name:'Task One',
            description:'Lorem ipsum',
            date:"2020-03-23T23:34:34.075Z"
        },
        {
            _id:   2,
            name:'Task Two',
            description:'Lorem ipsum',
            date:"2020-03-23T23:34:34.075Z"
        },
        {
            _id:   3,
            name:'Task Three',
            description:'Lorem ipsum',
            date:"2020-03-23T23:34:34.075Z"
        }
    ])
});

router.get('/profile',verifyToken,(req,res)=>{
   res.send(req.userId);
});

module.exports=router;
function verifyToken(req,res,next){
    console.log(req.headers.authorization);
    if(!req.headers.authorization){
        return res.status(401).send('Unauthorize request');
    }

    const token = req.headers.authorization.split(' ')[1];
    if(token === 'null'){
        return res.status(401).send('Unauthorize Request');
    }
    const payload=jwt.verify(token,'secretkey');
    //console.log(payload);
    req.userId = payload._id;
    next();
}
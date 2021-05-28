const express = require('express');
const router = express.Router();
const usersDb = require('../models/Modelo')

router.get('/', async (req, res) => {
        res.render('pages/Index',)
});

router.get('/Nosotros', async (req, res) => {
    res.render('pages/Sobre nosotros')
});

router.get('/Productos', async (req, res) => {
    res.render('pages/Productos')
});

router.get('/Contactos', async (req, res) => {
    res.render('pages/Contactos')
});

router.get('/Cuenta', async (req, res) => {
    res.render('pages/Cuenta')
});

router.post('/add', async (req, res) => {
        try {
            usersDb.find({$or:[{User: req.body.User}, {Mail: req.body.Mail}]}, (err, results) => {
                if (!results.length > 0) {
                    try {
                        const newUser = new usersDb({
                            User: req.body.User,
                            Mail: req.body.Mail,
                            Password: req.body.Password
                        })
                        newUser.save()
                        // console.log(req.body);
                    } catch (error) {  
                        res.send(json({
                            message: error.message
                        }))
                    }
                    res.render('pages/Cuenta')
                }
                else{
                    console.log("ya esta en la BD");
                }
            })
        } catch (error) {
            res.send(json({
                message: error.message
            }))
        }
    });

router.get('/Select', async (req, res) => {
    try {
        usersDb.find({}, (err, results) => {
            res.render('pages/Select', {
                usersList: results
            })
            console.log(results);
        })
    } catch (err) {
        res.send(json({
            message: error.message
        }))
    }
});

router.post('/form', async (req, res) => {
    try {
        usersDb.find({
            $or: [
                { $and: [ {User: req.body.userMail}, {Password: req.body.pass} ] },
                { $and: [ {Mail: req.body.userMail}, {Password: req.body.pass} ] }
            ]
        }, (err, results) => {
            if (results.length > 0) {
                    console.log("Logueado correctamente");
                    res.render('pages/')
                }
                else{
                    console.log("Usuario o contraseña incorreta");
                    res.render('pages/Cuenta')
                }
                console.log(results);
                console.log(req.body);
        })
    } catch (err) {
        res.send(json({
            message: error.message
        }))
    }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const Music = require('../models/music');

//exercise 1

//GET all
router.get('/', async(req, res) =>{
    try{
        const music = await Music.find();
        res.status(200).json(music);
    }catch(err){
        next(err);
    }
});

//GET by Id
router.get('/:id', async(req, res) =>{
    try{
        const music = await Music.findById(req.params.id);
        if(!music)return res.status(404).json({message: 'Musiikkikappale ei löytynyt'});
        res.status(200).json(music);
    }catch(err) {
        next(err);
    }
});

//POST new document
router.post('/', async(req, res) => {
    try{
        const uusi = new Music(req.body);
        const tallennettu = await uusi.save();
        res.status(201).json(tallennettu);
    }catch(err){
        next(err);
    }
});

//PATCH (update)
router.patch('/:id', async(req, res) =>{
    try{
        const paivitetty = await Music.findByIdAndUpdate(
            req.params.id,
            {$set: req.body},
            {new: true, runValidators: true}
        );
        if(!paivitetty) return res.status(404).json({message: 'Kappale ei löytynyt'});
        res.status(200).json(paivitetty);
    }catch(err){
        next(err);
    }
});

//DELETE document
router.delete('/:id', async(req, res)=>{
    try{
        const poistettu = await Music.findByIdAndDelete(req.params.id);
        if(!poistettu) return res.status(404).json({message: 'Kappale ei löytynyt'});
        res.status(200).json({message: 'Kappale on poistettu'});
    }catch(err){
        next(err);
    }
});

module.exports = router;
const router = require('express').Router()
const Plants = require('./plants-model')

router.get('/', async (req, res, next) =>{
    try{
        const plants = await Plants.get()
        res.json(plants)
    }catch (err){
        next(err)
    }
})
router.get('/:id', async (req, res, next)=>{
    try{
        const plants = await Plants.getById(req.params.id)
        res.json(plants)
    }catch (err){
        next(err)
    }
})

router.post('/', async(req, res, next) => {
    try{
        const newPlant = await Plants.create(req.body)
        res.status(201).json(newPlant)
    }
    catch (err) {
        next(err)
    }
})

router.put('/:id', async(req, res, next)=>{
    try{
        const { id } = req.params
        await Plants.update(id, req.body)
        const updatedPlant = await Plants.getById(id)
        res.json(updatedPlant)
    }catch(err){
        next(err)
    }
})

router.delete('/:id', async(req, res, next)=>{
    try{
        await Plants.remove(req.params.id)
        res.json({message: 'Plant deleted'})
    }catch(err){
        next(err)
    }
})

module.exports = router
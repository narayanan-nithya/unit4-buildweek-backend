const db = require('../data/db-config')

async function get() {
    return await db('users')
}

async function getBy(filter) {
    return await db('users').where(filter)
}

async function getById(id) {
    return await db('users').where('user_id', id)
}

async function getPlantByUserId(id) {
    const userPlants = await db('users as u')
        .leftJoin('plants as p', 'u.user_id', 'p.user_id')
        .select('p.*')
        .where('p.user_id', id)
    return {
        userPlants
    }
}

function update(id, changes){
    return db("users")
    .where("user_id", id)
    .update(changes)
}

async function create(newUser){
    await db('users').insert(newUser)
    return newUser
}

module.exports ={
    get, 
    getBy,
    getById, 
    getPlantByUserId,
    update, 
    create
}
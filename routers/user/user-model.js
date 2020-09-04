const db = require("../../data/dbconfig");

module.exports = {
    find,
    findBy,
    findById,
    addUser
};

function find() {
    return db("user");
};

function findBy(filter) {
    return db("user")
        .select("*")    
        .where(filter);
};

function findById(id) {
    return db("user")
        .where({ id })
        .limit(1);
};

async function addUser(user) {
    try {
        const [id] = await db("user")
            .insert(user)
        return findById(id)
    } catch(err) {
        res.send({message: "error creating user"});
    }
};
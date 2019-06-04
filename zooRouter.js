 //importing express module and setting up router
 const router = require('express').Router();

const knex = require('knex'); //importing knex

const knexConfig = {
    client:'sqlite3', //what dbms are we working with?
    connection: { //telling knex where to find the db
        filename: "./data/lambda.db3" //path of file
    }
};

const db = knex(knexConfig); //bringing in my data

// CRUD endpoints

//POST (CREATE)
router.post("/"), async (req, res) => {
    const newZoo = req.body;
   
}

//GET (READ)
router.get("/"), async (req, res) => {
    
   
}

router.get("/:id"), async (req, res) => {
   const { id } = req.params;
}

//PUT (UPDATE)
router.put("/:id"), async (req, res) => {
   const { id } = req.params;
   const newZoo = req.body;

}

//DELETE (DELETE)
router.delete("/:id"), async (req, res) => {
   const { id } = req.params;
}


module.exports = router;



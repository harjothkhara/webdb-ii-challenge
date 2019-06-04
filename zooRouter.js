const router = require('express').Router();
const knex = require('knex'); //importing knex



const knexConfig = {
    client:'sqlite3', //what dbms are we working with?
    connection: { //telling knex where to find the db
        filename: './data/lambda.db3' //path of file
    },
    useNullAsDefault: true //prevent crashes when using sqlite3 with knex
};

const db = knex(knexConfig); //defining database

// CRUD endpoints

//POST (CREATE)
router.post("/"), async (req, res) => {
    const newZoo = req.body;
   
}

//GET (READ)
router.get("/", async (req, res) => {
    try {
        const zoos = await db("zoos");
        if (zoos) {
            res.status(200).json(zoos);
        }
    } catch(error){
        res.status(500).json({ message: `Zoos could not be found ${error}.`});
    }
});

router.get("/:id", async (req, res) => {
   const { id } = req.params;
   try {
       const zoo = await db ("zoos")
            .where({ id })
            .first();
       if (zoo) {
           res.status(200).json(zoo);
       } else {
           res.status(404)
           .json({ message: "Zoo with specified ID does not exist" });
       }
   } catch (error) {
       res.status(500).json({ message: `Zoo request failed ${error}.` });
   }
});

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



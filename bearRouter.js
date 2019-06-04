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
router.post("/", async (req, res) => {
    const bear = req.body;
    if (!bear.name) {
        res.status(400).json({ message: "Please enter a valid bear name" });
    } else {
        try {
            const [id] = await db("bears").insert(bear);
            if (id) {
                const newBear = await db("bears")
                .where({ id })
                .first();
                res.status(201).json(newBear);
            } 
        } catch(error) {
            res.status(500).json ({ message: `Your bear could not be posted ${error}` });
        }
    }    
});

//GET (READ)
router.get("/", async (req, res) => {
    try {
        const bears = await db("bears");
        if (bears) {
            res.status(200).json(bears);
        }
    } catch(error){
        res.status(500).json({ message: `Bears could not be found ${error}.`});
    }
});

router.get("/:id", async (req, res) => {
   const { id } = req.params;
   try {
       const bears = await db ("bears")
            .where({ id })
            .first();
       if (bears) {
           res.status(200).json(bears);
       } else {
           res.status(404)
           .json({ message: "Bears with specified ID does not exist" });
       }
   } catch (error) {
       res.status(500).json({ message: `Bears request failed ${error}.` });
   }
});

//PUT (UPDATE)
router.put("/:id", async (req, res) => {
   const { id } = req.params;
   const newBear = req.body;

   if (!newBear.name) {
       res.status(400).json({ message: "Please enter a valid bear name" });
   } else {
       try {
           const editedBear = await db ("bears")
            .where ({ id })
            .update(newBear);
           if (editedBear) {
               const zoo = await db ("bears")
                .where({ id })
                .first();
            res.status(200).json(zoo);
           } else {
               res.status(404).json({ message: "The zoo with the specified ID does not exist." });
           }
       } catch(error) {
           res.status(500).json({ message: `The zoo's information could not be modified: ${error}.`
        })
       }
   }
});

//DELETE (DELETE)
router.delete("/:id", async (req, res) => {
   const { id } = req.params;
   try {
       const bear = await db("bears")
       .where({ id })
       .first();
    if (bear) {
        const deleted = await db("bears")
        .where({ id })
        .del();
    if (deleted) {
        res.status(200).json(bear);
      }
    } else {
        res.status(404).json({ message: "The bear with the specified ID does not exist" })
    }
} catch(error) {
       res.status(500).json({ message: `The bear's information could not be modified: ${error}.`
    });
   }
});

module.exports = router;



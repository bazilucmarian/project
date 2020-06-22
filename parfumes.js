const Chance = require("chance")
const express = require("express")

const parfumesRoutes = express.Router()
const chance = new Chance()

const customParfumes = require("./utils");


const parfumes = Array.from({ length: 25 }, (_, i) => {
  const name = chance.pickone([
    "Rolex",
    "Vacheron Constantin",
    "Patek Philippe",
    "Hublot",
    "Louis Moinet"
  ])

  const quantities = chance.pickset([30, 50, 100, 200], 2);

  return {
    id: chance.guid(),
    price: chance.dollar(),
    name,
    description: chance.paragraph({ sentences: 3 }),

    info: {
      listingNumber: chance.bb_pin(),
      referenceNumber: chance.bb_pin(),
      model: chance.word({ capitalize: true }),
      brand: name,
      year: chance.year({ min: 1600, max: 2019 }),
      gender: chance.gender()
    },
    availableQuantities: quantities
  }
})

parfumesRoutes.get("/", (req, res) => {
  res.json(customParfumes)
})
parfumesRoutes.get(`/:id`, (req, res) => {
  const ID = Number(req.params.id)
  const idArray = customParfumes.find((item) => item.id == ID)
  res.json(idArray)
})


// parfumesRoutes.get("/:itemID", (req, res) => {
//   const itemID= req.params.itemID

//   customParfumes = customParfumes.filter(t => t.id == itemID)

//   res.json({ itemID })
// })




parfumesRoutes.post("/", (req, res) => {
  const newParfume = {
    id: chance.guid(),
    price: req.body.price,
    name: req.body.name,
    description: req.body.description,
    info: {
      listingNumber: chance.bb_pin(),
      referenceNumber: chance.bb_pin(),
      model: chance.word({ capitalize: true }),
      brand: req.body.name,
      year: chance.year({ min: 1600, max: 2019 }),
      gender: chance.gender()
    },
    availableQuatities: req.body.availableQuatities
  };

  customParfumes.push(newParfume);

  res.send(customParfumes);
});

module.exports = parfumesRoutes;

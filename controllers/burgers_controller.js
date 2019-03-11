var express = require("express");

var router = express.Router();

//import the burger model
var burger = require("../models/burger.js");

//create all the routes
//route to show all burgers from the table
router.get("/", function (req, res) {

    burger.all(function (data) {
        var hbsObject = {
            burger: data
        };
        res.render("index", hbsObject);
    });
});

//route to add new burger
router.post("/api/burger", function (req, res) {
    console.log(req.body);
    burger.insertOne(["burger_name", "devoured"],
        [req.body.burger_name, req.body.devoured],
        function (result) {
            res.json({ id: result.insertId });
        });
});

//route to update the status of a current burger
router.put("/api/burger/:id", function (req, res) {
    var condition = "id = " + req.params.id;

    burger.update(
        {
            devoured: req.body.devoured
        },
        condition,
        function (result) {
            if (result.changedRows === 0) {
                return res.status(404).end();
            } else {
                res.status(200).end();
            }

        }
    );
});

module.exports = router;



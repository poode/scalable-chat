const router = require("express").Router();


router.get("/", function(req, res){
    res.send("<p>Add /name to join a room e.g http://localhost:3000/room/handball (Template will be added)</p>")
});

router.get("/:room", function(req, res){
    res.render("index", {ok:"ok"})
});

router.post("/:room", function(req, res){
    
});


module.exports = router;
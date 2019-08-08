const router = require("express").Router();
const os = require('os');


router.get("/", function(req, res){
    res.send(`<p>HOST:${os.hostname()} Add /name to join a room e.g http://localhost:3000/room/handball (Template will be added)</p>`)
});

router.get("/:room", function(req, res){
    res.render("index", {ok:"ok"})
});

router.post("/:room", function(req, res){
    
});


module.exports = router;
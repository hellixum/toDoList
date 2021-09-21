var List_item = require('../model/model'); 

exports.homeRoute = (req, res) => {
    res.render('index');
}

exports.getData = (req, res) => {
    console.log("fetch Request"); 
    List_item
        .find()
        .then(data => {
            return res.send(data) 
        })
        .catch(err => {
            return res.sendStatus(400); 
        })
}

exports.deleteData = (req, res) => {

    console.log("delete request"); 
    console.log(req.body); 
    // return res.sendStatus(200);
    List_item
    .deleteOne({name: req.body.name})
    .then(data => res.sendStatus(200))
    .catch(err => res.sendStatus(400))
}

exports.updateData = async (req, res) => {
    console.log("Update Request"); 
    console.log(req.body); 
    
    const item = await List_item
    .findOne({name: req.body.name})

    item.crossed = !item.crossed; 

    item
    .save()
    .then(data => res.sendStatus(200))
    .catch(err => {
        console.log(err);
        res.sendStatus(400)})
}

exports.createData = (req, res) => {

    console.log("Creation Request"); 
    console.log(req.body); 
    // return res.json({data : "this is send data"})

    const item = new List_item({
        name: req.body.name, 
        crossed : req.body.crossed?req.body.crossed:false,
    })

    item
        .save()
        .then(data => {
            console.log("Create the data");
            console.log(data); 
            return res.send({success : true}); 
        })
        .catch(err => {
            console.log("Cannot create new data"); 
            return res.sendStatus(400);
        })

}

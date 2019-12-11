db = db.getSiblingDB('project')

//populate with some users
db.users.insert({email:"pl@123", password:"123"}); 
db.users.insert({email:"artemi@123", password:"123"});
db.users.insert({email:"CarmenSandiego@redHat.fr", password:"123"}); 
db.users.insert({email:"Neill@Blomkamp.za", password:"123"});

//get ids to make a foreign key && populate with some metrics

var idPL = db.users.find({email:"pl@123"}).limit(1).toArray()[0]._id.str
db.metrics.insert({user_id:idPL, debt_to:"Artemii", amount: "50"}); 
db.metrics.insert({user_id:idPL, debt_to:"Summer Cthulhu club", amount: "-500"}); 

var idArt = db.users.find({email:"artemi@123"}).limit(1).toArray()[0]._id.str
db.metrics.insert({user_id:idArt, debt_to:"Sergei", amount: "-200"}); 
db.metrics.insert({user_id:idArt, debt_to:"Warhammer inc", amount: "-100"}); 

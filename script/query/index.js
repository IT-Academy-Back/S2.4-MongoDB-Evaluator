db.restaurants.createIndex({ borough: 1 });
db.restaurants.createIndex({ "grades.score": 1 });
db.restaurants.createIndex({ "location.coordinates": 1 });
db.restaurants.createIndex({ name: 1 });
db.restaurants.createIndex({ name: -1 });
db.restaurants.createIndex({ "location.coordinate": "2dsphere" })
db.restaurants.createIndex({ location: "2dsphere" });
db.restaurants.createIndex({ "address.street": 1 });

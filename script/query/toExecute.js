print('//1.');
db.restaurants.find().forEach(doc => print(JSON.stringify(doc)));

print('//2.');
db.restaurants.find({}, { restaurant_id: 1, name: 1, borough: 1, cuisine: 1 }).forEach(doc => print(JSON.stringify(doc)));

print('//3.');
db.restaurants.find({}, { _id: 0, restaurant_id: 1, name: 1, borough: 1, cuisine: 1 }).forEach(doc => print(JSON.stringify(doc)));

print('//4.');
db.restaurants.find({}, { _id: 0, restaurant_id: 1, name: 1, borough: 1, "address.zipcode": 1 }).forEach(doc => print(JSON.stringify(doc)));

print('//5.');
db.restaurants.find({ borough: "Bronx" }).forEach(doc => print(JSON.stringify(doc)));

print('//6.');
db.restaurants.find({ borough: "Bronx" }).limit(5).forEach(doc => print(JSON.stringify(doc)));

print('//7.');
db.restaurants.find({ borough: "Bronx" }).skip(5).limit(5).forEach(doc => print(JSON.stringify(doc)));

print('//8.');
db.restaurants.find({ "grades.score": { $gt: 90 } }).forEach(doc => print(JSON.stringify(doc)));

print('//9.');
db.restaurants.find({ "grades.score": { $gt: 80, $lt: 100 } }).forEach(doc => print(JSON.stringify(doc)));

print('//10.');
db.restaurants.find({ "location.coordinates.0": { $lt: -95.754168 }}).forEach(doc => print(JSON.stringify(doc)));

print('//11.');
db.restaurants.find({ $and: [ { cuisine: { $ne: "American" } }, { "grades.score": { $gt: 70 } }, { "location.coordinates.0": { $lt: -65.754168 } } ] }).forEach(doc => print(JSON.stringify(doc)));

print('//12.');
db.restaurants.find({ cuisine: { $ne: "American" }, "grades.score": { $gt: 70 }, "location.coordinates.0": { $lt: -65.754168 }}).forEach(doc => print(JSON.stringify(doc)));

print('//13.');
db.restaurants.find({ cuisine: { $ne: "American" }, "grades.grade": "A", borough: { $ne: "Brooklyn" } }).sort({ cuisine: -1 }).forEach(doc => print(JSON.stringify(doc)));

print('//14.');
db.restaurants.find({ name: /^Wil/ }, { restaurant_id: 1, name: 1, borough: 1, cuisine: 1 }).forEach(doc => print(JSON.stringify(doc)));

print('//15.');
db.restaurants.find({ name: /ces$/ }, { restaurant_id: 1, name: 1, borough: 1, cuisine: 1 }).forEach(doc => print(JSON.stringify(doc)));

print('//16.');
db.restaurants.find( { name: /Reg/ }, { restaurant_id: 1, name: 1, borough: 1, cuisine: 1 }).forEach(doc => print(JSON.stringify(doc)));

print('//17.');
db.restaurants.find({ borough: "Bronx", cuisine: { $in: ["American", "Chinese"] } }).forEach(doc => print(JSON.stringify(doc)));

print('//18.');
db.restaurants.find( { borough: { $in: ["Staten Island", "Queens", "Bronx", "Brooklyn"] } }, { restaurant_id: 1, name: 1, borough: 1, cuisine: 1 }).forEach(doc => print(JSON.stringify(doc)));

print('//19.');
db.restaurants.find( { borough: { $nin: ["Staten Island", "Queens", "Bronx", "Brooklyn"] } }, { restaurant_id: 1, name: 1, borough: 1, cuisine: 1 }).forEach(doc => print(JSON.stringify(doc)));

print('//20.');
db.restaurants.find( { "grades.score": { $lte: 10 } }, { restaurant_id: 1, name: 1, borough: 1, cuisine: 1 }).forEach(doc => print(JSON.stringify(doc)));

print('//21.');
db.restaurants.find({ $or: [ { $and: [ { cuisine: { $regex: /fish|seafood/i } }, { cuisine: { $ne: "American" } }, { cuisine: { $ne: "Chinees" } } ] }, { name: { $regex: /^Wil/i } } ] }).forEach(doc => print(JSON.stringify(doc)));

print('//22.');
db.restaurants.find( { grades: { $elemMatch: { grade: "A", score: 11, date: new ISODate("2014-08-11T00:00:00Z") } } }, { restaurant_id: 1, name: 1, grades: 1 }).forEach(doc => print(JSON.stringify(doc)));

print('//23.');
db.restaurants.find( { "grades.1.grade": "A", "grades.1.score": 9, "grades.1.date": new ISODate("2014-08-11T00:00:00Z") }, { restaurant_id: 1, name: 1, grades: 1 }).forEach(doc => print(JSON.stringify(doc)));

print('//24.');
db.restaurants.find({ location: { $near: { $geometry: { type: "Point", coordinates: [-74, 40.7] }, $maxDistance: 5000 } } }, { restaurant_id: 1, name: 1, "address.street": 1, "address.zipcode": 1, "location.coordinates": 1, _id: 0 }).forEach(doc => print(JSON.stringify(doc)));

print('//25.');
db.restaurants.find().sort({ name: 1 }).forEach(doc => print(JSON.stringify(doc)));

print('//26.');
db.restaurants.find().sort({ name: -1 }).forEach(doc => print(JSON.stringify(doc)));

print('//27.');
db.restaurants.find().sort({ cuisine: 1, borough: -1 }).forEach(doc => print(JSON.stringify(doc)));

print('//28.');
db.restaurants.find( { $or: [ { "address.street": { $exists: false } }, { "address.street": null }, { "address.street": "" } ] }, { address: 1}).forEach(doc => print(JSON.stringify(doc)));

print('//29.');
db.restaurants.find({ "location.coordinates": { $type: "double" } }, { name: 1, restaurant_id: 1, "location.coordinates": 1, _id: 0 } ).forEach(doc => print(JSON.stringify(doc)));

print('//30.');
db.restaurants.find( { "grades.score": { $mod: [7, 0] } }, { restaurant_id: 1, name: 1, grades: 1, }).forEach(doc => print(JSON.stringify(doc)));

print('//31.');
db.restaurants.find( { name: /mon/i }, { name: 1, borough: 1, "location.coordinates": 1, cuisine: 1 } ).forEach(doc => print(JSON.stringify(doc)));

print('//32.');
db.restaurants.aggregate([{ $project: { _id: 0, restaurant_id: 1, name: 1, grades: { $cond: [ { $eq: [{ $type: "$grades" }, "array"] }, { $filter: { input: "$grades", as: "grade", cond: { $and: [ { $gt: ["$$grade.score", 80] }, { $lt: ["$$grade.score", 100] } ] } } }, [] ] } } }, { $match: { "grades.0": { $exists: true } } }, { $project: { restaurant_id: 1, name: 1, "grades.grade": 1, "grades.score": 1 } } ]).forEach(doc => print(JSON.stringify(doc)));
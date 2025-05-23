// 1. Mostrar tots els documents en la col·lecció Restaurants.
db.restaurants.find();


// 2. Mostrar el restaurant_id, name, borough i cuisine per tots els documents en la col·lecció Restaurants.
db.restaurants.find({}, { restaurant_id: 1, name: 1, borough: 1, cuisine: 1 });


// 3. Mostrar el restaurant_id, name, borough i cuisine, però excloure el camp _id per tots els documents.
db.restaurants.find({}, { _id: 0, restaurant_id: 1, name: 1, borough: 1, cuisine: 1 });


// 4. Mostrar restaurant_id, name, borough i zip code, però excloure el camp _id.
db.restaurants.find({}, { _id: 0, restaurant_id: 1, name: 1, borough: 1, "address.zipcode": 1 });


// 5. Mostrar tots els restaurants que estan en el Bronx.
db.restaurants.find({ borough: "Bronx" });


// 6. Mostrar els primers 5 restaurants que estan en el Bronx.
db.restaurants.find({ borough: "Bronx" }).limit(5);


// 7. Mostrar el pròxims 5 restaurants després de saltar els primers 5 del Bronx.
db.restaurants.find({ borough: "Bronx" }).skip(5).limit(5);


// 8. Trobar els restaurants amb un score de més de 90.
db.restaurants.find({ "grades.score": { $gt: 90 } });


// 9. Trobar els restaurants amb un score de més de 80 però menys que 100.
db.restaurants.find({ "grades.score": { $gt: 80, $lt: 100 } });


// 10. Trobar els restaurants amb longitud menor que -95.754168.
db.restaurants.find({ "location.coordinates.0": { $lt: -95.754168 }});


// 11. Trobar restaurants que no preparen 'American', amb qualificació > 70 i longitud < -65.754168.
db.restaurants.find({ $and: [ { cuisine: { $ne: "American" } }, { "grades.score": { $gt: 70 } }, { "location.coordinates.0": { $lt: -65.754168 } } ] });


// 12. El mateix que l'anterior però sense usar operador $and.
db.restaurants.find({ cuisine: { $ne: "American" }, "grades.score": { $gt: 70 }, "location.coordinates.0": { $lt: -65.754168 }});


// 13. Trobar restaurants que no són 'American', grau 'A', i no són de Brooklyn. Ordenats per cuisine descendent.
db.restaurants.find({ cuisine: { $ne: "American" }, "grades.grade": "A", borough: { $ne: "Brooklyn" } }).sort({ cuisine: -1 });

// 14. Trobar restaurant_id, name, borough i cuisine on el nom comença amb 'Wil'.
db.restaurants.find({ name: /^Wil/ }, { restaurant_id: 1, name: 1, borough: 1, cuisine: 1 });


// 15. Trobar restaurant_id, name, borough i cuisine on el nom acaba en 'ces'.
db.restaurants.find({ name: /ces$/ }, { restaurant_id: 1, name: 1, borough: 1, cuisine: 1 });


// 16. Trobar restaurant_id, name, borough i cuisine on el nom conté 'Reg'.
db.restaurants.find( { name: /Reg/ }, { restaurant_id: 1, name: 1, borough: 1, cuisine: 1 });


// 17. Trobar restaurants del Bronx que preparen cuina americana o xinesa.
db.restaurants.find({ borough: "Bronx", cuisine: { $in: ["American", "Chinese"] } });


// 18. Trobar restaurant_id, name, borough i cuisine per a Staten Island, Queens, Bronx o Brooklyn.
db.restaurants.find( { borough: { $in: ["Staten Island", "Queens", "Bronx", "Brooklyn"] } }, { restaurant_id: 1, name: 1, borough: 1, cuisine: 1 });


// 19. Trobar restaurant_id, name, borough i cuisine per a restaurants que NO són d'aquests barris.
db.restaurants.find( { borough: { $nin: ["Staten Island", "Queens", "Bronx", "Brooklyn"] } }, { restaurant_id: 1, name: 1, borough: 1, cuisine: 1 });


// 20. Trobar restaurant_id, name, borough i cuisine amb marcador no superior a 10.
db.restaurants.find( { "grades.score": { $lte: 10 } }, { restaurant_id: 1, name: 1, borough: 1, cuisine: 1 });


// 21. Trobar restaurants que preparen peix, no 'American' ni 'Chinees', o nom comença amb 'Wil'.
db.restaurants.find({ $or: [ { $and: [ { cuisine: { $regex: /fish|seafood/i } }, { cuisine: { $ne: "American" } }, { cuisine: { $ne: "Chinees" } } ] }, { name: { $regex: /^Wil/i } } ] });

// 22. Trobar restaurant_id, name, i grades per grau "A", score 11, i data "2014-08-11T00:00:00Z".
db.restaurants.find( { grades: { $elemMatch: { grade: "A", score: 11, date: new ISODate("2014-08-11T00:00:00Z") } } }, { restaurant_id: 1, name: 1, grades: 1 });


// 23. Trobar restaurant_id, name i grades on el 2n element té grau "A", score 9 i data "2014-08-11T00:00:00Z".
db.restaurants.find( { "grades.1.grade": "A", "grades.1.score": 9, "grades.1.date": new ISODate("2014-08-11T00:00:00Z") }, { restaurant_id: 1, name: 1, grades: 1 });


// 24. Trobar el restaurant_id, name, street, zipcode i coordenades dels restaurants que es troben a menys de 5 km del punt de coordenades [-74, 40.7], utilitzant el camp location amb format GeoJSON. Excloure el camp _id.
db.restaurants.find({ location: { $near: { $geometry: { type: "Point", coordinates: [-74, 40.7] }, $maxDistance: 5000 } } }, { restaurant_id: 1, name: 1, "address.street": 1, "address.zipcode": 1, "location.coordinates": 1, _id: 0 });


// 25. Ordenar els noms dels restaurants en ordre ascendent, mostrant totes les columnes.
db.restaurants.find().sort({ name: 1 });


// 26. Ordenar els noms dels restaurants en ordre descendent, mostrant totes les columnes.
db.restaurants.find().sort({ name: -1 });


// 27. Ordenar cuisine ascendent i borough descendent.
db.restaurants.find().sort({ cuisine: 1, borough: -1 });


// 28. Mostrar direccions que no contenen el carrer.
db.restaurants.find( { $or: [ { "address.street": { $exists: false } }, { "address.street": null }, { "address.street": "" } ] }, { address: 1});


// 29. Seleccionar documents on el valor de `coordinate` és de tipus Double. Mostrar el name, restaurant_id i coordinades. Excloure _id.
db.restaurants.find({ "location.coordinates": { $type: "double" } }, { name: 1, restaurant_id: 1, "location.coordinates": 1, _id: 0 } );


// 30. Mostrar restaurant_id, name i grade per restaurants amb marcador divisible per 7 (resta 0).
db.restaurants.find( { "grades.score": { $mod: [7, 0] } }, { restaurant_id: 1, name: 1, grades: 1, });


// 31. Trobar name, borough, longitud, latitud i cuisine per noms que contenen 'mon'.
db.restaurants.find( { name: /mon/i }, { name: 1, borough: 1, "location.coordinates": 1, cuisine: 1 } );


// 32. Utilitzar agregació per mostrar restaurant_id, name, grade i score de més de 80 però menys que 100.
db.restaurants.aggregate([{ $project: { _id: 0, restaurant_id: 1, name: 1, grades: { $cond: [ { $eq: [{ $type: "$grades" }, "array"] }, { $filter: { input: "$grades", as: "grade", cond: { $and: [ { $gt: ["$$grade.score", 80] }, { $lt: ["$$grade.score", 100] } ] } } }, [] ] } } }, { $match: { "grades.0": { $exists: true } } }, { $project: { restaurant_id: 1, name: 1, "grades.grade": 1, "grades.score": 1 } } ]);



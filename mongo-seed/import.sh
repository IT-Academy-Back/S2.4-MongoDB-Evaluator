#! /bin/bash

COUNT=$(mongo --quiet --host mongodb --eval "db.getSiblingDB('nyc').restaurants.countDocuments()")

if [ "$COUNT" -eq 0 ]; then
  echo  "No documents found. Importing data..."
  mongoimport --host mongodb --db nyc --collection restaurants --type json --file /mongo-seed/restaurants.json
else
  echo "The collection already contains data. Skipping import."
fi
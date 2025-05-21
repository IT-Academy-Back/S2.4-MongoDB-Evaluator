#!/bin/bash
set -e

echo "Checking if 'restaurants' collection exists in the 'nyc' database..."

COLLECTION_EXISTS=$(mongosh nyc --quiet --eval "db.getCollectionNames().indexOf('restaurants') >= 0")

if [ "$COLLECTION_EXISTS" = "true" ]; then
  echo "🍽️ 'restaurants' collection already exists, skipping import."
else
  echo "🚀 Importing 'restaurants' collection data from JSON file..."
  mongoimport --db nyc --collection restaurants --jsonArray --file /mongo-seed/restaurants.json
  echo "✅ Import completed."
fi

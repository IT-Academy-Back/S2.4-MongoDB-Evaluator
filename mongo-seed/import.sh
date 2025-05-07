#! /bin/bash

mongoimport --host mongodb --db nyc --collection restaurants --type json --file /mongo-seed/restaurants.json
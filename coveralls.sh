#!/bin/sh
cd ${0%/*}
echo "running coveralls script from:"
pwd
./node_modules/.bin/mocha -R mocha-lcov-reporter > coverage.lcov
cat coverage.lcov | node ./node_modules/coveralls/bin/coveralls.js
exit 0

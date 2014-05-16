#!/bin/bash
node_modules/.bin/mocha -R mocha-lcov-reporter > coverage.lcov
cat coverage.lcov | node_modules/coveralls/bin/coveralls.js
exit 0
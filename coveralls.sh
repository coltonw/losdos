#!/bin/sh
sh node_modules/.bin/mocha -R mocha-lcov-reporter > coverage.lcov
cat coverage.lcov | sh node_modules/.bin/coveralls
exit 0

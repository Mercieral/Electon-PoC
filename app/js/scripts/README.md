## Scripts

Every file in this directory represents a non-module (or script) for the app. These files are not modules and
are not run through the module transpiler. They are run through the ES6 transpiler, wrapped in an IIFE and then
placed at the very beginning of the app file. These scripts are useful for running code that needs to be run
before the application and its module system are set up.

For the most part, there should be no dependencies among scripts. But because there are a few global
configuration settings we need to make, `config.js` is guaranteed to always be the first script to run.
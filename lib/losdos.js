var express = require('express'),
    fs = require('fs');

function spaces(num) {
    return Array(num + 1).join(" ");
}

function spacedTo(str, num) {
    return str.length >= num ? str : str + spaces(num - str.length);
}

module.exports = function(parent, options){
    var verbose = options.verbose,
        routesStack = [{
            path: '/',
            directory: options.routes ? options.routes.replace(/\/$/,'') : __dirname + '/../../../routes'
        }],
        apiPath = options.apiPath ? options.apiPath.replace(/\/$/,'') : '/api',
        prefix = options.prefix || '',
        currentRoute;

    function apiifyKeys(app, obj, method, currentRoute) {
        // if obj is a function, treat it as an index route
        if(typeof obj === 'function') {
            var path = prefix + apiPath + currentRoute.path + '?';
            app[method](path, obj);
            verbose && console.log('     %s %s -> %s', spacedTo(method.toUpperCase(), 6), path, method);
        } else {
            Object.keys(obj).forEach(function(key) {
                var path = prefix + apiPath + currentRoute.path + ((key === 'index')? '?' : key);
                app[method](path, obj[key]);
                verbose && console.log('     %s %s -> %s', spacedTo(method.toUpperCase(), 6), path, method + '.' + key);
            });
        }
    }

    while(routesStack.length > 0) {
        currentRoute = routesStack.pop();
        fs.readdirSync(currentRoute.directory).forEach(function(name){
            verbose && console.log('\n   %s:', name);
            var stats = fs.statSync(currentRoute.directory + '/' + name),
                app = express(),
                obj, pathName, path;
            
            if(stats && stats.isDirectory()) {
                pathName = (name.slice(-'_id'.length) === '_id') ? ':' + name: name;
                currentRoute.directory
                routesStack.push({
                    path: currentRoute.path + pathName + '/',
                    directory: currentRoute.directory + '/' + name
                });
                return;
            }
            obj = require(currentRoute.directory + '/' + name);
    
            // generate routes based
            // on the exported methods
            Object.keys(obj).forEach(function(key) {
                var path;
                // "reserved" exports
                if (currentRoute.path.indexOf(':' + key + '/') > 0) {
                    app.param(key, obj[key]);
                    verbose && console.log('     %s %s -> %s', spacedTo('PARAM', 6), key, key);
                    return;
                }
                // route exports
                switch (key) {
                case 'post':
                    apiifyKeys(app, obj['post'], 'post', currentRoute);
                    break;
                case 'put':
                    apiifyKeys(app, obj['put'], 'put', currentRoute);
                    break;
                case 'delete':
                    apiifyKeys(app, obj['delete'], 'delete', currentRoute);
                    break;
                case 'get':
                    apiifyKeys(app, obj['get'], 'get', currentRoute);
                    break;
                case 'index':
                    path = prefix + currentRoute.path + '?';
                    app.get(path, obj[key]);
                    verbose && console.log('     %s ' + spaces(apiPath.length) + '%s -> %s', spacedTo('GET', 6), path, key);
                    break;
                default:
                    path = prefix + currentRoute.path + key;
                    app.get(path, obj[key]);
                    verbose && console.log('     %s ' + spaces(apiPath.length) + '%s -> %s', spacedTo('GET', 6), path, key);
                }
            });
    
            // mount the app
            parent.use(app);
        });
    }
};
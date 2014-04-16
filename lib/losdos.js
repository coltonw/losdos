var express = require('express'),
    fs = require('fs');

module.exports = function(parent, options){
    var verbose = options.verbose,
        routesStack = [{
            path: '/',
            directory: options.routes ? options.routes.replace(/\/$/,'') : __dirname + '/../../../routes'
        }],
        apiPath = options.apiPath ? options.apiPath.replace(/\/$/,'') : '/api',
        prefix = options.prefix || '',
        currentRoute;
        console.log(routesStack[0].directory)
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
                    verbose && console.log('     PARAM %s -> %s', key, key);
                    return;
                }
                // route exports
                switch (key) {
                case 'post':
                    Object.keys(obj.post).forEach(function(key) {
                        var path = prefix + apiPath + currentRoute.path + ((key === 'index')? '' : key);
                        app.post(path, obj.post[key]);
                        verbose && console.log('     %s %s -> %s', 'POST', path, 'post.' + key);
                    });
                    break;
                case 'put':
                    Object.keys(obj.put).forEach(function(key) {
                        var path = prefix + apiPath + currentRoute.path + ((key === 'index')? '' : key);
                        app.put(path, obj.put[key]);
                        verbose && console.log('     %s %s -> %s', 'PUT', path, 'put.' + key);
                    });
                    break;
                case 'delete':
                    Object.keys(obj['delete']).forEach(function(key) {
                        var path = prefix + apiPath + currentRoute.path + ((key === 'index')? '' : key);
                        app['delete'](path, obj['delete'][key]);
                        verbose && console.log('     %s %s -> %s', 'DELETE', path, 'delete.' + key);
                    });
                    break;
                case 'get':
                    Object.keys(obj.get).forEach(function(key) {
                        var path = prefix + apiPath + currentRoute.path + ((key === 'index')? '' : key);
                        app.get(path, obj.get[key]);
                        verbose && console.log('     %s %s -> %s', 'GET', path, key);
                    });
                    break;
                case 'index':
                    path = prefix + currentRoute.path;
                    app.get(path, obj[key]);
                    verbose && console.log('     %s ' + Array(apiPath.length + 1).join(" ") + '%s -> %s', 'GET', path, key);
                    break;
                default:
                    path = prefix + currentRoute.path + key;
                    app.get(path, obj[key]);
                    verbose && console.log('     %s ' + Array(apiPath.length + 1).join(" ") + '%s -> %s', 'GET', path, key);
                }
            });
    
            // mount the app
            parent.use(app);
        });
    }
};
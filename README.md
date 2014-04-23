# losdos

Make a [node.js](http://nodejs.org)/[express](http://expressjs.com) web application with embedded views **and** a REST interface.


## Description

A microframework for embedded views **and** a REST interface.

It uses directory structure and export names to create URLs to a rest api and associated views.

It is based on [boot.js](https://github.com/visionmedia/express/blob/master/examples/mvc/lib/boot.js) lib from the MVC express example.

The name comes from the ["Porque no los dos?" meme](http://knowyourmeme.com/memes/why-not-both-why-dont-we-have-both).

## Usage

(Eventually) To install this module in your current working directory, run

```
npm install losdos
```

The syntax for basic usage of losdos:

```
require('losdos')(app, {
    verbose: verbose,
    routes: routes,
    apiPath: apiPath,
    prefix: prefix
});
```

The parameters for losdos are:

*  app is your express app
*  verbose (default: false) is a boolean with whether you want verbose logging or not.
*  routes (default: __dirname + '/../../../routes' relative to losdos module's install) is the absolute filepath to your routes directory
*  apiPath (default: '/api') is the path prefixed to all your api calls to separate them from your views
*  prefix (default: '') is a path prefixed to every call


The expected directory structure of your routes is:

```
// contains root directory views and api calls
routes/
routes/index.js

// contains someobject views and api calls
routes/someobject/
routes/someobject/someStuff.js

// all files in the same folder are treated the same but you may have multiple files in a
// directory that you want to group some routes separately
routes/someobject/otherStuff.js 

// directories ending in "_id" are added to your path as ":someobject_id"
// for use as an express path parameter
routes/someobject/someobject_id/

// contains views and api calls related to a specific someobject
routes/someobject/someobject_id/someobject.js
```

File names are ignored!  Make them as expressive as you would like!

Then, within your routes files themselves:

```
// Any api calls use the method method name as an object containing functions which would
// be called by:
// app[method](prefix + apiPath + '/directory/path/' + functionName, functionItself);
exports.post = {
    // In this case, this would make a POST call at the URL /api/directory/path/somepost
    // that would route to this function
    somepost: function(req, res){
        ...
    }
};

// A view (in other words GET) for a "create" view at /directory/path/create
exports.create = function(req, res){
    ...
};
// NOTE: create could be any string you want other than index or one of the method names

// Index is a special case. It will use the current directory as a path rather than using
// the name "index"
exports.index = function(req, res){
    ...
};

// if a directory ending in "_id" is on this file's path, you can make a method with that
// name and it will call app.param(functionName, functionItself), allowing you to add
// middleware based on that path parameter
exports.someobject_id = function(req, res, next, id){
    ...
}
```

## Design Philosophies

I believe that directory structure is just another tool for programmers to use to aid development.
URL paths logically map very well to actual paths, so it made sense to me to keep that mapping
with losdos. I made a specific point to allow controllers for views and controllers for an api
to sit side by side in the same files since frequently views and their related api calls may
share code.

The other conscious decision was to **not** use file names. In most tabbed editors, all that
identifies a tab is its file name, so I prefer file names to be overly expressive rather than
relying on their full path to express their purpose. I therefore did not want losdos to restrict
file names in any way.

## Credit

- [Will Colton](https://github.com/coltonw)



## License

MIT
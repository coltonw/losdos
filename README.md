# losdos

Make a [node.js](nodejs.org)/[express](expressjs.com) web application with embedded views **and** a REST interface.


## Description

A simple library for getting rid of excess boilerplate in a web application delivering embedded views **and** a REST interface.

It uses folder structure and export names to create URLs to a rest api and associated views.

It is based on [boot.js](https://github.com/visionmedia/express/blob/master/examples/mvc/lib/boot.js) lib from the MVC express example.

The name comes from the ["Porque no los dos?" meme](http://knowyourmeme.com/memes/why-not-both-why-dont-we-have-both).

## Usage

(Eventually) To install this module in your current working directory, run

```
npm install losdos
```

The syntax for basic usage of losdos:

```
var losdos = require('losdos')(app, { verbose: verbose });
// where app is your express app and verbose is a boolean with whether you want verbose logging or not.
```

The expected folder structure is:

```
routes/
routes/index.js                 // contains root directory views and api calls

routes/someobject/
routes/someobject/index.js      // contains someobject views and api calls
routes/someobject/otherStuff.js // contains some more someobject views and api calls that you have grouped separately

routes/someobject/id/
```

File names are ignored!

## Credit

- [Will Colton](https://github.com/coltonw)



## License

MIT
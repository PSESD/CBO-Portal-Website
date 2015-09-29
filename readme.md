# AngularJS Client Side App for CBO Web Portal

## Description

Client side (browser) app to access CBO Portal API. Before accessing the API, the client needs to authenticate to CBO Portal Auth.


## Requirements

You need to have CBO account to login

## Config

Here is a master config for relationship and school district edit this file to add or remove data. All configuration is in config.js file :

	var schoolDistricts = {
	    'seattle': "Seattle",
	    'highline': "Highline",
	    'federalway': "Federal Way",
	    'renton': 'Renton',
	    'northshore': 'North Shore'
	};

	var relationships = {
	    'parent': "Parent",
	    'grandparent': "Grandparent",
	    'aunt': "Aunt",
	    'uncle': 'Uncle',
	    'brother': 'Brother',
	    'sister': 'Sister'
	};
	

## Installation


To install dependencies enter project folder and run following command:

    $ npm install

Install the client library using git:

    $ git clone https://github.com/PSESD/CBO-Portal-Website.git
    $ cd CBO-Portal-Website
    $ npm install


## Contributing

Fork the repo on github and send a pull requests with topic branches. Do not forget to
provide specs to your contribution.


## Getting started

Run server:

    $ cd src && npm start

Run server with environment `test`:

    $ cd src && npm test

Run Unit Test:

    $ cd src && mocha


## Coding guidelines

Follow [github](https://github.com/styleguide/) guidelines.


## Feedback

Use the [issue tracker](https://github.com/PSESD/CBO-Portal-Website/issues) for bugs.
[Mail](mailto:support@upwardstech.com) us
for any idea that can improve the project.


## Links

* [GIT Repository](https://github.com/PSESD/CBO-Portal-Website)
* [Documentation](https://github.com/PSESD/CBO-Portal-Website)


## Author

---


## Contributors

Special thanks to the following people for submitting patches.


## Changelog

See [CHANGELOG](https://github.com/PSESD/CBO-Portal-Website/master/CHANGELOG.md)


## Copyright

Copyright (c) 2015

This project is released under the [MIT License](http://opensource.org/licenses/MIT).
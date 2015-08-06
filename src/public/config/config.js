'use strict'

var auth_url = '';

var api_url = '';

var url = '';

var origin = window.location.origin;

var globalConfig = {}, config = {
	dev: {
		client_id: 'cbo_client_demo',
		client_secret: '7e98a24f4fe91535348f6e87cde866dca9134b50fc029abefdc7278369f2',
		response_type: 'code',
		grant_type: 'password' 
	},
	production: {
		client_id : "studentsuccesslink.org",
		client_secret : "8cd0ac3761341570c1c0d4caaf2d36900a1c42bdb4474565c72fa5d37a52",
		response_type : "code",
		grant_type : "password" 
	},
	staging: {
		client_id: 'sslstaging.studentsuccesslink.upward',
		client_secret: 'ed789e8077173fdaa3fa2430ffc0eec0aef43ac5519ee575aa8409a00195',
		response_type: 'code',
		grant_type: 'password' 
	}
};

if( origin.indexOf("studentsuccesslink.org") > 0 )
{
	auth_url = "https://auth.studentsuccesslink.org/api/";
	api_url = "https://api.studentsuccesslink.org/";
	globalConfig = config.production;
}
else if( origin.indexOf("studentsuccesslink.upward") > 0)
{
	auth_url = "https://auth.sslstaging.studentsuccesslink.upward/api/";
	api_url = "https://api.sslstaging.studentsuccesslink.upward/";
	globalConfig = config.staging;
}
else if( origin.indexOf("cbo.upward") > 0)
{
	auth_url = "https://auth.cbo.upward.st/api/";
	api_url = "https://api.cbo.upward.st/";
	globalConfig = config.dev;
}
else(origin.indexOf("localhost") > 0)
{
	auth_url = "https://auth.cbo.upward.st/api/";
	api_url = "https://api.cbo.upward.st/";
	globalConfig = config.dev;
}
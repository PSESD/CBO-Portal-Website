'use strict';

if(process.env.CIRCLE_BRANCH === 'develop'){
    var SSH_USERNAME = process.env.DEV_SSH_USERNAME;
    var SSH_PASSWORD = process.env.DEV_SSH_PASSWORD;
    var SSH_HOST = process.env.DEV_SSH_HOST;
    var SSH = require('simple-ssh');
    var ssh = new SSH({
        host: SSH_HOST,
        user: SSH_USERNAME,
        pass: SSH_PASSWORD
    });
    ssh
        .exec('cd /home/cbo/public', {
            out: console.log.bind(console)
        })
        .exec('git pull origin develop', {
            out: console.log.bind(console)
        })
        .exec('echo "DONE"', {
            exit: function(code) {
                process.exit(0);
            }
        })
        .start();

} else {
    throw 'Not valid environment';
}
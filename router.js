var express = require('express');
var router = express.Router();
var path = require('path');
var async = require('async');
var MailChimpAPI = require('mailchimp').MailChimpAPI;
var MailChimpExportAPI = require('mailchimp').MailChimpExportAPI;
var apiKey = '13130654c3cbf12465401bf31dfe7707-us15';
var Mailchimp3 = require('mailchimp-api-v3');
var mailchimp3 = new Mailchimp3(apiKey);

router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname+'/index.html'));
});

router.get('/campaigns/list', function (req, res) {
    try {
        var api = new MailChimpAPI(apiKey, { version : '2.0' });

        api.call('campaigns', 'list', function (error, data) {
            if (error) console.log(error.message);
            else console.log(JSON.stringify(data));

            res.send(data);
        });
    } catch (error) {
        console.log(error.message);
    }
});

router.get('/templates', function (req, res) {
    try {
        var api = new MailChimpAPI(apiKey, { version : '2.0' });

        api.call('templates', 'list', function (error, data) {
            if (error) console.log(error.message);
            else console.log(JSON.stringify(data));

            res.send(data);
        });
    } catch (error) {
        console.log(error.message);
    }
});

router.get('/templates/:id', function (req, res) {
    try {
        var api = new MailChimpAPI(apiKey, { version : '2.0' });

        api.call('templates', 'info', { template_id: req.params.id }, function (error, data) {
            if (error) console.log(error.message);
            else console.log(JSON.stringify(data));

            res.send(data.preview);
        });
    } catch (error) {
        console.log(error.message);
    }
});

router.get('/lists', function (req, res) {
    try {
        var api = new MailChimpAPI(apiKey, { version : '2.0' });

        api.call('lists', 'list', function (error, data) {
            if (error) console.log(error.message);
            else console.log(JSON.stringify(data));

            res.send(data);
        });
    } catch (error) {
        console.log(error.message);
    }
});

router.get('/lists/:id', function (req, res) {
    try {
        var api = new MailChimpAPI(apiKey, { version : '2.0' });

        api.call('lists', 'segments', { id: req.params.id },  function (error, data) {
            if (error) console.log(error.message);
            else console.log(JSON.stringify(data));

            res.send(data);
        });
    } catch (error) {
        console.log(error.message);
    }
});

router.post('/lists/:list_id/members/:email', function (req, res) {
    try {
        mailchimp3.post('/lists/' + req.params.list_id + '/members', {
            // apiKey: apiKey,
            id: req.params.list_id,
            email_address: req.params.email,
            status: 'subscribed',
            email_type: 'html',
            merge_fields: {
                FNAME: '1234',
                LNAME: '3215',
                NEWQQQ: 'heheh'
            }
        })
            .then(function (results) {
                console.log(results);
                res.send(results);
            })
            .catch(function (err) {
                console.log(err);
                res.send(err);
            });
    } catch (error) {
        console.log(error.message);
    }
});

module.exports = router;
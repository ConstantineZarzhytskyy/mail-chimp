var express = require('express');
var router = express.Router();
var path = require('path');
var async = require('async');
var MailChimpAPI = require('mailchimp').MailChimpAPI;
var MailChimpExportAPI = require('mailchimp').MailChimpExportAPI;
var apiKey = '13130654c3cbf12465401bf31dfe7707-us15';

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

module.exports = router;
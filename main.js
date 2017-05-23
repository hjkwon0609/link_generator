'use strict';

var express = require('express');
const request = require("request");
const redis = require('redis').createClient();
const stable_stringify = require('json-stable-stringify');
const path = require('path');
const body_parser = require('body-parser');

const db = require('./db.js')({
    redis,
    stable_stringify,
});

const router = require('./server.js')({
    express,
    body_parser,
    stable_stringify,
    path,
    db,
});

const port = process.env.PORT || 4000;
const server = router.get_app().listen(port, function () {
    console.log('Listening at http://localhost:' + port + ' exporting the directory ' + __dirname);
});
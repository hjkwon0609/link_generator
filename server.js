'use strict';

module.exports = function(dependencies) {
    const express = dependencies['express'];
    const body_parser = dependencies['body_parser'];
    const stable_stringify = dependencies['stable_stringify'];
    const path = dependencies['path'];
    const app = express();

    app.use(body_parser.urlencoded({
        extended: true
    }));

    app.use(body_parser.json());

    app.use(express.static(__dirname + '/client' ));

    app.all('*', function(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        next();
    });

    app.get('/', function (req, res) {
        res.send('Hello World!')
    });

    app.get('/create_link', function(req, res){
        res.sendFile(path.join(__dirname, 'client', 'link_generator.js'), function(err) {
            if (err) {
                console.log(err);
            } else {
                console.log("Successfully sent: " + path.join(__dirname, 'client', 'link_generator.js'));
                res.end();
            }
        });
    });


    const get_app = function () {
        return app;
    };

    return {
        get_app
    }
};

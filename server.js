'use strict';

module.exports = function(dependencies) {
    const express = dependencies['express'];
    const body_parser = dependencies['body_parser'];
    const stable_stringify = dependencies['stable_stringify'];
    const path = dependencies['path'];
    const db = dependencies['db'];
    const app = express();

    app.use(body_parser.urlencoded({
        extended: true
    }));

    app.use(body_parser.json());

    app.use(express.static(__dirname + '/client' ));
    app.use(express.static(__dirname + '/assets' ));
    app.use(express.static(path.join(__dirname, 'assets')));
    app.use('/assets', express.static(__dirname + '/assets'));

    app.all('*', function(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        next();
    });

    app.get('/', function (req, res) {
        res.sendFile(__dirname + "/index.html");
    });

    app.get('/create_link_js', function(req, res){
        res.sendFile(path.join(__dirname, 'client', 'link_generator.js'), function(err) {
            if (err) {
                console.log(err);
            } else {
                console.log("Successfully sent: " + path.join(__dirname, 'client', 'link_generator.js'));
                res.end();
            }
        });
    });

    app.get('/get_user_info', function(req, res){
        const pub_key = req.query.pub_key;
        console.log('<server.js>:' + pub_key);

        db.get_user_info(pub_key).then(function(result){
            // let verified_info = new Map();
            // if (result) {
            //     verified_info = result;
            // }
            console.log(result);
            res.send(stable_stringify(result));
            res.end();
        });
    });

    app.get('/user_info_page/:pub_key', function(req, res) {
        const pub_key = req.params.pub_key;
        console.log('<link_generator/server.js/user_info_page>' + pub_key);
        db.link_viewed(pub_key);
        // res.sendFile(path.join(__dirname + '/user_info_page.html'));
        console.log("Current Directory", __dirname + "/index.html");
        res.sendFile(__dirname + "/index.html");
    });

    app.post('/add_new_user_info', function(req, res){
        console.log(req.body);
        const pub_key = req.body.pub_key;
        const info_key = req.body.info_key;
        const info_val = req.body.info_val;

        console.log('<link_generator/server.js/add_ner_user_info>' + pub_key);

        db.save_user_info(pub_key, info_key, info_val).then(function(result){
            console.log('Saved user info: ' + result);
            db.get_user_info(pub_key).then(function(user){
                console.log(user);
            });
        });
    });

    app.post('/create_new_link', function(req, res){
        const pub_key = req.body.pub_key;
        db.link_created_for_user(pub_key).then(function(result){
            console.log('Created link for user: ' + pub_key);
        });
    });

    const get_app = function () {
        return app;
    };

    return {
        get_app
    }
};

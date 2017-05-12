'use strict';


module.exports = function(dependencies) {
    const express = dependencies['express'];
    const body_parser = dependencies['body_parser'];
    const app = express();

    app.use(body_parser.urlencoded({
        extended: true
    }));

    app.use(body_parser.json());


    app.get('/', function (req, res) {
        res.send('Hello World!')
    })

    const get_app = function () {
        return app;
    }
    return {
        get_app
    }
};

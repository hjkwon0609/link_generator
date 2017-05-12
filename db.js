module.exports = function(dependencies) {
    const client = dependencies['redis'];

    client.on('ready', function () {
        console.log('Redis is now ready');
    });

    client.on('error', function (err) {
        console.log('Redis is dead: ' + err);
    });




};
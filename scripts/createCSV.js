var fs = require('fs');
var path = require('path');

var filePath = path.join(__dirname, '../data/reactors-1.json');

fs.readFile(filePath, {encoding: 'utf-8'}, function(err, data) {
    if (!err) {
        console.log('received data: ' + data);
    } else {
        console.log(err);
    }

});

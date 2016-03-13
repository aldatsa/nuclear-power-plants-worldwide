var fs = require('fs');
var path = require('path');

var csv_file_path = path.join(__dirname, "../data/reactors.csv");

fs.writeFile(csv_file_path, "", function() {

    for (var i = 1; i <= 7; i++) {

        var file_path = path.join(__dirname, "../data/reactors-" + i + ".json");

        fs.readFile(file_path, {encoding: 'utf-8'}, function(err, data) {

            var csv_file_contents = "";

            if (!err) {

                var file_contents = JSON.parse(data);

                file_contents.hits.hits.forEach(function(element, index, array) {

                    var owners_share = "";
                    var owners_name = "";

                    csv_file_contents += element._source.id + ",";
                    csv_file_contents += element._source.index.construction_start_year + ",";

                    if (element._source.index.first_grid_connection_year) {
                        csv_file_contents += element._source.index.first_grid_connection_year + ",";
                    } else {
                        csv_file_contents += ",";
                    }

                    csv_file_contents += element._source.index.sort_name + ",";
                    csv_file_contents += element._source.last_updated + ",";
                    csv_file_contents += element._source.reactor.status + ",";
                    csv_file_contents += element._source.reactor.reference_unit_power_capacity_net + ",";

                    if (element._source.reactor.first_grid_connection) {
                        csv_file_contents += element._source.reactor.first_grid_connection + ",";
                    } else {
                        csv_file_contents += ",";
                    }

                    if (element._source.reactor.first_criticality) {
                        csv_file_contents += element._source.reactor.first_criticality + ",";
                    } else {
                        csv_file_contents += ",";
                    }

                    csv_file_contents += element._source.reactor.process + ",";
                    csv_file_contents += element._source.reactor.gross_capacity + ",";
                    csv_file_contents += element._source.reactor.construction_start + ",";

                    element._source.reactor.owner.forEach(function(element2, index2, array2) {

                        if (element2.share) {
                            owners_share += element2.share.replace("\r\n", " ").replace("\r", " ").replace(",", " -");
                            if (index2 < array2.length - 1) {
                                owners_share += " - ";
                            }
                        }

                        if (element2.name) {
                            owners_name += element2.name.replace("\r\n", " ").replace("\r", " ").replace(",", " -").replace(/"/g, "'");
                            if (index2 < array2.length - 1) {
                                owners_name += " - ";
                            }
                        }
                    });

                    csv_file_contents += owners_share + ",";
                    csv_file_contents += owners_name + ",";

                    csv_file_contents += element._source.reactor.reference_unit_power_capacity_net + ",";

                    if (element._source.reactor.location) {
                        csv_file_contents += element._source.reactor.location.lat + ",";
                        csv_file_contents += element._source.reactor.location.lon + ",";
                    } else {
                        csv_file_contents += ",";
                        csv_file_contents += ",";
                    }
                    csv_file_contents += element._source.reactor.country + ",";
                    csv_file_contents += element._source.reactor.operator.replace("\r\n", " ").replace("\r", " ").replace(",", " -").replace(/"/g, "'") + ",";

                    if (element._source.reactor.commercial_operation) {
                        csv_file_contents += element._source.reactor.commercial_operation + ",";
                    } else {
                        csv_file_contents += ",";
                    }

                    if (element._source.reactor.model) {
                        csv_file_contents += element._source.reactor.model + ",";
                    } else {
                        csv_file_contents += ",";
                    }
                    csv_file_contents += element._source.reactor.operator.replace("\r\n", " ").replace("\r", " ").replace(",", " -").replace(/"/g, "'") + ",";
                    csv_file_contents += element._source.reactor.thermal_capacity + ",";

                    if (element._source.reactor.additional_info) {
                        csv_file_contents += element._source.reactor.additional_info + ",";
                    } else {
                        csv_file_contents += ",";
                    }

                    csv_file_contents += element._source.reactor.design_net_capacity + ",";
                    csv_file_contents += element._source.reactor.name + ",";
                    csv_file_contents += "\n";

                });

            } else {

                console.log(err);

            }

            console.log(csv_file_contents.length);
            fs.appendFile(csv_file_path, csv_file_contents, function (err) {

                if (err) {
                    console.log(err);
                }

            });

        });
    }

});

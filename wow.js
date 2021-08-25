(function () {
    var myConnector = tableau.makeConnector();
    
    myConnector.getSchema = function (schemaCallback) {
        var cols = [{
            id: "confirmed",
            dataType: tableau.dataTypeEnum.float
        }, {
            id: "date",
            alias: "date",
            dataType: tableau.dataTypeEnum.float
        }, {
            id: "deaths",
            alias: "deaths",
            dataType: tableau.dataTypeEnum.float
        }, {
            id: "Increase_Rate",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "Recovered",
            dataType: tableau.dataTypeEnum.float
        }];
    
        var tableSchema = {
            id: "Covid_data",
            alias: "covid",
            columns: cols
        };
    
        schemaCallback([tableSchema]);
    };

    myConnector.getData = function (table, doneCallback) {
        $.getJSON("https://pkgstore.datahub.io/core/covid-19/worldwide-aggregate_json/data/474f547cae3ef59b9df0a690f316ab42/worldwide-aggregate_json.json", function(resp) {
            var feat = resp.features,
                tableData = [];
    
            // Iterate over the JSON object
            for (var i = 0, len = feat.length; i < len; i++) {
                tableData.push({
                    "id": feat[i].properties.confirmed,
                    "date": feat[i].properties.date,
                    "deaths": feat[i].properties.deaths,
                    "Increase_Rate": feat[i].properties.Increase_Rate,
                    "Recovered" : feat[i].properties.Recovered
                });
            }
    
            table.appendRows(tableData);
            doneCallback();
        });
    };

    tableau.registerConnector(myConnector);
})();
$(document).ready(function () {
    $("#submitButton").click(function () {
        tableau.connectionName = "Covid_data";
        tableau.submit();
    });
});

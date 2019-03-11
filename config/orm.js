//require connection from the connection.js file
var connection = require("../config/connection.js");

//set up the function to dynamically provide an accurate amount of ?
function printQuestionMarks(num) {
    //empty array to hold the ?'s
    var arr = [];
    //push the ?'s into array "arr"
    for (var i = 0; i < num; i++) {
        arr.push("?");
    }
    //convert ?'s into a string "??"
    return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
    var arr = [];
    for (var key in ob) {
        var value = ob[key];
        if (Object.hasOwnProperty.call(ob, key)) {
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            arr.push(key + "=" + value);
        }
    }
    return arr.toString();
}

//create an orm
var orm = {
    //create selectAll, insertOne, updateOne functions
    selectAll: function (tableName, cb) {
        var queryString = "SELECT * FROM " + tableName + ";";

        connection.query(queryString, function (err, result) {
            if (err) throw err;
            cb(result);
        });
    },
    insertOne: function (tableName, cols, vals, cb) {
        var queryString = "INSERT INTO " + tableName;
        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ") ";

        connection.query(queryString, vals, function (err, result) {
            if (err) throw err;
            cb(result);
        });
    },
    updateOne: function (tableName, objColVals, condition, cb) {
        var queryString = "UPDATE " + tableName;
        queryString += " SET ";
        //will take the key and value from the eaten object on index.handlebars and separate them as "SET key = val"
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;

        connection.query(queryString, function (err, result) {
            if (err) throw err;
            cb(result);
        });
    }
};

module.exports = orm;

// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var friendsInfo = require("../data/friends.js");



// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
    // API GET Requests
    // Below code handles when users "visit" a page.
    // In each of the below cases when a user visits a link
    // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
    // ---------------------------------------------------------------------------

    app.get("/api/friends", function(req, res) {

        res.json(friendsInfo);
        console.log("This is working " + friendsInfo[0].name);

    });




    // API POST Requests
    // Below code handles when a user submits a form and thus submits data to the server.
    // In each of the below cases, when a user submits form data (a JSON object)
    // ...the JSON is pushed to the appropriate JavaScript array
    // (ex. User fills out a reservation request... this data is then sent to the server...
    // Then the server saves the data to the tableData array)
    // ---------------------------------------------------------------------------

    app.post("/api/friends", function(req, res) {

        var friendMatch = {
            name: "",
            photo: "",
            scores: "",
            scoreDifference: 100


        };

        var totalDiff = 0;

        for (var i = 0; i < friendsInfo.length; i++) {
            totalDiff = 0;

            for (var j = 0; j < friendsInfo[i].scores[j]; j++) {
                console.log("This is working" + friendsInfo[i].scores[j]);


                totalDiff += Math.abs(parseInt(req.body.scores[j]) - parseInt(friendsInfo[i].scores[j]));

                console.log(totalDiff);

                if (totalDiff <= friendMatch.scoreDifference) {
                    friendMatch.name = friendsInfo[i].name;
                    friendMatch.photo = friendsInfo[i].photo;
                    friendMatch.scoreDifference = totalDiff;
                }

            }



        };

        friendsInfo.push(req.body);
        res.json(friendMatch);
        console.log("Your best match is " + friendMatch.name)



    });

}
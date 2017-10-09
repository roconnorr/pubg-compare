// server.js
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors')
var fs = require('fs');

//read api key from KEYDATA file
var fileApiKey = fs.readFileSync('KEYDATA', 'utf8');

//set port
var port = process.env.PORT || 3001;

//pubg api constant
const {PubgAPI, PubgAPIErrors, REGION, SEASON, MATCH} = require('pubg-api-redis');

// pubg api redis cache config
const api = new PubgAPI({
    apikey: fileApiKey,
    // redisConfig: {
    //     host: '127.0.0.1',
    //     port: 6379,
    // },
});

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())

var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
   // do logging
   //console.log('Something is happening.');
   next(); // make sure we go to the next routes and don't stop here
});


router.route('/playername/:player_name')

    // get the player with that pubg name
    .get(function (req, res) {
        api.getProfileByNickname(req.params.player_name)
            .then((data) => { 
                //console.log(JSON.stringify(data));
                res.json(data);
            })
            .catch(error => {
                res.status(404).json({message: "Player not found"});
            });
    });

router.route('/steamid/:steam_id')

    // get the player with that steam id
    .get(function (req, res) {
        api.getAccountBySteamId(req.params.steam_id)
            .then((data) => {
                res.json(data);
            });
    });

app.use('/api', router);

app.listen(port);
console.log('Listening on ' + port);
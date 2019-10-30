let express     = require('express'),
    router      = express.Router();

let mainController = require('./../controllers/mainController');


router.get('/main', mainController.receiveAndSend);

module.exports = router;
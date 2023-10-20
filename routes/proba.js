const express = require('express');
const router = express.Router();
const cors = require('cors');

router.get('/proba', cors({origin: 'http://localhost:3000'}), async (req, res) => {
    try {
        const odgovor = {
            poruka: 'Ovo je poruka sa cookie-em'
        }
        /* res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000') */
        res.cookie('kolacic', 'vrednost')
        res.json(odgovor)
    }
    catch(err) {
        res.send(err)
    }
})

router.get('/probaa', /* cors({origin: 'http://localhost:3000'}), */ (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
    const obj = {broj: 3333}
    res.cookie('kolacic', 'vrednostiiii').json(obj)
})

module.exports = router;
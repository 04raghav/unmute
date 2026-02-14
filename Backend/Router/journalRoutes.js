const express = require('express');
const router = express.Router();
const { createJournal, getJournals, deleteJournal } = require('../Controller/journalController');
const { checkToken } = require('../Middleware/checktoken');

router.use(checkToken); // Protect all journal routes

router.get('/', getJournals);
router.post('/', createJournal);
router.delete('/:id', deleteJournal);

module.exports = router;

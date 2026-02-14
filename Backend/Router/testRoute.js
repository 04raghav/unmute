const express = require("express");
const { sendUserData } = require("../Controller/TestingController");
const router = express.Router()

router.get('/test/check',sendUserData);
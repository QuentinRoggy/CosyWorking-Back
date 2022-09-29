const express = require('express');
const router = express.Router();

const { bookingController } = require("../../controllers/api");
const controllerHandler = require('../../helpers/controllerHandler');


/**
 * GET all reservation of Coworker
 */
router.get("/personalspace/:id(\\d+)/coworkerbooking", controllerHandler(bookingController.getBookingByCoworker));


// /**
//  * GET all booked date by workspace
//  *
router.get("/workspace/:id(\\d+)/bookeddate", controllerHandler(bookingController.getBookedDate));


// /**
//  * GET booking by host
//  *
router.get("/personalspace/:hostid(\\d+)/booking", controllerHandler(bookingController.getBookingByHost));


// /**
//  * POST request for booking
//  *
router.post("/booking/request", controllerHandler(bookingController.bookingRequest));


// /**
//  * PATCH update a booking state
//  * 
router.patch("/booking/:id(\\d+)/state", controllerHandler(bookingController.stateUpdate));

module.exports = router;

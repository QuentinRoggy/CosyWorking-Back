const express = require('express');
const router = express.Router();

const validate = require('../../validation/validator');
const bookingCreateSchema = require('../../validation/schemas/bookingCreateSchema');
const bookingUpdateSchema = require('../../validation/schemas/bookingUpdateSchema');
const { bookingController } = require("../../controllers/api");
const controllerHandler = require('../../helpers/controllerHandler');
const verifyAccesRight = require('../../middleware/verifyAccessRight');
const { verifyToken } = require('../../middleware/verifyAccessRight');


/**
 * GET /api/personalspace/:id/coworkerbooking
 * @summary Get all bookings of a specific coworker
 * @tags Booking
 * @return {ApiError} 400 - Bad request response - application/json
 * @return {ApiError} 404 - Restaurant not found - application/json
 */
router.get("/personalspace/:id(\\d+)/coworkerbooking",[verifyAccesRight.verifyToken, verifyAccesRight.isAuthenticate], controllerHandler(bookingController.findBookingByCoworker));


/**
 * GET /api/workspace/:id/bookeddate
 * @summary Get all booked date of a specific workspace
 * @tags Booking
 * @return {ApiError} 400 - Bad request response - application/json
 * @return {ApiError} 404 - Restaurant not found - application/json
 */
router.get("/workspace/:id(\\d+)/bookeddate", controllerHandler(bookingController.findBookedDate));


/**
 * GET /api/personalspace/:hostid/booking
 * @summary Get all bookings asked for a specific Host
 * @tags Booking
 * @return {ApiError} 400 - Bad request response - application/json
 * @return {ApiError} 404 - Restaurant not found - application/json
 */
router.get("/personalspace/:hostid(\\d+)/booking", [verifyAccesRight.verifyToken, verifyAccesRight.isHost], controllerHandler(bookingController.findBookingByHost));


/**
 * POST /api/booking/request
 * @summary Post a booking request
 * @tags Booking
 * @return {ApiError} 400 - Bad request response - application/json
 * @return {ApiError} 404 - Restaurant not found - application/json
 */
router.post("/booking/request",[verifyAccesRight.verifyToken, verifyAccesRight.isAuthenticate] ,controllerHandler(bookingController.bookingRequest));


/**
 * PATCH /api/booking/:id/state
 * @summary Update the state of a booking
 * @tags Booking
 * @return {ApiError} 400 - Bad request response - application/json
 * @return {ApiError} 404 - Restaurant not found - application/json
 */ 
router.patch("/booking/:id(\\d+)/state",[verifyAccesRight.verifyToken, verifyAccesRight.isAuthenticate,validate('body', bookingUpdateSchema)], controllerHandler(bookingController.stateUpdate));

module.exports = router;

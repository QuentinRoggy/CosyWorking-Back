const client = require('../config/db');
const { ApiError } = require('../errors/apiErrors');


module.exports = {

    /**
     * 
     * @param {*} req 
     * @param {*} res 
     */
     async getCoworkerReservationsById(coworkerId) {

        const queryString = `
        SELECT booking.id, "user".first_name AS Host, state.description AS state, image.link AS image_link, workspace.address, workspace.city, workspace.title AS title, booking.start_date, booking.end_date, booking.workspace_id, booking.booking_ref_id
        FROM booking 
        JOIN state ON state.id = booking.state_id
        JOIN workspace ON workspace.id = booking.workspace_id
		JOIN "user" ON "user".id = workspace.user_id
		JOIN image ON image.workspace_id = workspace.id
        WHERE booking.user_id = $1 AND image.main_image = true
        `;
        const result = await client.query(queryString, [coworkerId]); 
        return result.rows;
    },

    // /**
    //  * 
    //  * @param {*} req 
    //  * @param {*} res 
    //  */
    // async get() {

    //     const queryString = ``;
    //     const result = await client.query(queryString, []); 
    //     return result.rows;

    // },

    // /**
    //  * 
    //  * @param {*} req 
    //  * @param {*} res 
    //  */
    // async getBookingByHostId() {

    //     const queryString = ``;
    //     const result = await client.query(queryString, []); 
    //     return result.rows;

    // },

    // /**
    //  * 
    //  * @param {*} req 
    //  * @param {*} res 
    //  */
    async PostBookingRequest(bookingToInsert) {

        const queryString = `INSERT INTO booking (start_date, end_date, user_id, workspace_id, booking_ref_id, state_id) VALUES ( $1, $2, $3, $4, $5, (SELECT id FROM state WHERE description = 'En attente')) RETURNING *`;
        
        const values = [];

        for ( const value in bookingToInsert){
            values.push(bookingToInsert[value])
        }

        const result = await client.query(queryString, [...values]); 
        return result.rows;

    },

    // /**
    //  * 
    //  * @param {*} req 
    //  * @param {*} res 
    //  */
    async UpdateBookingState(stateDescription,bookingId) {

        const queryString = `UPDATE booking SET state_id = (SELECT state.id FROM state WHERE state.description = $1) WHERE booking.id = $2 RETURNING *;`;
        const result = await client.query(queryString, [stateDescription, bookingId]); 
        return result.rows;
        
    },

}
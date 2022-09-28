const axios = require("axios");

module.exports = {
  async findLocation(address, zipCode, city) {

    const params = {
      access_key: "f61c8bee2f11dca8893b2a69f6737256",
      query: `${address} ${zipCode} ${city}`
    }
  
    const response = await axios.get("http://api.positionstack.com/v1/forward", {params});

    const coordinates = {
      latitude: response.data.data[0].latitude,
      longitude: response.data.data[0].longitude
    };

    return coordinates;
  }
}
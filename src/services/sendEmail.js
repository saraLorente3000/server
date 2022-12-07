const axios = require('axios');
const { Constants } = require("../utils/Constants");

require('dotenv').config();

const sendEmail = function(email, newsletter) {
    //I build the url of the request, in the readme I explain what should be added to connect to a secure network
    const url = `${process.env.URL_SEND_EMAIL}`+Constants.SEND_EMAIL +"?"+ Constants.EMAIL+`${email}`+"&"+Constants.NEWSLETTER +`${newsletter}`
    //I make the get request
     axios.get(url)
}

module.exports={sendEmail}
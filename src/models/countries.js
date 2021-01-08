const db = require("../config/db");

//Validators
const countryValidators = {
    validator: async function(value) {
        const exists = await Country.findOne({ country_name: value });
        return !exists ? true : false;
    },
    message: 'Country ya existe'
}

const abbreValidators = {
    validator: async function(value) {
        const exists = await Country.findOne({ country_name: value });
        return !exists ? true : false;
    },
    message: 'This country abbreviation ya existe'
}
//Schema
const countrySchema = new db.Schema({

    country_name: { 
      type: String, 
      required: true,
      maxlength: 50, 
      minlength: 3
    },

    country_abbre: {
      type: String, 
      required: true, 
      maxlength: 5, 
      minlength: 2
    },

    country_status: { 
      type: Boolean, 
      default: true 
    },
    
    country_created_at: { 
      type: Date, 
      default: Date.now 
    },

    country_updated_at: { 
      type: Date, 
      default: Date.now 
    }
});

const Country = db.mongoose.model('countries', countrySchema);
module.exports = Country;
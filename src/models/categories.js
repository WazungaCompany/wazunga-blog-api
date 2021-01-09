const db = require("../config/db");

//Validators
const categoriesValidators = {
    validator: async function(value) {
        const exists = await Category.findOne({ category_name: value });
        return !exists ? true : false;
    },
    message: 'category ya existe'
}
//Schema
const categorySchema = new db.Schema({

    category_name: { 
      type: String, 
      required: true,
      maxlength: 100, 
      validate: categoriesValidators

    },

    category_description: {
      type: String, 
      required: true, 
      maxlength: 300, 
      minlength: 10
    },

    category_code: {
        type: String,
        maxlength: 15,
        required: true,
    },

    category_status: { 
      type: Boolean, 
      default: true 
    },
    
    category_created_at: { 
      type: Date, 
      default: Date.now 
    },

    category_updated_at: { 
      type: Date, 
      default: Date.now 
    }
});

const Category = db.mongoose.model('categories', categorySchema);
module.exports = Category;
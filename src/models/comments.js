const db = require("../config/db");

const commentSchema = new db.Schema({
    comment_content: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 250
    },
    comment_created_at: { type: Date, default: Date.now },
    comment_updated_at: { type: Date, default: Date.now },
    comment_status: { type: Boolean, default: true },
    comment_user: { 
        type: db.Schema.Types.ObjectId, 
        ref: 'users', 
        autopopulate: true,
        required: true
    }
});

commentSchema.plugin(require('mongoose'));

const Comment = db.mongoose.model('comments', commentSchema);
module.exports = Comment;

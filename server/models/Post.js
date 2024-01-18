const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");
const domPurifier = require("dompurify");
const {JSDOM} = require("jsdom");
const htmlPurify = domPurifier(new JSDOM().window);

mongoose.plugin(slug);
const Schema = mongoose.Schema;
const PostSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true  
    },
    image_address: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    tags: {
        type: Array
    },
    createdBy: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    },
    slug: {
        type: String,
        slug: "title",
        unique: true,
        slug_padding_size: 2
    }
});

PostSchema.pre("validate", function(next){
    // Check if body exists
    if(this.body){
        this.body = htmlPurify.sanitize(this.body);
    };
    next();
});

module.exports = mongoose.model("Post", PostSchema)
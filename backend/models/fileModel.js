const mongoose = require('mongoose')

const Schema = mongoose.Schema
const FileSchema = new Schema({
    file: {
        type: String,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('corsfiles', FileSchema)
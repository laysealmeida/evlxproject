const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const ProductSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    value: {
        type: String,
        required: true,
    },
    monthyPrice: {
        type: String,
        required: true,
    },
    setupPrice: {
        type: String,
        required: true,
    },
    currency: {
        type: String,
        required: true,
    },
});

ProductSchema.plugin(mongoosePaginate)

mongoose.model('Product', ProductSchema);
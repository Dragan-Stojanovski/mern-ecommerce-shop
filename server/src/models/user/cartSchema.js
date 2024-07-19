const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'UserSchema',required:true },
  products: [
    {
      productId: { type: Schema.Types.ObjectId, ref: 'ProductSchema', required: true },
      quantity: { type: Number, required: true, default: 1 }
    }
  ]
}, { timestamps: true });

const CartSchema = mongoose.model('CartSchema', cartSchema);

module.exports = CartSchema;
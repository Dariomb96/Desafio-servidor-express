import mongoose from 'mongoose';

const cartCollection = "cart";

const cartSchema = new mongoose.Schema(
  {
    products: {
      type: [
        {
          product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "products",
          },
          quantity: {
            type: Number,
          },
        },
      ],
      required: true,
      default: [],
    },
  },
  { versionKey: false }
);

cartSchema.pre("find", function () {
  this.populate("products.product");
});

cartSchema.pre("findOne", function () {
  this.populate("products.product");
});

const cartsModel = mongoose.model(cartCollection, cartSchema);
export  {
  cartsModel
};

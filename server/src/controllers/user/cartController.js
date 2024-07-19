const ProductSchema = require('../../models/product/productSchema');
const CartSchema = require('../../models/user/cartSchema');

exports.addProductToCart = async (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.user.userId; // Ensure you're getting the correct user id from token
  
    console.log('User ID:', userId); // Add this line for debugging
  
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }
  
    try {
      let cart = await CartSchema.findOne({ userId });
  
      if (cart) {
        // If cart exists, update it
        const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);
  
        if (productIndex > -1) {
          cart.products[productIndex].quantity += quantity;
        } else {
          cart.products.push({ productId, quantity });
        }
      } else {
        // If cart doesn't exist, create a new one
        cart = new CartSchema({ userId, products: [{ productId, quantity }] });
      }
  
      await cart.save();
      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json({ message: "Error adding product to cart", error: error.message });
    }
  };
  
  // Get authenticated user's cart
  exports.getUserCart = async (req, res) => {
    const userId = req.user.userId; 
  
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }
  
    try {
      const cart = await CartSchema.findOne({ userId }).populate('products.productId');
  
      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }
  
      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json({ message: "Error fetching cart", error: error.message });
    }
  };

  exports.deleteFromCart = async (req, res) => {
    const { id } = req.params; // ID of the cart item to be removed
    const { quantity } = req.body; // Quantity to be removed
    const userId = req.user.userId;

    if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
    }

    if (!quantity || quantity <= 0) {
        return res.status(400).json({ message: "Valid quantity is required" });
    }

    try {
        let cart = await CartSchema.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        const productIndex = cart.products.findIndex(product => product._id.toString() === id);

        if (productIndex === -1) {
            return res.status(404).json({ message: "Product not found in cart" });
        }

        if (cart.products[productIndex].quantity <= quantity) {
            cart.products.splice(productIndex, 1); // Remove product if quantity is less than or equal to the quantity to be removed
        } else {
            cart.products[productIndex].quantity -= quantity; // Decrease quantity
        }

        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: "Error deleting product from cart", error: error.message });
    }
};
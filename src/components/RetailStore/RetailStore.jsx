import { create } from 'zustand';

const RetailStore = create((set) => ({
    cartItems: [],   // Store the items added to the cart
    totalPrice: 0,   // Total price of items in the cart

    // Function to add item to the cart
    addItem: (name, price) => set((state) => {
        const numericPrice = parseFloat(price); // Convert price to a float
        const existingItemIndex = state.cartItems.findIndex(item => item.name === name); // Check if the item already exists in the cart

        if (existingItemIndex >= 0) {
            // If the item already exists, replace its price and quantity with the new values
            const updatedCartItems = [...state.cartItems];
            updatedCartItems[existingItemIndex] = { 
                name, 
                price: numericPrice, // Replace with new price
                quantity: 1 // Reset quantity to 1
            };

            return {
                cartItems: updatedCartItems,
                totalPrice: state.totalPrice - state.cartItems[existingItemIndex].price + numericPrice, // Update the total price
            };
        } else {
            // If the item does not exist, add it to the cart with quantity 1
            return {
                cartItems: [...state.cartItems, { name, price: numericPrice, quantity: 1 }],
                totalPrice: state.totalPrice + numericPrice, // Update the total price
            };
        }
    }),

    // Clear cart if needed
    clearCart: () => set(() => ({
        cartItems: [],
        totalPrice: 0,
    })),
}));

export default RetailStore;

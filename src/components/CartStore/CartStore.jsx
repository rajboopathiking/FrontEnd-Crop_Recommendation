// // CartStore.jsx
// import {create} from 'zustand';

// const useCartStore = create((set) => ({
//     items: [], // Array to hold cart items
//     totalPrice: 0, // Total price of cart items

//     addToCart: (item) => set((state) => {
//         const existingItem = state.items.find(i => i.id === item.id);
//         let updatedItems;

//         if (existingItem) {
//             updatedItems = state.items.map(i => 
//                 i.id === item.id ? { ...i, quantity: (i.quantity || 1) + 1 } : i
//             );
//         } else {
//             updatedItems = [...state.items, { ...item, quantity: 1 }];
//         }

//         // Calculate the total price
//         const newTotalPrice = updatedItems.reduce((total, i) => total + (i.prize * (i.quantity || 1)), 0);

//         return {
//             items: updatedItems,
//             totalPrice: newTotalPrice,
//         };
//     }),

//     clearCart: () => set({ items: [], totalPrice: 0 }), // Function to clear the cart
// }));

// export default useCartStore;

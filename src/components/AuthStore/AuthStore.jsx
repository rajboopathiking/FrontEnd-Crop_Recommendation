import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set, get) => ({
      users: [
        { username: 'user1', password: 'password1', name: 'John Doe', id: "1" },
        { username: 'user2', password: 'password2', name: 'Jane Smith', id: "2" },
      ], // Initial users

      currentUser: null,          // Store the logged-in user
      isAuthenticated: false,     // Track if the user is authenticated

      // Login function to authenticate user
      login: (username, password) => {
        const user = get().users.find(
          (u) => u.username === username && u.password === password
        );

        if (user) {
          set({
            currentUser: user,       // Store the entire user object
            isAuthenticated: true,    // Mark user as authenticated
          });
          return true; // Return success
        } else {
          set({
            currentUser: null,       // Clear the current user
            isAuthenticated: false,   // Failed authentication
          });
          return false; // Return failure
        }
      },

      // Logout function to clear session
      // In your Zustand store
      logout: () => {
        set({ currentUser: null, isAuthenticated: false });
        console.log("User logged out"); // Optional debugging log
      },

      // Register a new user
      register: (username, password, name) => {
        const existingUser = get().users.find(u => u.username === username);

        if (existingUser) {
          return false; // Return failure if user exists
        }

        set((state) => ({
          users: [...state.users, { username, password, name }], // Add new user with name
        }));
        return true; // Return success
      },
    }),
    {
      name: 'auth-session', // Key in sessionStorage
      getStorage: () => sessionStorage, // Use sessionStorage instead of localStorage
    }
  )
);

export default useAuthStore; // Export the store for above

import { configureStore } from '@reduxjs/toolkit';
import users from './auth/auth.js';  // Make sure you're importing the correct reducer
import resetPassword from './resetPassword/resetPassword.js';

// Load state from localStorage if available
const loadStateFromLocalStorage = () => {
    try {
        const serializedState = localStorage.getItem('users');
        if (serializedState) {
            const parsedState = JSON.parse(serializedState);
            return parsedState.users ? parsedState : undefined;
        }
    } catch (e) {
        console.error('Could not load state from localStorage:', e);
    }
    return undefined;
};


// Save state to localStorage
const saveStateToLocalStorage = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('users', serializedState);
    } catch (e) {
        console.error('Could not save state to localStorage:', e);
    }
};

// Get initial state from localStorage if available
const initialState = loadStateFromLocalStorage();

export const store = configureStore({
    reducer: {
        users,  // This is the correct key as per your slice in auth.js
        resetPassword,
    },
    preloadedState: initialState, // Set initial state from localStorage
});

// Subscribe to store changes and save state to localStorage on every change
store.subscribe(() => {
    saveStateToLocalStorage(store.getState());
});

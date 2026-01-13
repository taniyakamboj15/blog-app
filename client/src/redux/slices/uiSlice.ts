import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface UiState {
    isAuthModalOpen: boolean;
    authModalMessage: string | null;
}

const initialState: UiState = {
    isAuthModalOpen: false,
    authModalMessage: null,
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        openAuthModal: (state, action: PayloadAction<string | undefined>) => {
            state.isAuthModalOpen = true;
            state.authModalMessage = action.payload || null;
        },
        closeAuthModal: (state) => {
            state.isAuthModalOpen = false;
            state.authModalMessage = null;
        },
    },
});

export const { openAuthModal, closeAuthModal } = uiSlice.actions;
export default uiSlice.reducer;

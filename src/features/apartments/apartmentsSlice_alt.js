/**
 *  -- Alternative approach of using createSlice (only for illustration - not used)
 */

import { createSlice } from '@reduxjs/toolkit';

export const apartmentsSlice = createSlice({
    name: 'apartments',
    initialState: {
        
    },
    reducers: {
        getOffersSucceeded: (state, action) => {
            if(action.payload != null){
                return {
                    ...state,
                    offers: action.payload.offers,
                    loaded: true
                }
            }
            return {
                ...state,
                errorMessage: "Couldn't fetch results now. Please try again later"
            };
        },
        getOffersFailed: (state, action) => {
            return {
                ...state,
                loaded: false,
                errorMessage: action.payload
            }
        },
        focusOffer: (state, action) => {
            return {
                ...state,
                focusedOffer: action.payload.offerId
            }
        },
        removeFocusedOffer: (state) => {
            return {
                ...state,
                focusedOffer: ''
            }
        }
    }
});

/**
 * Action creators
 */
export const {getOffersSucceeded, getOffersFailed, focusOffer, removeFocusedOffer} = apartmentsSlice.actions;
export const getOffers = (payload) => ({
    type: 'apartments/getOffers',
    payload: payload
})

/**
 * Final reducer (sync reducer functions)
 */
export default apartmentsSlice.reducer;
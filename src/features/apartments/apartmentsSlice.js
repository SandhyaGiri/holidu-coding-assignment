import { takeLatest, put, call } from 'redux-saga/effects';
import HoliduSearchAPI from '../../services/holidu-search-api';

const STATE_SLICE_NAME = 'apartments';

const initialState = {
    offers: [],
    loaded: false,
    searchTerm: 'Mallorca, Spanien',
    focusedOffer: null,
    errorMessage: ''
}


/**
 * Actions
 */
export const GET_OFFERS = `${STATE_SLICE_NAME}/getOffers`;
const GET_OFFERS_SUCCEEDED = `${STATE_SLICE_NAME}/getOffersSucceeded`;
const GET_OFFERS_FAILED = `${STATE_SLICE_NAME}/getOffersFailed`;
const FOCUS_OFFER = `${STATE_SLICE_NAME}/focusOffer`;
const REMOVE_FOCUSED_OFFER = `${STATE_SLICE_NAME}/removeFocusedOffer`;

/**
 * Action creators
 */
export const getOffers = (payload) => ({
    type: GET_OFFERS,
    payload: payload
});
export const getOffersSucceeded = (payload) => ({
    type: GET_OFFERS_SUCCEEDED,
    payload: payload
});
export const getOffersFailed = (payload) => ({
    type: GET_OFFERS_FAILED,
    payload: payload
});
export const focusOffer = (payload) => ({
    type: FOCUS_OFFER,
    payload: payload
});
export const removeFocusedOffer = (payload) => ({
    type: REMOVE_FOCUSED_OFFER,
    payload: payload
});

/** 
 * Reducer
 */
const apartmentsReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_OFFERS_SUCCEEDED:
            if(action.payload != null){
                return {
                    ...state,
                    offers: action.payload.offers,
                    loaded: true
                };
            }
            return {
                ...state,
                errorMessage: "Couldn't fetch results now. Please try again later"
            };
        case GET_OFFERS_FAILED:
            return {
                ...state,
                loaded: false,
                errorMessage: action.payload
            };
        case FOCUS_OFFER:
            return {
                ...state,
                focusedOffer: action.payload.offerId
            };
        case REMOVE_FOCUSED_OFFER:
            return {
                ...state,
                focusedOffer: ''
            };
        default:
            return state;
    }
}
export default apartmentsReducer;

/**
 * Sagas for asynchronuously updating redux state.
 */

/* Worker saga */
export function* addApartmentOffersToStore(action){
    const api = new HoliduSearchAPI();
    try {
        const response = yield call(api.getOffers.bind(api), action.payload.searchTerm);
        yield put(getOffersSucceeded(response));
    } catch(err){
        yield put(getOffersFailed(err));
    }
}

/* Watcher saga */
export const apartmentsSaga = [
    takeLatest(GET_OFFERS, addApartmentOffersToStore),
]
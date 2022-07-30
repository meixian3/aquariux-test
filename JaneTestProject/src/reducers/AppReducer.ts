import { UPDATING_CONTACT_LIST } from "../actions/types";
import data from '../config/data.json'

const INITIAL_STATE = {
    contactList: data
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UPDATING_CONTACT_LIST:
            return {
                ...state,
                contactList: action.payload
            };
        default:
            return state
    }
}
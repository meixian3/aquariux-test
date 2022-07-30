import { UPDATING_CONTACT_LIST } from './types'

export const updateContactList = (data) => {
    return (dispatch) => {
        dispatch({ type: UPDATING_CONTACT_LIST, payload: data })
    }
}
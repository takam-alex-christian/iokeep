import { AppUiStateType, AppUiActionType, AppDataStateType, AppDataActionType, CollectionDataType } from "./Types";


export function appUiReducer(prevState: AppUiStateType, action: AppUiActionType): AppUiStateType {

    switch (action.type) {
        case "initilize_app_ui": {
            return action.payload.appUiState
        }
        case "switched_ui_mode": {
            let newState: AppUiStateType = { ...prevState, uiMode: prevState.uiMode == "light" ? "dark" : "light" };
            localStorage.setItem("app_ui_state", JSON.stringify(newState));

            return newState;
        } case "show_modal": {
            return { ...prevState, modalOverlay: true, currentModalView: action.payload.view }
        } case "hide_modal": {
            return { ...prevState, modalOverlay: false }
        }
        default: {
            throw new Error("action type not taken care of");
        }
    }
}

export function appDataReducer(prevState: AppDataStateType, action: AppDataActionType): AppDataStateType {
    switch (action.type) {
        case "switch_current_collection": {
            return { ...prevState, currentCollection: { collectionName: action.payload.collectionName ? action.payload.collectionName : "", _collectionId: action.payload._collectionId ? action.payload._collectionId : "" } }
        }
        default: {
            throw new Error("invalid action type")
        }
    }
}
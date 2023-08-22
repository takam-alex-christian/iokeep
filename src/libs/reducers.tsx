import { AppUiStateType, AppUiActionType, AppDataStateType, AppDataActionType} from "./Types";




export function appUiReducer(prevState: AppUiStateType, action: AppUiActionType): AppUiStateType{

    switch(action.type){
        case "switched_ui_mode": {
           return  {...prevState, uiMode: prevState.uiMode == "light" ? "dark" : "light" };
        }default: {
            throw new Error("action type not taken care of");
        }
    }
}

export function appDataReducer(prevState: AppDataStateType, action: AppDataActionType): AppDataStateType{
    switch(action.type){
        case "create_collection": {
            return {...prevState, collections: [...prevState.collections, action.payload.collectionName]}
        }
        default: {
            throw new Error("invalid action type")
        }
    }
}
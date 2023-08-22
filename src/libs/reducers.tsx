import { AppUiStateType, AppUiActionType} from "./Types";




export function appUiReducer(prevState: AppUiStateType, action: AppUiActionType): AppUiStateType{

    switch(action.type){
        case "switched_ui_mode": {
           return  {...prevState, uiMode: prevState.uiMode == "light" ? "dark" : "light" };
        }default: {
            throw Error("action type not taken care of");
        }
    }
}
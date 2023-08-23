import { AppUiStateType, AppUiActionType, AppDataStateType, AppDataActionType, CollectionType} from "./Types";


export function appUiReducer(prevState: AppUiStateType, action: AppUiActionType): AppUiStateType{

    switch(action.type){
        case "switched_ui_mode": {
           return  {...prevState, uiMode: prevState.uiMode == "light" ? "dark" : "light" };
        }case "show_modal": {
            return {...prevState, modalOverlay: true, currentModalView: action.payload.view}
        }case "hide_modal": {
            return {...prevState, modalOverlay: false}
        }
        default: {
            throw new Error("action type not taken care of");
        }
    }
}

export function appDataReducer(prevState: AppDataStateType, action: AppDataActionType): AppDataStateType{
    switch(action.type){
        case "create_collection": {
            return {...prevState, collections: [...prevState.collections, {name: action.payload.collectionName, notes: []}]}
        }
        case "switch_current_collection": {
            return {...prevState, currentCollection: action.payload.collectionName} 
        }
        case "add_note":{
            
            const mutablePrevState = {...prevState}
            
            prevState.collections.forEach((eachCollection, index)=>{
                if(eachCollection.name == action.payload.collectionName){
                    mutablePrevState.collections[index].notes?.push(action.payload.noteData)
                }
            })

            return {...mutablePrevState}

        }
        default: {
            throw new Error("invalid action type")
        }
    }
}
import data from '../data.json';

const initialState={
    categories: data.categories.map(category => ({
        ...category,
        widgets: category.widgets.map(widget => ({
          ...widget,
          checked: true // Initialize all widgets as checked by default
        }))
      })),
    };

const widgetReducers=(state=initialState,action)=>{
    switch(action.type){
        case 'ADD_WIDGET':
            return {
                ...state,
                categories:state.categories.map((category)=>
                    category.name===action.payload.category?
                    {
                        ...category,
                        widgets:[...category.widgets,action.payload.widget],
                    }
                    :category
                ),
            }
        case 'REMOVE_WIDGET':
            return{
                ...state,
                categories:state.categories.map((category)=>
                    category.name===action.payload.category?
                    {
                        ...category,
                        widgets:category.widgets.filter((widget)=>
                            widget.name!==action.payload.widgetName
                        ),
                    }
                    :category
                ),
            }
            case 'UPDATE_CATEGORIES':
                return {
                  ...state,
                  categories: action.payload
                }
        default:
            return state;
    }   
    
}
export default widgetReducers;
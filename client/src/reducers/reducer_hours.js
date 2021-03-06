import { UPDATE_HOURS, CELL_BLUR, 
    CELL_CLICKED, SAVE_TABLE, HOURS_DELETE,
    POST_HOURS, GET_TABLE, PAYROLL_MESSAGE,
    COMMENT_ADD, COMMENT_CLEAR } from '../actions/types';

const timeType = (payload) => {
    const totalTime = payload.update.hours + ":" + payload.update.mins;
    switch(payload.update.type) {
        case 'Vacation':
            return {'vacationTime': totalTime};
        case 'Sick':
            return {'sickTime': totalTime};
        case 'Absent':
            return {'absentTime': totalTime};
        case 'holiday':
            return {'holiday': totalTime};
        default:
            return;
    }
}

const changeTable = (state={}, action) => {
    switch(action.type) {
        case UPDATE_HOURS:
            if (state.id === action.payload.id) {
                const typeObj = timeType(action.payload);
                return Object.assign({}, state, {editable: false}, typeObj)
            }
            return state;
        case HOURS_DELETE:
            if (state.id === action.payload.id) {
                // console.log('===========================================replace obj=======================================================')
                // console.log( {[action.payload.update.type]: 0} );
                return {...state, [action.payload.update.type]: 0}
            }
            return state;
        case CELL_BLUR:
        case CELL_CLICKED:
            if (action.payload.id === state.id) {
            
                return {...state, editable: !state.editable};
            }
            return {...state, editable: false};
        default:
            return state;
    }
}

const change = (state={}, action) => {
    return {...state, hours: {...state.hours, tableArr: [...state.hours.tableArr.map(e=>changeTable(e, action))] }};
}

const initialState = {
    data: {
        comments: [], 
        data: [], 
        dates: [], 
        salariedEmployees: [], 
        createdBy: {}, 
        approved:{}, 
        finalized: {},
    },
    payrollMessage: { message: '', show: false, success: false}
}

const deleteComment = (comment, action) => {
    return comment.id !== action.payload;
}
export default function(state=initialState, action) {
    switch(action.type) {
        case PAYROLL_MESSAGE:
            return {...state, payrollMessage: action.payload}
        case COMMENT_CLEAR:
            return {...state, data: {...state.data, comments: [...state.data.comments.filter(comment=> deleteComment(comment, action))]}};
        case SAVE_TABLE:
            return Object.assign({}, state, action.payload);
        case POST_HOURS:
            return Object.assign({}, state, action.payload);
        case GET_TABLE:
            return Object.assign({}, state, action.payload)
            //return {...state, data: action.payload.data};
        case COMMENT_ADD:       
            return {...state, data: {...state.data, comments: [...state.data.comments, action.payload]}};
        case UPDATE_HOURS:
        case HOURS_DELETE:
        case CELL_BLUR:
        case CELL_CLICKED:
            return {...state, data: {...state.data, data: [...state.data.data.map(e=>change(e, action)) ]}};
        default:
            return state;
    }
}



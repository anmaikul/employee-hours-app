import { UPDATE_HOURS, CELL_BLUR, CELL_CLICKED, SAVE_TABLE, POST_HOURS, GET_TABLE } from '../actions/types';

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
        case CELL_BLUR:
        case CELL_CLICKED:
            if (action.payload.id === state.id) {
            
                return {...state, editable: !state.editable};
            }
            return {...state, editable: false};
    }
}

const change = (state={}, action) => {
    return {...state, hours: {...state.hours, tableArr: [...state.hours.tableArr.map(e=>changeTable(e, action))] }};
}

export default function(state={}, action) {
    switch(action.type) {
        case SAVE_TABLE:
            return Object.assign({}, state, action.payload);
        case POST_HOURS:
            return Object.assign({}, state, action.payload);
        case GET_TABLE:
            return Object.assign({}, state, action.payload);
        case UPDATE_HOURS:
        case CELL_BLUR:
        case CELL_CLICKED:
            return {...state, data: {...state.data, data: [...state.data.data.map(e=>change(e, action)) ]}};
    }
    return state;
}
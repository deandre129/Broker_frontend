import actions from '@/modules/test/testActions'

const initialData = {
    click: 0
}

const test =  (state = initialData, { type, payload}) => {
    switch(type) {
        case actions.TEST_INCREASE:
            return { ...state, click: state.click + 1 }
        case actions.TEST_DECREASE:
            return { ...state, click: state.click - 1 }
        default:
            return state;
    }
}

export default test;
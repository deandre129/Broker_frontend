const testAction = {
    TEST_INCREASE: "TEST_INCREASE",
    TEST_DECREASE: "TEST_DECREASE",

    doTestIncrease:
    () => (dispatch) => {
        dispatch({type: testAction.TEST_INCREASE});
    },

    doTestDecrease:
    () => (dispatch) => {
        dispatch({type: testAction.TEST_DECREASE});
    },
}

export default testAction;
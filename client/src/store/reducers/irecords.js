import {
    SET_IRECORD_SELECTED_ID,
    SELECTED_IRECORDS_TO_RECORD,
    TOGGLE_RECORDING,
    SEND_IRECORDS_RECORDED,
    SEND_IRECORD_SUCCESS_IRECORDS_PAGE,
    SEND_IRECORDS_ERROR,
    FETCH_ALL_RECORDS,
    FETCH_ALL_RECORDS_SUCCESS,
    FETCH_ALL_RECORDS_ERROR,
    SET_TRANSLATION_ID,
    FETCH_EXPRESSIONS,
    FETCH_EXPRESSIONS_ERROR,
    FETCH_EXPRESSIONS_SUCCESS,
    DELETE_IRECORD,
    DELETE_IRECORD_SUCCESS_IRECORDS_PAGE,
    DELETE_IRECORD_ERROR,
} from "../actions/irecordsActions";

import {
    COMMENT_SUBMIT,
    COMMENT_SUBMIT_SUCCESS,
    COMMENT_SUBMIT_ERROR,
    COMMENT_INPUT,
    DELETE_COMMENT,
    DELETE_COMMENT_SUCCESS,
    DELETE_COMMENT_ERROR,
    UPDATE_COMMENT,
    UPDATE_COMMENT_SUCCESS,
    UPDATE_COMMENT_ERROR,
    FETCH_COMMENTS_BY_RECORD,
    FETCH_COMMENTS_BY_RECORD_SUCCESS,
    FETCH_COMMENTS_BY_RECORD_ERROR,
} from '../actions/commentActions';

const initialState = {
    irecordSelectedId: null,
    isRecording: false,
    recording: null,
    loading: false,
    allRecordsList: [],
    isLoadingAllRecords: false,
    recordsListError: "",
    languageId: null,
    allExpressions: [],
    isLoadingExpressions: false,
    errorFetchingExpressions: null,
    irecordDeletedMessage: "",
    irecordDeletedError: "",

    commentInputValue: "",
    commentSubmitLoading: false,
    commentsList: [],
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case SET_IRECORD_SELECTED_ID:
            return {
                ...state,
                irecordSelectedId: action.payload,
            };
        case SET_TRANSLATION_ID:
            return {
                ...state,
                languageId: action.payload,
            };
        case TOGGLE_RECORDING:
            return {
                ...state,
                isRecording: action.payload,
            };
        case SELECTED_IRECORDS_TO_RECORD:
            return {
                ...state,
                recording: action.payload,
            };
        case SEND_IRECORDS_RECORDED:
            return {
                ...state,
                loading: true,
            };
        case SEND_IRECORD_SUCCESS_IRECORDS_PAGE:
            return {
                ...state,
                loading: false,
                allRecordsList: [...state.allRecordsList, action.payload],
            };
        case SEND_IRECORDS_ERROR:
            return {
                ...state,
                loading: false,
            };
        case FETCH_ALL_RECORDS:
            return {
                ...state,
                isLoadingAllRecords: true,
            };
        case FETCH_ALL_RECORDS_SUCCESS:
            return {
                ...state,
                allRecordsList: [...action.payload],
                isLoadingAllRecords: false,
                recordsListError: "",
            };
        case FETCH_ALL_RECORDS_ERROR:
            return {
                ...state,
                isLoadingAllRecords: false,
                recordsListError: action.payload,
            };
        case FETCH_EXPRESSIONS:
            return {
                ...state,
                errorFetchingExpressions: null,
                allExpressions: [],
                isLoadingExpressions: true,
            };
        case FETCH_EXPRESSIONS_SUCCESS:
            return {
                ...state,
                isLoadingExpressions: false,
                allExpressions: [...action.payload],
                errorFetchingExpressions: null,
            };
        case FETCH_EXPRESSIONS_ERROR:
            return {
                ...state,
                allExpressions: [],
                errorFetchingExpressions: action.payload,
                isLoadingExpressions: false,
            };
        case DELETE_IRECORD:
            return {
                ...state,
                loading: true,
                irecordDeletedMessage: "",
            };
        case DELETE_IRECORD_SUCCESS_IRECORDS_PAGE:
            return {
                ...state,
                loading: false,
                irecordDeletedMessage: "iRecords supprimer",
                irecordDeletedError: "",
                allRecordsList: [...action.payload],
            };
        case DELETE_IRECORD_ERROR:
            return {
                ...state,
                loading: false,
                irecordDeletedMessage: "",
                irecordDeletedError: "Problème lors de la suppression",
            };
        case COMMENT_SUBMIT:
            return {
                ...state,
                commentSubmitLoading: true,
            };
        case COMMENT_SUBMIT_SUCCESS:
            return {
                ...state,
                commentInputValue: "",
                commentSubmitLoading: false,
                commentsList: [
                    ...state.commentsList,
                    ...action.payload
                ]
            };
        case COMMENT_SUBMIT_ERROR:
            return {
                ...state,
                commentSubmitLoading: false,
            };
        case COMMENT_INPUT:
            return {
                ...state,
                commentInputValue: action.payload,
            };
        case DELETE_COMMENT:
            return {
                ...state,
            };
        case DELETE_COMMENT_SUCCESS:
            return {
                ...state,
            };
        case DELETE_COMMENT_ERROR:
            return {
                ...state,
            };
        case UPDATE_COMMENT:
            return {
                ...state,
            };
        case UPDATE_COMMENT_SUCCESS:
            return {
                ...state,
            };
        case UPDATE_COMMENT_ERROR:
            return {
                ...state,
            };
        case FETCH_COMMENTS_BY_RECORD:
            return {
                ...state,
            };
        case FETCH_COMMENTS_BY_RECORD_SUCCESS:
            return {
                ...state,
                commentsList: action.payload,
            };
        case FETCH_COMMENTS_BY_RECORD_ERROR:
            return {
                ...state,
            };
        default:
            return state;
    };
};
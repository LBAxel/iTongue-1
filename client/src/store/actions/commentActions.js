export const COMMENT_SUBMIT = "COMMENT_SUBMIT";
export const COMMENT_SUBMIT_SUCCESS = "COMMENT_SUBMIT_SUCCESS";
export const COMMENT_SUBMIT_ERROR = "COMMENT_SUBMIT_ERROR";
export const COMMENT_INPUT = "COMMENT_INPUT";

export const commentSubmit = (payload) => ({
    type: COMMENT_SUBMIT,
    payload,
});

export const commentSubmitSuccess = (payload) => ({
    type: COMMENT_SUBMIT_SUCCESS,
    payload,
});

export const commentSubmitError = (payload) => ({
    type: COMMENT_SUBMIT_ERROR,
    payload,
});

export const commentInput = (payload) => ({
    type: COMMENT_INPUT,
    payload,
});

export const DELETE_COMMENT = "DELETE_COMMENT";
export const DELETE_COMMENT_SUCCESS = "DELETE_COMMENT_SUCCESS";
export const DELETE_COMMENT_ERROR = "DELETE_COMMENT_ERROR";

export const deleteComment = () => ({
    type: DELETE_COMMENT,
});

export const deleteCommentSuccess = (payload) => ({
    type: DELETE_COMMENT_SUCCESS,
    payload,
});

export const deleteCommentError = (payload) => ({
    type: DELETE_COMMENT_ERROR,
    payload,
});

export const UPDATE_COMMENT = "UPDATE_COMMENT";
export const UPDATE_COMMENT_SUCCESS = "UPDATE_COMMENT_SUCCESS";
export const UPDATE_COMMENT_ERROR = "UPDATE_COMMENT_ERROR";

export const updateComment = () => ({
    type: UPDATE_COMMENT,
});

export const updateCommentSuccess = (payload) => ({
    type: UPDATE_COMMENT_SUCCESS,
    payload,
});

export const updateCommentError = (payload) => ({
    type: UPDATE_COMMENT_ERROR,
    payload,
});

export const FETCH_COMMENTS_BY_RECORD = "FETCH_COMMENTS_BY_RECORD";
export const FETCH_COMMENTS_BY_RECORD_SUCCESS = "FETCH_COMMENTS_BY_RECORD_SUCCESS";
export const FETCH_COMMENTS_BY_RECORD_ERROR = "FETCH_COMMENTS_BY_RECORD_ERROR";

export const fetchCommentsByRecord = () => ({
    type: FETCH_COMMENTS_BY_RECORD,
});

export const fetchCommentsByRecordSuccess = (payload) => ({
    type: FETCH_COMMENTS_BY_RECORD_SUCCESS,
    payload,
});

export const fetchCommentsByRecordError = (payload) => ({
    type: FETCH_COMMENTS_BY_RECORD_ERROR,
    payload,
});
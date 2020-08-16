/* Container ExpressionsList */

import { connect } from 'react-redux';

/* Component */
import ExpressionsList from '../../../components/Admin/Expressions/expressionsList';

/* Actions */
import { 
    addExpressionInputValue, 
    addExpressionSubmit,
    getFakeData,
    setTraductionsByExpression,
    expressionIdSelect,
    deleteExpression,
} from '../../../store/actions/Admin/expressionsActions';


const mapStateToProps = (state) => ({
    newExpressionInputValue: state.expressionsReducer.newExpressionInputValue,
    newExpressionLoading: state.expressionsReducer.newExpressionLoading,
    expressionsList: state.expressionsReducer.expressionsList,
    expressionId: state.expressionsReducer.expressionId,
});

const mapDispatchToProps = (dispatch) => ({
    addExpressionInputValue: (newInputValue) => {
        dispatch(addExpressionInputValue(newInputValue));
    },
    addExpressionSubmit: () => {
        dispatch(addExpressionSubmit());
    },
    getFakeData: () => {
        dispatch(getFakeData());
    },
    setTraductionsByExpression: () => {
        dispatch(setTraductionsByExpression());
    },
    expressionIdSelect: (expressionId) => {
        dispatch(expressionIdSelect(expressionId));
    },
    deleteExpression: (exprId) => {
        dispatch(deleteExpression(exprId));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpressionsList);
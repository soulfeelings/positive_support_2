import {
  requestingUpdateSituationAC,
  updateSituationErrorAC,
  updateSituationSuccessAC,
} from '../actionCreators/userActionCreators';

export default function fetchSituation(action, method, body) {
  return (dispatch) => {
    dispatch(requestingUpdateSituationAC());
    fetch(action, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body,
    })
      .then((response) => response.json())
      .then((result) => dispatch(updateSituationSuccessAC(result.user.situation)))
      .catch((error) => dispatch(updateSituationErrorAC(error)));
  };
}

import { useDispatch, useSelector } from 'react-redux';
import { edit_situation } from '../../helpers/actions';
import fetchSituation from '../../redux/fetches/fetchSituation';
import classes from './SituationFrom.module.css'
import profileclasses from '../Profile.module.css'

function SituationForm() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.currentUser);

  function handleSubmit(event) {
    event.preventDefault();

    const {
      action,
      situationInput: { value: situation },
    } = event.target;

    dispatch(
      fetchSituation(
        action,
        "PUT",
        JSON.stringify({ situation, _id: currentUser._id })
      )
    );

    event.target.reset()
  }

  return (
    <form onSubmit={handleSubmit} action={edit_situation}>
      <textarea className={classes.situation} name="situationInput"></textarea>
      <br />
      <button className={profileclasses.button}>Изменить ситуацию</button>
    </form>
  );
}

export default SituationForm;

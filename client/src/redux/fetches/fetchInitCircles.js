export default function fetchInitCircles() {
  return (dispatch) => {
    fetch('/circle')
      .then((res) => res.json())
      .then((data) => dispatch({ type: 'INIT_CIRCLES', payload: { data } }));
  };
}

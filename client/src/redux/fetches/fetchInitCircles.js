export default function fetchInitCircles() {
  return (dispatch) => {
    fetch('http://localhost:4000/circle')
      .then((res) => res.json())
      .then((data) => dispatch({ type: 'INIT_CIRCLES', payload: { data } }));
  };
}

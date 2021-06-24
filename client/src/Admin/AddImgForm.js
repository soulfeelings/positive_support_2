import { useDispatch } from "react-redux";
import { addCirlesAC } from "../redux/actionCreators/circleAC";

function AddImgForm({circles}) {
  const dispatch = useDispatch()

 const loadFile = async function(e) {
    e.preventDefault();
    const circleName = document.querySelector('input[name=circleName]')
    const loadData =  await new FormData(e.target)
    await loadData.append('name', circleName.value);
    const res = await fetch(`http://localhost:4000/circle/add`, {
      method: 'POST',
      body: loadData,
    });
    const result = await res.json();
    dispatch(addCirlesAC(result));
    e.target.reset()
    circleName.value = ''
  }

  
  return (
    <div className="loadFileDiv">
      <input type="text" name="circleName" className="input"/>
      <form
        action="localhost:4000/circle/load"
        method="POST"
        encType="multipart/form-data"
        onSubmit={loadFile}
        // className="row g-3 align-items-center loadFileForm"
        >
        <input type="file" name="file" className="fileToLoad" />
        <button className="btn btn-outline-dark loadFormButton">Добавить круговорот</button>
      </form>
    </div>
  );
}

export default AddImgForm;

import './App.css';
import { useSelector, useDispatch, connect } from 'react-redux'
import { setID, incrementID, decrementID, resetState, fetchData } from './features/dataSlice'
import { useEffect } from 'react';

function App(props) {
  const dispatch = useDispatch()
  const data = useSelector((state) => state.data)

  const displayImage = () => {
    if (data.apiData.primaryImage || data.apiData.title) {
      return <img style={{'width': '25%'}} src={data.apiData.primaryImage} alt={data.apiData.title} />
    } else {
      return <p>Image Placeholder</p>
    }
  }

  useEffect(() => {
    dispatch(fetchData())
  }, [props.objectID, dispatch])
  
  return (
    <div className="App">
      <div>
        <button onClick={() => dispatch(fetchData())}>Trigger Thunk</button>
        <button onClick={() => dispatch(resetState())}>Clear</button>
        <button onClick={() => dispatch(incrementID())}>Next</button>
        <button onClick={() => dispatch(decrementID())}>Back</button>
      </div>
      <div>
        <input onChange={(e) => dispatch(setID(Number(e.target.value)))}/>
      </div>
      <div>
        {data.objectID}
        <p></p>
        {displayImage()}
      </div>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => ({ objectID: state.data.objectID })
export default connect(mapStateToProps)(App)
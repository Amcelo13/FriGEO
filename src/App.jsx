import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
function App() {
  const [distance, setdistance] = useState(0);
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault()
    await axios.get(`http://localhost:4000/${distance}`, selectedItem.location);
  };


  //Getting the data from the server
  useEffect(() => {
    const getData = async () => {
      await axios.get('http://localhost:4000/').then((response)=>{
        setData(response.data)
      })
    };
    getData();
  }, []);

  return (
    <div className="App">
      <form action="" onSubmit={handleSubmit}>
        <input
          value={distance}
          type="number"
          onChange={(e) => setdistance(e.target.value)}
        />
        <button>Get</button>
        <div> {selectedItem?.name}</div>
        <div className="lis">
          {data &&
            data.map((e) => {
              return (
                <div key={e?._id} style={{ display: "flex", justifyContent:'space-around',gap:'10rem'}}>
                  <p style={{textAlign:'left'}}>{e?.name} </p>
                  <button onClick={() => setSelectedItem(e)}>Select This</button>
                </div>
              );
            })}
        </div>
      </form>
    </div>
  );
}

export default App;

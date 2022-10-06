import React, {useState} from "react";

function App() {


  let ApiKey = 'bb455fb2731631fab537cfb7363cbb84'
  const [lat, setLat] = useState('');
  const [lon, setLong] = useState('');
  const [data, setData] = useState('');

 

    const fetchData = () => {
      navigator.geolocation.getCurrentPosition(function(position) {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      });

    }

    async function getCity() {
      await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${ApiKey}`)
      .then(res => res.json())
      .then(result => {
        setData(result)
        console.log(result);
      });
    }
 
  fetchData()

  return (
    <div className="app">
        <button onClick={getCity}>Get name your city</button>
        <h1>{data.name}</h1>
    </div>
  );
}

export default App;

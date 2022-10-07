import React, {useState} from "react";
import BlockPost from "./Components/BlockPost"
import './Style/appStyle.css'
import {apiKey} from './Components/API/apiKey'

function App() {


 
  const[city, setCity] = useState('')
  const [data, setData] = useState('')

  function putCity() {
    setCity(city)
  }


    async function getCity() {
      await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=ru&appid=${apiKey.api}`)
      .then(res => res.json())
      .then(result => {
        setData(result)
        console.log(result);
      });
    }

    for(let key in data) {
      return (
        <div className="app-wrapper">
          <h1>{data.name}</h1>
          <p>{Math.ceil(data.main.temp) - 273} °C</p>
          <p>{data.weather[0]['description']}</p>
        </div>
      )
    }



  return (
    <div className="app">
      <div className="df">
        <input type="text" onChange={e => setCity(e.target.value)} />
        <button onClick={getCity}>Get name your city</button>
      </div>
        
    </div>
  );
}

export default App;
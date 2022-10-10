import React, {useState, useCallback, selectedRow, docTolinked} from "react";
import WeatherBlock from "./Components/WeatherBlock"
import './Style/appStyle.css'
import {apiKey} from './Components/API/apiKey'
import InputPosts from "./Components/WeatherBlock";

function App() {

  let a = '';
  const[arr, setArr] = useState([])
  const[city, setCity] = useState('')

    async function getCity() {
     try {
       await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=ru&appid=${apiKey.api}`)
       .then(res => res.json())
       .then(result => {
         console.log(result);
         let newAddArr = {
           id : result.id,
           name : result.name,
           weatherNum : result.main.temp,
           weatherStr: result.weather[0].description
         };
         setArr([...arr, newAddArr]);
         setCity(a)
       });
     } catch (error) {
      alert('Неверное название населённого пункта, попробуйте ещё раз.')
     }
     
     
    }

  return (
    <div className="app">
      <div className="df">
        <input type="text" placeholder="Город" value={city}  onChange={e => setCity(e.target.value)} />
        <button onClick={getCity}>Добавить город</button>
      </div>
      <WeatherBlock arr={arr} />
    </div>
  );
}

export default App;
import React, {useState} from "react";
import WeatherBlock from "./Components/WeatherBlock"
import './Style/appStyle.scss'
import {apiKey} from './Components/API/apiKey'
import './Style/reset.scss'

function App() {

    const[arr, setArr] = useState([])
    const[city, setCity] = useState('')

    const removePost = (arrItem) => {
        setArr(arr.filter((item) => item.id !== arrItem.id  ))
    }

    async function getCity() {
        try {
            await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&lang=ru&appid=${apiKey.api}`)
            
            .then(res => res.json())
            .then(result => {
                console.log(result);
                let newAddArr = {
                    id : result.id,
                    title : result.name,
                    weatherNum : result.main.temp,
                    weatherStr: result.weather[0].description.charAt(0).toUpperCase() + result.weather[0].description.slice(1),
                    humidity : result.main.humidity,
                    icon: `http://openweathermap.org/img/w/${result.weather[0].icon}.png`
                };

            setArr([...arr, newAddArr]);
            setCity("")

            });

        } catch (error) {
            alert('Неверное название населённого пункта, попробуйте ещё раз.')
        } 
    }
    console.log(city)

    const listener = event => {
        if (event.code === "Enter" || event.code === "NumpadEnter") {
          event.preventDefault();
          getCity()
        }
      };
      

    return (
        <div className="app">
            <div className="container">
                <form className="form">
                    <input 
                        type="text" 
                        placeholder="Город" 
                        value={city}  
                        onChange={e => setCity(e.target.value)}
                        onKeyPress={listener}
                        className="form__field"
                    />
                    <button 
                        type="button" 
                        onClick={getCity} 
                        className="btn btn--primary btn--inside uppercase"
                    >Send</button>
                </form>
            <WeatherBlock className='weather-block' remove={removePost} arr={arr} />
            </div>


        </div>
        
    );
}

export default App;
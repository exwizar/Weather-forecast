import React, {useState, useEffect} from "react";
import WeatherBlock from "./Components/WeatherBlock"
import './Style/appStyle.scss'
import {apiKey} from './Components/API/apiKey'
import './Style/reset.scss'
import Modal from "./Components/Modal/Modal";


function App() {
    
    let getItems = () => {
        let list = localStorage.getItem('lists')
        console.log(list)
        if(list) {
            return JSON.parse(localStorage.getItem('lists'))
        } else {
            return []
        }
    }
    const[arr, setArr] = useState([])
    const[city, setCity] = useState('')
    const[local, setLocal] = useState(getItems())
    const [modalAcitve, setModalActive] = useState(false)


    const removePost = (arrItem) => {
        setArr(arr.filter((item) => item.id !== arrItem.id))
    }

    const listener = event => {
        if (event.code === "Enter" || event.code === "NumpadEnter") {
          event.preventDefault();
          getCity()
        }
    };

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
                    icon: `http://openweathermap.org/img/w/${result.weather[0].icon}.png`,
                    data: {
                        timezone: result.timezone,
                        dt: result.dt
                    },
                    deg: result.wind.deg,
                    speed: result.wind.speed
                };
                setArr([...arr, newAddArr]);
                // setLocal([...local, result.name])
                setCity("")
                // check repeat city 
                arr.map(item => item.id == newAddArr.id ? alert('Данные город уже есть в списке') + setCity("") : '' ) 
            });
            
        } catch (error) {
            setModalActive(true)

        } 
    }
    

    // useEffect(() => {
    //         localStorage.setItem('lists', JSON.stringify(local))
    // },[local])

    useEffect(() => {
  
    }, [])




    return (
        <div className="app">
        <Modal active={modalAcitve} setActive={setModalActive}/>
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
                    >add</button>
                </form>
                    <WeatherBlock className='weather-block' remove={removePost} arr={arr}/>
            </div>

        </div>
        
    );
}

export default App;
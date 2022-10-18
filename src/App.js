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
    const[city, setCity] = useState('')
    const[local, setLocal] = useState(getItems())
    const [modalAcitve, setModalActive] = useState(false)
    const[data, setData] = useState([])
    const[cityArr, setCityArr] = useState([])


    // remove item
    const removePost = (dataItem) => {
        setData(data.filter((item) => item.id !== dataItem.id))
    }

    //onClick on key
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
               if(cityArr.indexOf(result.name) == -1) {
                   setCityArr([...cityArr, result.name])
                   setData([...data, result])
                } else {
                   setModalActive(true)
               }
                
                // setLocal([...local, city])
                setCity("")
                // check repeat city 
            });
            
        } catch (error) {
            setModalActive(true)

        } 
    }

    console.log(cityArr)

    console.log(data)
    console.log(data.hasOwnProte);

    // useEffect(() => {
    //         localStorage.setItem('lists', JSON.stringify(local))
    // },[local])




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
                    <WeatherBlock className='weather-block' remove={removePost} data={data}/>
            </div>

        </div>
        
    );
}

export default App;
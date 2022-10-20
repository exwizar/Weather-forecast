import React, {useState, useEffect} from "react";
import WeatherBlock from "./Components/WeatherBlock"
import './Style/appStyle.scss'
import {apiKey} from './Components/API/apiKey'
import './Style/reset.scss'
import Modal from "./Components/Modal/Modal";


function App() {
    let getItems = () => {
        let list = localStorage.getItem('lists')
        if(list) {
            return JSON.parse(localStorage.getItem('lists'))
        } else {
            return []
        }
    }
    const[city, setCity] = useState('')
    const [modalAcitve, setModalActive] = useState(false)
    const[data, setData] = useState([])
    const[cityArr, setCityArr] = useState(getItems())

    // remove item
    const removePost = (dataItem) => {
        setData(data.filter((item) => item.id !== dataItem.id))
        setCityArr(cityArr.filter((item) => item !== dataItem.name))
        console.log(cityArr)
    }

    //onClick on key
    const listener = event => {
        if (event.code === "Enter" || event.code === "NumpadEnter") {
          event.preventDefault();
          getCity()
        }
    };

    async function getCity() {
        await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&lang=ru&appid=${apiKey.api}`)
        .then(res => res.json())
        .then(result => {
            if(result.main == null || result.main == undefined) {
                setCity('')
                return setModalActive(true)
            }
            console.log(result);
            if(cityArr.indexOf(result.name) == -1) {
                setCityArr([...cityArr, result.name])
                setData([...data, result])
            } else {
                setModalActive(true)
            }
            setCity("")
        });  
    }

    useEffect(() => {
            localStorage.setItem('lists', JSON.stringify(cityArr))
    },[cityArr])


    function getItemLS() {
        let m = []
        let  response = JSON.parse(localStorage.getItem('lists'))
        response.map(async (item) => {
            await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${item}&lang=ru&appid=${apiKey.api}`)
           .then(res => res.json())
           .then(result => {
               m.push(result)
           }); 
        }) 
        setData(m)
    }
    
    
    useEffect(() => {
        getItemLS()
    },[])

console.log(data)

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
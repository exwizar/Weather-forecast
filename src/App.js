import React, {useState, useEffect} from "react";
import WeatherBlock from "./Components/WeatherBlock"
import './Style/appStyle.scss'
import {apiKey} from './Components/API/apiKey'
import './Style/reset.scss'
import Modal from "./Components/ModalBlock/Modal";
import videoBg from './Style/images/clouds.mp4'
import YourCity from "./Components/YourCity";
import settings from './Style/images/settings.svg'

function App() {
    let getItems = () => {
        let list = localStorage.getItem('lists')
        if(list) {
            return JSON.parse(localStorage.getItem('lists'))
        } else {
            return []
        }
    };

    const[city, setCity] = useState('');
    const[data, setData] = useState([]);
    const[cityArr, setCityArr] = useState(getItems());
    const [modalAcitve, setModalActive] = useState(false);

    // remove item
    const removePost = (dataItem) => {
        setData(data.filter((item) => item.id !== dataItem.id))
        setCityArr(cityArr.filter((item) => item !== dataItem.name))
    }

    //onClick on key
    const listener = event => {
        if (event.code === "Enter" || event.code === "NumpadEnter") {
          event.preventDefault();
          getCity()
        }
    };
    
    function getItemLS() {
        let count = 1
        return cityArr.map(city => {
            fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&lang=ru&appid=${apiKey.api}`)
            .then(res => res.json())
            .then(result => {
                result.order = count++
                setData((data) => ([...data, result]))
            });  
        })

    };

    async function getCity() {
        await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&lang=ru&appid=${apiKey.api}`)
        .then(res => res.json())
        .then(result => {
            if (result.main == null || result.main == undefined) {
                setCity('')
                return setModalActive(true)
            }
            console.log(result);
            if (cityArr.indexOf(result.name) == -1) {
                result.order = cityArr.length + 1
                setCityArr([...cityArr, result.name])
                setData([...data, result])
            } else setModalActive(true)
            setCity("")
        });  
    };

    useEffect(() => {
        localStorage.setItem('lists', JSON.stringify(cityArr))
    },[cityArr]);


    useEffect(() => {
        getItemLS()
    },[]);
    
    return (
        <div className="app">
        <video className="video-bg" src={videoBg} autoPlay loop muted></video>
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
                    <YourCity>
                        <a>
                        <img src={settings} alt="settings"/>
                        </a>
                    </YourCity>
                    <WeatherBlock className='weather-block' remove={removePost} data={data} setData={setData}/>
            </div>
        </div>
    );
};

export default App;
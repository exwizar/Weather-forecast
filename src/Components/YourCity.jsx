import React, {useState, useEffect} from 'react'
import { apiKey } from './API/apiKey';
import TimeZone from './UI/time/TimeZone'
import WindDirection from './UI/windDirection/WindDirection';
import drop from '../Style/images/drop.svg'
import wind from '../Style/images/wind.svg'
import '../Style/menuStyle.scss'

const m = [];

const YourCity = ({children}) => {

    const [lat, setLat] = useState([]);
    const [long, setLong] = useState([]);
    const [mainCity, setMainCity] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
          navigator.geolocation.getCurrentPosition(function(position) {
            setLat(position.coords.latitude);
            setLong(position.coords.longitude);
            console.log(long)
            console.log(lat);
          });
          await fetch(`http://api.openweathermap.org/data/2.5/weather/?lat=${lat}&lon=${long}&lang=ru&units=metric&APPID=${apiKey.api}`)
          .then(res => res.json())
          .then(result => {
            if(result.cod != 400) {
              m.push(result.name)
              setMainCity(result)
            }
            console.log(result);
          })
        }
        m.map((item, index) => item == 'undefined' ? m.slice(index, 1) : item)
        setTimeout(() => {fetchData()}, 1000);
      }, [lat,long])
      


      return (
        <div className='menu'>
        {(typeof mainCity.main != 'undefined') ? (
            <div className='menu-block'>
                <div className='title-block'>
                    <p className='title'>Погода в городе {mainCity.name}</p>
                    {children}
                </div>

                <TimeZone dateInfo={mainCity.dt} time={mainCity.timezone} /> 
                
                <div className='weather-info'>
                    <p className='weather-info__num'>{Math.ceil(mainCity.main.temp)} °C </p>
                    <img src={`http://openweathermap.org/img/w/${mainCity.weather[0].icon}.png`} alt="weather" />
                </div>

                <WindDirection deg={mainCity.wind.deg} />

                <div className='wind-block'>
                    <img src={drop} className='drop' />
                    <p>{mainCity.main.humidity}%</p>
                    <img src={wind} className='drop' />
                    <p>{mainCity.wind.speed} m/s</p>
                </div>
            
            </div> 
        ): (
            <div className="circle"></div>
        )}
        </div>
      )

}

export default YourCity
export {m}
import React, { useState } from 'react'
import '../Style/weatherBlock.scss'
import TimeZone from './UI/time/TimeZone'
import '../Style/animation.scss'
import {CSSTransition,TransitionGroup,} from 'react-transition-group';
import WindDirection from './UI/windDirection/WindDirection';
import drop from '../Style/images/drop.svg'
import wind from '../Style/images/wind.svg'



const WeatherBlock = ({data, remove, setData}) => {



    let [currentCard, setCurrentCard] = useState(null)

    function dragStartHandler(e, item) {
        setCurrentCard(item)
    }

    function dragEndHandler(e) {
    }

    function dragOverHanler(e) {
        e.preventDefault()
    }

    function dropHandler(e, item) {
        e.preventDefault()
        setData(data.map(i => {
            if(i.id === item.id) {
                return {...i, order: currentCard.order}
            }
            if (i.id === currentCard.id) {
                return {...i, order: item.order}
            }
            return i
        }))
    }

    const sortCard = (a,b) => {
        if(a.order > b.order) {
            return 1
        } else {
            return -1
        }
    } 
    return (
        <div>
            <TransitionGroup>
            {data.sort(sortCard).map((item) => { if(!item.main) {return}
                return (
                    <CSSTransition           
                        key={item.id}
                        timeout={500}
                        classNames="item">
                        <div  
                            className='weather-block'
                            onDragStart={(e) => dragStartHandler(e, item)}
                            onDragLeave={(e) => dragEndHandler(e)}
                            onDragEnd={(e) => dragEndHandler(e)}
                            onDragOver={(e) => dragOverHanler(e)}
                            onDrop={(e) => dropHandler(e, item)}   
                            draggable={true} 
                        >

                            <div className='title-block'>
                                <p className='title'>Погода в городе {item.name}</p>
                                <button className='button' onClick={() => remove(item)} ></button>
                            </div>

                            <TimeZone dateInfo={item.dt} time={item.timezone} /> 
                            
                            <div className='weather-info'>
                                <p className='weather-info__num'>{Math.ceil(item.main.temp) - 273} °C </p>
                                <img src={`http://openweathermap.org/img/w/${item.weather[0].icon}.png`} alt="weather" />
                            </div>

                            <WindDirection deg={item.wind.deg} />

                            <div className='wind-block'>
                                <img src={drop} className='drop' />
                                <p>{item.main.humidity}%</p>
                                <img src={wind} className='drop' />
                                <p>{item.wind.speed} m/s</p>
                            </div>
                        </div> 
                    </CSSTransition>
                )
            })}
            </TransitionGroup>
      </div>
    )

};

export default WeatherBlock
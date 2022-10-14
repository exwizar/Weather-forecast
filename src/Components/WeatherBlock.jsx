import React from 'react'
import classes from '../Style/weatherBlock.module.scss'
import TimeZone from './TimeZone'
import '../Style/animation.scss'
import {
    CSSTransition,
    TransitionGroup,
  } from 'react-transition-group';


const WeatherBlock = ({arr, remove}) => {

    return (
        <div>
            <TransitionGroup>
            {arr.map((item) => {
                return (
                    <CSSTransition           
                    key={item.id}
                    timeout={500}
                    classNames="item">
                    <div  className={classes.weatherBlock}>

                        <p className={classes.title}>{item.title}</p>
 
                        <TimeZone data={item.data} />
                        
                        <p>{Math.ceil(item.weatherNum) - 273} °C</p>

                        <div className={classes.weatherStr}>

                            <p>{item.weatherStr}</p>

                            <img src={item.icon} alt="weather" />

                        </div>

                        <p>Влажность {item.humidity}%</p>
                        
                        <button className={classes.button} onClick={() => remove(item)} >Удалить</button>
                    </div>
                </CSSTransition>
                )
            
            })}
            </TransitionGroup>
      </div>
    )

}

export default WeatherBlock
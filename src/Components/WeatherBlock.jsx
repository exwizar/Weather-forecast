import React from 'react'
import classes from '../Style/weatherBlock.module.scss'
import TimeZone from './UI/time/TimeZone'
import '../Style/animation.scss'
import {CSSTransition,TransitionGroup,} from 'react-transition-group';
import WindDirection from './UI/windDirection/WindDirection';
import drop from '../Style/images/drop.svg'
import wind from '../Style/images/wind.svg'


const WeatherBlock = ({data, remove}) => {

    return (
        <div>
            <TransitionGroup>
            {data.map((item) => {
                return (
                    <CSSTransition           
                        key={item.id}
                        timeout={500}
                        classNames="item">
                        <div  className={classes.weatherBlock}>

                            <div className={classes.titleBlock}>

                                <p className={classes.title}>Погода в городе {item.name}</p>
                                <button className={classes.button} onClick={() => remove(item)} ></button>

                            </div>

    
                            <TimeZone dateInfo={item.dt} time={item.timezone} /> 
                            

                            <div className={classes.weatherStr}>
                                <p className={classes.weatherNum}>{Math.ceil(item.main.temp) - 273} °C </p>
                                <img src={`http://openweathermap.org/img/w/${item.weather[0].icon}.png`} alt="weather" />
                            </div>

                            <WindDirection deg={item.wind.deg} />

                            <div className={classes.infoBlock}>

                                <img src={drop} className={classes.drop} />
                                <p>{item.main.humidity}%</p>
                                <img src={wind} className={classes.drop} />
                                <p>{item.wind.speed} m/s</p>

                            </div>
                        </div>
                    </CSSTransition>
                )
            })}
            </TransitionGroup>
      </div>
    )

}

export default WeatherBlock
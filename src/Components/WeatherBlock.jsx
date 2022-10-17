import React from 'react'
import classes from '../Style/weatherBlock.module.scss'
import TimeZone from './UI/time/TimeZone'
import '../Style/animation.scss'
import {CSSTransition,TransitionGroup,} from 'react-transition-group';
import WindDirection from './UI/windDirection/WindDirection';
import drop from '../Style/images/drop.svg'
import wind from '../Style/images/wind.svg'


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

                            <div className={classes.titleBlock}>

                                <p className={classes.title}>Погода в городе {item.title}</p>
                                <button className={classes.button} onClick={() => remove(item)} ></button>

                            </div>

    
                            <TimeZone data={item.data} />
                            

                            <div className={classes.weatherStr}>
                                <p className={classes.weatherNum}>{Math.ceil(item.weatherNum) - 273} °C </p>
                                <img src={item.icon} alt="weather" />
                            </div>

                            <WindDirection deg={item.deg} />

                            <div className={classes.infoBlock}>

                                <img src={drop} className={classes.drop} />
                                <p>{item.humidity}%</p>
                                <img src={wind} className={classes.drop} />
                                <p>{item.speed} m/s</p>

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
import React from 'react'
import classes from '../Style/weatherBlock.module.scss'


const WeatherBlock = ({arr, remove}) => {

    return (
        <div>
            {arr.map((item, index) => {
                console.log(arr)
                return (
                    <div key={item.id} className={classes.weatherBlock}>
                        <p className={classes.title}>{item.title}</p>
                        <p>{Math.ceil(item.weatherNum) - 273} °C</p>
                        <div className={classes.weatherStr}>
                            <p>{item.weatherStr}</p>
                            <img src={item.icon} alt="weather" />
                        </div>
                        <p>Влажность {item.humidity}%</p>
                        <button className={classes.button} onClick={() => remove(item)} >Удалить</button>
                    </div>
                )
            
            })}
      </div>
    )

}

export default WeatherBlock
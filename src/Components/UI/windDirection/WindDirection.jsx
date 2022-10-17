import React from 'react'
import classes from './windDireciton.module.scss'
import strelka from './strelka.png'

const WindDirection = (props) => {
    let item = props.deg;

    return(
        <div className={classes.flex}>
            <img src={strelka} className={classes.strelka} style={{transform: `rotate(${item}deg)`}} />
    
            {(() => {
                switch(true) {
                case(item > 335 || item < 25) : return <p>С</p>
                case(item > 25  && item < 65) : return <p>СВ</p>
                case(item > 65  && item < 115): return <p>В</p>
                case(item > 115 && item < 155): return <p>ЮВ</p>
                case(item > 155 && item < 205): return <p>Ю</p>
                case(item > 205 && item < 245): return <p>ЮЗ</p>
                case(item > 245 && item < 295): return <p>З</p>
                case(item > 295 && item < 335): return <p>СЗ</p>
                }
            })()}
        </div>
    )

 
}

export default WindDirection
import React from 'react'

const InputPosts = ({arr}) => {

    return (
      <div>
        {arr.map((item, index) => {
          console.log(arr)
          return (
            <div key={index} className = 'weather-block'>
              <p>{item.name}</p>
              <p>{Math.ceil(item.weatherNum) - 273} °C</p>
              <p>{item.weatherStr}</p>
              <button >Удалить</button>
            </div>
          )
          
        })}
      </div>
    )

}

export default InputPosts
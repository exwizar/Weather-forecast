import React from 'react'

const InputPosts = ({arr, remove}) => {

    return (
        <div>
            {arr.map((item, index) => {
                console.log(arr)
                return (
                    <div key={item.id} className = 'weather-block'>
                    <p>{item.name}</p>
                    <p>{Math.ceil(item.weatherNum) - 273} °C</p>
                    <p>{item.weatherStr}</p>
                    <button onClick={() => remove(item)} >Удалить</button>
                    </div>
                )
            
            })}
      </div>
    )

}

export default InputPosts
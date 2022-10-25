import React from 'react'
import './modal.scss'

const Modal = ({active, setActive}) => {
  return (
    <div className={active ? 'modal active' : 'modal'} onClick={() => setActive(false)}>
        <div className={active ? 'modal__content active' : 'modal__content'} onClick={e => e.stopPropagation()}>
            <h1 className='title'>Ошибка</h1>
            <p className='about__error'>Либо этот город уже есть в списке, либо был некоректно введено название города</p>
        </div>
    </div>
  )
}

export default Modal
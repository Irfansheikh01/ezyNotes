import React from 'react'
import loading from './loading2.gif'

const Spinner = () => {
  return (
    <div className='text-center'>
      <img src={loading} alt="loading.." width='70px' height='70px'/>
    </div>
  )
}

export default Spinner

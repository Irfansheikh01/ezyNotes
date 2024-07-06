import React from 'react'

function Alert(props) {
  return (
    <div className='bg-light'style ={{height:'50px'}}>
    {props.alert && <div className={`alert alert-${props.alert.type}`} role="alert">
            {/* <strong>{props.alert.type}</strong> : {props.alert.msg} */} 
             {props.alert.msg}
            
    </div>}
    </div>
  )
}

export default Alert

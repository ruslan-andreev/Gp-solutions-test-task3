import React from 'react'

const ClearAppBtn = ({setClearApp, clearApp})=>{
    function clearApp(){
        localStorage.clear()
        setClearApp(true)
    }

    return(
        <button className='button-clear-app' onClick={clearApp}> Clear App</button>
    )
}
export default  ClearAppBtn
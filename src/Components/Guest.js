import React, { useState, useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Context from './Context'

const Guest = ({value, key, style}) =>{
    const {feedBacksCollection} = useContext(Context)
    const history = useHistory()
    const [lable, setLable] = useState(false)
    
    function formView(){
        if(feedBacksCollection.find(({name})=>name === value)){
            history.push(`feedback/${value}`, value)
        }else{
            history.push(`form/${value}`, value)
        }
    }

    function checkFeedBack(){
        if(feedBacksCollection.find(({name})=>name === value)){
            setLable(!lable)
        } 
    }

    useEffect(()=>{
        checkFeedBack()
    },[])
    
    return(
        
        <tr key={key}> 
            <td style={style} onClick={()=>formView()}>
                <span style={{color: 'green', fontWeight: 'bold' , fontSize: '20px'}}>{lable ? String.fromCharCode(10003) : ''}</span>
                {value}
            </td>
        </tr>

    )
}
export default Guest
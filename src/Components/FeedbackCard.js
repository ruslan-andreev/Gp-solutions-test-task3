import React from 'react'
import { useContext } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import Context from './Context'
import { Rate } from 'antd';



const FeedbackCard = () =>{
    const {feedBacksCollection, setFeedBackCollection} = useContext(Context)
    const history =useHistory()
    const location = useLocation()
    const guestName = location.state
    const feedBackData = feedBacksCollection.find(item => item.name === guestName)
    console.log(feedBackData)

    function deleteFeedback(){
        console.log(feedBacksCollection)
        let clearedFedbacks = feedBacksCollection.filter(item => item.name !== guestName)
        console.log(clearedFedbacks)
        localStorage.setItem('feedbacks', JSON.stringify(clearedFedbacks))
        setFeedBackCollection(JSON.parse(localStorage.getItem('feedbacks')))
        
        history.push('/')
    }
    
    return(
        <div className='container-content'>
            <div className='card'>
                <span className="card__label">name 
                <button className='button-text' onClick={()=>deleteFeedback()}>delete</button>
                </span>
                <p className={'card__field'}>{feedBackData.name}</p>
                <div className="form__stars">
                    <Rate defaultValue={4} />
                </div>
                <span className="card__label">phone</span>
                <p className={'card__field'}>{feedBackData.phone}</p>
                <span className="card__label">comment</span>
                <p className={'card__field'}>{feedBackData.text}</p>
            </div>
        </div>
    )
}
export default FeedbackCard
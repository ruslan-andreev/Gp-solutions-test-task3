import React from "react";
import { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useContext } from "react";
import Context from './Context';
import { Rate } from 'antd';


const FormEmpty =()=>{
    const history = useHistory()
    const location = useLocation()
    const value = location.state
    const authorName = value
    const {feedBacksCollection, setFeedBackCollection} = useContext(Context)
    const [form, setForm] = useState({name: authorName, phone : '', text : ''})

    const [phoneDirty, setPhoneDirty]=useState(false)
    const [commentDirty, setCommentDirty]=useState(false)
    const [phoneError, setPhoneError]=useState('Номер телефонна пуст')
    const [commentError, setCommentError]=useState('Напишите комментарий')

    const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];
    const [rate, setRate]=useState(3)
    
    const handleChange = rate => {
        setRate(rate);
      };

    
    const blurHandler=((e)=>{
        switch(e.target.name){
            case 'phone':
                setPhoneDirty(true)
                break
            case 'comment':
                setCommentDirty(true)
                break
        }
    })

    const phoneHandler=(e)=>{
        setForm({ ...form, phone:e.target.value })
    let phoneNo = /[\+]375\s[\( ]\d{2}[ \)]\s\d{3}[\- ]\d{2}[\- ]\d{2}/;
    
        if (phoneNo.test(e.target.value)) {
            setPhoneError('')
        } else {
            setPhoneError('Номер телефонна введен неверно')
        }
    }
    const commentHandler=(e)=>{
            setForm({ ...form, text:e.target.value })
        if (e.target.value.length >2)  {
            setCommentError('')
        } else {
            setCommentError('Добавьте комментарий')
        }
    }

    function handlerClickAdd(){
        feedBacksCollection.push(form)
        setFeedBackCollection(feedBacksCollection) 
        localStorage.setItem('feedbacks', JSON.stringify(feedBacksCollection))
        history.push('/')
    }
    function handlerClickCancel(){
        history.push('/')
    }
    
    return(
        <div className="container-content">
        <form className="form" onSubmit={(event)=>event.preventDefault()}>
            <p className="name__label">Name</p>
            <h2 className="form__user-name">{value}</h2>
            <div className="form__stars">
                 <Rate tooltips={desc} defaultValue={3} onChange={(rate)=>handleChange(rate)} rate={rate} />
            </div>          
            <div className="phone-field">
                <label className="phone-field__label"> Phone:
                {phoneDirty && phoneError && <div className="error" style={{color:'red'}}>{phoneError}</div>}
                    <input 
                    type="phone"
                    name='phone'
                    placeholder="+375 (66) 666-66-66"
                    value={form.phone} 
                    onChange={e=>phoneHandler(e)}
                    onBlur={e=>blurHandler(e)}
                    className="phone-field__input"
                    />
                </label>
            </div>
            <div className="text-field">
                <label className="text-field__label"> Comment:
                {commentDirty && commentError && <div className="error" style={{color:'red'}}>{commentError}</div>}
                    <textarea 
                    type="textarea"
                    name="text"
                    value={form.text} 
                    onChange={e=>commentHandler(e)}
                    onBlur={e=>blurHandler(e)} 
                    className="text-field__input"
                    />
                </label>
            </div>
            {(form.phone.length > 6 && form.text.length > 0) ? 
                <button className="button-form" type="button" onClick={()=>handlerClickAdd()}>Save</button> :
                <button className="button-form" type="button" onClick={()=>handlerClickCancel()}>Cancel</button>}
        </form>
        </div>
    )
}
export default FormEmpty
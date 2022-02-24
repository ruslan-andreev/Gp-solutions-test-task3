import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import FormEmpty from './Components/FormEmpty';
import FeedbackCard from './Components/FeedbackCard';
import TableGuests from './Components/TableGuests';
import Context from './Components/Context'
import ClearAppBtn from './Components/ClearAppBtn';
import LoadingPage from './Components/LoadingPage'
import Header from './Components/Header';
import Footer from './Components/Footer';


function App() {

  const apiUrlGetGuests = 'https://gp-js-test.herokuapp.com/pizza/guests';
  const [guests, setGuests] = useState(JSON.parse(localStorage.getItem("guests") || "[]"));
  const [guestEatPizza, setGuestEatPizza] = useState({})
  const [vegans, setVegans] = useState(JSON.parse(localStorage.getItem("vegans") || "[]"));
  const [loading, setLoading] = useState(true);
  const [clearApp, setClearApp] = useState(false)
  const [feedBacksCollection, setFeedBackCollection] = useState(JSON.parse(localStorage.getItem('feedbacks')) || [])

  const loadGuests = async()=>{
    const response = await fetch(apiUrlGetGuests);
    const data = await response.json()
  
    if (data) {
      const guestFilterData = data.party.filter(({ eatsPizza }) => eatsPizza === true )
     setGuests(data.party);
     setGuestEatPizza(guestFilterData)
     localStorage.setItem('guests', JSON.stringify(data.party) || '[]')
     return getGuestLink(guestFilterData);
   }
 }
  const getGuestLink = (guestFilterData) => {
    let link = guestFilterData.map(({ name })=> name).toString().replace(/ /ig, '%20')
    return `https://gp-js-test.herokuapp.com/pizza/world-diets-book/${link}`
  }

  const loadVegans = async(urlGuest) => {   
    const response = await fetch(urlGuest);
    const data = await response.json()
      if (data) {
        setVegans(data.diet.filter(({ isVegan })=> isVegan === true))
        localStorage.setItem('vegans', JSON.stringify(data.diet.filter(({ isVegan })=> isVegan === true)))
        } 
  }

  useEffect(() => { 
    if(!localStorage.getItem('guests')){
      setLoading(false)
      loadGuests().then(URl => {
        if(URl) {
          loadVegans(URl).then(
            setLoading(true)
          )
        }
       })
    } 
    setClearApp(false)
  }, [clearApp])

  useEffect(() => { 
    if(!localStorage.getItem('guests')){
      setLoading(false)
      loadGuests().then(URl => {
        if(URl) {
          loadVegans(URl).then(
            setLoading(true)
          )
        }
       })
    } 
  }, [])   


  return (
    
    <div className="App">

      <BrowserRouter>
      <Context.Provider value={{feedBacksCollection, setFeedBackCollection}}>
        <Header />
        <Switch>
          {loading ? 
          <Route exact path='/'>
            <TableGuests 
              guests = {guests}
              vegans = {vegans}
            /> 
            <ClearAppBtn 
              clearApp = {clearApp}
              setClearApp = {setClearApp}
            />
          </Route> : 
          <LoadingPage />
        }
          
          <Route path='/form/:name'>
            <FormEmpty />
          </Route>
          <Route  path='/feedback/:name'>
            <FeedbackCard  />
          </Route>
        </Switch>
      <Footer />  
      </Context.Provider>
      </BrowserRouter>  
    </div>
  );
}

export default App;

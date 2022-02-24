import React from "react";
import Guest from './Guest'

 function TableGuests ({guests, vegans}){

    const guestGray = Object.values(guests).filter(value=>value.eatsPizza===false)
    const blueGuest= Object.values(guests).filter(value=>value.eatsPizza===true)
    const result = {};
    const blueGuestsFilter = (blueGuest, vegans) => {
        for (let prop in blueGuest) {
            if (!vegans.hasOwnProperty(prop)) result[prop] = blueGuest[prop];
        }
        return result;
    }
    blueGuestsFilter(blueGuest, vegans)

    let blue =Object.values(result).map(item=> item.name)


    return(
        <div className="container-content">
        <table className="table_wrapper">
        <tbody>
            <tr>
                <td><h2>Table of Guests</h2></td>
            </tr>

            {Object.values(vegans).map((value, index)=>
                <Guest 
                key={index}
                value={value.name}
                style={{color:'green'}}
                /> 
            )}

            {Object.values(guestGray).map((value, index)=>
                <Guest 
                 key={index}
                 value={value.name}
                 style={{color:'gray'}}
                 />
            )}          

            {Object.values(blue).map((value, index)=>
                <Guest 
                    key={index}
                    value={value}
                    style={{color:'blue'}}
                />
            )}  
           
            </tbody>
        </table>
        
        </div>
    )

 }
 export default TableGuests
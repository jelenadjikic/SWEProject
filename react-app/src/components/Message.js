import React from 'react'
import FlashMessage  from 'react-flash-message'

export default function Message() {
    return (
       
             <FlashMessage duration={ 4000 }  > 
                    <h4> You've successfully signed up. Now you can login! </h4>
             </FlashMessage> 
        
    )
}

import React, { PureComponent } from 'react'

export default class PageNotFound extends PureComponent {
    render() {
        return (
            <div className='page-not-found'>
               <h1> Sorry, but this page does not exist.</h1>
               <p>Check your URL and try again</p> 
            </div>
        )
    }
}

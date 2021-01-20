import React from 'react'
import Reciver from '../Recive/Reciver'
import Sender from '../Send/Sender'

function Landing() {

    return (
        <div className="App">
            <header className="App-header">
                <Sender />
                <Reciver />
            </header>
        </div>
    )
}

export default Landing

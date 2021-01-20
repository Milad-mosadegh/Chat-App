import React, { useEffect, useState } from 'react'
// import Fade from 'react-reveal/Fade';

import axios from 'axios'
import { useHistory } from 'react-router-dom'

function Reciver() {
    let history = useHistory()

    const [state, setState] = useState({
        message: "",
        data: {}
    })
    const [message, setMessage] = useState({
        msg: []
    })

    useEffect(() => {
        axios({
            method: "GET",
            url: "/users/recive"
        }).then(res => {
            setMessage({ msg: res.data })
            console.log(message.msg);
        }).catch(err => console.log(err))

        console.log("message", message);
    }, [])

    return (
        <div>
            <div className="con">
                <div className="inMessage">
                    <div >
                        {message.msg.map((res, index) => <div key={index + 1}>
                            {/* <Fade right> */}
                            <div className="reciver">
                                <p className="reciverBox">{res.first}</p>
                            </div>
                            {/* </Fade> */}
                            {/* <Fade left> */}
                            <div className="sender">
                                <p className="senderBox">{res.second}</p>
                            </div>
                            {/* </Fade> */}
                        </div>)}
                    </div>
                </div>
                <div className="sendMessage">
                    <form onSubmit={async (e) => {
                        e.preventDefault();
                        await axios({
                            method: "POST",
                            url: "/users/send",
                            data: state.data
                        }).then(response => {
                            console.log("POST", response.data.result)
                            setState({ message: "" })
                            history.push('/')
                        }).catch(err => console.log(err))



                        await axios({
                            method: "GET",
                            url: "/users/recive"
                        }).then(res => {
                            setMessage({ msg: res.data })
                            console.log(res.data);
                        }).catch(err => console.log(err))
                        history.push('/')

                        console.log("message", message);
                    }}>
                        <input value={state.message} placeholder="Person Tow" name="second" onChange={(e) => setState({ ...state.data, data: { [e.target.name]: e.target.value } })} />
                        <button>Send</button>
                    </form>
                </div>
            </div>
        </div >
    )
}

export default Reciver;

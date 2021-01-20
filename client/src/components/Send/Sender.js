import React, { useEffect, useState } from 'react'
import './style.css'
// import Fade from 'react-reveal/Fade';
import axios from 'axios'
import { useHistory } from 'react-router-dom'




function Sender() {
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
            console.log(res.data);
        }).catch(err => console.log(err))
    }, [])

    return (
        <div>
            <div className="con">
                <div className="inMessage">
                    <div className="com">
                        {message.msg.map((res, index) => <div key={index + 1}>
                            {/* <Fade right> */}
                            <div className="sender">
                                <p className="senderBox">{res.first}</p>
                            </div>
                            {/* </Fade> */}
                            {/* <Fade left> */}
                            <div className="reciver">
                                <p className="reciverBox">{res.second}</p>
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
                            setState({ message: "" })
                            history.push('/')

                        }).catch(err => console.log(err))

                        await axios({
                            method: "GET",
                            url: "/users/recive"
                        }).then(res => {
                            setMessage({ msg: res.data })
                            console.log("From Inner Axios", res.data);
                        }).catch(err => console.log(err))
                        history.push('/')
                    }}>
                        <input value={state.message} placeholder="Person One" name="first" onChange={(e) => setState({ ...state.data, data: { [e.target.name]: e.target.value } })} />
                        <button>Send</button>
                    </form>
                </div>
            </div>
        </div >
    )
}

export default Sender

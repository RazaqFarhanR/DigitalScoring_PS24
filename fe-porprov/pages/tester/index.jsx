import axios from 'axios';
import React, { useEffect } from 'react'
import { useSocket } from '../../context/socketContext';

const index = () => {
    const socket = useSocket();

    const buttonHand = () => {
        socket.emit('ping')
        axios.post("http://localhost:9001/api/ping")
        .then(res =>{
        }).catch (err => {
            console.log(err.response.data.message);
        })
    }

    useEffect(() => {
        socket.on('ping', data => {
            console.log(data.data.id);
        })
        // socket.emit('ping')
        
        return () => {
        
        }
    }, [])
    
    return (
        <div>
            <button onClick={() => buttonHand()}>
                click
            </button>
        </div>
    )
}

export default index
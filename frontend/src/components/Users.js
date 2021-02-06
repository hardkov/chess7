import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CircularProgress from "@material-ui/core/CircularProgress"

export default function Users(props){
    const [userList, setUserList] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    
    const fetchUsers = async () => {
        let token = localStorage.getItem("TOKEN");
        let response;

        try {
            response =  await axios.get(
                'http://localhost:5000/user/list',
                {headers: {Authorization: "Bearer " + token}}
            )
            setIsFetching(false);
        } catch(err) {
            console.log("Users fetch ", err);
            setIsFetching(false);
            return;
        }

        setUserList(response.data.userList);
    }
        
    useEffect(() => {
        setIsFetching(true);
        fetchUsers()
    }, []); 

    let rows = userList.map((user) => <tr key={user.id}><td>{user.username}</td></tr>);

    return (
        <div>
            { 
                isFetching ?

                <CircularProgress /> :

                <table>
                    <tbody>          
                        <tr>
                        <th> Users </th>
                        </tr>
                        {rows}
                    </tbody>
                </table>
            }
        </div>
    )
}


import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Users(props){
    
    const [userList, setUserList] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            let token = localStorage.getItem("TOKEN");
            let response;
    
            try {
                response =  await axios.get(
                    'http://localhost:5000/user/list',
                    {headers: {Authorization: "Bearer " + token}}
                )
            } catch(err) {
                console.log("Users fetch ", err);
                setUserList([]);
                return;
            }
    
            setUserList(response.data.userList);
        }

        fetchUsers()
    }, []); 

    let rows = userList.map((user) => <tr key={user.id}><td>{user.username}</td></tr>);

    return (
        <div>
        <table>
            <tbody>          
                <tr>
                <th> Users </th>
                </tr>
                {rows}
            </tbody>
        </table>
        </div>
    )
}


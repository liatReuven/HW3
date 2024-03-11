import React, { useEffect, useState } from 'react'
import ProfileAdmin from './ProfileAdmin'

export default function SystemAdmin(props) {
    const [users, setUsers] = useState([]); // State that holds the users in admin page

    // When component did mount, fetch users from local storage
    useEffect(() => {
        const storedUsers = JSON.parse(localStorage.getItem("users")) || []; // Parse the users from local storage
        setUsers(storedUsers); // Set the users state
    }, []);

    // Function to delete a user
    const deleteUser = (email) => {
        const updatedUsers = users.filter((user) => user.email !== email); // Filter out the user to be deleted
        setUsers(updatedUsers); // Update the users state

        props.SendToParent(email);
    };

    return (
        <div>
            <div className="cards-admin-display">
                <div className="cards-wrapper">
                    {users.length === 0 ? (
                        <p style={{ fontSize: "70px" , margin: '100px'}}> No Users</p>
                ) : (
                        users.map((user, index) => (
                <ProfileAdmin
                    key={index}
                    firstName={user.firstName}
                    lastName={user.lastName}
                    email={user.email}
                    selectedCity={user.selectedCity}
                    street={user.street}
                    numberInput={user.numberInput}
                    dob={user.dob}
                    Delete={deleteUser} // Pass the delete function to FCProfileAdmin
                />
                ))
                    )}
            </div>
        </div>
        </div >
    )
}

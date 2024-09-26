import React from "react";
import "./UsersList.css"
import UserItem from "./UserItem"
import Card from "../../shared/components/UIElements/Card"
const UsersList = (props) => {
    console.log(props.items.length);
    return (
        <>
            {props.items.length === 0
            ? <Card><div>No users</div></Card>
            : (
                <ul className="users-list">
                    {props.items.map(user => (
                        <UserItem key={user.id} id={user.id} imageUrl={user.image} name={user.name} placeCount={user.places.length} />
                    ))}
                </ul>
            )
            }
        </>
    )
   
}

export default UsersList;
import React, { Fragment, useEffect, useState } from "react";

// type Props = {}
interface UserProps {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
}

export default function Users() {
    const [users, setUsers] = useState<UserProps[]>([]);

    useEffect(() => {
        const getUsers = async () => {
            try {
                const response = await fetch("http://localhost:8083/api/users");
                const data = await response.json();
                setUsers(data);
            } catch (err) {
                console.error("Error catching data ", err);
            }
        };
        getUsers();
    }, []);
    console.log(users);
    return (
        <Fragment>
            <table className="table">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.username}</td>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Fragment>
    );
}

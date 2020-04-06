import React from 'react';
import { Link } from 'react-router-dom';

export const UserLink = ({ user, createdAt }) => {
    return (
        <span>
            Written by: <Link to={`/profile/${user}`}>{user}</Link> @ {createdAt}
        </span>
    )
}

import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';

export const Favourite = ({
    userId,
    favourites,
    onFavourite,
    onUnfavourite
}) => {

    const isFavourite = (favourite, index) => {
        console.log(userId, favourite.author)
        if (userId === favourite.author) {
            return <FontAwesomeIcon
                key={index}
                icon={faHeartSolid}
                style={{ cursor: 'pointer', color: '#ff4f4f' }}
                onClick={() => onUnfavourite()}
            />
        }
        return <FontAwesomeIcon
            key={index}
            icon={faHeartRegular}
            style={{ cursor: 'pointer' }}
            onClick={() => onFavourite()}
        />
    }

    return (
        <>
            {
                favourites.length
                    ? favourites.map(
                        (favourite, index) => isFavourite(favourite, index))
                    : <FontAwesomeIcon
                        icon={faHeartRegular}
                        style={{ cursor: 'pointer' }}
                        onClick={() => onFavourite()} />
            }
        </>
    )
}

import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, Row, Col } from 'react-bootstrap';
import API from '../../../utils/API';
import { FeedReview } from '../Feed/FeedReview';

export const ProfileUser = ({ match }) => {
    const [userProfile, setUserProfile] = useState({
        bio: '',
        img: '',
        experience: '',
        reviews: [],
        favourites: [],
        comments: [],
        _id: '',
        username: '',
        email: '',
        password: '',
        createdAt: '',
        _v: ''
    });

    const descReviews = React.useMemo(() => {
        return userProfile.reviews.slice(0).reverse();
    }, [userProfile.reviews]);

    const loadUser = async () => {
        const response = await API.user.getUserProfile(match.params.user);
        console.log(response)
        response.password = '';
        setUserProfile(response);
    }

    useEffect(() => {
        loadUser();
    }, []);

    return (
        <>
            <Container style={{ backgroundColor: '#00346e' }} className='text-center' fluid>
                <Row noGutters>
                    <Col style={{
                        height: '20vh',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <h2 className='my-auto'>{userProfile.username}'s Profile Page!</h2>
                    </Col>
                </Row>
                <Row noGutters>
                    <Col>
                        <img
                            src={userProfile.img}
                            alt='user-profile'
                            className='mb-3'
                        />
                    </Col>
                </Row>
                <Row noGutters>
                    <Col>
                        <Jumbotron style={{ backgroundColor: '#002857' }} fluid>
                            <h2>Total Reviews: {userProfile.reviews.length}</h2>
                        </Jumbotron>
                    </Col>
                </Row>
                <Row noGutters>
                    <Col>
                        <h3>About Me:</h3>
                        <p>{userProfile.bio}</p>
                    </Col>
                </Row>
            </Container>
            <Container style={{ backgroundColor: '#00346e' }} fluid>
                <Row>
                    <Col
                        style={{
                            height: '20vh',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                        className='text-center'>
                        <h2>{userProfile.username}'s Reviews</h2>
                    </Col>
                </Row>
                {descReviews.map((review, index) =>
                    <FeedReview loadProfileUser={loadUser} review={review} key={index} />
                )}
            </Container>
        </>
    )
}

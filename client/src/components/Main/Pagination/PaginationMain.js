import React from 'react'
import { Row, Col, Pagination } from 'react-bootstrap';

export const PaginationMain = ({ activePage, totalReviews, handleClickedPage }) => {
    const totalNumberOfPages = Math.ceil(totalReviews.length / 10);

    let items = [];
    for (let number = 1; number <= totalNumberOfPages; number++) {
        items.push(
            <Pagination.Item
                key={number}
                active={number === activePage}
                onClick={() => handleClickedPage(number)}>
                {number}
            </Pagination.Item>,
        );
    }

    return (
        <Row>
            <Col>
                <Pagination>{items}</Pagination>
            </Col>
        </Row>
    )
}

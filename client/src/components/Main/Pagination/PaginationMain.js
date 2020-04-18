import React from 'react'
import { Row, Col, Pagination } from 'react-bootstrap';

export const PaginationMain = () => {
    let active = 1;
    let items = [];
    for (let number = 1; number <= 5; number++) {
        items.push(
            <Pagination.Item key={number} active={number === active}>
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

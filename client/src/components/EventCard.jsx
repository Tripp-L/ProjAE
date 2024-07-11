import React from 'react';
import { Card, Col } from 'react-bootstrap';

const EventCard = ({ event }) => (
    <Col key={event.id} xs={12} sm={6} md={4} lg={3} className="mb-4 col-custom">
        <Card className="mb-3 card-custom">
            <Card.Img variant="top" src={event.imageurl} className="card-img-top" />
            <Card.Body>
                <Card.Title>{event.name}</Card.Title>
                <Card.Text>{event.details}</Card.Text>
            </Card.Body>
        </Card>
    </Col>
);

export default EventCard;

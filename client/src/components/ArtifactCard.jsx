import React from 'react';
import { Card, Col } from 'react-bootstrap';

const ArtifactCard = ({ artifact }) => (
    <Col key={artifact.id} xs={12} sm={6} md={4} lg={3} className="mb-4 col-custom">
        <Card className="mb-3 card-custom">
            <Card.Img variant="top" src={artifact.imageurl} className="card-img-top" />
            <Card.Body>
                <Card.Title>{artifact.name}</Card.Title>
                <Card.Text>{artifact.description}</Card.Text>
            </Card.Body>
        </Card>
    </Col>
);

export default ArtifactCard;

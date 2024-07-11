import React from 'react';
import TimelineComponent from './Timeline';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import './Home.css';

function Home({ onLogout, searchResults }) {
  return (
    <div className="home-container">
      <h1>Welcome To Ancient Echoes: The Digital Epic of History</h1>
      <p>Explore the wonders of ancient civilizations!</p>
      {searchResults.length > 0 ? (
        <Container className="container-custom">
          <Row className="mt-4 row-custom">
            {searchResults.map((item, index) => (
              <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-4 col-custom">
                <Card className="mb-3 card-custom">
                  {item.type === 'civilization' && <Card.Img variant="top" src={item.imageurl} className="card-img-top" />}
                  {item.type === 'artifact' && <Card.Img variant="top" src={item.imageurl} className="card-img-top" />}
                  {item.type === 'event' && <Card.Img variant="top" src={item.imageurl} className="card-img-top" />}
                  {item.type === 'book' && <Card.Img variant="top" src={item.image} className="card-img-top" />}
                  <Card.Body>
                    <Card.Title>{item.name || item.title}</Card.Title>
                    <Card.Text>{item.description || item.author || item.dates || item.date}</Card.Text>
                    {item.link && <Button variant="primary" href={item.link} target="_blank" rel="noopener noreferrer">Buy Here!</Button>}
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      ) : (
        <TimelineComponent />
      )}
    </div>
  );
}

export default Home;

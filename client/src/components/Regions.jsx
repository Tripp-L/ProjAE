import React, { useState } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useFavorites } from '../contexts/FavoriteContext';
import './Regions.css';

const initialRegions = [
    // Your region data
];

const Regions = () => {
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const [regions, setRegions] = useState(initialRegions);
  const [expandedRegionId, setExpandedRegionId] = useState(null);

  const handleExpand = (id) => {
      if (expandedRegionId === id) {
          setExpandedRegionId(null);
      } else {
          setExpandedRegionId(id);
      }
  };

  const isFavorite = (id) => favorites.some(item => item.id === id);

  return (
      <Container className="container-custom">
          <Row className="mt-4 row-custom">
              {regions.map(region => (
                  <Col key={region.id} xs={12} sm={6} md={4} lg={3} className="mb-4 col-custom">
                      <Card
                          className={`mb-3 card-custom ${expandedRegionId === region.id ? 'expanded' : ''}`}
                          onClick={() => handleExpand(region.id)}
                      >
                          <Card.Img variant="top" src={region.imageurl} className="card-img-top" />
                          <Card.Body>
                              <Card.Title>{region.name}</Card.Title>
                              <Card.Text>{region.coordinates}</Card.Text>
                              {expandedRegionId === region.id && (
                                  <div className="expanded-content">
                                      <Card.Text>{region.description}</Card.Text>
                                      <div className="mb-3">
                                          <h5>Details:</h5>
                                          <p>{region.details}</p>
                                          <div className="links-container">
                                              <Link to={`/events`}>Events</Link>
                                              <span> | </span>
                                              <Link to={`/artifacts`}>Artifacts</Link>
                                              <span> | </span>
                                              <Link to={`/regions/${region.id}`}>Regions</Link>
                                          </div>
                                          <button
                                              onClick={(e) => {
                                                  e.stopPropagation();
                                                  isFavorite(region.id) ? removeFavorite(region.id) : addFavorite({ ...region, type: 'regions' });
                                              }}
                                          >
                                              {isFavorite(region.id) ? 'Unsave' : 'Save'}
                                          </button>
                                      </div>
                                  </div>
                              )}
                          </Card.Body>
                      </Card>
                  </Col>
              ))}
          </Row>
      </Container>
  );
};

export default Regions;


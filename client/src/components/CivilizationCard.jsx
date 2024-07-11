import React from 'react';
import { Card, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import YouTube from 'react-youtube';

const CivilizationCard = ({ civilization, expandedCivilizationId, handleExpand, isFavorite, removeFavorite, addFavorite }) => {
    const videoOptions = {
        height: '180',
        width: '100%',
        playerVars: {
            autoplay: 0,
        },
    };

    return (
        <Col key={civilization.id} xs={12} sm={6} md={4} lg={3} className="mb-4 col-custom">
            <Card
                className={`mb-3 card-custom ${expandedCivilizationId === civilization.id ? 'expanded' : ''}`}
                onClick={() => handleExpand(civilization.id, civilization.books)}
            >
                {expandedCivilizationId === civilization.id ? (
                    <YouTube videoId={civilization.videoUrl} opts={videoOptions} className="youtube-video" />
                ) : (
                    <Card.Img variant="top" src={civilization.imageurl} className="card-img-top" />
                )}
                <Card.Body>
                    <Card.Title>{civilization.name}</Card.Title>
                    <Card.Text>{civilization.dates}</Card.Text>
                    {expandedCivilizationId === civilization.id && (
                        <div className="expanded-content">
                            <Card.Text>{civilization.description}</Card.Text>
                            <div className="mb-3">
                                <h5>Leaders:</h5>
                                <ul>
                                    {(civilization.leaders || []).map(leader => (
                                        <li key={leader.name}>
                                            <strong>{leader.name}</strong> - {leader.title}
                                        </li>
                                    ))}
                                </ul>
                                <h5>Deities:</h5>
                                <ul>
                                    {(civilization.deities || []).map(deity => (
                                        <li key={deity.name}>
                                            <strong>{deity.name}</strong> - {deity.description}
                                        </li>
                                    ))}
                                </ul>
                                <div className="links-container">
                                    <Link to={`/events`}>Events</Link>
                                    <span> | </span>
                                    <Link to={`/artifacts`}>Artifacts</Link>
                                    <span> | </span>
                                    <Link to={`/regions/${civilization.id}`}>Regions</Link>
                                </div>
                            </div>
                        </div>
                    )}
                    <Link
                        to="#"
                        onClick={(e) => {
                            e.stopPropagation();
                            isFavorite(civilization.id)
                                ? removeFavorite(civilization.id, 'civilizations')
                                : addFavorite(civilization, 'civilizations');
                        }}
                        className="favorite-link"
                    >
                        {isFavorite(civilization.id) ? 'Remove from Favorites' : 'Add to Favorites'}
                    </Link>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default CivilizationCard;

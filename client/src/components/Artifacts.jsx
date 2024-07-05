import React, { useState } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useFavorites } from '../contexts/FavoriteContext';
import './Artifacts.css';

const initialArtifacts = [
    {
        id: 1,
        name: "Terracotta Army",
        description: "A collection of terracotta sculptures depicting the armies of Qin Shi Huang, the first Emperor of China.",
        imageurl: "https://assets.editorial.aetnd.com/uploads/2014/03/gettyimages-1236172686.jpg",
        civilization: "Ancient China",
        discovery_date: "1974",
        location: "Shaanxi, China"
    },
    {
        id: 2,
        name: "Standard of Ur",
        description: "A wooden box inlaid with shell, lapis lazuli, and red limestone, depicting scenes of war and peace.",
        imageurl: "https://cdn.kastatic.org/ka-content-images/0e6c402af2d565815af848737bf663c799daae88.jpg",
        discovery_date: "1927-1928",
        location: "Royal Cemetery of Ur, Iraq"
    },
    {
        id: 3,
        name: "Mask of Tutankhamun",
        description: "A gold mask discovered in the tomb of the young pharaoh Tutankhamun.",
        imageurl: "https://egyptianmuseumcairo.eg/wp-content/uploads/2021/06/Tutankhamon-funerary-mask.jpg",
        civilization: "Ancient Egypt",
        discovery_date: "1925",
        location: "Valley of the Kings, Egypt"
    },
    {
        id: 4,
        name: "Venus de Milo",
        description: "A Hellenistic statue of the goddess Aphrodite (Venus in Roman mythology).",
        imageurl: "https://greekreporter.com/wp-content/uploads/2018/06/Venus-de-Milo-ancient-sculpture-credit-Bradley-N-Weber-CC2.jpg",
        civilization: "Ancient Greece",
        discovery_date: "1820",
        location: "Island of Milos, Greece"
    },
    {
        id: 5,
        name: "Coyolxauhqui Stone",
        description: "A massive stone sculpture depicting the dismembered body of the moon goddess Coyolxauhqui.",
        imageurl: "https://i0.wp.com/arthistorywithalder.com/wp-content/uploads/2021/04/Coyolxauhqui_4095977415_b89d64f008-2.jpg?resize=482%2C482&ssl=1",
        civilization: "Aztec",
        discovery_date: "1978",
        location: "Templo Mayor, Mexico City, Mexico"
    },
    {
        id: 6,
        name: "Priest-King Sculpture",
        description: "A soapstone sculpture depicting a bearded figure adorned with jewelry and a headband.",
        imageurl: "https://t4.ftcdn.net/jpg/02/87/58/75/360_F_287587553_ARtpLHaD7mHYGRD6nbkvPKzKjmnsdwwd.webp",
        civilization: "Indus Valley",
        discovery_date: "1927",
        location: "Mohenjo-daro, Pakistan"
    },
    {
        id: 7,
        name: "Jade Head of the Maya Maize God",
        description: "A carved jade head depicting the Maya maize god, a symbol of fertility and abundance.",
        imageurl: "https://www.worldhistory.org/uploads/images/16234.png",
        civilization: "Maya",
        discovery_date: "1984",
        location: "Temple of the Inscriptions, Palenque, Mexico"
    },
    {
        id: 8,
        name: "Phaistos Disc",
        description: "A clay disc with stamped symbols, its purpose and meaning remain a mystery.",
        imageurl: "https://greekreporter.com/wp-content/uploads/2018/02/Phaistos-Disc-Credit-cc-by-sa-4.0-c-messier.jpg",
        civilization: "Minoan",
        discovery_date: "1908",
        location: "Phaistos Palace, Crete, Greece"
    },
    
];

const Artifacts = () => {
    const { favorites, addFavorite, removeFavorite } = useFavorites();
    const [artifacts, setArtifacts] = useState(initialArtifacts);
    const [expandedArtifactId, setExpandedArtifactId] = useState(null);

    const handleExpand = (id) => {
        if (expandedArtifactId === id) {
            setExpandedArtifactId(null);
        } else {
            setExpandedArtifactId(id);
        }
    };

    const isFavorite = (id) => favorites.artifacts.some(item => item.id === id);

    return (
        <Container className="container-custom">
            <Row className="mt-4 row-custom">
                {artifacts.map(artifact => (
                    <Col key={artifact.id} xs={12} sm={6} md={4} lg={3} className="mb-4 col-custom">
                        <Card
                            className={`mb-3 card-custom ${expandedArtifactId === artifact.id ? 'expanded' : ''}`}
                            onClick={() => handleExpand(artifact.id)}
                        >
                            <Card.Img variant="top" src={artifact.imageurl} className="card-img-top" />
                            <Card.Body>
                                <Card.Title>{artifact.name}</Card.Title>
                                <Card.Text>{artifact.dates}</Card.Text>
                                {expandedArtifactId === artifact.id && (
                                    <div className="expanded-content">
                                        <Card.Text>{artifact.description}</Card.Text>
                                        <div className="mb-3">
                                            <h5>Civilization:</h5>
                                            <p>{artifact.civilization}</p>
                                            <h5>Details:</h5>
                                            <p>{artifact.details}</p>
                                            <div className="links-container">
                                                <Link to={`/events`}>Events</Link>
                                                <span> | </span>
                                                <Link to={`/artifacts`}>Artifacts</Link>
                                                <span> | </span>
                                                <Link to={`/regions/${artifact.id}`}>Regions</Link>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <Link
                                    to="#"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        isFavorite(artifact.id)
                                            ? removeFavorite(artifact.id, 'artifacts')
                                            : addFavorite(artifact, 'artifacts');
                                    }}
                                    className="favorite-link"
                                >
                                    {isFavorite(artifact.id) ? 'Remove from Favorites' : 'Add to Favorites'}
                                </Link>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Artifacts;
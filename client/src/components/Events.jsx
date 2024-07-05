import React, { useState } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useFavorites } from '../contexts/FavoriteContext';
import './Events.css';

const initialEvents = [
    {
        id: 1,
        name: "Battle of Thermopylae",
        description: "A famous battle in 480 BC during the Greco-Persian Wars where 300 Spartans and their allies made a heroic stand against a much larger Persian army.",
        imageurl: "https://i.natgeofe.com/n/54dc5398-d8f5-482d-81da-43ff8f78832f/RSThermopylae7_4x3.jpg",
        date: "480 BC",
        civilization: "Ancient Greece",
        details: "The battle was part of the second Persian invasion of Greece and has become a symbol of courage against overwhelming odds."
    },
    {
        id: 2,
        name: "Battle of Marathon",
        description: "A decisive battle in 490 BC where the Athenians defeated the Persians, marking a turning point in the Greco-Persian Wars.",
        imageurl: "https://i.natgeofe.com/n/4fb4b638-3c21-4af1-9c3c-b82854b0ec00/roman-sarcophagus-persians-flee_16x9.jpg",
        date: "490 BC",
        civilization: "Ancient Greece",
        details: "The Athenian victory was crucial in preserving Greek independence and culture."
    },
    {
        id: 3,
        name: "Fall of the Western Roman Empire",
        description: "The collapse of the Western Roman Empire in 476 AD, leading to the end of ancient Rome and the beginning of the Middle Ages.",
        imageurl: "https://assets.editorial.aetnd.com/uploads/2014/01/gettyimages-802428712.jpg",
        date: "476 AD",
        civilization: "Roman Empire",
        details: "The fall of Rome marked the transition from classical antiquity to the medieval period in Europe."
    },
    {
        id: 4,
        name: "Warring States Period",
        description: "A period of intense political and military conflict among seven major Chinese states vying for dominance.",
        imageurl: "https://cf.geekdo-images.com/8pa0aykUKcn-uJGvTeOy8A__itemrep/img/GO0w7qKfl4CBNAFpGjysF8FUu38=/fit-in/246x300/filters:strip_icc()/pic5027104.jpg",
        date: "475-221 BC",
        civilization: "Ancient China",
        details: "This era saw significant advancements in philosophy, military strategy, and technology, ultimately leading to the unification of China under the Qin dynasty."
    },
    {
        id: 5,
        name: "Rise of the Akkadian Empire",
        description: "Sargon of Akkad conquered Sumerian city-states, establishing the first known empire in history.",
        imageurl: "https://cdn.thecollector.com/wp-content/uploads/2023/09/akkadian-empire-rise-fall-768x442.jpg",
        date: "c. 2334-2279 BC",
        civilization: "Mesopotamia",
        details: "The Akkadian Empire unified the region under a single ruler, marking a significant shift in political organization and control."
    },
    {
        id: 6,
        name: "Peloponnesian War",
        description: "A protracted conflict between the Peloponnesian League (led by Sparta) and the Delian League (led by Athens).",
        imageurl: "https://images.nationalgeographic.org/image/upload/v1638891964/EducationHub/photos/peloponnesian-war.jpg",
        date: "431-404 BC",
        civilization: "Ancient Greece",
        details: "This war reshaped the ancient Greek world, weakening Athens and paving the way for Macedonian dominance."
    },
    {
        id: 7,
        name: "Spanish Conquest of the Aztec Empire",
        description: "Hernán Cortés and his Spanish conquistadors, aided by indigenous allies, conquered the Aztec Empire.",
        imageurl: "https://i.natgeofe.com/n/b0debc40-a0eb-440c-8b81-40f871e53250/spanish-siege.jpg",
        date: "1519-1521",
        civilization: "Aztec",
        details: "This conquest marked the end of the Aztec Empire and the beginning of Spanish colonial rule in Mexico."
    }


];

const Events = () => {
    const { favorites, addFavorite, removeFavorite } = useFavorites();
    const [events, setEvents] = useState(initialEvents);
    const [expandedEventId, setExpandedEventId] = useState(null);

    const handleExpand = (id) => {
        if (expandedEventId === id) {
            setExpandedEventId(null);
        } else {
            setExpandedEventId(id);
        }
    };

    const isFavorite = (id) => favorites.events.some(item => item.id === id);

    return (
        <Container className="container-custom">
            <Row className="mt-4 row-custom">
                {events.map(event => (
                    <Col key={event.id} xs={12} sm={6} md={4} lg={3} className="mb-4 col-custom">
                        <Card
                            className={`mb-3 card-custom ${expandedEventId === event.id ? 'expanded' : ''}`}
                            onClick={() => handleExpand(event.id)}
                        >
                            <Card.Img variant="top" src={event.imageurl} className="card-img-top" />
                            <Card.Body>
                                <Card.Title>{event.name}</Card.Title>
                                <Card.Text>{event.date}</Card.Text>
                                {expandedEventId === event.id && (
                                    <div className="expanded-content">
                                        <Card.Text>{event.description}</Card.Text>
                                        <div className="mb-3">
                                            <h5>Civilization:</h5>
                                            <p>{event.civilization}</p>
                                            <h5>Details:</h5>
                                            <p>{event.details}</p>
                                            <div className="links-container">
                                                <Link to={`/events`}>Events</Link>
                                                <span> | </span>
                                                <Link to={`/artifacts`}>Artifacts</Link>
                                                <span> | </span>
                                                <Link to={`/regions/${event.id}`}>Regions</Link>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <Link
                                    to="#"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        isFavorite(event.id)
                                            ? removeFavorite(event.id, 'events')
                                            : addFavorite(event, 'events');
                                    }}
                                    className="favorite-link"
                                >
                                    {isFavorite(event.id) ? 'Remove from Favorites' : 'Add to Favorites'}
                                </Link>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Events;
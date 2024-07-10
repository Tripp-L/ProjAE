import React, { useState } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import YouTube from 'react-youtube';
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
        details: "The battle was part of the second Persian invasion of Greece and has become a symbol of courage against overwhelming odds.",
        videoUrl: "QuXRIW7tH6A"
    },
    {
        id: 2,
        name: "Battle of Marathon",
        description: "A decisive battle in 490 BC where the Athenians defeated the Persians, marking a turning point in the Greco-Persian Wars.",
        imageurl: "https://i.natgeofe.com/n/4fb4b638-3c21-4af1-9c3c-b82854b0ec00/roman-sarcophagus-persians-flee_16x9.jpg",
        date: "490 BC",
        civilization: "Ancient Greece",
        details: "The Athenian victory was crucial in preserving Greek independence and culture.",
        videoUrl: "IRmjbhYSYgo"
    },
    {
        id: 3,
        name: "Fall of the Western Roman Empire",
        description: "The collapse of the Western Roman Empire in 476 AD, leading to the end of ancient Rome and the beginning of the Middle Ages.",
        imageurl: "https://assets.editorial.aetnd.com/uploads/2014/01/gettyimages-802428712.jpg",
        date: "476 AD",
        civilization: "Roman Empire",
        details: "The fall of Rome marked the transition from classical antiquity to the medieval period in Europe.",
        videoUrl: "4B-HU0yrfxw"
    },
    {
        id: 4,
        name: "Warring States Period",
        description: "A period of intense political and military conflict among seven major Chinese states vying for dominance.",
        imageurl: "https://cf.geekdo-images.com/8pa0aykUKcn-uJGvTeOy8A__itemrep/img/GO0w7qKfl4CBNAFpGjysF8FUu38=/fit-in/246x300/filters:strip_icc()/pic5027104.jpg",
        date: "475-221 BC",
        civilization: "Ancient China",
        details: "This era saw significant advancements in philosophy, military strategy, and technology, ultimately leading to the unification of China under the Qin dynasty.",
        videoUrl: "_yqyCUcUjV0"
    },
    {
        id: 5,
        name: "Rise of the Akkadian Empire",
        description: "Sargon of Akkad conquered Sumerian city-states, establishing the first known empire in history.",
        imageurl: "https://cdn.thecollector.com/wp-content/uploads/2023/09/akkadian-empire-rise-fall-768x442.jpg",
        date: "c. 2334-2279 BC",
        civilization: "Mesopotamia",
        details: "The Akkadian Empire unified the region under a single ruler, marking a significant shift in political organization and control.",
        videoUrl: "D8YzvZRT5ko"
    },
    {
        id: 6,
        name: "Peloponnesian War",
        description: "A protracted conflict between the Peloponnesian League (led by Sparta) and the Delian League (led by Athens).",
        imageurl: "https://images.nationalgeographic.org/image/upload/v1638891964/EducationHub/photos/peloponnesian-war.jpg",
        date: "431-404 BC",
        civilization: "Ancient Greece",
        details: "This war reshaped the ancient Greek world, weakening Athens and paving the way for Macedonian dominance.",
        videoUrl: "5_xNrMcsVW8"
    },
    {
        id: 7,
        name: "Spanish Conquest of the Aztec Empire",
        description: "Hernán Cortés and his Spanish conquistadors, aided by indigenous allies, conquered the Aztec Empire.",
        imageurl: "https://i.natgeofe.com/n/b0debc40-a0eb-440c-8b81-40f871e53250/spanish-siege.jpg",
        date: "1519-1521",
        civilization: "Aztec",
        details: "This conquest marked the end of the Aztec Empire and the beginning of Spanish colonial rule in Mexico."
    },
    {
        id: 8,
        name: "Aksumite-Persian Wars",
        description: "A series of conflicts between the Aksumite Empire and the Sasanian Persian Empire over control of Yemen.",
        imageurl: "https://edsitement.neh.gov/sites/default/files/resource/Persian%20War.jpg", 
        date: "c. 520–575 AD",
        civilization: "Aksumite Empire",
        details: "These wars had a significant impact on the trade routes and political landscape of the Red Sea region."
    },
    {
        id: 9,
        name: "Nika Riots",
        description: "A massive riot in Constantinople that nearly overthrew Emperor Justinian I.",
        imageurl: "https://cdn.historycollection.com/wp-content/uploads/2017/10/Untitled-1-9.jpg", 
        date: "532 AD",
        civilization: "Byzantine Empire",
        details: "The riots were fueled by discontent with high taxes and political factions, and resulted in widespread destruction and loss of life."
    },
    {
        id: 10,
        name: "Battle of Cannae",
        description: "A major battle of the Second Punic War in which Hannibal decisively defeated a larger Roman army.",
        imageurl: "https://www.culturefrontier.com/wp-content/uploads/2024/02/Punic-Wars-Cover.jpg",
        date: "216 BC",
        civilization: "Carthage",
        details: "This battle is considered one of the greatest tactical victories in military history and a major turning point in the Second Punic War."
    },
    {
        id: 11,
        name: "The Hajj of Mansa Musa",
        description: "Mansa Musa, the ruler of the Mali Empire, made a famous pilgrimage to Mecca, showcasing the empire's immense wealth.",
        imageurl: "https://images.squarespace-cdn.com/content/v1/5ae79b0d3c3a535560ce1849/99b132d1-8dd8-46ca-bd40-b442ce4bcc44/Mansa+Musa.jpeg",
        date: "1324–1325 AD",
        civilization: "Mali Empire",
        details: "His lavish procession and distribution of gold left a lasting impression on the world and cemented Mali's reputation as a prosperous kingdom."
    },
    {
        id: 12,
        name: "Sack of Angkor",
        description: "The Ayutthaya Kingdom of Siam captured and sacked Angkor, the capital of the Khmer Empire, leading to its decline.",
        imageurl: "https://cdn.angkordatabase.asia/imager/images/publications/siamese-attacks-on-angkor-before-1430/3206/Siamese-attacks_5ae402c9837860cd6e4f65e304b3a5fa.jpg", 
        date: "1431 AD",
        civilization: "Khmer Empire",
        details: "This event marked the end of the Khmer Empire's political and cultural dominance in Southeast Asia."
    },
    {
        id: 13,
        name: "Minoan Eruption of Thera",
        description: "A catastrophic volcanic eruption that devastated the Minoan civilization on the island of Crete.",
        imageurl: "https://i.natgeofe.com/n/6609fc9c-5145-4acb-a128-9c8136c49580/BAL_532073.jpg", 
        date: "c. 1620 BC",
        civilization: "Minoan Civilization",
        details: "This eruption is considered one of the largest volcanic events in recorded history and is believed to have triggered a series of tsunamis that devastated coastal settlements."
    },
    {
        id: 14,
        name: "Rise of La Venta",
        description: "The emergence of La Venta as a major Olmec ceremonial center, marked by the construction of large pyramids, plazas, and colossal heads.",
        imageurl: "https://mexicanroutes.com/wp-content/uploads/2019/11/MexicanRoutes-Olmecs.jpg",
        date: "c. 900 BC",
        civilization: "Olmec Civilization",
        details: "La Venta served as a political and religious center for the Olmec and is considered a significant site in the development of Mesoamerican civilizations."
    },
    {
        id: 15,
        name: "Building of Tikal Temple I",
        description: "The construction of Tikal Temple I, a massive pyramid in the heart of the Maya city of Tikal.",
        imageurl: "https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/tikal-at-apogee-illustration-christian-jegou.jpg",
        date: "c. 734 AD",
        civilization: "Maya Civilization",
        details: "Temple I is a testament to Maya architectural and engineering prowess, and served as a burial site for one of Tikal's rulers."
    },
    {
        id: 16,
        name: "Decline of Mohenjo-daro",
        description: "The gradual abandonment of Mohenjo-daro, one of the largest cities of the Indus Valley Civilization.",
        imageurl: "https://www.worldhistory.org/img/r/p/500x600/12856.jpg?v=1656242470",
        date: "c. 1900 BC",
        civilization: "Indus Valley Civilization",
        details: "The reasons for the decline remain unclear, with theories ranging from climate change and environmental degradation to shifts in trade routes and invasions."
    },
    {
        id: 17,
        name: "Founding of Tenochtitlan",
        description: "The Aztecs founded their capital city, Tenochtitlan, on an island in Lake Texcoco.",
        imageurl: "https://www.researchgate.net/publication/332157783/figure/fig1/AS:743418837880833@1554256271641/The-great-Tenochtitlan-mural-by-Diego-Rivera-Exhibited-in-the-Palacio-Nacional-in-Mexico.ppm",
        date: "1325 AD",
        civilization: "Aztec Civilization",
        details: "Tenochtitlan became the center of the Aztec Empire and a marvel of engineering, with causeways, canals, and impressive architecture."
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

    const videoOptions = {
        width: '100%',
        playerVars: {
            autoplay: 0,
        },
    };

    return (
        <Container className="container-custom">
            <Row className="mt-4 row-custom">
                {events.map(event => (
                    <Col key={event.id} xs={12} sm={6} md={4} lg={3} className="mb-4 col-custom">
                        <Card
                            className={`mb-3 card-custom ${expandedEventId === event.id ? 'expanded' : ''}`}
                            onClick={() => handleExpand(event.id)}
                        >
                            {expandedEventId === event.id ? (
                                <YouTube videoId={event.videoUrl} opts={videoOptions} className="youtube-video" />
                            ) : (
                                <Card.Img variant="top" src={event.imageurl} className="card-img-top" />
                            )}
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
import React, { useState } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import YouTube from 'react-youtube';
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
        location: "Shaanxi, China",
        videoUrl: "https://www.youtube.com/shorts/TFNhRUOo_A0"
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
    {
        id: 9,
        name: "Colossal Olmec Head",
        description: "Massive stone sculptures of human heads, a hallmark of the Olmec civilization.",
        imageurl: "https://smarthistory.org/wp-content/uploads/2023/10/Mexico-City-Olmec-Head-1-scaled.jpg",
        civilization: "Olmec",
        discovery_date: "Late 19th century",
        location: "Various sites in the Gulf Coast of Mexico"
    },
    {
        id: 10,
        name: "Cyrus Cylinder",
        description: "An ancient clay cylinder inscribed with a declaration by Cyrus the Great, often considered the first charter of human rights.",
        imageurl: "https://media.britishmuseum.org/media/Repository/Documents/2014_10/4_21/db6b39fb_ec3e_4ae0_98ac_a3ba015c8e30/mid_00262857_001.jpg",
        civilization: "Persian Empire",
        discovery_date: "1879",
        location: "Babylon, Iraq"
    },
    {
        id: 11,
        name: "Sarcophagus of Ahiram",
        description: "A Phoenician sarcophagus with the earliest known inscription using the Phoenician alphabet.",
        imageurl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5CcpAFuU4CnX7hOaiQhXZw1eHPXc4CaTYnQ&s",
        civilization: "Phoenician",
        discovery_date: "1923",
        location: "Byblos, Lebanon"
    },
    {
        id: 12,
        name: "Rosetta Stone",
        description: "A stone slab with inscriptions in three scripts (Egyptian hieroglyphs, Demotic script, and Ancient Greek), key to deciphering Egyptian hieroglyphs.",
        imageurl: "https://www.egypttoday.com/siteimages/Larg/202207270213221322.jpg",
        civilization: "Ancient Egypt",
        discovery_date: "1799",
        location: "Rosetta, Egypt"
    },
    {
        id: 13,
        name: "Parthenon Marbles (Elgin Marbles)",
        description: "A collection of Classical Greek marble sculptures from the Parthenon in Athens, currently housed in the British Museum.",
        imageurl: "https://www.aljazeera.com/wp-content/uploads/2023/11/2023-01-25T153255Z_1515150149_RC2KXY93Y4MA_RTRMADP_3_GREECE-BRITAIN-MARBLES-1701243769.jpg?w=770&resize=770%2C478",
        civilization: "Ancient Greece",
        discovery_date: "Early 19th century",
        location: "Originally Parthenon, Athens; now British Museum, London"
    },
    {
        id: 14,
        name: "Law Code of Gortyn",
        description: "The earliest known legal code from ancient Greece, inscribed on a stone wall.",
        imageurl: "https://www.greek-thesaurus.gr/images/gortyn-law-code.jpg",
        civilization: "Ancient Greece",
        discovery_date: "1884",
        location: "Gortyn, Crete, Greece"
    },
    {
        id: 15,
        name: "Epic of Gilgamesh",
        description: "An epic poem from ancient Mesopotamia, one of the earliest known works of literature.",
        imageurl: "https://media.britishmuseum.org/media/Repository/Documents/2014_11/12_14/c9f43da8_d416_45aa_aaf3_a3e100f6908c/mid_00107404_001.jpg",
        civilization: "Mesopotamia",
        discovery_date: "19th century",
        location: "Various sites in Iraq"
    },
    {
        id: 16,
        name: "Bust of Nefertiti",
        description: "A painted stucco-coated limestone bust of Nefertiti, the Great Royal Wife of the Egyptian Pharaoh Akhenaten.",
        imageurl: "https://www.telegraph.co.uk/multimedia/archive/03405/queen_3405010b.jpg",
        civilization: "Ancient Egypt",
        discovery_date: "1912",
        location: "Amarna, Egypt"
    },
    {
        id: 17,
        name: "Lycurgus Cup",
        description: "A Roman cage cup made of dichroic glass, changing color depending on the lighting.",
        imageurl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5mrkiAzekFd8DS4hDUz9CEeDmNZi5GeVCHA&s",
        civilization: "Roman Republic/Empire",
        discovery_date: "19th century",
        location: "British Museum, London"
    },
    {
        id: 18,
        name: "Qin Dynasty Bronze Chariot",
        description: "An intricate bronze chariot model found in the tomb of Qin Shi Huang.",
        imageurl: "https://image.bastillepost.com/1200x/wp-content/uploads/global/2024/04/8373092_1713509312002_a_FB.jpg.webp",
        civilization: "Qin Dynasty",
        discovery_date: "1980",
        location: "Mausoleum of the First Qin Emperor, Xi'an, China"
    }
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
                                <Card.Text>{artifact.discovery_date}</Card.Text>
                                {expandedArtifactId === artifact.id && (
                                    <div className="expanded-content">
                                        <Card.Text>{artifact.description}</Card.Text>
                                        <div className="mb-3">
                                            <h5>Civilization:</h5>
                                            <p>{artifact.civilization}</p>
                                            <h5>Location:</h5>
                                            <p>{artifact.location}</p>
                                            {artifact.videoUrl && (
                                                <YouTube videoId={artifact.videoUrl} className="youtube-video" />
                                            )}
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
import React, { useState } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import YouTube from 'react-youtube';
import { useFavorites } from '../contexts/FavoriteContext';
import './Civilizations.css';


const initialCivilizations = [
    {
        id: 1,
        name: "Ancient China",
        description: "Ancient China was a civilization that was started in ancient times along the Yellow River, Yangtze River, and the other river basins in the fertile regions of East Asia.",
        imageurl: "https://images.nationalgeographic.org/image/upload/t_edhub_resource_key_image/v1638892506/EducationHub/photos/the-great-wall-of-china.jpg",
        dates: "2070 BC – 1912 AD",
        regions: "China, East Asia",
        latitude: 35.8617,
        longitude: 104.1954,
        videoUrl: "https://www.youtube.com/shorts/662DeiZOIic",
        leaders: [
            {
                name: "Qin Shi Huang",
                title: "First Emperor of China",
                reign: "221–210 BC",
                imageurl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Qin_Shi_Huangdi.jpg/800px-Qin_Shi_Huangdi.jpg"
            },
            {
                name: "Emperor Wu of Han",
                title: "Emperor of the Han Dynasty",
                reign: "141–87 BC",
                imageurl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Emperor_Wu_of_Han.jpg/800px-Emperor_Wu_of_Han.jpg"
            }
        ],
        deities: [
            {
                name: "Shangdi",
                description: "Supreme deity in ancient Chinese religious beliefs."
            },
            {
                name: "Yudi",
                description: "God of rain and agriculture in ancient Chinese mythology."
            }
        ],
        events: [
            { name: "Battle of Red Cliffs" },
            { name: "Yellow Turban Rebellion" }
        ]
    },
    {
        id: 2,
        name: "Atlantis",
        description: "A legendary island civilization mentioned in Plato's dialogues, often depicted as an advanced society with unique technology and architecture.",
        imageurl: "https://vvikipedia.co/images/thumb/2/24/Faeland_Alth%C3%B3an_artist_depiction_as_atlantis.jpg/800px-Faeland_Alth%C3%B3an_artist_depiction_as_atlantis.jpg", 
        dates: "Unknown (mythological)",
        regions: "Unknown (possibly the Atlantic Ocean)",
        leaders: [],
        deities: [
            {
                name: "Poseidon",
                description: "Greek god of the sea, earthquakes, and horses, often associated with Atlantis."
            },
            {
                name: "Cleito",
                description: "Mortal woman in Atlantean mythology, mother of Atlas and his brothers."
            }
        ]
    },
    {
        id: 3,
        name: "Mesopotamia",
        description: "A region in the Middle East, often called the 'Cradle of Civilization,' where various cultures like the Sumerians, Akkadians, Babylonians, and Assyrians flourished.",
        imageurl: "https://cdn.britannica.com/20/13720-050-6ED7921E/reconstruction-ruins-Ishtar-Gate-Babylon-Al-Hillah-Iraq.jpg?w=300",
        dates: "c. 3500 BC – 539 BC",
        regions: "Modern-day Iraq, Kuwait, parts of Syria, Turkey, and Iran",
        leaders: [
            {
                name: "Sargon of Akkad",
                title: "King of Akkad",
                reign: "c. 2334–2279 BC",
                imageurl: ""
            },
            {
                name: "Hammurabi",
                title: "King of Babylon",
                reign: "c. 1792–1750 BC",
                imageurl: ""
            }
        ],
        deities: [
            {
                name: "Anu",
                description: "God of the sky, king of the gods"
            },
            {
                name: "Enlil",
                description: "God of wind and storms"
            },
            {
                name: "Ishtar",
                description: "Goddess of love, fertility, and war"
            }
        ]
    },
    {
        id: 4,
        name: "Ancient Egypt",
        description: "A civilization renowned for its pyramids, pharaohs, and intricate religious beliefs, located along the Nile River in northeastern Africa.",
        imageurl: "https://i.natgeofe.com/n/535f3cba-f8bb-4df2-b0c5-aaca16e9ff31/giza-plateau-pyramids.jpg?w=1280&h=853",
        dates: "c. 3100 BC – 30 BC",
        regions: "Nile River Valley, Northeast Africa",
        leaders: [
            {
                name: "Khufu",
                title: "Pharaoh of the Fourth Dynasty",
                reign: "c. 2589–2566 BC",
                imageurl: ""
            },
            {
                name: "Hatshepsut",
                title: "Pharaoh of the Eighteenth Dynasty",
                reign: "c. 1478–1458 BC",
                imageurl: ""
            },
            {
                name: "Ramesses II",
                title: "Pharaoh of the Nineteenth Dynasty",
                reign: "c. 1279–1213 BC",
                imageurl: ""
            }
        ],
        deities: [
            {
                name: "Ra",
                description: "God of the sun and creation"
            },
            {
                name: "Osiris",
                description: "God of the afterlife, underworld, and the dead"
            },
            {
                name: "Isis",
                description: "Goddess of magic, healing, and motherhood"
            }
        ]
    },
    {
        id: 5,
        name: "Ancient Greece",
        description: "A civilization known for its philosophy, democracy, art, and architecture, comprising various city-states like Athens, Sparta, and Thebes.",
        imageurl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/The_Parthenon_in_Athens.jpg/300px-The_Parthenon_in_Athens.jpg",
        dates: "c. 2700 BC – 146 BC",
        regions: "Greece, Aegean Islands, Asia Minor, Southern Italy",
        leaders: [
            {
                name: "Pericles",
                title: "Statesman of Athens",
                reign: "c. 495–429 BC",
                imageurl: ""
            },
            {
                name: "Alexander the Great",
                title: "King of Macedon",
                reign: "336–323 BC",
                imageurl: ""
            }
        ],
        deities: [
            {
                name: "Zeus",
                description: "King of the gods, god of the sky and thunder"
            },
            {
                name: "Hera",
                description: "Queen of the gods, goddess of women, marriage, family, and childbirth"
            },
            {
                name: "Athena",
                description: "Goddess of wisdom, handicraft, and warfare"
            }
        ]
    },
    {
        id: 6,
        name: "Aztec Civilization",
        description: "A Mesoamerican civilization known for its advanced engineering, complex mythology, and practice of human sacrifice.",
        imageurl: "https://cdn.britannica.com/24/171124-131-E50C5C3D/Chichen-Itza.jpg",
        dates: "c. 1345 – 1521 AD",
        regions: "Central Mexico",
        leaders: [
            {
                name: "Moctezuma II",
                title: "Hueyi Tlatoani (Emperor)",
                reign: "1502–1520 AD",
                imageurl: ""
            }
        ],
        deities: [
            {
                name: "Huitzilopochtli",
                description: "God of war, sun, and human sacrifice"
            },
            {
                name: "Quetzalcoatl",
                description: "Feathered serpent deity associated with wind, creation, and learning"
            },
            {
                name: "Tlaloc",
                description: "God of rain, fertility, and water"
            }
        ]
    },
    {
        id: 7,
        name: "Indus Valley Civilization",
        description: "A Bronze Age civilization known for its advanced urban planning, standardized weights and measures, and enigmatic script.",
        imageurl: "https://ruchikaliveblog.wordpress.com/wp-content/uploads/2017/09/untitled-design-3-2.png?w=1088",
        dates: "c. 3300 – 1300 BC",
        regions: "Northwest India and Pakistan",
        leaders: [],
        deities: [],
        events: []
    },
    {
        id: 8,
        name: "Maya Civilization",
        description: "A Mesoamerican civilization known for its advanced writing system, mathematics, astronomy, and impressive architecture.",
        imageurl: "https://media.licdn.com/dms/image/D4E12AQHS7Q_rGl4UMg/article-cover_image-shrink_720_1280/0/1680859965457?e=2147483647&v=beta&t=vVSG3aClqjPYiKrWVYpbHOfhpCCNlyjbDDjacxJ_HEA",
        dates: "c. 2600 BC – 900 AD",
        regions: "Southern Mexico, Guatemala, Belize, Honduras, El Salvador",
        leaders: [
            {
                name: "K'inich Janaab' Pakal",
                title: "Ajaw (Ruler) of Palenque",
                reign: "615–683 AD",
                imageurl: ""
            }
        ],
        deities: [
            {
                name: "Itzamna",
                description: "God of the sky, creation, and writing"
            },
            {
                name: "K'inich Ajaw",
                description: "Sun god"
            },
            {
                name: "Chaac",
                description: "God of rain and lightning"
            }
        ]
    },
    {
        id: 9,
        name: "Minoan Civilization",
        description: "A Bronze Age civilization on the island of Crete, known for its elaborate palaces, vibrant frescoes, and maritime trade.",
        imageurl: "https://cdn.sci.news/images/enlarge2/image_3552e-Knossos.jpg",
        dates: "c. 2700 – 1450 BC",
        regions: "Crete, Aegean Islands",
        leaders: [],
        deities: [
            {
                name: "Potnia Theron",
                description: "Goddess of wild animals, nature, and childbirth"
            },
            {
                name: "The Snake Goddess",
                description: "Goddess associated with snakes, fertility, and household protection"
            }
        ],
        events: []
    },
    {
        id: 10,
        name: "Olmec Civilization",
        description: "The earliest known major Mesoamerican civilization, known for their colossal stone heads and sophisticated artistic traditions.",
        imageurl: "https://images.nationalgeographic.org/image/upload/v1638892498/EducationHub/photos/olmec-head-statue.jpg",
        dates: "c. 1200 – 400 BC",
        regions: "Gulf Coast of Mexico",
        leaders: [],
        deities: [
            {
                name: "The Were-Jaguar",
                description: "A powerful deity often depicted as a hybrid creature with feline and human features."
            }
        ],
        events: []
    },
    {
        id: 11,
        name: "Persian Empire",
        description: "A vast empire known for its tolerance of diverse cultures, efficient administration, and impressive infrastructure like the Royal Road.",
        imageurl: "https://www.thoughtco.com/thmb/83lCUttgqWpVtlbKjOUkP1GG3uo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/6th-century-bc-darius-palace-ruins-in-persepolis--iran-693931982-5b943c2e46e0fb0025fb8c94.jpg",
        dates: "c. 550 – 330 BC",
        regions: "Iran, Mesopotamia, Egypt, Asia Minor",
        leaders: [
            {
                name: "Cyrus the Great",
                title: "Founder of the Achaemenid Empire",
                reign: "559–530 BC",
                imageurl: ""
            },
            {
                name: "Darius the Great",
                title: "King of Kings",
                reign: "522–486 BC",
                imageurl: ""
            }
        ],
        deities: [
            {
                name: "Ahura Mazda",
                description: "Supreme god of Zoroastrianism, representing truth and light"
            },
            {
                name: "Angra Mainyu",
                description: "Destructive spirit in Zoroastrianism, representing falsehood and darkness"
            },
            {
                name: "Mithra",
                description: "God of light, contracts, and friendship"
            }
        ]
    },
    {
        id: 12,
        name: "Phoenician Civilization",
        description: "A seafaring civilization known for its maritime trade, alphabet, and establishment of colonies throughout the Mediterranean.",
        imageurl: "https://cdn.thecollector.com/wp-content/uploads/2020/09/oldest-written-phoenician-text-byblos.jpg?width=1400&quality=55",
        dates: "c. 1550 – 300 BC",
        regions: "Coastal Lebanon, Syria, and parts of North Africa",
        leaders: [],
        deities: [
            {
                name: "Baal",
                description: "God of fertility, rain, and thunder"
            },
            {
                name: "Astarte",
                description: "Goddess of fertility, love, and war"
            },
            {
                name: "Melqart",
                description: "God of the city of Tyre, associated with the sun, healing, and navigation"
            }
        ],
        events: []
    },
    {
        id: 13,
        name: "Qin Dynasty",
        description: "The first unified Chinese empire, known for its centralized government, legalism, standardized writing system, and construction of the Great Wall of China.",
        imageurl: "https://assets.editorial.aetnd.com/uploads/2017/12/terracotta-soldiers-gettyimages-534904337.jpg",
        dates: "221 – 206 BC",
        regions: "China",
        leaders: [
            {
                name: "Qin Shi Huang",
                title: "First Emperor of China",
                reign: "221–210 BC",
                imageurl: ""
            }
        ],
        deities: [],
        events: []
    },
    {
        id: 14,
        name: "Roman Republic/Empire",
        description: "A civilization renowned for its law, engineering, military power, and expansive empire, transitioning from a republic to an empire.",
        imageurl: "https://images.nationalgeographic.org/image/upload/v1638891605/EducationHub/photos/roman-forum.jpg",
        dates: "509 BC – 476 AD (Western Roman Empire)",
        regions: "Italy, Mediterranean, Western Europe, North Africa, Near East",
        leaders: [
            {
                name: "Julius Caesar",
                title: "Dictator of Rome",
                reign: "49–44 BC",
                imageurl: ""
            },
            {
                name: "Augustus",
                title: "First Roman Emperor",
                reign: "27 BC – 14 AD",
                imageurl: ""
            }
        ],
        deities: [
            {
                name: "Jupiter",
                description: "King of the gods, god of the sky and thunder"
            },
            {
                name: "Juno",
                description: "Queen of the gods, goddess of women, marriage, and childbirth"
            },
            {
                name: "Mars",
                description: "God of war"
            }
        ]
    },
    {
        id: 15,
        name: "Aksumite Empire",
        description: "A powerful trading empire in northeastern Africa, known for its monumental stelae, currency, and Christian heritage.",
        imageurl: "https://images.nationalgeographic.org/image/upload/v1638892609/EducationHub/photos/king-ezanas-stela.jpg",
        dates: "c. 100 AD – c. 940 AD",
        regions: "Northern Ethiopia, Eritrea, parts of Sudan, Yemen, and Saudi Arabia",
        latitude: 14.1273,
        longitude: 38.7025,
        leaders: [
            {
                name: "Ezana",
                title: "King of Aksum",
                reign: "c. 320–360 AD",
            }
        ],
        deities: [
            {
                name: "Astar",
                description: "Goddess of fertility and war"
            },
            {
                name: "Meder",
                description: "Sky god"
            }
        ],
        events: [
            {
                name: "Conversion to Christianity",
                description: "King Ezana adopted Christianity as the state religion."
            }
        ]
    },
    {
        id: 16,
        name: "Byzantine Empire",
        description: "The continuation of the Roman Empire in its eastern provinces, centered in Constantinople, known for its rich culture, Orthodox Christianity, and Justinian law.",
        imageurl: "https://idsb.tmgrup.com.tr/2014/09/25/HaberDetay/1411595902071.jpg",
        dates: "330–1453 AD",
        regions: "Eastern Mediterranean, Balkans, Anatolia",
        latitude: 41.0082,
        longitude: 28.9784,
        leaders: [
            {
                name: "Justinian I",
                title: "Emperor",
                reign: "527–565 AD",
            }
        ],
        deities: [],
        events: [
            {
                name: "Construction of the Hagia Sophia",
                description: "A masterpiece of Byzantine architecture, completed in 537 AD."
            }
        ]
    },
    {
        id: 17,
        name: "Carthage",
        description: "A Phoenician city-state turned powerful empire, known for its maritime trade, Punic Wars with Rome, and general Hannibal.",
        imageurl: "https://www.historyhit.com/app/uploads/bis-images/5150769/Carthage-788x537.jpg?x67928",
        dates: "c. 814 BC – 146 BC",
        regions: "North Africa (modern-day Tunisia)",
        latitude: 36.8565,
        longitude: 10.3375,
        leaders: [
            {
                name: "Hannibal Barca",
                title: "General",
                reign: "247–183/181 BC",
            }
        ],
        deities: [
            {
                name: "Baal Hammon",
                description: "Chief god, associated with fertility and vegetation"
            },
            {
                name: "Tanit",
                description: "Goddess of the moon and fertility"
            }
        ],
        events: [
            {
                name: "Punic Wars",
                description: "A series of three wars fought between Rome and Carthage."
            }
        ]
    },
    {
        id: 18,
        name: "Ghana Empire",
        description: "A West African empire known for its gold trade, rich culture, and powerful kings.",
        imageurl: "https://dailynuelly.wordpress.com/wp-content/uploads/2021/01/ancient.jpg",
        dates: "c. 300 – c. 1100 AD",
        regions: "Parts of modern-day Mauritania, Mali, and Senegal",
        latitude: 13.7537,
        longitude: -9.1850,
        leaders: [
            {
                name: "Tunka Manin",
                title: "King of Ghana",
                reign: "c. 1062–1076 AD",
            }
        ],
        deities: [],
        events: [
            {
                name: "Peak of the Gold Trade",
                description: "Ghana became a major center for the trans-Saharan gold trade."
            }
        ]
    },
    {
        id: 19,
        name: "Khmer Empire",
        description: "A Southeast Asian empire known for its impressive architecture, including the Angkor Wat temple complex.",
        imageurl: "https://www.worldhistory.org/uploads/images/1107.jpg",
        dates: "802–1431 AD",
        regions: "Cambodia, parts of Thailand, Laos, and Vietnam",
        latitude: 13.4125,
        longitude: 103.8670,
        leaders: [
            {
                name: "Jayavarman II",
                title: "Founder of the Khmer Empire",
                reign: "802–850 AD",
            },
            {
                name: "Suryavarman II",
                title: "King of the Khmer Empire",
                reign: "1113–1150 AD",
            }
        ],
        deities: [
            {
                name: "Vishnu",
                description: "Hindu god of preservation"
            },
            {
                name: "Shiva",
                description: "Hindu god of destruction and creation"
            }
        ],
        events: [
            {
                name: "Construction of Angkor Wat",
                description: "Built as a Hindu temple, later transformed into a Buddhist temple."
            }
        ]
    },
    {
        id: 20,
        name: "Mali Empire",
        description: "A West African empire known for its wealth, Islamic scholarship, and famous ruler Mansa Musa.",
        imageurl: "https://images.nationalgeographic.org/image/upload/t_edhub_resource_key_image/v1638892305/EducationHub/photos/timbuktu-henrich-barth-painting.jpg",
        dates: "c. 1230 – c. 1600 AD",
        regions: "Parts of modern-day Mali, Senegal, The Gambia, Guinea, Niger, Nigeria, Chad, and Mauritania",
        latitude: 17.5707,
        longitude: -3.9962,
        leaders: [
            {
                name: "Mansa Musa",
                title: "Mansa of the Mali Empire",
                reign: "1312–1337 AD",
            }
        ],
        deities: [],
        events: [
            {
                name: "Mansa Musa's Pilgrimage to Mecca",
                description: "Showcased the empire's wealth and brought Islamic scholars to Mali."
            }
        ]
    },
    {
        id: 21,
        name: "Mississippian Culture",
        description: "A Native American civilization in the Mississippi River Valley, known for its large earthen mounds and complex social structures.",
        imageurl: "https://cdn.britannica.com/55/66455-050-4CD7C423/Cahokia-Michael-Hampshire-painting-1150.jpg",
        dates: "c. 800 – c. 1600 AD",
        regions: "Mississippi River Valley, Eastern North"
    }
];





const Civilizations = () => {
    const { favorites, addFavorite, removeFavorite } = useFavorites();
    const [civilizations, setCivilizations] = useState(initialCivilizations);
    const [expandedCivilizationId, setExpandedCivilizationId] = useState(null);

    const handleExpand = (id) => {
        if (expandedCivilizationId === id) {
            setExpandedCivilizationId(null);
        } else {
            setExpandedCivilizationId(id);
        }
    };

    const isFavorite = (id) => favorites.civilizations.some(item => item.id === id);

    return (
        <Container className="container-custom">
            <Row className="mt-4 row-custom">
                {civilizations.map(civilization => (
                    <Col key={civilization.id} xs={12} sm={6} md={4} lg={3} className="mb-4 col-custom">
                        <Card
                            className={`mb-3 card-custom ${expandedCivilizationId === civilization.id ? 'expanded' : ''}`}
                            onClick={() => handleExpand(civilization.id)}
                        >
                            <Card.Img variant="top" src={civilization.imageurl} className="card-img-top" />
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
                ))}
            </Row>
        </Container>
    );
};

export default Civilizations;
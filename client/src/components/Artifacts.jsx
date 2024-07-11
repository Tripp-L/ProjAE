import React, { useState } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import YouTube from 'react-youtube';
import { useFavorites } from '../contexts/FavoriteContext';
import BookRecommendation from './BookRecommendation';
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
        videoUrl: "TFNhRUOo_A0",
        books: [
            {
                title: "The Terra Cotta Army: China’s First Emperor and the Birth of a Nation",
                author: "John Man",
                link: "https://www.amazon.com/Terracotta-Army-Chinas-Emperor-Nation/dp/0593059301",
                image: "https://m.media-amazon.com/images/I/71e3CpfMqJL._SY466_.jpg"
            },
            {
                title: "The Terracotta Warriors: Exploring the Most Intriguing Puzzle in Chinese History",
                author: "Edward Burman",
                link: "https://www.amazon.com/Terracotta-Warriors-Exploring-Intriguing-Chinese/dp/1681777967",
                image: "https://m.media-amazon.com/images/I/71h6tbK0kuL._SY466_.jpg"
            }
        ]
    },
    {
        id: 2,
        name: "Standard of Ur",
        description: "A wooden box inlaid with shell, lapis lazuli, and red limestone, depicting scenes of war and peace.",
        imageurl: "https://cdn.kastatic.org/ka-content-images/0e6c402af2d565815af848737bf663c799daae88.jpg",
        discovery_date: "1927-1928",
        location: "Royal Cemetery of Ur, Iraq",
        videoUrl: "MWDVWz-8M4g",
        books: [
            {
                title: "Standard of Ur (Object in Focus)",
                author: "Sarah Collins ",
                link: "https://www.amazon.com/Standard-Object-Focus-Sarah-Collins/dp/0714151130",
                image: "https://m.media-amazon.com/images/I/61LL0jWQTrL._SY466_.jpg"
            },
            {
                title: "Treasures from the Royal Tombs of Ur",
                author: "Richard L. Zettler,  Lee Horne",
                link: "https://www.amazon.com/Treasures-Royal-Tombs-Richard-Zettler/dp/0924171545/ref=asc_df_0924171545/?tag=hyprod-20&linkCode=df0&hvadid=693339903975&hvpos=&hvnetw=g&hvrand=13515827107620831&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9193459&hvtargid=pla-647928915806&psc=1&mcid=d35943c3f53d3985b8361a38a86bc0fe&gad_source=1",
                image: "https://m.media-amazon.com/images/I/91wbR8CUmgL._SY466_.jpg"
            }
        ]
    },
    {
        id: 3,
        name: "Mask of Tutankhamun",
        description: "A gold mask discovered in the tomb of the young pharaoh Tutankhamun.",
        imageurl: "https://egyptianmuseumcairo.eg/wp-content/uploads/2021/06/Tutankhamon-funerary-mask.jpg",
        civilization: "Ancient Egypt",
        discovery_date: "1925",
        location: "Valley of the Kings, Egypt",
        videoUrl: "y7YCkYJerqE",
        books: [
            {
                title: "The Complete Tutankhamun: The King, the Tomb, the Royal Treasure",
                author: "Nicholas Reeves",
                link: "https://www.amazon.com/Complete-Tutankhamun-King-Royal-Treasure/dp/0500050589/ref=asc_df_0500050589/?tag=hyprod-20&linkCode=df0&hvadid=693309443448&hvpos=&hvnetw=g&hvrand=14606626640459209297&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9193459&hvtargid=pla-532410264172&psc=1&mcid=1e0d3eedc5b130a89a2f2979976a0b38&gad_source=1",
                image: "https://m.media-amazon.com/images/I/A1D87Mn7FbL._SY466_.jpg"
            },
            {
                title: "The Golden Mask of King Tut The Code",
                author: "Jesús Ariel Aguirre ",
                link: "https://www.amazon.com/Golden-Mask-King-Tut-Code-ebook/dp/B099NWJCX7",
                image: "https://m.media-amazon.com/images/I/81LPWqCLz6S._SY466_.jpg"
            }
        ]
    },
    {
        id: 4,
        name: "Venus de Milo",
        description: "A Hellenistic statue of the goddess Aphrodite (Venus in Roman mythology).",
        imageurl: "https://greekreporter.com/wp-content/uploads/2018/06/Venus-de-Milo-ancient-sculpture-credit-Bradley-N-Weber-CC2.jpg",
        civilization: "Ancient Greece",
        discovery_date: "1820",
        location: "Island of Milos, Greece",
        videoUrl: "kFFL3CtuOE4",
        books: [
            {
                title: "Disarmed: The Story of the Venus de Milo",
                author: "Gregory Curtis",
                link: "https://www.amazon.com/Disarmed-Story-Venus-Gregory-Curtis/dp/1400031338",
                image: "https://m.media-amazon.com/images/I/61KK8GguuTL._SY466_.jpg"
            },
            {
                title: "Who Stole the Arms of the Venus de Milo?",
                author: "Phil Cousineau",
                link: "https://www.amazon.com/Who-Stole-Arms-Venus-Milo/dp/B0CLNSL34C/ref=asc_df_B0CLNSL34C/?tag=hyprod-20&linkCode=df0&hvadid=693412525904&hvpos=&hvnetw=g&hvrand=16695250075688780306&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9193459&hvtargid=pla-2274018613329&psc=1&mcid=a921bfb2495936649621e4feb7c8cfac&gad_source=1",
                image: "https://m.media-amazon.com/images/I/61dtedYQWZL._SY466_.jpg"
            }
        ]
    },
    {
        id: 5,
        name: "Coyolxauhqui Stone",
        description: "A massive stone sculpture depicting the dismembered body of the moon goddess Coyolxauhqui.",
        imageurl: "https://i0.wp.com/arthistorywithalder.com/wp-content/uploads/2021/04/Coyolxauhqui_4095977415_b89d64f008-2.jpg?resize=482%2C482&ssl=1",
        civilization: "Aztec",
        discovery_date: "1978",
        location: "Templo Mayor, Mexico City, Mexico",
        videoUrl: "Z1rqLNz8Zo0",
        books: [
            {
                title: "Aztec Archaeology and Ethnohistory",
                author: "Frances F. Berdan",
                link: "https://www.goodreads.com/book/show/158136.Aztec_Archaeology_and_Ethnohistory"
            },
            {
                title: "Aztec Ruins and Pyramids: An Archaeological Journey",
                author: "Charles River Editors",
                link: "https://www.goodreads.com/book/show/52074872-aztec-ruins-and-pyramids"
            }
        ]
    },
    {
        id: 6,
        name: "Priest-King Sculpture",
        description: "A soapstone sculpture depicting a bearded figure adorned with jewelry and a headband.",
        imageurl: "https://t4.ftcdn.net/jpg/02/87/58/75/360_F_287587553_ARtpLHaD7mHYGRD6nbkvPKzKjmnsdwwd.webp",
        civilization: "Indus Valley",
        discovery_date: "1927",
        location: "Mohenjo-daro, Pakistan",
        videoUrl: "GvjewZp7mXM",
        books: [
            {
                title: "The Indus Civilization: A Contemporary Perspective",
                author: "Gregory L. Possehl",
                link: "https://www.goodreads.com/book/show/1392132.The_Indus_Civilization"
            },
            {
                title: "Mohenjo-Daro and the Indus Civilization",
                author: "Sir John Marshall",
                link: "https://www.goodreads.com/book/show/1105482.Mohenjo_Daro_and_the_Indus_Civilization"
            }
        ]
    },
    {
        id: 7,
        name: "Jade Head of the Maya Maize God",
        description: "A carved jade head depicting the Maya maize god, a symbol of fertility and abundance.",
        imageurl: "https://www.worldhistory.org/uploads/images/16234.png",
        civilization: "Maya",
        discovery_date: "1984",
        location: "Temple of the Inscriptions, Palenque, Mexico",
        books: [
            {
                title: "The Maya",
                author: "Michael D. Coe",
                link: "https://www.goodreads.com/book/show/259013.The_Maya"
            },
            {
                title: "Ancient Maya: The Rise and Fall of a Rainforest Civilization",
                author: "Arthur Demarest",
                link: "https://www.goodreads.com/book/show/765203.Ancient_Maya"
            }
        ]
    },
    {
        id: 8,
        name: "Phaistos Disc",
        description: "A clay disc with stamped symbols, its purpose and meaning remain a mystery.",
        imageurl: "https://greekreporter.com/wp-content/uploads/2018/02/Phaistos-Disc-Credit-cc-by-sa-4.0-c-messier.jpg",
        civilization: "Minoan",
        discovery_date: "1908",
        location: "Phaistos Palace, Crete, Greece",
        books: [
            {
                title: "The Minoans: The History and Legacy of the Bronze Age’s Earliest Civilization",
                author: "Charles River Editors",
                link: "https://www.goodreads.com/book/show/39823969-the-minoans"
            },
            {
                title: "The Lost World of the Minoans",
                author: "James Baikie",
                link: "https://www.goodreads.com/book/show/1283372.The_Lost_World_of_the_Minoans"
            }
        ]
    },
    {
        id: 9,
        name: "Colossal Olmec Head",
        description: "Massive stone sculptures of human heads, a hallmark of the Olmec civilization.",
        imageurl: "https://smarthistory.org/wp-content/uploads/2023/10/Mexico-City-Olmec-Head-1-scaled.jpg",
        civilization: "Olmec",
        discovery_date: "Late 19th century",
        location: "Various sites in the Gulf Coast of Mexico",
        books: [
            {
                title: "The Olmecs: America's First Civilization",
                author: "Richard A. Diehl",
                link: "https://www.goodreads.com/book/show/655421.The_Olmecs"
            },
            {
                title: "Olmec Archaeology and Early Mesoamerica",
                author: "Christopher Pool",
                link: "https://www.goodreads.com/book/show/4344378-olmec-archaeology-and-early-mesoamerica"
            }
        ]
    },
    {
        id: 10,
        name: "Cyrus Cylinder",
        description: "An ancient clay cylinder inscribed with a declaration by Cyrus the Great, often considered the first charter of human rights.",
        imageurl: "https://media.britishmuseum.org/media/Repository/Documents/2014_10/4_21/db6b39fb_ec3e_4ae0_98ac_a3ba015c8e30/mid_00262857_001.jpg",
        civilization: "Persian Empire",
        discovery_date: "1879",
        location: "Babylon, Iraq",
        books: [
            {
                title: "Cyrus the Great: The Biography of a Great Leader",
                author: "Jacob Abbott",
                link: "https://www.goodreads.com/book/show/260151.Cyrus_the_Great"
            },
            {
                title: "The Persian Empire",
                author: "Lindsay Allen",
                link: "https://www.goodreads.com/book/show/767588.The_Persian_Empire"
            }
        ]
    },
    {
        id: 11,
        name: "Sarcophagus of Ahiram",
        description: "A Phoenician sarcophagus with the earliest known inscription using the Phoenician alphabet.",
        imageurl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5CcpAFuU4CnX7hOaiQhXZw1eHPXc4CaTYnQ&s",
        civilization: "Phoenician",
        discovery_date: "1923",
        location: "Byblos, Lebanon",
        books: [
            {
                title: "The Phoenicians and the West: Politics, Colonies and Trade",
                author: "Maria Eugenia Aubet",
                link: "https://www.goodreads.com/book/show/3637923-the-phoenicians-and-the-west"
            },
            {
                title: "The Phoenicians: The History and Culture of One of the Ancient World’s Most Influential Civilizations",
                author: "Charles River Editors",
                link: "https://www.goodreads.com/book/show/23509329-the-phoenicians"
            }
        ]
    },
    {
        id: 12,
        name: "Rosetta Stone",
        description: "A stone slab with inscriptions in three scripts (Egyptian hieroglyphs, Demotic script, and Ancient Greek), key to deciphering Egyptian hieroglyphs.",
        imageurl: "https://www.egypttoday.com/siteimages/Larg/202207270213221322.jpg",
        civilization: "Ancient Egypt",
        discovery_date: "1799",
        location: "Rosetta, Egypt",
        books: [
            {
                title: "The Rosetta Stone and the Rebirth of Ancient Egypt",
                author: "John Ray",
                link: "https://www.goodreads.com/book/show/112540.The_Rosetta_Stone_and_the_Rebirth_of_Ancient_Egypt"
            },
            {
                title: "Cracking Codes: The Rosetta Stone and Decipherment",
                author: "Richard Parkinson",
                link: "https://www.goodreads.com/book/show/112542.Cracking_Codes"
            }
        ]
    },
    {
        id: 13,
        name: "Parthenon Marbles (Elgin Marbles)",
        description: "A collection of Classical Greek marble sculptures from the Parthenon in Athens, currently housed in the British Museum.",
        imageurl: "https://www.aljazeera.com/wp-content/uploads/2023/11/2023-01-25T153255Z_1515150149_RC2KXY93Y4MA_RTRMADP_3_GREECE-BRITAIN-MARBLES-1701243769.jpg?w=770&resize=770%2C478",
        civilization: "Ancient Greece",
        discovery_date: "Early 19th century",
        location: "Originally Parthenon, Athens; now British Museum, London",
        books: [
            {
                title: "The Elgin Marbles: Should They Be Returned to Greece?",
                author: "Christopher Hitchens",
                link: "https://www.goodreads.com/book/show/245898.The_Elgin_Marbles"
            },
            {
                title: "The Parthenon Marbles: The Case for Reunification",
                author: "Christopher Hitchens",
                link: "https://www.goodreads.com/book/show/245899.The_Parthenon_Marbles"
            }
        ]
    },
    {
        id: 14,
        name: "Law Code of Gortyn",
        description: "The earliest known legal code from ancient Greece, inscribed on a stone wall.",
        imageurl: "https://www.greek-thesaurus.gr/images/gortyn-law-code.jpg",
        civilization: "Ancient Greece",
        discovery_date: "1884",
        location: "Gortyn, Crete, Greece",
        books: [
            {
                title: "The Laws of the Ancient Greeks",
                author: "David Phillips",
                link: "https://www.goodreads.com/book/show/13259752-the-laws-of-the-ancient-greeks"
            },
            {
                title: "Greek Law",
                author: "Michael Gagarin",
                link: "https://www.goodreads.com/book/show/2327853.Greek_Law"
            }
        ]
    },
    {
        id: 15,
        name: "Epic of Gilgamesh",
        description: "An epic poem from ancient Mesopotamia, one of the earliest known works of literature.",
        imageurl: "https://media.britishmuseum.org/media/Repository/Documents/2014_11/12_14/c9f43da8_d416_45aa_aaf3_a3e100f6908c/mid_00107404_001.jpg",
        civilization: "Mesopotamia",
        discovery_date: "19th century",
        location: "Various sites in Iraq",
        books: [
            {
                title: "The Epic of Gilgamesh",
                author: "Anonymous",
                link: "https://www.goodreads.com/book/show/25241.The_Epic_of_Gilgamesh"
            },
            {
                title: "Gilgamesh: A New Rendering in English Verse",
                author: "David Ferry",
                link: "https://www.goodreads.com/book/show/187654.Gilgamesh"
            }
        ]
    },
    {
        id: 16,
        name: "Bust of Nefertiti",
        description: "A painted stucco-coated limestone bust of Nefertiti, the Great Royal Wife of the Egyptian Pharaoh Akhenaten.",
        imageurl: "https://www.telegraph.co.uk/multimedia/archive/03405/queen_3405010b.jpg",
        civilization: "Ancient Egypt",
        discovery_date: "1912",
        location: "Amarna, Egypt",
        books: [
            {
                title: "Nefertiti: Unlocking the Mystery Surrounding Egypt's Most Famous and Beautiful Queen",
                author: "Joyce Tyldesley",
                link: "https://www.goodreads.com/book/show/41902.Nefertiti"
            },
            {
                title: "Nefertiti and Cleopatra: Queen-Monarchs of Ancient Egypt",
                author: "Julia Samson",
                link: "https://www.goodreads.com/book/show/3694017-nefertiti-and-cleopatra"
            }
        ]
    },
    {
        id: 17,
        name: "Lycurgus Cup",
        description: "A Roman cage cup made of dichroic glass, changing color depending on the lighting.",
        imageurl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5mrkiAzekFd8DS4hDUz9CEeDmNZi5GeVCHA&s",
        civilization: "Roman Republic/Empire",
        discovery_date: "19th century",
        location: "British Museum, London",
        books: [
            {
                title: "Glass of the Caesars",
                author: "David Whitehouse",
                link: "https://www.goodreads.com/book/show/2946023-glass-of-the-caesars"
            },
            {
                title: "Roman Glass: Reflections on Cultural Change",
                author: "Stuart Fleming",
                link: "https://www.goodreads.com/book/show/312855.Roman_Glass"
            }
        ]
    },
    {
        id: 18,
        name: "Qin Dynasty Bronze Chariot",
        description: "An intricate bronze chariot model found in the tomb of Qin Shi Huang.",
        imageurl: "https://image.bastillepost.com/1200x/wp-content/uploads/global/2024/04/8373092_1713509312002_a_FB.jpg.webp",
        civilization: "Qin Dynasty",
        discovery_date: "1980",
        location: "Mausoleum of the First Qin Emperor, Xi'an, China",
        books: [
            {
                title: "The First Emperor: China's Terracotta Army",
                author: "Jane Portal",
                link: "https://www.goodreads.com/book/show/290722.The_First_Emperor"
            },
            {
                title: "The Terracotta Army of the First Emperor of China",
                author: "William Lindesay",
                link: "https://www.goodreads.com/book/show/795347.The_Terracotta_Army_of_the_First_Emperor_of_China"
            }
        ]
    }
];


const Artifacts = ({ onExpand }) => {
    const { favorites, addFavorite, removeFavorite } = useFavorites();
    const [artifacts, setArtifacts] = useState(initialArtifacts);
    const [expandedArtifactId, setExpandedArtifactId] = useState(null);

    const handleExpand = (id, books) => {
        if (expandedArtifactId === id) {
            setExpandedArtifactId(null);
            onExpand([]);
        } else {
            setExpandedArtifactId(id);
            onExpand(books);
        }
    };

    const isFavorite = (id) => favorites.artifacts.some(item => item.id === id);

    const videoOptions = {
        width: '100%',
        playerVars: {
            autoplay: 0,
        },
    };

    return (
        <Container className="container-custom">
            <Row className="mt-4 row-custom">
                {artifacts.map(artifact => (
                    <Col key={artifact.id} xs={12} sm={6} md={4} lg={3} className="mb-4 col-custom">
                        <Card
                            className={`mb-3 card-custom ${expandedArtifactId === artifact.id ? 'expanded' : ''}`}
                            onClick={() => handleExpand(artifact.id, artifact.books)}
                        >
                            {expandedArtifactId === artifact.id ? (
                                <YouTube videoId={artifact.videoUrl} opts={videoOptions} className="youtube-video" />
                            ) : (
                                <Card.Img variant="top" src={artifact.imageurl} className="card-img-top" />
                            )}
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
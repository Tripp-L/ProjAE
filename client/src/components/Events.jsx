import React, { useState } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import YouTube from 'react-youtube';
import { useFavorites } from '../contexts/FavoriteContext';
import BookRecommendation from './BookRecommendation';
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
        videoUrl: "QuXRIW7tH6A",
        books: [
            {
                title: "Gates of Fire: An Epic Novel of the Battle of Thermopylae",
                author: "Steven Pressfield",
                link: "https://www.amazon.com/Gates-Fire-Novel-Battle-Thermopylae/dp/055338368X/ref=asc_df_055338368X/?tag=hyprod-20&linkCode=df0&hvadid=693432104303&hvpos=&hvnetw=g&hvrand=791006001856311478&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9193459&hvtargid=pla-448667924616&psc=1&mcid=70bb60ed936c3cc3bb358a22c59ca6f8&gad_source=1",
                image: "https://m.media-amazon.com/images/I/613CQOd9SvL._SY466_.jpg"
            },
            {
                title: "Thermopylae: The Battle That Changed the World",
                author: "Paul Cartledge ",
                link: "https://www.amazon.com/Thermopylae-Battle-That-Changed-World/dp/1585675660/ref=asc_df_1585675660/?tag=hyprod-20&linkCode=df0&hvadid=693686765672&hvpos=&hvnetw=g&hvrand=791006001856311478&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9193459&hvtargid=pla-568784009966&psc=1&mcid=525f884718a93ccebb78abdd9349080b&gad_source=1",
                image: "https://m.media-amazon.com/images/I/71LdTf7oBiL._SY466_.jpg"
            }
        ]
    },
    {
        id: 2,
        name: "Battle of Marathon",
        description: "A decisive battle in 490 BC where the Athenians defeated the Persians, marking a turning point in the Greco-Persian Wars.",
        imageurl: "https://i.natgeofe.com/n/4fb4b638-3c21-4af1-9c3c-b82854b0ec00/roman-sarcophagus-persians-flee_16x9.jpg",
        date: "490 BC",
        civilization: "Ancient Greece",
        details: "The Athenian victory was crucial in preserving Greek independence and culture.",
        videoUrl: "IRmjbhYSYgo",
        books: [
            {
                title: "Marathon: How One Battle Changed Western Civilization",
                author: "Richard A. Billows",
                link: "https://www.amazon.com/Marathon-Battle-Changed-Western-Civilization/dp/159020168X/ref=asc_df_159020168X/?tag=hyprod-20&linkCode=df0&hvadid=693589349926&hvpos=&hvnetw=g&hvrand=13639447446117954808&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9193459&hvtargid=pla-570328668953&psc=1&mcid=0a14ad63a1943389bf81a7fe7547f0e7&gad_source=1",
                image: "https://m.media-amazon.com/images/I/71pwtrSEYaL._SY466_.jpg"
            },
            {
                title: "The Battle of Marathon",
                author: "Peter Krentz",
                link: "https://www.amazon.com/Battle-Marathon-Library-Military-History/dp/0300177666",
                image: "https://m.media-amazon.com/images/I/81itQ7XgHNL._SY466_.jpg"
            }
        ]
    },
    {
        id: 3,
        name: "Fall of the Western Roman Empire",
        description: "The collapse of the Western Roman Empire in 476 AD, leading to the end of ancient Rome and the beginning of the Middle Ages.",
        imageurl: "https://assets.editorial.aetnd.com/uploads/2014/01/gettyimages-802428712.jpg",
        date: "476 AD",
        civilization: "Roman Empire",
        details: "The fall of Rome marked the transition from classical antiquity to the medieval period in Europe.",
        videoUrl: "4B-HU0yrfxw",
        books: [
            {
                title: "The Fall of the Roman Empire: A New History of Rome and the Barbarians",
                author: "Peter Heather",
                link: "https://www.amazon.com/Fall-Roman-Empire-History-Barbarians-dp-0195325419/dp/0195325419/ref=dp_ob_title_bk",
                image: "https://m.media-amazon.com/images/I/81g5Brv6I5L._SY466_.jpg"
            },
            {
                title: "The Roman Revolution (The Fall of the Roman Empire)",
                author: "Nick Holmes ",
                link: "https://www.amazon.com/dp/1739786505/ref=sspa_dk_hqp_detail_aax_0?psc=1&sp_csd=d2lkZ2V0TmFtZT1zcF9ocXBfc2hhcmVk",
                image: "https://m.media-amazon.com/images/I/71a6Wo5QzHL._SY466_.jpg"
            }
        ]
    },
    {
        id: 4,
        name: "Warring States Period",
        description: "A period of intense political and military conflict among seven major Chinese states vying for dominance.",
        imageurl: "https://cf.geekdo-images.com/8pa0aykUKcn-uJGvTeOy8A__itemrep/img/GO0w7qKfl4CBNAFpGjysF8FUu38=/fit-in/246x300/filters:strip_icc()/pic5027104.jpg",
        date: "475-221 BC",
        civilization: "Ancient China",
        details: "This era saw significant advancements in philosophy, military strategy, and technology, ultimately leading to the unification of China under the Qin dynasty.",
        videoUrl: "_yqyCUcUjV0",
        books: [
            {
                title: "The Warring States, Books 1-3",
                author: "Greg Strandberg ",
                link: "https://www.amazon.com/Warring-States-Books-1-3-ebook/dp/B00H947DTG",
                image: "https://m.media-amazon.com/images/I/81L0ojgUy8L._SY466_.jpg"

            },
            {
                title: "Strategies of the Warring States: Zhan Guo Ce, Volumes 1-17",
                author: "Liu Xiang (Author), Mason Turner (Translator)",
                link: "https://www.amazon.com/Strategies-Warring-States-Zhan-Volumes/dp/B0CRQRMPR5/ref=pd_sbs_d_sccl_2_1/146-6572004-7304720?pd_rd_w=67pqO&content-id=amzn1.sym.0f17cd03-4101-48b6-b34f-b78a3b750c2a&pf_rd_p=0f17cd03-4101-48b6-b34f-b78a3b750c2a&pf_rd_r=ME9XN14XYGBNYA1NXSBF&pd_rd_wg=DygnM&pd_rd_r=cd1819a0-e00b-4b19-9873-c03d84e9cb4a&pd_rd_i=B0CRQRMPR5&psc=1",
                image: "https://m.media-amazon.com/images/I/71e0NLSpkNL._SY466_.jpg"

            }
        ]
    },
    {
        id: 5,
        name: "Rise of the Akkadian Empire",
        description: "Sargon of Akkad conquered Sumerian city-states, establishing the first known empire in history.",
        imageurl: "https://cdn.thecollector.com/wp-content/uploads/2023/09/akkadian-empire-rise-fall-768x442.jpg",
        date: "c. 2334-2279 BC",
        civilization: "Mesopotamia",
        details: "The Akkadian Empire unified the region under a single ruler, marking a significant shift in political organization and control.",
        videoUrl: "D8YzvZRT5ko",
        books: [
            {
                title: "The Sumerians: Their History, Culture, and Character",
                author: "Samuel Noah Kramer",
                link: "https://www.goodreads.com/book/show/203755.The_Sumerians"
            },
            {
                title: "The Ancient Near East: A History",
                author: "William W. Hallo",
                link: "https://www.goodreads.com/book/show/1187906.The_Ancient_Near_East"
            }
        ]
    },
    {
        id: 6,
        name: "Peloponnesian War",
        description: "A protracted conflict between the Peloponnesian League (led by Sparta) and the Delian League (led by Athens).",
        imageurl: "https://images.nationalgeographic.org/image/upload/v1638891964/EducationHub/photos/peloponnesian-war.jpg",
        date: "431-404 BC",
        civilization: "Ancient Greece",
        details: "This war reshaped the ancient Greek world, weakening Athens and paving the way for Macedonian dominance.",
        videoUrl: "5_xNrMcsVW8",
        books: [
            {
                title: "A War Like No Other: How the Athenians and Spartans Fought the Peloponnesian War",
                author: "Victor Davis Hanson",
                link: "https://www.goodreads.com/book/show/208747.A_War_Like_No_Other"
            },
            {
                title: "The Peloponnesian War",
                author: "Donald Kagan",
                link: "https://www.goodreads.com/book/show/35866.The_Peloponnesian_War"
            }
        ]
    },
    {
        id: 7,
        name: "Spanish Conquest of the Aztec Empire",
        description: "Hernán Cortés and his Spanish conquistadors, aided by indigenous allies, conquered the Aztec Empire.",
        imageurl: "https://i.natgeofe.com/n/b0debc40-a0eb-440c-8b81-40f871e53250/spanish-siege.jpg",
        date: "1519-1521",
        civilization: "Aztec",
        details: "This conquest marked the end of the Aztec Empire and the beginning of Spanish colonial rule in Mexico.",
        videoUrl: "lcGMLYryp64",
        books: [
            {
                title: "The Broken Spears: The Aztec Account of the Conquest of Mexico",
                author: "Miguel León-Portilla",
                link: "https://www.goodreads.com/book/show/720092.The_Broken_Spears"
            },
            {
                title: "Conquistador: Hernan Cortes, King Montezuma, and the Last Stand of the Aztecs",
                author: "Buddy Levy",
                link: "https://www.goodreads.com/book/show/2765506-conquistador"
            }
        ]
    },
    {
        id: 8,
        name: "Aksumite-Persian Wars",
        description: "A series of conflicts between the Aksumite Empire and the Sasanian Persian Empire over control of Yemen.",
        imageurl: "https://edsitement.neh.gov/sites/default/files/resource/Persian%20War.jpg",
        date: "c. 520–575 AD",
        civilization: "Aksumite Empire",
        details: "These wars had a significant impact on the trade routes and political landscape of the Red Sea region.",
        videoUrl: "5_yNrMcsVW8",
        books: [
            {
                title: "The Rise and Fall of the Aksumite Empire",
                author: "Stanley Burstein",
                link: "https://www.goodreads.com/book/show/38586956-the-rise-and-fall-of-the-aksumite-empire"
            },
            {
                title: "The Aksumite Kingdom",
                author: "Stuart Munro-Hay",
                link: "https://www.goodreads.com/book/show/37958607-the-aksumite-kingdom"
            }
        ]
    },
    {
        id: 9,
        name: "Nika Riots",
        description: "A massive riot in Constantinople that nearly overthrew Emperor Justinian I.",
        imageurl: "https://cdn.historycollection.com/wp-content/uploads/2017/10/Untitled-1-9.jpg",
        date: "532 AD",
        civilization: "Byzantine Empire",
        details: "The riots were fueled by discontent with high taxes and political factions, and resulted in widespread destruction and loss of life.",
        videoUrl: "kOpQxWv3_ZE",
        books: [
            {
                title: "Justinian's Flea: Plague, Empire, and the Birth of Europe",
                author: "William Rosen",
                link: "https://www.goodreads.com/book/show/135110.Justinian_s_Flea"
            },
            {
                title: "The Secret History",
                author: "Procopius",
                link: "https://www.goodreads.com/book/show/118045.The_Secret_History"
            }
        ]
    },
    {
        id: 10,
        name: "Battle of Cannae",
        description: "A major battle of the Second Punic War in which Hannibal decisively defeated a larger Roman army.",
        imageurl: "https://www.culturefrontier.com/wp-content/uploads/2024/02/Punic-Wars-Cover.jpg",
        date: "216 BC",
        civilization: "Carthage",
        details: "This battle is considered one of the greatest tactical victories in military history and a major turning point in the Second Punic War.",
        videoUrl: "N4v_Z6Yxm4w",
        books: [
            {
                title: "The Ghosts of Cannae: Hannibal and the Darkest Hour of the Roman Republic",
                author: "Robert L. O'Connell",
                link: "https://www.goodreads.com/book/show/7315182-the-ghosts-of-cannae"
            },
            {
                title: "Hannibal",
                author: "Theodore Ayrault Dodge",
                link: "https://www.goodreads.com/book/show/1067073.Hannibal"
            }
        ]
    },
    {
        id: 11,
        name: "The Hajj of Mansa Musa",
        description: "Mansa Musa, the ruler of the Mali Empire, made a famous pilgrimage to Mecca, showcasing the empire's immense wealth.",
        imageurl: "https://images.squarespace-cdn.com/content/v1/5ae79b0d3c3a535560ce1849/99b132d1-8dd8-46ca-bd40-b442ce4bcc44/Mansa+Musa.jpeg",
        date: "1324–1325 AD",
        civilization: "Mali Empire",
        details: "His lavish procession and distribution of gold left a lasting impression on the world and cemented Mali's reputation as a prosperous kingdom.",
        videoUrl: "P5GoyZqUJ4o",
        books: [
            {
                title: "Mansa Musa and the Empire of Mali",
                author: "P. James Oliver",
                link: "https://www.goodreads.com/book/show/1880856.Mansa_Musa_and_the_Empire_of_Mali"
            },
            {
                title: "Sundiata: An Epic of Old Mali",
                author: "D. T. Niane",
                link: "https://www.goodreads.com/book/show/103203.Sundiata"
            }
        ]
    },
    {
        id: 12,
        name: "Sack of Angkor",
        description: "The Ayutthaya Kingdom of Siam captured and sacked Angkor, the capital of the Khmer Empire, leading to its decline.",
        imageurl: "https://cdn.angkordatabase.asia/imager/images/publications/siamese-attacks-on-angkor-before-1430/3206/Siamese-attacks_5ae402c9837860cd6e4f65e304b3a5fa.jpg",
        date: "1431 AD",
        civilization: "Khmer Empire",
        details: "This event marked the end of the Khmer Empire's political and cultural dominance in Southeast Asia.",
        videoUrl: "7Y2tTpVj9Ns",
        books: [
            {
                title: "Angkor: An Introduction",
                author: "George Coedès",
                link: "https://www.goodreads.com/book/show/7744856-angkor"
            },
            {
                title: "The Civilization of Angkor",
                author: "Charles Higham",
                link: "https://www.goodreads.com/book/show/1591898.The_Civilization_of_Angkor"
            }
        ]
    },
    {
        id: 13,
        name: "Minoan Eruption of Thera",
        description: "A catastrophic volcanic eruption that devastated the Minoan civilization on the island of Crete.",
        imageurl: "https://i.natgeofe.com/n/6609fc9c-5145-4acb-a128-9c8136c49580/BAL_532073.jpg",
        date: "c. 1620 BC",
        civilization: "Minoan Civilization",
        details: "This eruption is considered one of the largest volcanic events in recorded history and is believed to have triggered a series of tsunamis that devastated coastal settlements.",
        videoUrl: "ItRsIn8c5PY",
        books: [
            {
                title: "The End of Atlantis: New Light on an Old Legend",
                author: "Jürgen Spanuth",
                link: "https://www.goodreads.com/book/show/1170316.The_End_of_Atlantis"
            },
            {
                title: "The Minoan Eruption of Santorini: An Interdisciplinary Approach",
                author: "David A. Hardy",
                link: "https://www.goodreads.com/book/show/4531559-the-minoan-eruption-of-santorini"
            }
        ]
    },
    {
        id: 14,
        name: "Rise of La Venta",
        description: "The emergence of La Venta as a major Olmec ceremonial center, marked by the construction of large pyramids, plazas, and colossal heads.",
        imageurl: "https://mexicanroutes.com/wp-content/uploads/2019/11/MexicanRoutes-Olmecs.jpg",
        date: "c. 900 BC",
        civilization: "Olmec Civilization",
        details: "La Venta served as a political and religious center for the Olmec and is considered a significant site in the development of Mesoamerican civilizations.",
        videoUrl: "xZf_WzZkxe4",
        books: [
            {
                title: "The Olmecs: America's First Civilization",
                author: "Richard A. Diehl",
                link: "https://www.goodreads.com/book/show/474304.The_Olmecs"
            },
            {
                title: "Olmec Archaeology and Early Mesoamerica",
                author: "Christopher A. Pool",
                link: "https://www.goodreads.com/book/show/2043861.Olmec_Archaeology_and_Early_Mesoamerica"
            }
        ]
    },
    {
        id: 15,
        name: "Building of Tikal Temple I",
        description: "The construction of Tikal Temple I, a massive pyramid in the heart of the Maya city of Tikal.",
        imageurl: "https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/tikal-at-apogee-illustration-christian-jegou.jpg",
        date: "c. 734 AD",
        civilization: "Maya Civilization",
        details: "Temple I is a testament to Maya architectural and engineering prowess, and served as a burial site for one of Tikal's rulers.",
        videoUrl: "a8TKv6eYV0w",
        books: [
            {
                title: "Tikal: Paleoecology of an Ancient Maya City",
                author: "David L. Lentz",
                link: "https://www.goodreads.com/book/show/3660935-tikal"
            },
            {
                title: "Tikal: An Illustrated History",
                author: "John Montgomery",
                link: "https://www.goodreads.com/book/show/642478.Tikal"
            }
        ]
    },
    {
        id: 16,
        name: "Decline of Mohenjo-daro",
        description: "The gradual abandonment of Mohenjo-daro, one of the largest cities of the Indus Valley Civilization.",
        imageurl: "https://www.worldhistory.org/img/r/p/500x600/12856.jpg?v=1656242470",
        date: "c. 1900 BC",
        civilization: "Indus Valley Civilization",
        details: "The reasons for the decline remain unclear, with theories ranging from climate change and environmental degradation to shifts in trade routes and invasions.",
        videoUrl: "drortffMKvA",
        books: [
            {
                title: "The Lost River: On The Trail of the Sarasvati",
                author: "Michel Danino",
                link: "https://www.goodreads.com/book/show/9431868-the-lost-river"
            },
            {
                title: "The Indus Civilization",
                author: "Gregory L. Possehl",
                link: "https://www.goodreads.com/book/show/2795914-the-indus-civilization"
            }
        ]
    },
    {
        id: 17,
        name: "Founding of Tenochtitlan",
        description: "The Aztecs founded their capital city, Tenochtitlan, on an island in Lake Texcoco.",
        imageurl: "https://www.researchgate.net/publication/332157783/figure/fig1/AS:743418837880833@1554256271641/The-great-Tenochtitlan-mural-by-Diego-Rivera-Exhibited-in-the-Palacio-Nacional-in-Mexico.ppm",
        date: "1325 AD",
        civilization: "Aztec Civilization",
        details: "Tenochtitlan became the center of the Aztec Empire and a marvel of engineering, with causeways, canals, and impressive architecture.",
        videoUrl: "xxjRLMlW-Ng",
        books: [
            {
                title: "The Aztec World",
                author: "Elizabeth M. Brumfiel",
                link: "https://www.goodreads.com/book/show/47931.The_Aztec_World"
            },
            {
                title: "Daily Life of the Aztecs",
                author: "Jacques Soustelle",
                link: "https://www.goodreads.com/book/show/764014.Daily_Life_of_the_Aztecs"
            }
        ]
    }
];


const Events = ({ onExpand }) => {
    const { favorites, addFavorite, removeFavorite } = useFavorites();
    const [events, setEvents] = useState(initialEvents);
    const [expandedEventId, setExpandedEventId] = useState(null);

    const handleExpand = (id, books) => {
        if (expandedEventId === id) {
            setExpandedEventId(null);
            onExpand([]);
        } else {
            setExpandedEventId(id);
            onExpand(books);
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
                            onClick={() => handleExpand(event.id, event.books)}
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
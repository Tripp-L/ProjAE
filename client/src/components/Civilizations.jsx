import React, { useState, useEffect } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import YouTube from 'react-youtube';
import { useFavorites } from '../contexts/FavoriteContext';
import { useSearch } from '../contexts/SearchContext';
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
        videoUrl: "662DeiZOIic",
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
        ],
        books: [
            {
                title: "The Early Chinese Empires: Qin and Han (History of Imperial China)",
                author: "Mark Edward Lewis ",
                link: "https://www.amazon.com/Early-Chinese-Empires-History-Imperial/dp/0674057341/ref=asc_df_0674057341/?tag=hyprod-20&linkCode=df0&hvadid=693309416374&hvpos=&hvnetw=g&hvrand=13361493681087050168&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9193459&hvtargid=pla-468991133702&psc=1&mcid=e07790fa9bf43e6db4af389d165f6527&gad_source=1",
                image: "https://m.media-amazon.com/images/I/91JOa3pZm5L._SY466_.jpg"
            },
            {
                title: "China's First Emperor and His Terracotta Warriors",
                author: "Frances Wood",
                link: "https://www.amazon.com/Chinas-First-Emperor-Terracotta-Warriors/dp/1250029759/ref=asc_df_1250029759/?tag=hyprod-20&linkCode=df0&hvadid=693341079312&hvpos=&hvnetw=g&hvrand=13361493681087050168&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9193459&hvtargid=pla-636329552812&psc=1&mcid=5f8f1dd4eb583787be9325c91c44fd23&gad_source=1",
                image: "https://m.media-amazon.com/images/I/91L1PuvEeLL._SY466_.jpg"
            }
        ]
    },
    {
        id: 2,
        name: "Atlantis",
        description: "A legendary island civilization mentioned in Plato's dialogues, often depicted as an advanced society with unique technology and architecture.",
        imageurl: "https://vvikipedia.co/images/thumb/2/24/Faeland_Alth%C3%B3an_artist_depiction_as_atlantis.jpg/800px-Faeland_Alth%C3%B3an_artist_depiction_as_atlantis.jpg", 
        dates: "~9,600 BC",
        regions: "Atlantic Ocean, Richat Structure (Sahara)",
        videoUrl: "ZMgGO_RR6HY",
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
        ],
        books: [
            {
                title: "Atlantis Solved: The Final Definitive Proof",
                author: "David Edward",
                link: "https://www.amazon.com/Atlantis-Solved-Final-Definitive-History/dp/B09Z9JG6R8",
                image: "https://m.media-amazon.com/images/I/714UvC+PqtL._SY466_.jpg"
            },
            {
                title: "Timaeus & Critias",
                author: "Plato",
                link: "https://www.amazon.com/Timaeus-Critias-Plato/dp/1978028504/ref=asc_df_1978028504/?tag=hyprod-20&linkCode=df0&hvadid=693308329801&hvpos=&hvnetw=g&hvrand=9456223400767347864&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9193459&hvtargid=pla-878456109839&psc=1&mcid=0983a42f5bc03c49b9b3f039c09225a1&gad_source=1",
                image: "https://m.media-amazon.com/images/I/41hONHiMGQL._SY466_.jpg"
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
        videoUrl: "a8TKv6eYV0w",
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
        ],
        books: [
            {
                title: "Babylon: Mesopotamia and the Birth of Civilization",
                author: "Paul Kriwaczek ",
                link: "https://www.amazon.com/Babylon-Mesopotamia-Civilization-Paul-Kriwaczek/dp/1250054168/ref=asc_df_1250054168/?tag=hyprod-20&linkCode=df0&hvadid=693308329660&hvpos=&hvnetw=g&hvrand=1709752939551357690&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9193459&hvtargid=pla-417307127938&psc=1&mcid=a269cfe77d3d3433a58e15d11071a4f6&gad_source=1",
                image: "https://m.media-amazon.com/images/I/71nETmd1mIL._SY466_.jpg"
            },
            {
                title: "Ancient Mesopotamia: An Enthralling Overview of Mesopotamian History, Starting from Eridu through the Sumerians, Akkadians, Assyrians, Hittites, and Persians to Alexander the Great (History of Mesopotamia)",
                author: "Enthralling History",
                link: "https://www.amazon.com/Ancient-Mesopotamia-Enthralling-Mesopotamian-Sumerians/dp/1956296573/ref=asc_df_1956296573/?tag=hyprod-20&linkCode=df0&hvadid=693611442412&hvpos=&hvnetw=g&hvrand=1709752939551357690&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9193459&hvtargid=pla-1657479564135&psc=1&mcid=6278aa9245d733f48a02302dea34cca4&gad_source=1",
                image: "https://m.media-amazon.com/images/I/71F6TsExXYL._SY466_.jpg"
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
        videoUrl: "-qe__mVcfTY",
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
        ],
        books: [
            {
                title: "History of Egypt: An Enthralling Overview of Egyptian History",
                author: "Enthralling History ",
                link: "https://www.amazon.com/History-Egypt-Enthralling-Overview-Mythology/dp/B0B5KNTVB9/ref=sims_dp_d_dex_ai_speed_loc_mtl_v4_d_sccl_2_5/146-6572004-7304720?pd_rd_w=2a12i&content-id=amzn1.sym.dbded1ad-8495-4a8e-9906-011c3df3dc92&pf_rd_p=dbded1ad-8495-4a8e-9906-011c3df3dc92&pf_rd_r=B9D9HJZNKRDC88C23P2C&pd_rd_wg=03tHD&pd_rd_r=2ae07186-85b2-406e-bf95-9986b9ac841f&pd_rd_i=B0B5KNTVB9&psc=1",
                image: "https://m.media-amazon.com/images/I/71IugARucfL._SY466_.jpg"
            },
            {
                title: "Ancient Egypt: The Definitive Visual History (DK Classic History)",
                author: "DK",
                link: "https://www.amazon.com/Ancient-Egypt-Definitive-Visual-History/dp/0744029244/ref=asc_df_0744029244/?tag=hyprod-20&linkCode=df0&hvadid=693589349926&hvpos=&hvnetw=g&hvrand=2635894515951248551&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9193459&hvtargid=pla-1189353706297&psc=1&mcid=d4cbe237d3a93e5d96843278ab08290d&gad_source=1",
                image: "https://m.media-amazon.com/images/I/81vYUppoopL._SY466_.jpg"
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
        videoUrl: "f8LvgnMPJOg",
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
        ],
        books: [
            {
                title: "The Iliad",
                author: "Homer",
                link: "https://www.goodreads.com/book/show/1371.The_Iliad"
            },
            {
                title: "The Histories",
                author: "Herodotus",
                link: "https://www.goodreads.com/book/show/3882.The_Histories"
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
        videoUrl: "xxjRLMlW-Ng",
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
        ],
        books: [
            {
                title: "The Broken Spears: The Aztec Account of the Conquest of Mexico",
                author: "Miguel León-Portilla",
                link: "https://www.goodreads.com/book/show/101621.The_Broken_Spears"
            },
            {
                title: "Aztec Thought and Culture: A Study of the Ancient Nahuatl Mind",
                author: "Miguel León-Portilla",
                link: "https://www.goodreads.com/book/show/194318.Aztec_Thought_and_Culture"
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
        videoUrl: "drortffMKvA",
        leaders: [],
        deities: [],
        events: [],
        books: [
            {
                title: "The Indus: Lost Civilizations",
                author: "Andrew Robinson",
                link: "https://www.goodreads.com/book/show/25893971-the-indus"
            },
            {
                title: "The Indus Civilization: A Contemporary Perspective",
                author: "Gregory L. Possehl",
                link: "https://www.goodreads.com/book/show/436928.The_Indus_Civilization"
            }
        ]
    },
    {
        id: 8,
        name: "Maya Civilization",
        description: "A Mesoamerican civilization known for its advanced writing system, mathematics, astronomy, and impressive architecture.",
        imageurl: "https://media.licdn.com/dms/image/D4E12AQHS7Q_rGl4UMg/article-cover_image-shrink_720_1280/0/1680859965457?e=2147483647&v=beta&t=vVSG3aClqjPYiKrWVYpbHOfhpCCNlyjbDDjacxJ_HEA",
        dates: "c. 2600 BC – 900 AD",
        regions: "Southern Mexico, Guatemala, Belize, Honduras, El Salvador",
        videoUrl: "7xLRPYb0egQ",
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
        ],
        books: [
            {
                title: "The Maya",
                author: "Michael D. Coe",
                link: "https://www.goodreads.com/book/show/23956.The_Maya"
            },
            {
                title: "Maya Civilization: A Captivating Guide to Maya History and Maya Mythology",
                author: "Captivating History",
                link: "https://www.goodreads.com/book/show/45289757-maya-civilization"
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
        videoUrl: "IdaqdHGV-k4",
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
        events: [],
        books: [
            {
                title: "The Minoans",
                author: "Rodney Castleden",
                link: "https://www.goodreads.com/book/show/162114.The_Minoans"
            },
            {
                title: "The Knossos Labyrinth: A New View of the `Palace of Minos' at Knossos",
                author: "Hugo Blake",
                link: "https://www.goodreads.com/book/show/393586.The_Knossos_Labyrinth"
            }
        ]
    },
    {
        id: 10,
        name: "Olmec Civilization",
        description: "The earliest known major Mesoamerican civilization, known for their colossal stone heads and sophisticated artistic traditions.",
        imageurl: "https://images.nationalgeographic.org/image/upload/v1638892498/EducationHub/photos/olmec-head-statue.jpg",
        dates: "c. 1200 – 400 BC",
        regions: "Gulf Coast of Mexico",
        videoUrl: "KTwsaHw3eeM",
        leaders: [],
        deities: [
            {
                name: "The Were-Jaguar",
                description: "A powerful deity often depicted as a hybrid creature with feline and human features."
            }
        ],
        events: [],
        books: [
            {
                title: "The Olmecs: America's First Civilization",
                author: "Richard A. Diehl",
                link: "https://www.goodreads.com/book/show/865657.The_Olmecs"
            },
            {
                title: "The Olmec World: Ritual and Rulership",
                author: "Jill Guthrie",
                link: "https://www.goodreads.com/book/show/2463308.The_Olmec_World"
            }
        ]
    },
    {
        id: 11,
        name: "Persian Empire",
        description: "A vast empire known for its tolerance of diverse cultures, efficient administration, and impressive infrastructure like the Royal Road.",
        imageurl: "https://www.thoughtco.com/thmb/83lCUttgqWpVtlbKjOUkP1GG3uo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/6th-century-bc-darius-palace-ruins-in-persepolis--iran-693931982-5b943c2e46e0fb0025fb8c94.jpg",
        dates: "c. 550 – 330 BC",
        regions: "Iran, Mesopotamia, Egypt, Asia Minor",
        videoUrl: "p_HCLCXWZwg",
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
        ],
        books: [
            {
                title: "Persepolis: The Story of a Childhood",
                author: "Marjane Satrapi",
                link: "https://www.goodreads.com/book/show/9516.Persepolis"
            },
            {
                title: "The Persian Empire: A History",
                author: "Lindsay Allen",
                link: "https://www.goodreads.com/book/show/1728838.The_Persian_Empire"
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
        videoUrl: "0nEsiJxtuD8",
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
        events: [],
        books: [
            {
                title: "Carthage Must Be Destroyed: The Rise and Fall of an Ancient Civilization",
                author: "Richard Miles",
                link: "https://www.goodreads.com/book/show/8948154-carthage-must-be-destroyed"
            },
            {
                title: "The Phoenicians",
                author: "Gerhard Herm",
                link: "https://www.goodreads.com/book/show/162117.The_Phoenicians"
            }
        ]
    },
    {
        id: 13,
        name: "Qin Dynasty",
        description: "The first unified Chinese empire, known for its centralized government, legalism, standardized writing system, and construction of the Great Wall of China.",
        imageurl: "https://assets.editorial.aetnd.com/uploads/2017/12/terracotta-soldiers-gettyimages-534904337.jpg",
        dates: "221 – 206 BC",
        regions: "China",
        videoUrl: "ZVFNJLMo4Kk",
        leaders: [
            {
                name: "Qin Shi Huang",
                title: "First Emperor of China",
                reign: "221–210 BC",
                imageurl: ""
            }
        ],
        deities: [],
        events: [],
        books: [
            {
                title: "The First Emperor of China",
                author: "Jonathan Clements",
                link: "https://www.goodreads.com/book/show/771257.The_First_Emperor_of_China"
            },
            {
                title: "Qin: A Captivating Guide to the First Imperial Dynasty of China and the Ruler, Emperor Qin Shi Huang",
                author: "Captivating History",
                link: "https://www.goodreads.com/book/show/45155723-qin"
            }
        ]
    },
    {
        id: 14,
        name: "Roman Republic/Empire",
        description: "A civilization renowned for its law, engineering, military power, and expansive empire, transitioning from a republic to an empire.",
        imageurl: "https://images.nationalgeographic.org/image/upload/v1638891605/EducationHub/photos/roman-forum.jpg",
        dates: "509 BC – 476 AD (Western Roman Empire)",
        regions: "Italy, Mediterranean, Western Europe, North Africa, Near East",
        videoUrl: "Yd2Zkn2LRwo",
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
        ],
        books: [
            {
                title: "SPQR: A History of Ancient Rome",
                author: "Mary Beard",
                link: "https://www.goodreads.com/book/show/25666063-spqr"
            },
            {
                title: "Rubicon: The Last Years of the Roman Republic",
                author: "Tom Holland",
                link: "https://www.goodreads.com/book/show/314352.Rubicon"
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
        videoUrl: "diXZTlhruP8",
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
        ],
        books: [
            {
                title: "Aksum: An African Civilisation of Late Antiquity",
                author: "Stuart Munro-Hay",
                link: "https://www.goodreads.com/book/show/374451.Aksum"
            },
            {
                title: "The Ancient African Kingdom of Axum",
                author: "Stanley Mayer Burstein",
                link: "https://www.goodreads.com/book/show/5417625-the-ancient-african-kingdom-of-axum"
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
        videoUrl: "0YtjMYlmGMk",
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
        ],
        books: [
            {
                title: "Byzantium: The Surprising Life of a Medieval Empire",
                author: "Judith Herrin",
                link: "https://www.goodreads.com/book/show/3077692-byzantium"
            },
            {
                title: "A Short History of Byzantium",
                author: "John Julius Norwich",
                link: "https://www.goodreads.com/book/show/55048.A_Short_History_of_Byzantium"
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
        videoUrl: "oXJVhh6Jxrw",
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
        ],
        books: [
            {
                title: "Carthage Must Be Destroyed: The Rise and Fall of an Ancient Civilization",
                author: "Richard Miles",
                link: "https://www.goodreads.com/book/show/8948154-carthage-must-be-destroyed"
            },
            {
                title: "Hannibal: A History of the Art of War Among the Carthaginians and Romans Down to the Battle of Pydna, 168 B.C.",
                author: "Theodore Ayrault Dodge",
                link: "https://www.goodreads.com/book/show/350686.Hannibal"
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
        videoUrl: "rxFhszrisoU",
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
        ],
        books: [
            {
                title: "Ancient Ghana and Mali",
                author: "Nehemia Levtzion",
                link: "https://www.goodreads.com/book/show/239117.Ancient_Ghana_and_Mali"
            },
            {
                title: "Kingdom of Gold: Ghana's Ancient Empire",
                author: "Tracey Baptiste",
                link: "https://www.goodreads.com/book/show/54436842-kingdom-of-gold"
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
        videoUrl: "FO0m0PMhuXE",
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
        ],
        books: [
            {
                title: "Angkor and the Khmer Civilization",
                author: "Michael D. Coe",
                link: "https://www.goodreads.com/book/show/311293.Angkor_and_the_Khmer_Civilization"
            },
            {
                title: "Khmer Mythology",
                author: "Sam",
                link: "https://www.goodreads.com/book/show/3548980-khmer-mythology"
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
        videoUrl: "xoNrR1vKCr8",
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
        ],
        books: [
            {
                title: "Sundiata: An Epic of Old Mali",
                author: "D. T. Niane",
                link: "https://www.goodreads.com/book/show/134298.Sundiata"
            },
            {
                title: "The History of Africa: The Quest for Eternal Harmony",
                author: "Molefi Kete Asante",
                link: "https://www.goodreads.com/book/show/561731.The_History_of_Africa"
            }
        ]
    },
    {
        id: 21,
        name: "Mississippian Culture",
        description: "A Native American civilization in the Mississippi River Valley, known for its large earthen mounds and complex social structures.",
        imageurl: "https://cdn.britannica.com/55/66455-050-4CD7C423/Cahokia-Michael-Hampshire-painting-1150.jpg",
        dates: "c. 800 – c. 1600 AD",
        regions: "Mississippi River Valley, Eastern North America",
        videoUrl: "AV6wdz8tQTI",
        leaders: [],
        deities: [],
        events: [],
        books: [
            {
                title: "Cahokia: Ancient America's Great City on the Mississippi",
                author: "Timothy R. Pauketat",
                link: "https://www.goodreads.com/book/show/6403080-cahokia"
            },
            {
                title: "The Mississippian Emergence",
                author: "Bruce D. Smith",
                link: "https://www.goodreads.com/book/show/2743053-the-mississippian-emergence"
            }
        ]
    },
    {
        id: 22,
        name: "Ancient Nubia",
        description: "An ancient civilization located in what is now northern Sudan and southern Egypt, known for its pyramids, powerful queens, and advanced culture.",
        imageurl: "https://qph.cf2.quoracdn.net/main-qimg-9d85791471f0e5d03ae5f714343a17eb-lq",
        dates: "c. 2500 BC – 350 AD",
        regions: "Nile River Valley (Nubia)",
        latitude: 18.5609,
        longitude: 31.8103,
        videoUrl: "Tn9TU1Gen7k",
        leaders: [
            {
                name: "Amanirenas",
                title: "Kandake (Queen)",
                reign: "c. 40–10 BC"
            }
        ],
        deities: [
            {
                name: "Apedemak",
                description: "Lion-headed warrior god"
            }
        ],
        events: [
            {
                name: "Meroitic script development",
                description: "Development of their own unique writing system."
            }
        ],
        books: [
            {
                title: "Ancient Nubia: African Kingdoms on the Nile",
                author: "Marjorie M. Fisher",
                link: "https://www.goodreads.com/book/show/23719316-ancient-nubia"
            },
            {
                title: "Nubia: Ancient Kingdoms of Africa",
                author: "Joyce Tyldesley",
                link: "https://www.goodreads.com/book/show/120843.Nubia"
            }
        ]
    },
    {
        id: 23,
        name: "Inca Empire",
        description: "The largest empire in pre-Columbian America, known for its advanced road systems, terraced agriculture, and impressive architecture like Machu Picchu.",
        imageurl: "https://www.willkatravel.com/wp-content/uploads/2020/12/inperio-inca-1024x683.jpg",
        dates: "c. 1438 – 1533 AD",
        regions: "Andes Mountains, South America",
        latitude: -13.1631,
        longitude: -72.5450,
        videoUrl: "P3HKATyBye4",
        leaders: [
            {
                name: "Pachacuti",
                title: "Sapa Inca (Emperor)",
                reign: "1438–1471/1472"
            }
        ],
        deities: [
            {
                name: "Inti",
                description: "Sun god and patron deity of the Inca Empire"
            }
        ],
        events: [
            {
                name: "Spanish conquest",
                description: "Conquest by the Spanish led by Francisco Pizarro, leading to the empire's fall."
            }
        ],
        books: [
            {
                title: "The Last Days of the Incas",
                author: "Kim MacQuarrie",
                link: "https://www.goodreads.com/book/show/1077143.The_Last_Days_of_the_Incas"
            },
            {
                title: "Turn Right at Machu Picchu: Rediscovering the Lost City One Step at a Time",
                author: "Mark Adams",
                link: "https://www.goodreads.com/book/show/9808525-turn-right-at-machu-picchu"
            }
        ]
    },
    {
        id: 24,
        name: "Nok Culture",
        description: "An ancient civilization known for its remarkable terracotta sculptures, some of the oldest in Africa.",
        imageurl: "https://theafricanhistory.com/wp-content/uploads/2021/11/nok-culture-fr-img.jpg",
        dates: "c. 1000 BC – c. 300 AD",
        regions: "West Africa (modern-day Nigeria)",
        latitude: 9.5000,
        longitude: 8.0000,
        videoUrl: "YeyjAbPIgp4",
        leaders: [],
        deities: [],
        events: [
            {
                name: "Terracotta sculpture production",
                description: "The Nok people created elaborate terracotta sculptures, including human figures and animals."
            }
        ],
        books: [
            {
                title: "Nok: African Sculpture in Archaeological Context",
                author: "Peter Breunig",
                link: "https://www.goodreads.com/book/show/17342407-nok"
            },
            {
                title: "Nok Terracottas",
                author: "Ekpo Eyo",
                link: "https://www.goodreads.com/book/show/11959802-nok-terracottas"
            }
        ]
    },
    {
        id: 25,
        name: "Moche Culture",
        description: "A pre-Inca civilization in northern Peru known for its elaborate pottery, gold artifacts, and monumental pyramids.",
        imageurl: "https://www.peru.travel/contenido/experiencia/imagen/en/225/1.1/archaeological%20sites%20in%20chiclayo%20and%20surroundings.jpg",
        dates: "c. 100 – 800 AD",
        regions: "Northern coast of Peru",
        latitude: -7.7496,
        longitude: -79.1899,
        videoUrl: "yddY4830IYE",
        leaders: [],
        deities: [
            {
                name: "Ai Apaec",
                description: "A major deity, often depicted as a fanged figure"
            }
        ],
        events: [
            {
                name: "Construction of Huacas del Sol y de la Luna",
                description: "Massive adobe pyramid complexes."
            }
        ],
        books: [
            {
                title: "Moche Art and Archaeology in Ancient Peru",
                author: "Joanne Pillsbury",
                link: "https://www.goodreads.com/book/show/2668991-moche-art-and-archaeology-in-ancient-peru"
            },
            {
                title: "The Moche of Ancient Peru: Media and Messages",
                author: "Jeffrey Quilter",
                link: "https://www.goodreads.com/book/show/276231.The_Moche_of_Ancient_Peru"
            }
        ]
    },
    {
        id: 26,
        name: "Kingdom of Kush",
        description: "An ancient kingdom in Nubia, known for its pyramids, ironworking, and its powerful queens, or kandakes.",
        imageurl: "https://wildfiregames.com/forum/uploads/monthly_2018_03/5a9f42184b4de_Pharaohkingpiyepiankhi25thdynastyreceivingtributefromprinces1.thumb.jpg.1a682b41b98e70efa24e50ca3b1975a9.jpg",
        dates: "c. 1070 BC – c. 350 AD",
        regions: "Nubia (modern-day Sudan)",
        latitude: 18.5609,
        longitude: 31.8103,
        videoUrl: "CgLySwtZ9YU",
        leaders: [
            {
                name: "Amanitore",
                title: "Kandake (Queen)",
                reign: "c. 1–20 AD"
            }
        ],
        deities: [
            {
                name: "Amun",
                description: "Egyptian god, adopted by the Kushites"
            },
            {
                name: "Isis",
                description: "Egyptian goddess, adopted by the Kushites"
            }
        ],
        events: [
            {
                name: "Conquest of Egypt",
                description: "Kush briefly ruled over Egypt as the 25th Dynasty."
            }
        ],
        books: [
            {
                title: "The Kingdom of Kush: Handbook of the Napatan-Meroitic Civilization",
                author: "László Török",
                link: "https://www.goodreads.com/book/show/4552635-the-kingdom-of-kush"
            },
            {
                title: "The Kingdom of Kush: The Napatan and Meroitic Empires",
                author: "Derek A. Welsby",
                link: "https://www.goodreads.com/book/show/3784251-the-kingdom-of-kush"
            }
        ]
    },
    {
        id: 27,
        name: "Sumerian Civilization",
        description: "One of the earliest civilizations in Mesopotamia, known for its cuneiform script, ziggurat temples, and city-states.",
        imageurl: "https://assets.editorial.aetnd.com/uploads/2017/12/sumer-gettyimages-122216938.jpg",
        dates: "c. 4500 – 1900 BC",
        regions: "Southern Mesopotamia (modern-day Iraq)",
        latitude: 31.0000,
        longitude: 45.5000,
        videoUrl: "ogvfAWcp_UI",
        leaders: [
            {
                name: "Gilgamesh",
                title: "King of Uruk (semi-legendary)",
                reign: "c. 2700 BC"
            }
        ],
        deities: [
            {
                name: "An",
                description: "Sky god"
            },
            {
                name: "Enlil",
                description: "God of wind and air"
            },
            {
                name: "Inanna/Ishtar",
                description: "Goddess of love and war"
            }
        ],
        events: [
            {
                name: "Invention of cuneiform script",
                description: "Development of the first writing system."
            }
        ],
        books: [
            {
                title: "The Sumerians: Their History, Culture, and Character",
                author: "Samuel Noah Kramer",
                link: "https://www.goodreads.com/book/show/278694.The_Sumerians"
            },
            {
                title: "The Sumerian World",
                author: "Harriet Crawford",
                link: "https://www.goodreads.com/book/show/15954367-the-sumerian-world"
            }
        ]
    },
    {
        id: 28,
        name: "Atrahasis",
        description: "A Mesopotamian epic that recounts the creation of humankind and the Great Flood.",
        imageurl: "https://static.wikia.nocookie.net/jabibbles/images/5/53/Tiamat_and_Marduk.jpg/revision/latest?cb=20190321091549",
        dates: "c. 18th century BC", 
        regions: "Mesopotamia",
        latitude: 31.0000, 
        longitude: 45.5000,
        videoUrl: "xEokfCORmQw",
        leaders: [],
        deities: [],
        events: [
            {
                name: "The Great Flood",
                description: "A central event in the Atrahasis epic, mirroring other flood narratives."
            }
        ],
        books: [
            {
                title: "Myths from Mesopotamia: Creation, the Flood, Gilgamesh, and Others",
                author: "Stephanie Dalley",
                link: "https://www.goodreads.com/book/show/192609.Myths_from_Mesopotamia"
            },
            {
                title: "Atrahasis: The Babylonian Story of the Flood",
                author: "W. G. Lambert",
                link: "https://www.goodreads.com/book/show/1165898.Atrahasis"
            }
        ]
    },
    {
        id: 29,
        name: "Enuma Elish",
        description: "The Babylonian creation myth, recounting the birth of the gods and the creation of the world.",
        imageurl: "https://www.learnreligions.com/thmb/7cFW60oCtHz8rE-H9-ahEYwYquo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/clay-impression-of-a-cylinder-seal-depicting-adoration-scene-from-nippur-iraq-detail-akkadian-civilization-2330-2150-b-c-102520124-58988e835f9b5874ee8c3e31.jpg",
        videoUrl: "Q1Zj1Ttg3vM",
        books: [
            {
                title: "Myths from Mesopotamia: Creation, the Flood, Gilgamesh, and Others",
                author: "Stephanie Dalley",
                link: "https://www.goodreads.com/book/show/192609.Myths_from_Mesopotamia"
            },
            {
                title: "Enuma Elish: The Babylonian Creation Epic",
                author: "Timothy J. Stephany",
                link: "https://www.goodreads.com/book/show/23704643-enuma-elish"
            }
        ]
    }
];


const Civilizations = ({ onExpand }) => {
    const { favorites, addFavorite, removeFavorite } = useFavorites();
    const [civilizations, setCivilizations] = useState(initialCivilizations);
    const [expandedCivilizationId, setExpandedCivilizationId] = useState(null);
    const { searchQuery } = useSearch();

    const handleExpand = (id, books) => {
        if (expandedCivilizationId === id) {
            setExpandedCivilizationId(null);
            onExpand([]);
        } else {
            setExpandedCivilizationId(id);
            onExpand(books);
        }
    };

    const isFavorite = (id) => favorites.civilizations.some(item => item.id === id);

    const videoOptions = {
        width: '100%',
        playerVars: {
            autoplay: 0,
        },
    };

    const filteredCivilizations = civilizations.filter(civilization =>
        civilization.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        civilization.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        civilization.dates.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Container className="container-custom">
            <Row className="mt-4 row-custom">
                {filteredCivilizations.map(civilization => (
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
                ))}
            </Row>
        </Container>
    );
};

export default Civilizations;
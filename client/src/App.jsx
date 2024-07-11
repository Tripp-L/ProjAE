import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import Profile from './components/Profile';
import PinConfirm from './components/PinConfirm';
import Civilizations from './components/Civilizations';
import Events from './components/Events';
import Regions from './components/Regions';
import Artifacts from './components/Artifacts';
import BookRecommendation from './components/BookRecommendation';
import axios from 'axios';
import FavoriteProvider from './contexts/FavoriteContext';

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

function App() {
    const location = useLocation();
    const navigate = useNavigate();
    const [loggedIn, setLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const [bookRecommendations, setBookRecommendations] = useState([]);
    const [showBookRecommendations, setShowBookRecommendations] = useState(true);
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const checkLoginStatus = async () => {
            const accessToken = localStorage.getItem('access_token');
            if (accessToken) {
                try {
                    const response = await axios.get('/auth/profile', {
                        headers: {
                            Authorization: `Bearer ${accessToken}`
                        }
                    });
                    setLoggedIn(true);
                } catch (error) {
                    if (error.response && error.response.status === 401) {
                        try {
                            const refreshResponse = await axios.post('/auth/refresh', null, {
                                headers: {
                                    Authorization: `Bearer ${localStorage.getItem('refresh_token')}`
                                }
                            });
                            const { access_token } = refreshResponse.data;
                            localStorage.setItem('access_token', access_token);
                            setLoggedIn(true);
                        } catch (refreshError) {
                            setLoggedIn(false);
                            localStorage.removeItem('access_token');
                            localStorage.removeItem('refresh_token');
                            navigate('/login');
                        }
                    } else if (error.response && error.response.status === 404) {
                        setLoggedIn(true);
                    }
                }
            } else {
                setLoggedIn(false);
            }
            setLoading(false);
        };
        checkLoginStatus();
    }, [navigate]);

    const handleLoginSuccess = () => {
        setLoggedIn(true);
        navigate('/');
    };

    const handleLogout = () => {
        setLoggedIn(false);
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        navigate('/login');
    };

    const handlePinConfirmSuccess = () => {
        navigate('/profile');
    };

    const handleProfileCompletion = () => {
        navigate('/');
    };

    const handleExpandBooks = (books) => {
        setBookRecommendations(books);
    };

    const hideBookRecommendations = () => {
        setShowBookRecommendations(false);
    };

    const handleSearch = (query) => {
        if (!query) {
            setSearchResults([]);
            return;
        }

        const civilizations = initialCivilizations; 
        const artifacts = initialArtifacts; 
        const events = initialEvents; 
        const books = bookRecommendations;

        const results = [
            ...civilizations.filter(civilization =>
                civilization.name.toLowerCase().includes(query.toLowerCase())
            ).map(civilization => ({ ...civilization, type: 'civilization' })),

            ...artifacts.filter(artifact =>
                artifact.name.toLowerCase().includes(query.toLowerCase())
            ).map(artifact => ({ ...artifact, type: 'artifact' })),

            ...events.filter(event =>
                event.name.toLowerCase().includes(query.toLowerCase())
            ).map(event => ({ ...event, type: 'event' })),

            ...books.filter(book =>
                book.title.toLowerCase().includes(query.toLowerCase())
            ).map(book => ({ ...book, type: 'book' }))
        ];

        setSearchResults(results);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    const renderBookRecommendations = location.pathname.includes('/civilizations') || location.pathname.includes('/artifacts') || location.pathname.includes('/events');

    return (
        <FavoriteProvider>
            <div>
                {location.pathname !== '/signup' && location.pathname !== '/login' && location.pathname !== '/pin-confirm' && (
                    <>
                        <Header loggedIn={loggedIn} profile={null} onLogout={handleLogout} onSearch={handleSearch} />
                        <Navbar />
                    </>
                )}
                
                <Routes>
                    <Route path="/" element={loggedIn ? <Home onLogout={handleLogout} searchResults={searchResults} /> : <Navigate to="/login" />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
                    <Route path="/pin-confirm" element={<PinConfirm onPinConfirmSuccess={handlePinConfirmSuccess} />} />
                    <Route path="/profile" element={<Profile onProfileCompletion={handleProfileCompletion} />} />
                    <Route path="/civilizations" element={loggedIn ? <Civilizations onExpand={handleExpandBooks} /> : <Navigate to="/login" />} />
                    <Route path="/events" element={loggedIn ? <Events onExpand={handleExpandBooks} /> : <Navigate to="/login" />} />
                    <Route path="/regions/:id" element={loggedIn ? <Regions /> : <Navigate to="/login" />} />
                    <Route path="/regions" element={loggedIn ? <Regions /> : <Navigate to="/login" />} />
                    <Route path="/artifacts" element={loggedIn ? <Artifacts onExpand={handleExpandBooks} /> : <Navigate to="/login" />} />
                </Routes>

                {renderBookRecommendations && showBookRecommendations && (
                    <BookRecommendation books={bookRecommendations} onClose={hideBookRecommendations} />
                )}
            </div>
        </FavoriteProvider>
    );
}

export default App;

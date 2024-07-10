import React from 'react';
import { Chrono } from 'react-chrono';
import YouTube from 'react-youtube';
import './Timeline.css';

const civilizations = [
  {
    title: "Ancient China",
    cardTitle: "2070 BC – 1912 AD",
    cardDetailedText: "Ancient China was a civilization that started in ancient times along the Yellow River, Yangtze River, and other river basins in the fertile regions of East Asia.",
    cardSubtitle: "China, East Asia",
    media: {
      type: "IMAGE",
      source: {
        url: "https://images.nationalgeographic.org/image/upload/t_edhub_resource_key_image/v1638892506/EducationHub/photos/the-great-wall-of-china.jpg"
      }
    }
  },
  {
    title: "Atlantis",
    cardTitle: "~ 9,500 BC",
    cardDetailedText: "A legendary island civilization mentioned in Plato's dialogues, often depicted as an advanced society with unique technology and architecture.",
    cardSubtitle: "Richat Structure, West Nile, Africa",
    media: {
      type: "IMAGE",
      source: {
        url: "https://vvikipedia.co/images/thumb/2/24/Faeland_Alth%C3%B3an_artist_depiction_as_atlantis.jpg/800px-Faeland_Alth%C3%B3an_artist_depiction_as_atlantis.jpg"
      }
    }
  },
  {
    title: "Mesopotamia",
    cardTitle: "c. 3500 BC – 539 BC",
    cardDetailedText: "A region in the Middle East, often called the 'Cradle of Civilization,' where various cultures like the Sumerians, Akkadians, Babylonians, and Assyrians flourished.",
    cardSubtitle: "Modern-day Iraq, Kuwait, parts of Syria, Turkey, and Iran",
    media: {
      type: "IMAGE",
      source: {
        url: "https://cdn.britannica.com/20/13720-050-6ED7921E/reconstruction-ruins-Ishtar-Gate-Babylon-Al-Hillah-Iraq.jpg?w=300"
      }
    }
  },
  {
    title: "Ancient Egypt",
    cardTitle: "c. 3100 BC – 30 BC",
    cardDetailedText: "A civilization renowned for its pyramids, pharaohs, and intricate religious beliefs, located along the Nile River in northeastern Africa.",
    cardSubtitle: "Nile River Valley, Northeast Africa",
    media: {
      type: "IMAGE",
      source: {
        url: "https://i.natgeofe.com/n/535f3cba-f8bb-4df2-b0c5-aaca16e9ff31/giza-plateau-pyramids.jpg?w=1280&h=853"
      }
    }
  },
  {
    title: "Ancient Greece",
    cardTitle: "c. 2700 BC – 146 BC",
    cardDetailedText: "A civilization known for its philosophy, democracy, art, and architecture, comprising various city-states like Athens, Sparta, and Thebes.",
    cardSubtitle: "Greece, Aegean Islands, Asia Minor, Southern Italy",
    media: {
      type: "IMAGE",
      source: {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/The_Parthenon_in_Athens.jpg/300px-The_Parthenon_in_Athens.jpg"
      }
    }
  },
  {
    title: "Indus Valley Civilization",
    cardTitle: "c. 3300 – 1300 BC",
    cardDetailedText: "A Bronze Age civilization known for its advanced urban planning, standardized weights and measures, and enigmatic script.",
    cardSubtitle: "Northwest India and Pakistan",
    media: {
      type: "IMAGE",
      source: {
        url: "https://ruchikaliveblog.wordpress.com/wp-content/uploads/2017/09/untitled-design-3-2.png?w=1088"
      }
    }
  },
  {
    title: "Minoan Civilization",
    cardTitle: "c. 2700 – 1450 BC",
    cardDetailedText: "A Bronze Age civilization on the island of Crete, known for its elaborate palaces, vibrant frescoes, and maritime trade.",
    cardSubtitle: "Crete, Aegean Islands",
    media: {
      type: "IMAGE",
      source: {
        url: "https://cdn.sci.news/images/enlarge2/image_3552e-Knossos.jpg"
      }
    }
  },
  {
    title: "Olmec Civilization",
    cardTitle: "c. 1200 – 400 BC",
    cardDetailedText: "The earliest known major Mesoamerican civilization, known for their colossal stone heads and sophisticated artistic traditions.",
    cardSubtitle: "Gulf Coast of Mexico",
    media: {
      type: "IMAGE",
      source: {
        url: "https://images.nationalgeographic.org/image/upload/v1638892498/EducationHub/photos/olmec-head-statue.jpg"
      }
    }
  },
  {
    title: "Phoenician Civilization",
    cardTitle: "c. 1550 – 300 BC",
    cardDetailedText: "A seafaring civilization known for its maritime trade, alphabet, and establishment of colonies throughout the Mediterranean.",
    cardSubtitle: "Coastal Lebanon, Syria, and parts of North Africa",
    media: {
      type: "IMAGE",
      source: {
        url: "https://cdn.thecollector.com/wp-content/uploads/2020/09/oldest-written-phoenician-text-byblos.jpg?width=1400&quality=55"
      }
    }
  },
  {
    title: "Qin Dynasty",
    cardTitle: "221 – 206 BC",
    cardDetailedText: "The first unified Chinese empire, known for its centralized government, legalism, standardized writing system, and construction of the Great Wall of China.",
    cardSubtitle: "China",
    media: {
      type: "IMAGE",
      source: {
        url: "https://assets.editorial.aetnd.com/uploads/2017/12/terracotta-soldiers-gettyimages-534904337.jpg"
      }
    }
  },
  {
    title: "Roman Republic/Empire",
    cardTitle: "509 BC – 476 AD (Western Roman Empire)",
    cardDetailedText: "A civilization renowned for its law, engineering, military power, and expansive empire, transitioning from a republic to an empire.",
    cardSubtitle: "Italy, Mediterranean, Western Europe, North Africa, Near East",
    media: {
      type: "IMAGE",
      source: {
        url: "https://images.nationalgeographic.org/image/upload/v1638891605/EducationHub/photos/roman-forum.jpg"
      }
    }
  },
  {
    title: "Aztec Civilization",
    cardTitle: "c. 1345 – 1521 AD",
    cardDetailedText: "A Mesoamerican civilization known for its advanced engineering, complex mythology, and practice of human sacrifice.",
    cardSubtitle: "Central Mexico",
    media: {
      type: "IMAGE",
      source: {
        url: "https://cdn.britannica.com/24/171124-131-E50C5C3D/Chichen-Itza.jpg"
      }
    }
  },
  {
    title: "Maya Civilization",
    cardTitle: "c. 2600 BC – 900 AD",
    cardDetailedText: "A Mesoamerican civilization known for its advanced writing system, mathematics, astronomy, and impressive architecture.",
    cardSubtitle: "Southern Mexico, Guatemala, Belize, Honduras, El Salvador",
    media: {
      type: "IMAGE",
      source: {
        url: "https://media.licdn.com/dms/image/D4E12AQHS7Q_rGl4UMg/article-cover_image-shrink_720_1280/0/1680859965457?e=2147483647&v=beta&t=vVSG3aClqjPYiKrWVYpbHOfhpCCNlyjbDDjacxJ_HEA"
      }
    }
  },
  {
    title: "Persian Empire",
    cardTitle: "c. 550 – 330 BC",
    cardDetailedText: "A vast empire known for its tolerance of diverse cultures, efficient administration, and impressive infrastructure like the Royal Road.",
    cardSubtitle: "Iran, Mesopotamia, Egypt, Asia Minor",
    media: {
      type: "IMAGE",
      source: {
        url: "https://www.thoughtco.com/thmb/83lCUttgqWpVtlbKjOUkP1GG3uo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/6th-century-bc-darius-palace-ruins-in-persepolis--iran-693931982-5b943c2e46e0fb0025fb8c94.jpg"
      }
    }
  }
];

const events = [
  {
    title: "Battle of Thermopylae",
    cardTitle: "480 BC",
    cardDetailedText: "A famous battle in 480 BC during the Greco-Persian Wars where 300 Spartans and their allies made a heroic stand against a much larger Persian army.",
    cardSubtitle: "Symbol of courage against overwhelming odds.",
    media: {
      type: "IMAGE",
      source: {
        url: "https://i.natgeofe.com/n/54dc5398-d8f5-482d-81da-43ff8f78832f/RSThermopylae7_4x3.jpg"
      }
    }
  },
  {
    title: "Battle of Marathon",
    cardTitle: "490 BC",
    cardDetailedText: "A decisive battle in 490 BC where the Athenians defeated the Persians, marking a turning point in the Greco-Persian Wars.",
    cardSubtitle: "Crucial in preserving Greek independence and culture.",
    media: {
      type: "IMAGE",
      source: {
        url: "https://i.natgeofe.com/n/4fb4b638-3c21-4af1-9c3c-b82854b0ec00/roman-sarcophagus-persians-flee_16x9.jpg"
      }
    }
  },
  {
    title: "Fall of the Western Roman Empire",
    cardTitle: "476 AD",
    cardDetailedText: "The collapse of the Western Roman Empire in 476 AD, leading to the end of ancient Rome and the beginning of the Middle Ages.",
    cardSubtitle: "Transition from classical antiquity to the medieval period.",
    media: {
      type: "IMAGE",
      source: {
        url: "https://assets.editorial.aetnd.com/uploads/2014/01/gettyimages-802428712.jpg"
      }
    }
  },
  {
    title: "Warring States Period",
    cardTitle: "475-221 BC",
    cardDetailedText: "A period of intense political and military conflict among seven major Chinese states vying for dominance.",
    cardSubtitle: "Significant advancements in philosophy, military strategy, and technology.",
    media: {
      type: "IMAGE",
      source: {
        url: "https://cf.geekdo-images.com/8pa0aykUKcn-uJGvTeOy8A__itemrep/img/GO0w7qKfl4CBNAFpGjysF8FUu38=/fit-in/246x300/filters:strip_icc()/pic5027104.jpg"
      }
    }
  },
  {
    title: "Rise of the Akkadian Empire",
    cardTitle: "c. 2334-2279 BC",
    cardDetailedText: "Sargon of Akkad conquered Sumerian city-states, establishing the first known empire in history.",
    cardSubtitle: "Unified the region under a single ruler.",
    media: {
      type: "IMAGE",
      source: {
        url: "https://cdn.thecollector.com/wp-content/uploads/2023/09/akkadian-empire-rise-fall-768x442.jpg"
      }
    }
  },
  {
    title: "Peloponnesian War",
    cardTitle: "431-404 BC",
    cardDetailedText: "A protracted conflict between the Peloponnesian League (led by Sparta) and the Delian League (led by Athens).",
    cardSubtitle: "Reshaped the ancient Greek world.",
    media: {
      type: "IMAGE",
      source: {
        url: "https://images.nationalgeographic.org/image/upload/v1638891964/EducationHub/photos/peloponnesian-war.jpg"
      }
    }
  },
  {
    title: "Spanish Conquest of the Aztec Empire",
    cardTitle: "1519-1521",
    cardDetailedText: "Hernán Cortés and his Spanish conquistadors, aided by indigenous allies, conquered the Aztec Empire.",
    cardSubtitle: "Marked the end of the Aztec Empire and the beginning of Spanish colonial rule in Mexico.",
    media: {
      type: "IMAGE",
      source: {
        url: "https://i.natgeofe.com/n/b0debc40-a0eb-440c-8b81-40f871e53250/spanish-siege.jpg"
      }
    }
  }
];

// Combine and sort the events and civilizations by date

const combinedItems = [...civilizations, ...events].sort((a, b) => {
    const dateA = parseInt(a.cardTitle.split(' ')[0].replace(/[^0-9]/g, ''));
    const dateB = parseInt(b.cardTitle.split(' ')[0].replace(/[^0-9]/g, ''));
    const isADateA = a.cardTitle.includes("AD") ? 1 : -1;
    const isADateB = b.cardTitle.includes("AD") ? 1 : -1;
    return (dateA * isADateA) - (dateB * isADateB);
  });
  
  const TimelineComponent = () => {
    return (
      <div style={{ width: "100%", height: "800px" }}>
        <Chrono
          items={combinedItems}
          slideShow
          slideItemDuration={3000}
          mode="HORIZONTAL"
          cardHeight={300}
        >
          {combinedItems.map((item, index) => (
            <div key={index} className="chrono-icons">
              <img src={item.media?.source.url} alt={item.name || item.title} />
              {item.videoUrl && (
                <YouTube
                  videoId={item.videoUrl.split('embed/')[1]}
                  opts={{
                    height: '200',
                    width: '100%',
                    playerVars: {
                      autoplay: 0,
                    },
                  }}
                />
              )}
            </div>
          ))}
        </Chrono>
      </div>
    );
  };
  
  export default TimelineComponent;
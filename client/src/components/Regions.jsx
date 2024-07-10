import React, { useEffect, useRef, useState } from 'react';
import Globe from 'react-globe.gl';
import YouTube from 'react-youtube';
import * as THREE from 'three';
import './Regions.css';


const initialCivilizations = [
  {
    id: 1,
    name: "Ancient China",
    latitude: 35.8617,
    longitude: 104.1954,
    description: "Ancient China was a civilization that started in ancient times along the Yellow River, Yangtze River, and other river basins in the fertile regions of East Asia.",
    imageUrl: "https://images.nationalgeographic.org/image/upload/t_edhub_resource_key_image/v1638892506/EducationHub/photos/the-great-wall-of-china.jpg",
    videoUrl: "https://www.youtube.com/shorts/662DeiZOIic"
  },
  {
    id: 2,
    name: "Atlantis",
    latitude: 21.1147,
    longitude: 11.3943,
    description: "A legendary island civilization mentioned in Plato's dialogues, often depicted as an advanced society with unique technology and architecture.",
    imageUrl: "https://vvikipedia.co/images/thumb/2/24/Faeland_Alth%C3%B3an_artist_depiction_as_atlantis.jpg/800px-Faeland_Alth%C3%B3an_artist_depiction_as_atlantis.jpg"
  },
  {
    id: 3,
    name: "Mesopotamia",
    latitude: 33.2232,
    longitude: 43.6793,
    description: "A region in the Middle East, often called the 'Cradle of Civilization,' where various cultures like the Sumerians, Akkadians, Babylonians, and Assyrians flourished.",
    imageUrl: "https://cdn.britannica.com/20/13720-050-6ED7921E/reconstruction-ruins-Ishtar-Gate-Babylon-Al-Hillah-Iraq.jpg?w=300"
  },
  {
    id: 4,
    name: "Ancient Egypt",
    latitude: 26.8206,
    longitude: 30.8025,
    description: "A civilization renowned for its pyramids, pharaohs, and intricate religious beliefs, located along the Nile River in northeastern Africa.",
    imageUrl: "https://i.natgeofe.com/n/535f3cba-f8bb-4df2-b0c5-aaca16e9ff31/giza-plateau-pyramids.jpg?w=1280&h=853"
  },
  {
    id: 5,
    name: "Ancient Greece",
    latitude: 37.9838,
    longitude: 23.7275,
    description: "A civilization known for its philosophy, democracy, art, and architecture, comprising various city-states like Athens, Sparta, and Thebes.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/The_Parthenon_in_Athens.jpg/300px-The_Parthenon_in_Athens.jpg"
  },
  {
    id: 6,
    name: "Aztec Civilization",
    latitude: 19.4326,
    longitude: -99.1332,
    description: "A Mesoamerican civilization known for its advanced engineering, complex mythology, and practice of human sacrifice.",
    imageUrl: "https://cdn.britannica.com/24/171124-131-E50C5C3D/Chichen-Itza.jpg"
  },
  {
    id: 7,
    name: "Indus Valley Civilization",
    latitude: 30.3753,
    longitude: 69.3451,
    description: "A Bronze Age civilization known for its advanced urban planning, standardized weights and measures, and enigmatic script.",
    imageUrl: "https://ruchikaliveblog.wordpress.com/wp-content/uploads/2017/09/untitled-design-3-2.png?w=1088"
  },
  {
    id: 8,
    name: "Maya Civilization",
    latitude: 17.0702,
    longitude: -89.0612,
    description: "A Mesoamerican civilization known for its advanced writing system, mathematics, astronomy, and impressive architecture.",
    imageUrl: "https://media.licdn.com/dms/image/D4E12AQHS7Q_rGl4UMg/article-cover_image-shrink_720_1280/0/1680859965457?e=2147483647&v=beta&t=vVSG3aClqjPYiKrWVYpbHOfhpCCNlyjbDDjacxJ_HEA"
  },
  {
    id: 9,
    name: "Minoan Civilization",
    latitude: 35.2401,
    longitude: 24.8093,
    description: "A Bronze Age civilization on the island of Crete, known for its elaborate palaces, vibrant frescoes, and maritime trade.",
    imageUrl: "https://cdn.sci.news/images/enlarge2/image_3552e-Knossos.jpg"
  },
  {
    id: 10,
    name: "Olmec Civilization",
    latitude: 18.1519,
    longitude: -94.4236,
    description: "The earliest known major Mesoamerican civilization, known for their colossal stone heads and sophisticated artistic traditions.",
    imageUrl: "https://images.nationalgeographic.org/image/upload/v1638892498/EducationHub/photos/olmec-head-statue.jpg"
  },
  {
    id: 11,
    name: "Persian Empire",
    latitude: 32.4279,
    longitude: 53.6880,
    description: "A vast empire known for its tolerance of diverse cultures, efficient administration, and impressive infrastructure like the Royal Road.",
    imageUrl: "https://www.thoughtco.com/thmb/83lCUttgqWpVtlbKjOUkP1GG3uo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/6th-century-bc-darius-palace-ruins-in-persepolis--iran-693931982-5b943c2e46e0fb0025fb8c94.jpg"
  },
  {
    id: 12,
    name: "Phoenician Civilization",
    latitude: 33.8886,
    longitude: 35.4955,
    description: "A seafaring civilization known for its maritime trade, alphabet, and establishment of colonies throughout the Mediterranean.",
    imageUrl: "https://cdn.thecollector.com/wp-content/uploads/2020/09/oldest-written-phoenician-text-byblos.jpg?width=1400&quality=55"
  },
  {
    id: 13,
    name: "Qin Dynasty",
    latitude: 34.3416,
    longitude: 108.9398,
    description: "The first unified Chinese empire, known for its centralized government, legalism, standardized writing system, and construction of the Great Wall of China.",
    imageUrl: "https://assets.editorial.aetnd.com/uploads/2017/12/terracotta-soldiers-gettyimages-534904337.jpg"
  },
  {
    id: 14,
    name: "Roman Republic/Empire",
    latitude: 41.9028,
    longitude: 12.4964,
    description: "A civilization renowned for its law, engineering, military power, and expansive empire, transitioning from a republic to an empire.",
    imageUrl: "https://images.nationalgeographic.org/image/upload/v1638891605/EducationHub/photos/roman-forum.jpg"
  }
];

const events = [
  {
    title: "Battle of Thermopylae",
    latitude: 38.7931,
    longitude: 22.5309,
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
    latitude: 38.1483,
    longitude: 24.0139,
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
    latitude: 41.9028,
    longitude: 12.4964,
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
    latitude: 34.0522,
    longitude: 118.2437,
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
    latitude: 33.3152,
    longitude: 44.3661,
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
    latitude: 37.9838,
    longitude: 23.7275,
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
    latitude: 19.4326,
    longitude: -99.1332,
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

const labels = [
  { text: 'Asia', coordinates: [55, 85] },
  { text: 'Africa', coordinates: [13, 20] },
  { text: 'Europe', coordinates: [55, 30] },
  { text: 'North America', coordinates: [48, -105] },
  { text: 'South America', coordinates: [-6, -60] },
  { text: 'Australia', coordinates: [-20, 132] },
  { text: 'Antarctica', coordinates: [-80, 75] },
  { text: 'Pacific Ocean', coordinates: [0.0000, -160.0000] },
  { text: 'Atlantic Ocean', coordinates: [5.5, -30] },
  { text: 'Indian Ocean', coordinates: [-20, 80] },
  { text: 'Arctic Ocean', coordinates: [90.0000, 0.0000] },
];

function Regions() {
  const globeEl = useRef(null);
  const [selectedCivilization, setSelectedCivilization] = useState(null);

  useEffect(() => {
    if (globeEl.current) {
      globeEl.current.pointOfView({ lat: 20, lng: 0, altitude: 2.5 }, 2000);
    }
  }, []);

  const markers = [...initialCivilizations, ...events].map((item, index) => ({
    id: index,
    name: item.name || item.title,
    coordinates: [item.latitude, item.longitude],
    description: item.description || item.cardDetailedText,
    imageUrl: item.imageUrl || (item.media && item.media.source.url),
    videoUrl: item.videoUrl,
  }));

  const handleMarkerClick = (marker) => {
    setSelectedCivilization(marker);
  };

  return (
    <div style={{ position: 'relative', height: '100vh' }}>
      <Globe
        ref={globeEl}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-day.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        pointsData={markers}
        pointLat={(d) => d.coordinates[0]}
        pointLng={(d) => d.coordinates[1]}
        pointColor={() => 'red'}
        pointAltitude={0.035}
        pointRadius={0.8}
        pointResolution={12}
        pointLabel={(d) => `<div class="custom-label">${d.name}</div>`}
        onPointClick={handleMarkerClick}
        labelsData={labels}
        labelLat={(d) => d.coordinates[0]}
        labelLng={(d) => d.coordinates[1]}
        labelText={(d) => d.text}
        labelResolution={8}
        labelSize={2.5}
        labelColor={() => 'black'}
      />

      {selectedCivilization && (
        <div className="info-container" style={{ width: '400px', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', position: 'absolute', top: '10px', left: '10px', background: 'white', zIndex: 1000 }}>
          <h2>{selectedCivilization.name}</h2>
          <img src={selectedCivilization.imageUrl} alt={selectedCivilization.name} className="info-image" style={{ width: '100%', height: 'auto' }} />
          <p>{selectedCivilization.description}</p>
          {selectedCivilization.videoUrl && (
            <YouTube
              videoId={selectedCivilization.videoUrl.split('embed/')[1]}
              opts={{
                height: '200',
                width: '100%',
                playerVars: {
                  autoplay: 0,
                },
              }}
            />
          )}
          <button onClick={() => setSelectedCivilization(null)}>Close</button>
        </div>
      )}
    </div>
  );
}

export default Regions;
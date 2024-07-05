import React, { useState } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import './Artifacts.css';

const initialArtifacts = [
    {
        id: 1,
        civilization: "Ancient China",
        artifacts: [
            {
                name: "Terracotta Army",
                description: "A collection of terracotta sculptures depicting the armies of Qin Shi Huang, the first Emperor of China.",
                imageurl: "https://upload.wikimedia.org/wikipedia/commons/2/23/Terracotta_Army,_View_of_Pit_1.jpg"
            },
            {
                name: "Jade Burial Suit",
                description: "A ceremonial suit made of jade pieces sewn together with gold or silver thread, used for burials.",
                imageurl: "https://upload.wikimedia.org/wikipedia/commons/8/82/Jade_Burial_Suit_of_Prince_Liu_Sheng.jpg"
            }
        ]
    },
    {
        id: 2,
        civilization: "Atlantis",
        artifacts: [
            {
                name: "Orichalcum Ingot",
                description: "A rare and precious metal mentioned in Plato's writings, believed to be mined in Atlantis.",
                imageurl: "https://upload.wikimedia.org/wikipedia/commons/3/36/Orichalcum_ingots.jpg"
            }
        ]
    },
    // More artifacts data for other civilizations...
];

const Artifacts = () => {
    const [artifacts, setArtifacts] = useState(initialArtifacts);
    const [expandedArtifactId, setExpandedArtifactId] = useState(null);

    const handleExpand = (id) => {
        if (expandedArtifactId === id) {
            setExpandedArtifactId(null);
        } else {
            setExpandedArtifactId(id);
        }
    };

    return (
        <Container className="container-custom">
            <Row className="mt-4 row-custom">
                {artifacts.map(artifact => (
                    <Col key={artifact.id} xs={12} sm={6} md={4} lg={3} className="mb-4 col-custom">
                        <Card
                            className={`mb-3 card-custom ${expandedArtifactId === artifact.id ? 'expanded' : ''}`}
                            onClick={() => handleExpand(artifact.id)}
                        >
                            <Card.Body>
                                <Card.Title>{artifact.civilization}</Card.Title>
                                {expandedArtifactId === artifact.id && (
                                    <div className="expanded-content">
                                        {artifact.artifacts.map(item => (
                                            <div key={item.name}>
                                                <Card.Img variant="top" src={item.imageurl} className="card-img-top" />
                                                <Card.Text><strong>{item.name}</strong></Card.Text>
                                                <Card.Text>{item.description}</Card.Text>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Artifacts;

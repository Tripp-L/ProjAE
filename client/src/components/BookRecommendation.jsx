import React, { useState } from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import './BookRecommendation.css';

const BookRecommendation = ({ books }) => {
    const [collapsed, setCollapsed] = useState(false); // Changed to false to show books by default
    const [currentBookIndex, setCurrentBookIndex] = useState(0);

    const toggleCollapse = () => {
        setCollapsed(!collapsed);
    };

    const showNextBook = () => {
        setCurrentBookIndex((prevIndex) => (prevIndex + 1) % books.length);
    };

    const showPreviousBook = () => {
        setCurrentBookIndex((prevIndex) => (prevIndex - 1 + books.length) % books.length);
    };

    if (books.length === 0) {
        return null;
    }

    const currentBook = books[currentBookIndex];

    return (
        <div className={`book-recommendation-container ${collapsed ? 'collapsed' : 'expanded'}`}>
            <div className="toggle-button-container">
                <Button className="toggle-button" onClick={toggleCollapse}>
                    {collapsed ? 'Show Books' : 'Hide Books'}
                </Button>
            </div>
            {!collapsed && currentBook && (
                <div className="recommendations-content">
                    <h4 className="recommendation-title">Book Recommendations</h4>
                    <Container>
                        <Row className="mb-4">
                            <Col xs={12}>
                                <Card className="book-card card-custom">
                                    {currentBook.image && (
                                        <Card.Img variant="top" src={currentBook.image} className="book-image card-img-top" />
                                    )}
                                    <Card.Body>
                                        <div className="navigation-buttons">
                                            <Button variant="link" onClick={showPreviousBook}>&lt; Back</Button>
                                            <Button variant="link" onClick={showNextBook}>Next &gt;</Button>
                                        </div>
                                        <div className="buy-button">
                                            <Button variant="link" href={currentBook.link} target="_blank" rel="noopener noreferrer" className="buy-button-link">
                                                Buy Here!
                                            </Button>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </div>
            )}
        </div>
    );
};

export default BookRecommendation;

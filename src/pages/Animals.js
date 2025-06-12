import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const animals = [
  {
    id: 1,
    name: 'Tosi',
    breed: 'Američka akita',
    age: '2 godine',
    image: '/images/tosi.jpg'
  },
  {
    id: 2,
    name: 'Bucko',
    breed: 'Evropska mačka',
    age: '4 godine',
    image: '/images/bucko.jpg'
  },
  {
    id: 3,
    name: 'Felix',
    breed: 'Mješanac',
    age: '1 godina',
    image: '/images/feliks2.jpg'
  },
  {
    id: 4,
    name: 'Luna',
    breed: 'Zlatni retriver',
    age: '3 godine',
    image: '/images/luna.jpg'
  }
];

const Animals = () => {
  return (
    <Container className="py-5">
      <h2 className="text-center mb-5">Naše životinje za udomljavanje</h2>
      <Row>
        {animals.map(animal => (
          <Col key={animal.id} md={4} className="mb-4">
            <Card className="animal-card h-100">
              <Card.Img variant="top" src={animal.image} />
              <Card.Body>
                <Card.Title>{animal.name}</Card.Title>
                <Card.Text>
                  <strong>Rasa:</strong> {animal.breed}<br />
                  <strong>Starost:</strong> {animal.age}
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <Button as={Link} to={`/animals/${animal.id}`} variant="primary" className="w-100">
                  Saznaj više
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}

        {/* Dodatno mjesto za novu životinju */}
        <Col md={4} className="mb-4">
          <Card className="h-100 text-center d-flex align-items-center justify-content-center p-3 border-dashed">
            <Card.Body>
              <p>Dodaj novu životinju</p>
              <Button as={Link} to="/add-animal" variant="success">
                + Dodaj
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Animals;

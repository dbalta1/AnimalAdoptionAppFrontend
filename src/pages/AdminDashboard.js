import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const uloga = localStorage.getItem('uloga');
    if (uloga !== 'ADMIN') {
      navigate('/');
    }
  }, []);

  // Privremeni podaci za testiranje
  const pendingAnimals = [
    {
      id: 1,
      name: 'Rex',
      breed: 'Njemački ovčar',
      age: '3 godine',
      image: '/images/rex2.jpg',
      status: 'Na čekanju'
    },
    {
      id: 2,
      name: 'Mia',
      breed: 'Maltezer',
      age: '2 godine',
      image: '/images/mia2.jpg',
      status: 'Na čekanju'
    }
  ];

  const handleApprove = (animalId) => {
    console.log(`Odobreno: ${animalId}`);
    // Ovdje će ići API poziv za odobravanje
  };

  const handleReject = (animalId) => {
    console.log(`Odbijeno: ${animalId}`);
    // Ovdje će ići API poziv za odbijanje
  };

  return (
    <Container className="admin-dashboard my-5">
      <h1 className="text-center mb-5">Admin Dashboard</h1>

      <h2 className="mb-4">Zahtjevi za unos ljubimaca</h2>
      <Row>
        {pendingAnimals.map(animal => (
          <Col key={animal.id} md={6} className="mb-4">
            <Card>
              <Card.Img variant="top" src={animal.image} />
              <Card.Body>
                <Card.Title>{animal.name}</Card.Title>
                <Card.Text>
                  <strong>Rasa:</strong> {animal.breed}<br />
                  <strong>Starost:</strong> {animal.age}<br />
                  <strong>Status:</strong> {animal.status}
                </Card.Text>
                <div className="d-flex justify-content-between">
                  <Button variant="success" onClick={() => handleApprove(animal.id)}>
                    Odobri
                  </Button>
                  <Button variant="danger" onClick={() => handleReject(animal.id)}>
                    Odbij
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <h2 className="mt-5 mb-4">Statistika</h2>
      <Row>
        <Col md={4} className="mb-4">
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Ukupno ljubimaca</Card.Title>
              <Card.Text className="display-4">24</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Novih ovaj mjesec</Card.Title>
              <Card.Text className="display-4">5</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Udomljenih</Card.Title>
              <Card.Text className="display-4">12</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;

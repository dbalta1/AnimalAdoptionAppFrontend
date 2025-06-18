import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Card, Form, Button, Row, Col } from 'react-bootstrap';
import './DodajZivotinju.css';

const DodajZivotinju = () => {
    const [formData, setFormData] = useState({
        ime: '',
        velicina: '',
        rasa: '',
        energija: '',
        slaganjeSaDjecom: '',
        slaganjeSaDrugimZivotinjama: '',
        zdravstveniProblemi: '',
        lokacija: '',
        opis: '',
        slika: null
    });

    const [preview, setPreview] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({ ...prev, slika: file }));
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

const handleSubmit = async (e) => {
    e.preventDefault();

    const podaci = {
        sklonisteId: 1, // npr. testno sklonište
        ime: formData.ime,
        rasa: formData.rasa,
        velicina: formData.velicina,
        energicnost: formData.energija,
        vrsta: "Pas", // ili "Mačka" – dodaj input ako želiš
        spol: "MUŠKO", // dodaj spol ako treba
        godine: 2, // napravi polje ako treba
        slaganjeSaDjecom: formData.slaganjeSaDjecom === 'Da',
        slaganjeSaDrugimLjubimcima: formData.slaganjeSaDrugimZivotinjama === 'Da',
        zdravstveniProblemi: formData.zdravstveniProblemi === 'Da',
        lokacija: formData.lokacija,
        slika: preview || '' // Base64 string
    };

    try {
        const res = await fetch("http://localhost:8090/ljubimci", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("jwt")}`
            },
            body: JSON.stringify(podaci)
        });

        if (res.ok) {
            alert("Životinja uspješno dodana!");
            navigate("/");
        } else {
            alert("Greška prilikom dodavanja.");
        }
    } catch (err) {
        console.error(err);
        alert("Greška na serveru.");
    }
};

    return (
        <Container className="dodaj-zivotinju-container">
            <Row className="justify-content-center">
                <Col md={8}>
                    <Card className="dodaj-zivotinju-card">
                        <Card.Body>
                            <h2 className="dodaj-zivotinju-title">Dodaj životinju koju želiš udomiti</h2>
                            
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="image-upload-group">
                                    {preview ? (
                                        <img 
                                            src={preview} 
                                            alt="Preview" 
                                            className="image-preview"
                                        />
                                    ) : (
                                        <div className="image-placeholder">
                                            <span>Nema slike</span>
                                        </div>
                                    )}
                                    <Form.Control
                                        type="file"
                                        onChange={handleImageChange}
                                        accept="image/*"
                                        className="image-upload-input"
                                    />
                                </Form.Group>

                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="form-group">
                                            <Form.Label>Ime životinje</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="ime"
                                                value={formData.ime}
                                                onChange={handleChange}
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="form-group">
                                            <Form.Label>Rasa</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="rasa"
                                                value={formData.rasa}
                                                onChange={handleChange}
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="form-group">
                                            <Form.Label>Veličina</Form.Label>
                                            <Form.Select
                                                name="velicina"
                                                value={formData.velicina}
                                                onChange={handleChange}
                                            >
                                                <option value="Mali">Mali</option>
                                                <option value="Srednji">Srednji</option>
                                                <option value="Veliki">Veliki</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="form-group">
                                            <Form.Label>Nivo energije</Form.Label>
                                            <Form.Select
                                                name="energija"
                                                value={formData.energija}
                                                onChange={handleChange}
                                            >
                                                <option value="Niska">Niska</option>
                                                <option value="Srednja">Srednja</option>
                                                <option value="Visoka">Visoka</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="form-group">
                                            <Form.Label>Slaganje sa djecom</Form.Label>
                                            <Form.Select
                                                name="slaganjeSaDjecom"
                                                value={formData.slaganjeSaDjecom}
                                                onChange={handleChange}
                                            >
                                                <option value="Da">Da</option>
                                                <option value="Ne">Ne</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="form-group">
                                            <Form.Label>Slaganje sa drugim životinjama</Form.Label>
                                            <Form.Select
                                                name="slaganjeSaDrugimZivotinjama"
                                                value={formData.slaganjeSaDrugimZivotinjama}
                                                onChange={handleChange}
                                            >
                                                <option value="Da">Da</option>
                                                <option value="Ne">Ne</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="form-group">
                                            <Form.Label>Zdravstveni problemi</Form.Label>
                                            <Form.Select
                                                name="zdravstveniProblemi"
                                                value={formData.zdravstveniProblemi}
                                                onChange={handleChange}
                                            >
                                                <option value="Da">Da</option>
                                                <option value="Ne">Ne</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="form-group">
                                            <Form.Label>Lokacija</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="lokacija"
                                                value={formData.lokacija}
                                                onChange={handleChange}
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Form.Group className="form-group">
                                    <Form.Label>Opis</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={4}
                                        name="opis"
                                        value={formData.opis}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>

                                <div className="form-buttons">
                                    <Button 
                                        variant="secondary" 
                                        onClick={() => navigate('/')}
                                        className="back-button"
                                    >
                                        Nazad
                                    </Button>
                                    <Button 
                                        type="submit" 
                                        className="submit-button"
                                    >
                                        Sačuvaj
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};
export default DodajZivotinju;
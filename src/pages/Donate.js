import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import './Donate.css';

// Zamijeni sa svojim Stripe public key-em
const stripePromise = loadStripe("pk_test_51RZ5ZPDGfL0JJQwTjucsEZlidqGCpA8PetD8w1MwjFMiK0Sz0xSyVOXCak79fkwlLTdIZHZo82WNB7UnfnYJTJsU00A8TppXPi");

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [amount, setAmount] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement),
        billing_details: { email },
      });

      if (error) {
        setStatus({ type: 'error', message: error.message });
        return;
      }

      // Ovdje bi trebao pozvati backend da kreira PaymentIntent
      // Pošto backend još ne radiš, samo ćemo simulirati uspjeh:
      setStatus({ type: 'success', message: 'Donacija uspješno poslana! Hvala vam!' });
      setAmount('');
      setEmail('');
      elements.getElement(CardElement).clear();
    } catch (err) {
      setStatus({ type: 'error', message: err.message });
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="donation-form">
      <Form.Group controlId="formEmail">
        <Form.Label>Email adresa</Form.Label>
        <Form.Control 
          type="email" 
          placeholder="Unesite email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required 
        />
      </Form.Group>

      <Form.Group controlId="formAmount">
        <Form.Label>Iznos donacije (u EUR)</Form.Label>
        <Form.Control 
          type="number" 
          placeholder="Unesite iznos"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required 
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Podaci o kartici</Form.Label>
        <div className="card-element-wrapper">
          <CardElement />
        </div>
      </Form.Group>

      <Button 
        variant="warning" 
        type="submit" 
        disabled={!stripe} 
        className="mt-3"
      >
        Doniraj
      </Button>

      {status && (
        <Alert 
          variant={status.type === 'success' ? 'success' : 'danger'} 
          className="mt-3"
        >
          {status.message}
        </Alert>
      )}
    </Form>
  );
};

const Donate = () => {
  return (
    <Container className="py-5">
      <h2 className="text-center mb-4">Doniraj za pomoć životinjama</h2>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </Container>
  );
};

export default Donate;

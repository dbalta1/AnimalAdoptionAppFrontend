import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const AppNavbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeNavbar = () => {
    setExpanded(false);
  };

  return (
    <Navbar 
      bg="light" 
      expand="lg" 
      className={`sticky-top ${scrolled ? 'scrolled' : ''}`}
      expanded={expanded}
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center" onClick={closeNavbar}>
          <span 
            className="me-2 brand-text"
            style={{ 
              color: '#FF7F50',
              fontWeight: 'bold'
            }}
          >
            Second Chance Friends
          </span>
          <span className="paw-icon">🐾</span>
        </Navbar.Brand>
        
        <Navbar.Toggle 
          aria-controls="basic-navbar-nav" 
          onClick={() => setExpanded(expanded ? false : true)}
        />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
                
            <Nav.Link 
              as={Link} 
              to="/animals" 
              className={location.pathname === '/animals' ? 'active' : ''}
              onClick={closeNavbar}
            >
              Životinje
            </Nav.Link>
            
            <Nav.Link 
              as={Link} 
              to="/about" 
              className={location.pathname === '/about' ? 'active' : ''}
              onClick={closeNavbar}
            >
              O nama
            </Nav.Link>      
            
            <Nav.Link 
              as={Link} 
              to="/login" 
              className={location.pathname === '/login' ? 'active' : ''}
              onClick={closeNavbar}
            >                
              Prijava
            </Nav.Link>
            
            <Nav.Link 
              as={Link} 
              to="/register" 
              className={`register-link ${location.pathname === '/register' ? 'active-register' : ''}`}
              onClick={closeNavbar}
            >
              Registracija
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;

/*
import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AppNavbar = () => {
  const { currentUser, logout } = useAuth();

  return (
    <Navbar bg="light" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold text-orange">
          Second Chance Friends
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Početna</Nav.Link>
            <Nav.Link as={Link} to="/animals">Ljubimci</Nav.Link>
            <Nav.Link as={Link} to="/about">O nama</Nav.Link>
            <Nav.Link as={Link} to="/volunteer">Volontiraj</Nav.Link>
            <Nav.Link as={Link} to="/donate">Doniraj</Nav.Link>
            
            {/* Admin link - prikazuje se samo adminima }
            {currentUser?.role === 'admin' && (
              <Nav.Link as={Link} to="/admin">Admin</Nav.Link>
            )}
          </Nav>
          <Nav>
            {currentUser ? (
              <NavDropdown 
                title={currentUser.name || "Profil"} 
                id="basic-nav-dropdown"
                align="end"
              >
                <NavDropdown.Item as={Link} to="/profile">
                  Moj profil
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logout}>
                  Odjavi se
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">Prijava</Nav.Link>
                <Nav.Link as={Link} to="/register">Registracija</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
*/
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Volunteer.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Volunteer = () => {
  const [formData, setFormData] = useState({
    motivacija: '',
    datumOd: '',
    lokacija: ''
  });

  const [volonter, setVolonter] = useState(null);
  const [akcije, setAkcije] = useState([]);
  const [loading, setLoading] = useState({
    akcije: false,
    volonter: false,
    prijava: false,
    registracija: false
  });
  const [error, setError] = useState(null);

  const loggedInUserId = 22; // simulacija logovanog korisnika

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(prev => ({ ...prev, akcije: true }));
        const akcijeResponse = await axios.get('http://localhost:8090/akcije');
        setAkcije(akcijeResponse.data);

        setLoading(prev => ({ ...prev, volonter: true }));
        try {
          const volonterResponse = await axios.get(`http://localhost:8090/volonteri/korisnik/${loggedInUserId}`);
          setVolonter(volonterResponse.data);
        } catch (volonterError) {
          console.log('Korisnik nije volonter:', volonterError.message);
          setVolonter(null); // Eksplicitno postavljamo na null ako nije volonter
        }
      } catch (err) {
        console.error('Greška pri dohvatu podataka:', err);
        setError(err.response?.data?.message || 'Došlo je do greške pri učitavanju podataka');
        toast.error('Greška pri učitavanju podataka');
      } finally {
        setLoading(prev => ({ ...prev, akcije: false, volonter: false }));
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(prev => ({ ...prev, registracija: true }));
    setError(null);

    try {
      // Prvo registrujemo korisnika kao volontera
      const res = await axios.post('http://localhost:8090/volonteri', {
        korisnikId: loggedInUserId,
        datumVolontiranja: formData.datumOd
      });

      // Zatim dohvatimo kompletan volonter objekt
      const volonterResponse = await axios.get(`http://localhost:8090/volonteri/korisnik/${loggedInUserId}`);
      setVolonter(volonterResponse.data);
      
      toast.success('Uspješno ste se registrovali kao volonter!');
      setFormData({ motivacija: '', datumOd: '', lokacija: '' });

      // Ponovno dohvaćanje akcija
      const akcijeResponse = await axios.get('http://localhost:8090/akcije');
      setAkcije(akcijeResponse.data);
    } catch (err) {
      console.error('Greška pri registraciji:', err);
      const poruka = err.response?.data?.message || 'Došlo je do greške prilikom registracije';
      setError(poruka);
      toast.error(poruka);
    } finally {
      setLoading(prev => ({ ...prev, registracija: false }));
    }
  };

  const handlePrijava = async (akcijaId) => {
    if (!volonter) {
      toast.error('Morate biti registrovani volonter da biste se prijavili na akciju');
      return;
    }

    try {
      setLoading(prev => ({ ...prev, prijava: true }));
      
      const response = await axios.post('http://localhost:8090/volonterAkcija', {
        volonterId: volonter.id,
        akcijaId: akcijaId,
        datumAkcije: new Date().toISOString().split('T')[0]
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.data.message) {
        toast.success(response.data.message);
        // Ažuriranje liste akcija bez refresh-a
        const res = await axios.get('http://localhost:8090/akcije');
        setAkcije(res.data);
      } else {
        toast.error("Neočekivani odgovor od servera");
      }
    } catch (err) {
      console.error("Greška pri prijavi na akciju:", err);
      let errorMsg = 'Došlo je do greške';
      if (err.response) {
        if (err.response.status === 404) {
          errorMsg = "Endpoint nije pronađen (404)";
        } else {
          errorMsg = err.response.data?.error || err.response.data?.message || err.response.statusText;
        }
      }
      toast.error(errorMsg);
    } finally {
      setLoading(prev => ({ ...prev, prijava: false }));
    }
  };

  if (loading.akcije && akcije.length === 0) {
    return <div className="loading">Učitavanje podataka...</div>;
  }

  return (
    <div className="volunteer-container">
      <h1 className="volunteer-header">Volontiraj s nama</h1>

      {!volonter ? (
        <>
          <p className="volunteer-subheader">
            Da biste se prijavili za volontiranje, popunite ovu kratku prijavu.
          </p>
          <form onSubmit={handleSubmit} className="volunteer-form">
            <div className="form-group">
              <label className="form-label">
                Šta te motivira da volontiraš u skloništima za napuštene životinje?
              </label>
              <textarea
                name="motivacija"
                value={formData.motivacija}
                onChange={handleChange}
                required
                className="form-textarea"
              />
            </div>
            <div className="form-group">
              <label className="form-label">
                Kada si slobodan za volontiranje?
              </label>
              <input
                type="date"
                name="datumOd"
                value={formData.datumOd}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                U kojim gradovima ti najviše odgovara da volontiraš?
              </label>
              <input
                type="text"
                name="lokacija"
                value={formData.lokacija}
                onChange={handleChange}
                className="form-input"
              />
            </div>
            <button
              type="submit"
              className="submit-button"
              disabled={loading.registracija}
            >
              {loading.registracija ? 'Registracija u toku...' : 'Postani volonter'}
            </button>
          </form>
        </>
      ) : (
        <>
          <h2 className="volunteer-subheader">Dostupne volonterske akcije</h2>
          {loading.akcije ? (
            <p className="loading">Učitavanje akcija...</p>
          ) : akcije.length === 0 ? (
            <p className="no-actions">Trenutno nema dostupnih akcija.</p>
          ) : (
            <ul className="actions-list">
              {akcije.map((akcija) => (
                <li key={akcija.id} className="action-card">
                  <h3 className="action-title">{akcija.nazivAkcije}</h3>
                  <p className="action-detail">
                    <strong>Datum:</strong> {new Date(akcija.datumAkcije).toLocaleDateString()}
                  </p>
                  <p className="action-detail">
                    <strong>Lokacija:</strong> {akcija.lokacija}
                  </p>
                  <p className="action-detail">
                    <strong>Opis:</strong> {akcija.opisDogadjaja}
                  </p>
                  <button
                    onClick={() => handlePrijava(akcija.id)}
                    className="action-button"
                    disabled={loading.prijava}
                  >
                    {loading.prijava ? 'Prijava u toku...' : 'Prijavi se'}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </>
      )}

      <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default Volunteer;
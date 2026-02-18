import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Droplets, Thermometer, Wind, Sprout, MapPin, Calculator, Loader2 } from 'lucide-react';

const YieldPrediction = () => {
    const [formData, setFormData] = useState({
        temperature: '',
        rainfall: '',
        humidity: '',
        soil_type: '',
        crop_type: '',
        land_area: '',
        unit: 'acre'
    });

    const [loading, setLoading] = useState(false);
    const [weatherLoading, setWeatherLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');

    const soilTypes = ['Alluvial', 'Red Soil', 'Black Soil', 'Mountain Soil', 'Laterite', 'Desert', 'Clay', 'Sandy', 'Loamy'];
    const cropTypes = ['Rice', 'Maize', 'Chickpea', 'Kidneybeans', 'Pigeonpeas', 'Mothbeans', 'Mungbean', 'Blackgram', 'Lentil', 'Pomegranate', 'Banana', 'Mango', 'Grapes', 'Watermelon', 'Muskmelon', 'Apple', 'Orange', 'Papaya', 'Coconut', 'Cotton', 'Jute', 'Coffee', 'Sugarcane', 'Wheat', 'Millet', 'Soybean', 'Potato', 'Tomato', 'Onion', 'Tea', 'Rubber', 'Mustard'];

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const fetchWeather = () => {
        if (!navigator.geolocation) {
            setError('Geolocation is not supported by your browser');
            return;
        }

        setWeatherLoading(true);
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                try {
                    const { latitude, longitude } = position.coords;
                    // Updated URL to point to backend running on localhost:5000
                    const response = await axios.post('/api/weather', { latitude, longitude });
                    setFormData(prev => ({
                        ...prev,
                        temperature: response.data.temperature,
                        rainfall: response.data.rainfall,
                        humidity: response.data.humidity
                    }));
                    setError('');
                } catch (err) {
                    setError('Failed to fetch weather data. Please enter manually.');
                    console.error(err);
                } finally {
                    setWeatherLoading(false);
                }
            },
            (err) => {
                setError('Location access denied. Please enter weather manually.');
                setWeatherLoading(false);
            }
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setResult(null);

        try {
            const response = await axios.post('/api/predict-yield', formData);
            setResult(response.data);
        } catch (err) {
            setError('Prediction failed. Please check your inputs and try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container" style={{ padding: '40px 20px', minHeight: '80vh' }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card"
                style={{ maxWidth: '800px', margin: '0 auto' }}
            >
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '2.5rem', color: 'var(--primary-dark)' }}>Crop Yield Prediction</h2>
                    <p style={{ color: 'var(--text-light)' }}>Enter environmental and soil data to predict your harvest potential.</p>
                </div>

                {error && (
                    <div style={{ background: '#ffebee', color: '#c62828', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', border: '1px solid #ffcdd2' }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>

                        {/* Weather Inputs */}
                        <div className="input-group">
                            <label><Thermometer size={16} style={{ marginRight: '8px' }} />Temperature (°C)</label>
                            <input type="number" step="0.1" name="temperature" value={formData.temperature} onChange={handleChange} required placeholder="e.g. 26.5" />
                        </div>

                        <div className="input-group">
                            <label><Droplets size={16} style={{ marginRight: '8px' }} />Rainfall (mm)</label>
                            <input type="number" step="0.1" name="rainfall" value={formData.rainfall} onChange={handleChange} required placeholder="e.g. 120" />
                        </div>

                        <div className="input-group">
                            <label><Wind size={16} style={{ marginRight: '8px' }} />Humidity (%)</label>
                            <input type="number" step="0.1" name="humidity" value={formData.humidity} onChange={handleChange} required placeholder="e.g. 60" />
                        </div>

                        {/* Weather Button */}
                        <div style={{ display: 'flex', alignItems: 'flex-end', marginBottom: '1.5rem' }}>
                            <button
                                type="button"
                                onClick={fetchWeather}
                                className="btn-secondary"
                                style={{ width: '100%', padding: '0.8rem', justifyContent: 'center', display: 'flex', gap: '0.5rem', alignItems: 'center' }}
                                disabled={weatherLoading}
                            >
                                {weatherLoading ? <Loader2 size={18} className="spin" /> : <MapPin size={18} />}
                                {weatherLoading ? 'Fetching...' : 'Get Local Weather'}
                            </button>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                        <div className="input-group">
                            <label>Crop Type</label>
                            <select name="crop_type" value={formData.crop_type} onChange={handleChange} required>
                                <option value="">Select Crop</option>
                                {cropTypes.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>

                        <div className="input-group">
                            <label>Soil Type</label>
                            <select name="soil_type" value={formData.soil_type} onChange={handleChange} required>
                                <option value="">Select Soil</option>
                                {soilTypes.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>

                        <div className="input-group">
                            <label><Calculator size={16} style={{ marginRight: '8px' }} />Land Area</label>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <input type="number" step="0.01" name="land_area" value={formData.land_area} onChange={handleChange} required placeholder="e.g. 5" />
                                <select name="unit" value={formData.unit} onChange={handleChange} style={{ width: '120px' }}>
                                    <option value="acre">Acres</option>
                                    <option value="hectare">Hectares</option>
                                    <option value="cent">Cents</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                        <button type="submit" className="btn-primary" disabled={loading} style={{ width: '100%', maxWidth: '300px', justifyContent: 'center' }}>
                            {loading ? 'Predicting...' : 'Predict Yield'}
                        </button>
                    </div>
                </form>

                {result && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(255, 255, 255, 0.6)', borderRadius: '12px', border: '1px solid var(--primary)' }}
                    >
                        <h3 style={{ borderBottom: '2px solid var(--primary)', paddingBottom: '0.5rem', marginBottom: '1rem', color: 'var(--primary)' }}>Prediction Results</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                            <div style={{ padding: '1rem', background: 'white', borderRadius: '8px', textAlign: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                                <div style={{ fontSize: '0.9rem', color: '#666' }}>Yield per Hectare</div>
                                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary-dark)' }}>{result.yield_per_hectare}</div>
                            </div>
                            <div style={{ padding: '1rem', background: 'white', borderRadius: '8px', textAlign: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                                <div style={{ fontSize: '0.9rem', color: '#666' }}>Total Yield for Area</div>
                                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--secondary)' }}>{result.total_yield_kg}</div>
                            </div>
                        </div>
                        {result.advisory && (
                            <div style={{ marginTop: '1rem', padding: '1rem', background: '#e8f5e9', borderRadius: '8px', borderLeft: '4px solid var(--primary)' }}>
                                <strong>Advisory:</strong> {result.advisory}
                            </div>
                        )}
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
};

export default YieldPrediction;

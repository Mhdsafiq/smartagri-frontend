import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Upload, X, Check, AlertTriangle, Sprout } from 'lucide-react';

const FertilizerRecommendation = () => {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [landArea, setLandArea] = useState(1.0);
    const [unit, setUnit] = useState('acre');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
            setResult(null);
            setError('');
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const selectedFile = e.dataTransfer.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
            setResult(null);
            setError('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            setError('Please upload an image first.');
            return;
        }

        setLoading(true);
        const formData = new FormData();
        formData.append('image', file);
        formData.append('land_area', landArea);
        formData.append('unit', unit);

        try {
            const response = await axios.post('https://smartagri-backend.onrender.com/api/predict-fertilizer', formData, {
s

                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setResult(response.data);
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.error || 'Failed to analyze image. Please try again.');
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
                    <h2 style={{ fontSize: '2.5rem', color: 'var(--primary-dark)' }}>Plant Health & Fertilizer</h2>
                    <p style={{ color: 'var(--text-light)' }}>Upload a leaf image to detect diseases and get fertilizer recommendations.</p>
                </div>

                <div className="upload-section"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleDrop}
                    style={{
                        border: '2px dashed #ccc',
                        borderRadius: '12px',
                        padding: '2rem',
                        textAlign: 'center',
                        background: '#fafafa',
                        cursor: 'pointer',
                        transition: 'border 0.3s ease',
                        marginBottom: '2rem'
                    }}
                >
                    {!preview ? (
                        <>
                            <Upload size={48} color="#aaa" />
                            <p style={{ marginTop: '1rem', color: '#666' }}>Drag & Drop your image here or <span style={{ color: 'var(--primary)', fontWeight: '600' }}>Browse</span></p>
                            <input type="file" onChange={handleFileChange} style={{ display: 'none' }} id="file-upload" accept="image/*" />
                            <label htmlFor="file-upload" className="btn-secondary" style={{ marginTop: '1rem', display: 'inline-block' }}>Select Image</label>
                        </>
                    ) : (
                        <div style={{ position: 'relative', display: 'inline-block' }}>
                            <img src={preview} alt="Preview" style={{ maxHeight: '300px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} />
                            <button
                                onClick={() => { setFile(null); setPreview(null); setResult(null); }}
                                style={{ position: 'absolute', top: '-10px', right: '-10px', background: '#ff5252', color: 'white', borderRadius: '50%', padding: '5px', width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            >
                                <X size={16} />
                            </button>
                        </div>
                    )}
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', marginBottom: '2rem' }}>
                    <div className="input-group">
                        <label>Land Area</label>
                        <input type="number" step="0.01" value={landArea} onChange={(e) => setLandArea(e.target.value)} required />
                    </div>
                    <div className="input-group">
                        <label>Unit</label>
                        <select value={unit} onChange={(e) => setUnit(e.target.value)}>
                            <option value="acre">Acres</option>
                            <option value="hectare">Hectares</option>
                            <option value="cent">Cents</option>
                        </select>
                    </div>
                </form>

                {error && (
                    <div style={{ background: '#ffebee', color: '#c62828', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', textAlign: 'center' }}>
                        <AlertTriangle style={{ verticalAlign: 'middle', marginRight: '8px' }} />
                        {error}
                    </div>
                )}

                <div style={{ textAlign: 'center' }}>
                    <button onClick={handleSubmit} className="btn-primary" disabled={loading || !file} style={{ width: '100%', maxWidth: '300px' }}>
                        {loading ? 'Analyzing...' : 'Analyze Crop'}
                    </button>
                </div>

                {result && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="result-card"
                        style={{ marginTop: '2rem', padding: '2rem', background: 'white', borderRadius: '12px', boxShadow: 'var(--shadow-lg)' }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                            {result.crop_detected ? (
                                <div style={{ background: '#e8f5e9', padding: '0.5rem 1rem', borderRadius: '50px', color: 'var(--primary-dark)', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Sprout size={20} />
                                    Detected: {result.crop_type} ({result.crop_confidence * 100}%)
                                </div>
                            ) : (
                                <div style={{ background: '#ffebee', padding: '0.5rem 1rem', borderRadius: '50px', color: '#c62828', fontWeight: '600' }}>
                                    Crop Not Detected Clearly
                                </div>
                            )}
                        </div>

                        {result.crop_detected && (
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                                <div>
                                    <h4 style={{ color: '#555', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>Diagnosis</h4>
                                    <div style={{ fontSize: '1.2rem', fontWeight: 'bold', margin: '0.5rem 0', color: result.deficiency === 'Healthy' ? 'var(--primary)' : '#d32f2f' }}>
                                        {result.deficiency}
                                    </div>
                                    <p style={{ color: '#777' }}>Severity: <span style={{ fontWeight: '600' }}>{result.severity}</span></p>
                                </div>

                                <div>
                                    <h4 style={{ color: '#555', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>Recommended Action</h4>
                                    <div style={{ fontSize: '1.2rem', fontWeight: 'bold', margin: '0.5rem 0', color: 'var(--secondary)' }}>
                                        {result.fertilizer}
                                    </div>
                                    <p style={{ color: '#777' }}>Quantity: <span style={{ fontWeight: '600', color: '#333' }}>{result.recommended_quantity}</span></p>
                                </div>
                            </div>
                        )}

                        <div style={{ marginTop: '1.5rem', background: '#f9f9f9', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid var(--primary)' }}>
                            <h5 style={{ margin: '0 0 0.5rem 0' }}>AI Advisory</h5>
                            <p style={{ margin: 0, color: '#555' }}>{result.advisory}</p>
                        </div>
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
};

export default FertilizerRecommendation;

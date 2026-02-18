import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sprout, Leaf, BarChart2 } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.5 }}
        className="glass-card"
        style={{ textAlign: 'center', transition: 'transform 0.3s ease' }}
    >
        <div style={{ background: 'rgba(46, 125, 50, 0.1)', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
            <Icon size={32} color="var(--primary)" />
        </div>
        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{title}</h3>
        <p style={{ color: 'var(--text-light)' }}>{description}</p>
    </motion.div>
);

const Home = () => {
    return (
        <div className="home-container">
            {/* Hero Section */}
            <section className="hero" style={{
                textAlign: 'center',
                padding: '120px 20px',
                background: 'linear-gradient(rgba(255,255,255,0.8), rgba(255,255,255,0.8)), url("https://images.unsplash.com/photo-1625246333195-f8d966265d93?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed'
            }}>
                <div className="container">
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="badge"
                        style={{
                            background: '#e8f5e9',
                            color: 'var(--primary)',
                            padding: '0.5rem 1rem',
                            borderRadius: '50px',
                            fontWeight: 600,
                            fontSize: '0.9rem',
                            letterSpacing: '1px',
                            textTransform: 'uppercase',
                            display: 'inline-block',
                            marginBottom: '1rem'
                        }}
                    >
                        AI-Powered Agriculture
                    </motion.span>

                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '1.5rem', color: '#1a472a', fontWeight: 800 }}
                    >
                        Farming Intelligence for <br /> <span style={{ color: 'var(--primary)' }}>Suggesting Better Yields</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        style={{ fontSize: '1.25rem', color: '#444', maxWidth: '700px', margin: '0 auto 2.5rem', lineHeight: '1.8' }}
                    >
                        Maximize your harvest with precise yield predictions and diagnose crop health instantly with our advanced leaf analysis technology.
                    </motion.p>

                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}
                    >
                        <Link to="/yield" className="btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem', borderRadius: '50px' }}>
                            Start Prediction
                        </Link>
                        <Link to="/fertilizer" className="btn-secondary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem', borderRadius: '50px', background: 'white' }}>
                            Check Health
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features" style={{ padding: '100px 0', background: 'white' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                        <FeatureCard
                            icon={BarChart2}
                            title="Yield Prediction"
                            description="Input environmental factors like rainfall, temperature, and soil type to get accurate yield forecasts based on historical data."
                            delay={0.2}
                        />
                        <FeatureCard
                            icon={Leaf}
                            title="Disease Detection"
                            description="Upload a photo of your crop's leaf to instantly identify diseases or nutrient deficiencies using computer vision."
                            delay={0.4}
                        />
                        <FeatureCard
                            icon={Sprout}
                            title="Smart Recommendations"
                            description="Receive tailored fertilizer suggestions and actionable advice to improve crop health and boost productivity."
                            delay={0.6}
                        />
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;

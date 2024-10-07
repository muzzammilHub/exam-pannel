import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleStartExam = () => {
    navigate('/exam');
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Exam Platform</h1>
      <button style={styles.button} onClick={handleStartExam}>Start Exam</button>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f0f0',
  },
  header: {
    fontSize: '3rem',
    marginBottom: '20px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '1.5rem',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  }
};

export default Home;

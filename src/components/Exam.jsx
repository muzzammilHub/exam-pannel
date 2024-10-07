import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Exam = () => {
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [violations, setViolations] = useState(0); // Track violations
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal visibility state
  const [escapePressCount, setEscapePressCount] = useState(0); // Track escape presses
  const navigate = useNavigate();

  useEffect(() => {
    // Start full-screen mode when the component mounts
    startFullScreen();

    // Countdown timer
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timer);
          alert('Time is up! Submitting the exam.');
          navigate('/');
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    // Add event listener for fullscreen change
    document.addEventListener('fullscreenchange', handleFullScreenChange);
    // Add event listener for keydown to detect Escape press
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      // Clean up event listeners on component unmount
      clearInterval(timer);
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [escapePressCount]);

  const handleFullScreenChange = () => {
    // If full-screen is exited
    if (!document.fullscreenElement) {
      if (escapePressCount === 0) {
        // On first exit attempt, show modal
        setIsModalVisible(true);
        setEscapePressCount(1);  // Set escape press count to 1 after first attempt
        setViolations((prev) => prev + 1); // Increment violations on first escape
      } else if (escapePressCount === 1) {
        // If escape is pressed again, terminate the exam
        alert('You have exited the full-screen mode twice. The exam is now terminated.');
        navigate('/');
      }
    }
  };

  const handleKeyDown = (e) => {
    // Detect Escape key press
    if (e.key === 'Escape' && document.fullscreenElement) {
      e.preventDefault(); // Prevent exiting full-screen mode on the first escape press
    }
  };

  const startFullScreen = () => {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    }
  };

  const handleReturnToFullScreen = () => {
    setIsModalVisible(false); // Hide modal
    startFullScreen(); // Return to full-screen mode
  };

  // Convert timeLeft to minutes and seconds for display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div style={styles.examContainer}>
      <h1 style={styles.heading}>Exam in Progress</h1>
      <h2 style={styles.timer}>Time Left: <span>{formatTime(timeLeft)}</span></h2>
      <h3 style={styles.violations}>Violations: {violations}</h3>

      {isModalVisible && (
        <div style={styles.modal}>
          <h2>You have attempted to exit full-screen mode!</h2>
          <p>Press the button below to continue the exam in full-screen mode.</p>
          <button style={styles.modalButton} onClick={handleReturnToFullScreen}>
            Return to Full-Screen
          </button>
        </div>
      )}
    </div>
  );
};

const styles = {
  examContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f4f4f4',
  },
  heading: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
  },
  timer: {
    fontSize: '2rem',
    color: 'red',
  },
  violations: {
    fontSize: '1.5rem',
  },
  modal: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  modalButton: {
    padding: '0.5rem 1.5rem',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default Exam;

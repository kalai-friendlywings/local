import React, { useState, useEffect } from 'react';

const MessageModal = ({ message, onClose }) => {
  if (!message) return null;
  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modal}>
        <p style={styles.modalText}>{message}</p>
        <button style={styles.modalButton} onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

const Spinner = () => (
  <svg style={styles.spinner} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" opacity="0.25" />
    <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.37 0 0 5.37 0 12h4zm2 5.29A8 8 0 014 12H0c0 3.04 1.13 5.82 3 7.94l3-2.65z" opacity="0.75" />
  </svg>
);

const PaymentPage = () => {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [profile, setProfile] = useState({ name: '', email: '', contact: '' });

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('access');
        const res = await fetch('http://localhost:8000/api/profile/', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) throw new Error('Failed to fetch profile');
        const data = await res.json();
        setProfile({
          name: data.username || '',
          email: data.email || '',
          contact: data.contact || '',
        });
      } catch {
        setMessage('Could not load user profile. Please check login status.');
      }
    };
    fetchProfile();
  }, []);

  const handlePayment = async () => {
    const numAmount = Number(amount);
    if (!numAmount || numAmount <= 0) {
      setMessage('Please enter a valid amount.');
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('access');
      const res = await fetch('http://localhost:8000/api/create-order/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ amount: numAmount }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to create order.');
      }

      const { order_id, currency, key_id } = await res.json();

      const options = {
        key: key_id,
        amount: numAmount * 100,
        currency,
        name: 'doomshop',
        description: 'Payment Transaction',
        order_id,
        handler: (response) => {
          setMessage(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
        },
        prefill: {
          name: profile.name,
          email: profile.email,
          contact: profile.contact,
        },
        theme: { color: '#3399cc' },
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', (err) => {
        setMessage(`Payment Failed: ${err.error.description}`);
      });
      rzp.open();
    } catch (error) {
      setMessage(error.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.card}>
        <h1 style={styles.title}>Make a Payment</h1>
        <p style={styles.subtitle}>Secure payment using Razorpay</p>

        <label htmlFor="amount" style={styles.label}>Amount (INR)</label>
        <div style={styles.inputWrapper}>
          <span style={styles.inputPrefix}>₹</span>
          <input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            disabled={loading}
            style={styles.input}
          />
        </div>

        <button
          onClick={handlePayment}
          disabled={loading || !amount}
          style={{
            ...styles.button,
            backgroundColor: loading ? '#90cdf4' : '#3182ce',
            cursor: loading ? 'not-allowed' : 'pointer',
          }}
        >
          {loading && <Spinner />}
          {loading ? 'Processing...' : `Pay ₹${amount || '0'}`}
        </button>
      </div>

      <MessageModal message={message} onClose={() => setMessage('')} />
    </div>
  );
};

export default PaymentPage;


// --- Styles ---
const styles = {
  pageWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: '#f0f4f8',
  },
  card: {
    width: '100%',
    maxWidth: '400px',
    padding: '2rem',
    backgroundColor: '#fff',
    borderRadius: '1rem',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontSize: '1.75rem',
    fontWeight: 600,
    marginBottom: '0.5rem',
  },
  subtitle: {
    fontSize: '1rem',
    color: '#555',
    marginBottom: '1.5rem',
  },
  label: {
    fontSize: '0.875rem',
    marginBottom: '0.25rem',
    color: '#333',
  },
  inputWrapper: {
    position: 'relative',
    marginBottom: '1.5rem',
  },
  inputPrefix: {
    position: 'absolute',
    top: '50%',
    left: '0.75rem',
    transform: 'translateY(-50%)',
    color: '#666',
  },
  input: {
    width: '100%',
    padding: '0.5rem 0.75rem 0.5rem 2rem',
    fontSize: '1rem',
    borderRadius: '0.5rem',
    border: '1px solid #ccc',
  },
  button: {
    width: '100%',
    padding: '0.75rem',
    fontSize: '1rem',
    fontWeight: 600,
    color: '#fff',
    border: 'none',
    borderRadius: '0.5rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '0.5rem',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  modal: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '0.75rem',
    boxShadow: '0 0 20px rgba(0,0,0,0.2)',
    textAlign: 'center',
    maxWidth: '90%',
  },
  modalText: {
    fontSize: '1rem',
    marginBottom: '1rem',
  },
  modalButton: {
    backgroundColor: '#3182ce',
    color: '#fff',
    padding: '0.5rem 1rem',
    border: 'none',
    borderRadius: '0.5rem',
    cursor: 'pointer',
  },
  spinner: {
    width: '1rem',
    height: '1rem',
    marginRight: '0.5rem',
    animation: 'spin 1s linear infinite',
  },
};

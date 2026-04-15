import { useState } from 'react';
import stickyFull from '../assets/background/sticky-full.png';

export default function SavingsCalculator() {
  const [monthlyBill, setMonthlyBill] = useState(16000);
  const monthlySavings = Math.round(monthlyBill * 0.417);
  const yearlySavings = monthlySavings * 12;

  return (
    <div style={{
      width: '100%',
      padding: '60px 100px 100px',
      background: 'white'
    }}>
      <div style={{
        display: 'flex',
        gap: 20,
        width: '100%',
        maxWidth: 1240,
        margin: '0 auto'
      }}>
        {/* Left card: Calculator */}
        <div style={{
          flex: 1,
          background: 'white',
          borderRadius: 8,
          border: '1px solid #eee',
          padding: '40px',
          boxShadow: '0 2px 20px rgba(0,0,0,0.04)',
          display: 'flex',
          flexDirection: 'column',
          gap: 24
        }}>
          <div style={{
            fontSize: '51.2px',
            fontFamily: '"Owners Wide Bold", serif',
            fontWeight: '700',
            color: 'rgb(0, 0, 0)',
            lineHeight: '1.1',
            fontStyle: 'italic'
          }}>
            Caluculate your savings
          </div>

          {/* Bill row */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span style={{
              fontSize: '12px',
              fontFamily: 'Inter, sans-serif',
              fontWeight: '500',
              color: '#5C7083'
            }}>Bill</span>
            <span style={{
              fontSize: '18px',
              fontFamily: 'Inter, sans-serif',
              fontWeight: '600',
              color: 'rgb(0, 0, 0)'
            }}>₹{monthlyBill.toLocaleString()}</span>
          </div>

          {/* Slider */}
          <div>
            <input
              type="range"
              min="1000"
              max="50000"
              step="1000"
              value={monthlyBill}
              onChange={(e) => setMonthlyBill(Number(e.target.value))}
              style={{
                width: '100%',
                height: 6,
                borderRadius: 3,
                outline: 'none',
                cursor: 'pointer',
                accentColor: '#FDA720'
              }}
            />
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: 4
            }}>
              <span style={{ fontSize: '12px', color: '#5C7083' }}>₹1,000</span>
              <span style={{ fontSize: '12px', color: '#5C7083' }}>₹50,000</span>
            </div>
          </div>

          {/* Monthly & Yearly cards */}
          <div style={{ display: 'flex', gap: 16 }}>
            <div style={{
              flex: 1,
              padding: '16px 20px',
              border: '1px solid #eee',
              borderRadius: 8,
              background: 'linear-gradient(135deg, #f0f4ff 0%, #fff 100%)'
            }}>
              <div style={{ fontSize: '12px', fontFamily: 'Inter, sans-serif', fontWeight: '500', color: '#5C7083' }}>Monthly</div>
              <div style={{ fontSize: '18px', fontFamily: 'Inter, sans-serif', fontWeight: '600', color: 'rgb(0,0,0)', marginTop: 4 }}>₹{monthlySavings.toLocaleString()}</div>
            </div>
            <div style={{
              flex: 1,
              padding: '16px 20px',
              border: '1px solid #eee',
              borderRadius: 8
            }}>
              <div style={{ fontSize: '12px', fontFamily: 'Inter, sans-serif', fontWeight: '500', color: '#5C7083' }}>Yearly</div>
              <div style={{ fontSize: '18px', fontFamily: 'Inter, sans-serif', fontWeight: '600', color: 'rgb(0,0,0)', marginTop: 4 }}>₹{yearlySavings.toLocaleString()}</div>
            </div>
          </div>
        </div>

        {/* Right card: Image/illustration */}
        <div style={{
          flex: 1,
          background: 'white',
          borderRadius: 8,
          border: '1px solid #eee',
          padding: '40px',
          boxShadow: '0 2px 20px rgba(0,0,0,0.04)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <img
            src={stickyFull}
            alt="SunZero Solutions"
            style={{
              maxWidth: '80%',
              maxHeight: 300,
              objectFit: 'contain',
              opacity: 0.15
            }}
          />
        </div>
      </div>
    </div>
  );
}

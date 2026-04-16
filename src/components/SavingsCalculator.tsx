import { useState } from 'react';

const savingsImage = 'https://www.figma.com/api/mcp/asset/5ad9805d-104e-44e5-8dce-9baae4f4549a';
const ringOuter = 'https://www.figma.com/api/mcp/asset/63bc68eb-9010-4b26-85a9-b5243218d0fb';
const ringOrange = 'https://www.figma.com/api/mcp/asset/521b23c5-4cde-43b0-b2d2-0ad8b2439c5a';
const ringShadow = 'https://www.figma.com/api/mcp/asset/ab33bd28-4caf-4549-b66e-afe0c4a27edc';
const ringInner = 'https://www.figma.com/api/mcp/asset/295af3cf-73ef-470b-8bdf-f544ae8e98f4';
const ringKnob = 'https://www.figma.com/api/mcp/asset/c27817fb-3068-417e-bf28-a1c41e4a5383';

export default function SavingsCalculator() {
  const [monthlyBill, setMonthlyBill] = useState(16000);
  const monthlySavings = Math.round(monthlyBill * 0.417);
  const yearlySavings = monthlySavings * 12;

  return (
    <div style={{
      width: '100%',
      padding: '24px 100px',
      background: 'white'
    }}>
      <div style={{
        width: '100%',
        maxWidth: 1240,
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 40,
        alignItems: 'center'
      }}>
        <div style={{
          fontSize: 48,
          fontFamily: '"Owners Wide Bold", serif',
          fontWeight: '700',
          color: '#000',
          lineHeight: '56.32px',
          textAlign: 'center'
        }}>
          Calculate your savings
        </div>

        <div style={{
          width: '100%',
          display: 'flex',
          gap: 10,
          height: 560
        }}>
          <div style={{
            flex: 1,
            background: '#ddd',
            borderRadius: 20,
            padding: '76px 72px',
            display: 'flex',
            gap: 72,
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {/* Left: Circular meter */}
            <div style={{
              position: 'relative',
              width: 374,
              height: 374
            }}>
              <img
                src={ringOuter}
                alt=""
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
              />
              <img
                src={ringOrange}
                alt=""
                style={{
                  position: 'absolute',
                  top: 26.65,
                  left: 26.21,
                  width: 320.698,
                  height: 320.698
                }}
              />
              <img
                src={ringShadow}
                alt=""
                style={{
                  position: 'absolute',
                  top: 26.65,
                  left: 186.56,
                  width: 160.349,
                  height: 263.327
                }}
              />
              <img
                src={ringInner}
                alt=""
                style={{
                  position: 'absolute',
                  top: 82.62,
                  left: 84.84,
                  width: 204.323,
                  height: 208.765
                }}
              />
              <img
                src={ringKnob}
                alt=""
                style={{
                  position: 'absolute',
                  top: 270.51,
                  left: 262.07,
                  width: 66.627,
                  height: 66.627
                }}
              />

              <div style={{
                position: 'absolute',
                top: 151,
                left: 114,
                width: 146.58,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 4,
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: 12,
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: '700',
                  color: '#5C7083',
                  letterSpacing: '-0.12px',
                  textTransform: 'uppercase'
                }}>
                  <div style={{ lineHeight: '1.2' }}>Current</div>
                  <div style={{ lineHeight: '1.2' }}>Monthly Bill</div>
                </div>
                <div style={{
                  fontSize: '28.428px',
                  fontFamily: '"Owners Wide Bold", serif',
                  fontWeight: '700',
                  color: '#000',
                  letterSpacing: '-0.9097px',
                  lineHeight: '50.032px'
                }}>
                  ₹{monthlyBill.toLocaleString()}
                </div>
              </div>
            </div>

            {/* Right: Savings values */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 52,
              fontFamily: 'Inter, sans-serif',
              fontWeight: '700'
            }}>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 4
              }}>
                <div style={{
                  fontSize: 12,
                  color: '#5C7083',
                  letterSpacing: '-0.12px',
                  textTransform: 'uppercase'
                }}>
                  Yearly Savings
                </div>
                <div style={{
                  fontSize: 48,
                  color: '#000',
                  letterSpacing: '-0.36px',
                  lineHeight: '1.2',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: '700'
                }}>
                  ₹{yearlySavings.toLocaleString()}
                </div>
              </div>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 4
              }}>
                <div style={{
                  fontSize: 12,
                  color: '#5C7083',
                  letterSpacing: '-0.12px',
                  textTransform: 'uppercase'
                }}>
                  Monthly Savings
                </div>
                <div style={{
                  fontSize: 48,
                  color: '#000',
                  letterSpacing: '-0.36px',
                  lineHeight: '1.2',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: '700'
                }}>
                  ₹{monthlySavings.toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          <div style={{
            flex: 1,
            position: 'relative',
            borderRadius: 20,
            overflow: 'hidden'
          }}>
            <img
              src={savingsImage}
              alt="Savings illustration"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

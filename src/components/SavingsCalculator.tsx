import { useState } from 'react';
import { useResponsive } from '../hooks/useResponsive';

function IsometricCube({
  size,
  topFace = '#FFFFFF',
  leftFace = '#F4F6F8',
  rightFace = '#EEF2F6',
  stroke = 'rgba(0,0,0,0.07)'
}: {
  size: number;
  topFace?: string;
  leftFace?: string;
  rightFace?: string;
  stroke?: string;
}) {
  return (
    <svg viewBox="0 0 100 110" width={size} height={size * 1.1} aria-hidden="true" style={{ display: 'block' }}>
      <polygon points="50 94 92 74 92 86 50 106 8 86 8 74" fill="rgba(0,0,0,0.06)" />
      <polygon points="10 34 50 54 50 94 10 74" fill={leftFace} />
      <polygon points="90 34 50 54 50 94 90 74" fill={rightFace} />
      <polygon points="50 14 90 34 50 54 10 34" fill={topFace} />
      <polyline points="10 34 50 14 90 34 90 74 50 94 10 74 10 34" fill="none" stroke={stroke} strokeWidth="1" />
      <polyline points="50 14 50 54 50 94" fill="none" stroke="rgba(0,0,0,0.05)" strokeWidth="1" />
    </svg>
  );
}

export default function SavingsCalculator() {
  const { isMobile } = useResponsive();
  const [monthlyBill, setMonthlyBill] = useState(1000);
  const monthlySavings = Math.round(monthlyBill * 0.417);
  const yearlySavings = monthlySavings * 12;
  const desktopContainerWidth = 1420;
  const desktopContainerHeight = 380;
  const desktopGap = 8;
  const desktopPadding = 18;
  const stage = monthlyBill < 18000 ? 1 : monthlyBill < 30000 ? 2 : 3;
  const showMidNodes = stage >= 2;
  const showFrontNodes = stage >= 3;

  return (
    <div style={{
      width: '100%',
      padding: isMobile ? '24px 20px' : '60px 100px 100px',
      background: 'white'
    }}>
      <div style={{
        width: '100%',
        maxWidth: isMobile ? 1240 : desktopContainerWidth,
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: isMobile ? 20 : 0,
        alignItems: 'center',
        filter: isMobile ? 'none' : 'drop-shadow(0 18px 60px rgba(0,0,0,0.10)) drop-shadow(0 4px 18px rgba(0,0,0,0.06))'
      }}>
        <div style={{
          width: '100%',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? 16 : desktopGap,
          alignItems: 'stretch',
          height: isMobile ? 'auto' : desktopContainerHeight
        }}>
          <div style={{
            flex: isMobile ? '0 0 auto' : '1 1 0',
            minWidth: 0,
            background: '#FFFFFF',
            border: '1px solid rgb(255,255,255)',
            borderRadius: 12,
            boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
            padding: isMobile ? 16 : desktopPadding,
            display: 'flex',
            flexDirection: 'column',
            gap: isMobile ? 12 : 12,
            justifyContent: isMobile ? 'center' : 'flex-start',
            minHeight: isMobile ? 320 : desktopContainerHeight,
            boxSizing: 'border-box'
          }}>
            <div style={{
              width: '100%',
              fontSize: isMobile ? 54 : 44,
              fontFamily: '"Owners TRIAL Wide Bold", "Owners TRIAL Wide Bold Placeholder", sans-serif',
              fontWeight: 800,
              fontStyle: 'normal',
              lineHeight: '1.1em',
              color: '#000',
              letterSpacing: '-0.02em',
              textAlign: 'left',
              margin: 0,
              textWrap: 'balance'
            }}>
              <span>Caluculate your</span>
              <br />
              <span>savings</span>
            </div>

            <div style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              gap: 12
            }}>
              <div style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 12,
                fontWeight: 500,
                color: 'rgb(92, 112, 131)',
                letterSpacing: '-0.01em',
                lineHeight: '1.2em'
              }}>
                Bill
              </div>
              <div style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: isMobile ? 34 : 16,
                fontWeight: 600,
                color: '#000',
                letterSpacing: '-0.02em',
                lineHeight: '1.1em',
                whiteSpace: 'nowrap',
                fontVariantNumeric: 'tabular-nums',
                margin: 0
              }}>
                ₹{monthlyBill.toLocaleString()}
              </div>
            </div>

            <div style={{ width: '100%', marginTop: 0 }}>
              <input
                type="range"
                min={1000}
                max={50000}
                step={500}
                value={monthlyBill}
                onChange={(event) => setMonthlyBill(Number(event.target.value))}
                aria-label="Monthly electricity bill"
                style={{
                  width: '100%',
                  height: 10,
                  borderRadius: 999,
                  appearance: 'none',
                  WebkitAppearance: 'none',
                  cursor: 'pointer',
                  outline: 'none',
                  background: `linear-gradient(90deg, rgb(253, 167, 32) 0%, rgb(253, 167, 32) ${(monthlyBill - 1000) / 490}%, rgba(0,0,0,0.08) ${(monthlyBill - 1000) / 490}%, rgba(0,0,0,0.08) 100%)`,
                  boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.06)'
                }}
              />

              <div style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: 10,
                fontFamily: 'Inter, sans-serif',
                fontWeight: 500,
                fontSize: 12,
                color: 'rgb(92, 112, 131)',
                letterSpacing: '-0.01em',
                lineHeight: '1.2em'
              }}>
                <span>₹1,000</span>
                <span>₹50,000</span>
              </div>
            </div>

            <div style={{
              width: '100%',
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
              gap: 12,
              marginTop: 4
            }}>
              <div style={{
                position: 'relative',
                minHeight: 64,
                borderRadius: 14,
                border: '1px solid rgba(0,0,0,0.05)',
                background: 'rgba(0,0,0,0.02)',
                overflow: 'hidden',
                padding: 12,
                boxSizing: 'border-box'
              }}>
                <div style={{
                  position: 'absolute',
                  right: -40,
                  top: -40,
                  width: 120,
                  height: 120,
                  borderRadius: '50%',
                  background: 'radial-gradient(circle at 30% 30%, rgba(0,153,255,0.14), rgba(0,153,255,0.00) 65%)',
                  pointerEvents: 'none'
                }} />
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 12,
                    fontWeight: 500,
                    color: 'rgb(92, 112, 131)',
                    letterSpacing: '-0.01em',
                    lineHeight: '1.2em'
                  }}>
                    Monthly
                  </div>
                  <div style={{
                    marginTop: 6,
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 16,
                    fontWeight: 600,
                    color: '#000',
                    letterSpacing: '-0.02em',
                    lineHeight: '1.15em',
                    fontVariantNumeric: 'tabular-nums'
                  }}>
                    ₹{monthlySavings.toLocaleString()}
                  </div>
                </div>
              </div>

              <div style={{
                position: 'relative',
                minHeight: 64,
                borderRadius: 14,
                border: '1px solid rgba(0,0,0,0.05)',
                background: 'rgba(0,0,0,0.02)',
                overflow: 'hidden',
                padding: 12,
                boxSizing: 'border-box'
              }}>
                <div style={{
                  position: 'absolute',
                  left: -40,
                  bottom: -40,
                  width: 120,
                  height: 120,
                  borderRadius: '50%',
                  background: 'radial-gradient(circle at 70% 70%, rgba(0,153,255,0.14), rgba(0,153,255,0.00) 65%)',
                  pointerEvents: 'none'
                }} />
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 12,
                    fontWeight: 500,
                    color: 'rgb(92, 112, 131)',
                    letterSpacing: '-0.01em',
                    lineHeight: '1.2em'
                  }}>
                    Yearly
                  </div>
                  <div style={{
                    marginTop: 6,
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 16,
                    fontWeight: 600,
                    color: '#000',
                    letterSpacing: '-0.02em',
                    lineHeight: '1.15em',
                    fontVariantNumeric: 'tabular-nums'
                  }}>
                    ₹{yearlySavings.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div style={{
            flex: isMobile ? '0 0 auto' : '1.05 1 0',
            minWidth: 0,
            position: 'relative',
            borderRadius: 12,
            overflow: 'hidden',
            height: isMobile ? 320 : desktopContainerHeight,
            background: '#FFFFFF',
            border: '1px solid rgb(255,255,255)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <svg
              viewBox="0 0 1000 620"
              preserveAspectRatio="none"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 1 }}
              aria-hidden="true"
            >
              {[
                { d: 'M 448 356 Q 382 322 320 276', visible: showMidNodes, delay: 0 },
                { d: 'M 484 388 Q 398 342 336 294', visible: showMidNodes, delay: 60 },
                { d: 'M 552 356 Q 618 322 680 276', visible: showMidNodes, delay: 120 },
                { d: 'M 516 388 Q 602 342 664 294', visible: showMidNodes, delay: 180 }
              ].map((line) => (
                <path
                  key={line.d}
                  d={line.d}
                  fill="none"
                  stroke="rgba(253, 167, 32, 0.92)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  pathLength={1}
                  strokeDasharray={1}
                  style={{
                    strokeDashoffset: line.visible ? 0 : 1,
                    opacity: line.visible ? 1 : 0,
                    transition: `stroke-dashoffset 700ms cubic-bezier(0.22, 1, 0.36, 1) ${line.delay}ms, opacity 260ms ease ${line.delay}ms`
                  }}
                />
              ))}
            </svg>

            <div style={{
              position: 'absolute',
              left: '30%',
              top: '47%',
              zIndex: 2,
              transform: `translate(-50%, -70%) scale(${showMidNodes ? 1 : 0.78})`,
              transformOrigin: 'center bottom',
              opacity: showMidNodes ? 1 : 0,
              transition: 'transform 480ms cubic-bezier(0.22, 1, 0.36, 1) 90ms, opacity 320ms ease 90ms',
              pointerEvents: 'none'
            }}>
              <IsometricCube size={100} topFace="#FCFEFF" leftFace="#F5F8FB" rightFace="#EEF3F8" />
            </div>

            <div style={{
              position: 'absolute',
              left: '70%',
              top: '47%',
              zIndex: 2,
              transform: `translate(-50%, -70%) scale(${showMidNodes ? 1 : 0.78})`,
              transformOrigin: 'center bottom',
              opacity: showMidNodes ? 1 : 0,
              transition: 'transform 480ms cubic-bezier(0.22, 1, 0.36, 1) 170ms, opacity 320ms ease 170ms',
              pointerEvents: 'none'
            }}>
              <IsometricCube size={100} topFace="#FCFEFF" leftFace="#F4F8FB" rightFace="#EDF2F7" />
            </div>

            <svg
              viewBox="0 0 1000 620"
              preserveAspectRatio="none"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 2 }}
              aria-hidden="true"
            >
              {[
                { d: 'M 462 392 L 392 420', delay: 240 },
                { d: 'M 470 398 L 400 426', delay: 280 },
                { d: 'M 538 392 L 608 420', delay: 320 },
                { d: 'M 530 398 L 600 426', delay: 360 },
                { d: 'M 390 446 L 500 482 L 610 446', delay: 600 },
                { d: 'M 398 452 L 500 488 L 602 452', delay: 640 }
              ].map((line) => (
                <path
                  key={line.d}
                  d={line.d}
                  fill="none"
                  stroke="rgba(253, 167, 32, 0.92)"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  pathLength={1}
                  strokeDasharray={1}
                  style={{
                    strokeDashoffset: showFrontNodes ? 0 : 1,
                    opacity: showFrontNodes ? 1 : 0,
                    transition: `stroke-dashoffset 740ms cubic-bezier(0.22, 1, 0.36, 1) ${line.delay}ms, opacity 260ms ease ${line.delay}ms`
                  }}
                />
              ))}
            </svg>

            <div style={{
              position: 'absolute',
              left: '50%',
              top: '58%',
              zIndex: 3,
              transform: 'translate(-50%, -70%) scale(1)',
              transformOrigin: 'center bottom',
              opacity: 1,
              transition: 'transform 420ms cubic-bezier(0.22, 1, 0.36, 1), opacity 280ms ease',
              pointerEvents: 'none'
            }}>
              <IsometricCube size={148} />
            </div>

            <div style={{
              position: 'absolute',
              left: '34%',
              top: '77%',
              zIndex: 5,
              transform: `translate(-50%, -70%) scale(${showFrontNodes ? 1 : 0.74})`,
              transformOrigin: 'center bottom',
              opacity: showFrontNodes ? 1 : 0,
              transition: 'transform 520ms cubic-bezier(0.22, 1, 0.36, 1) 160ms, opacity 320ms ease 160ms',
              pointerEvents: 'none'
            }}>
              <IsometricCube size={74} topFace="#FCFDFF" leftFace="#F3F7FB" rightFace="#EBF0F6" />
            </div>

            <div style={{
              position: 'absolute',
              left: '66%',
              top: '77%',
              zIndex: 5,
              transform: `translate(-50%, -70%) scale(${showFrontNodes ? 1 : 0.74})`,
              transformOrigin: 'center bottom',
              opacity: showFrontNodes ? 1 : 0,
              transition: 'transform 520ms cubic-bezier(0.22, 1, 0.36, 1) 240ms, opacity 320ms ease 240ms',
              pointerEvents: 'none'
            }}>
              <IsometricCube size={74} topFace="#FCFDFF" leftFace="#F3F7FB" rightFace="#EBF0F6" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

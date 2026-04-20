import { useEffect, useState } from 'react';
import type { MouseEvent } from 'react';
import { FadeIn } from '../hooks/useAnimations';
import { useResponsive } from '../hooks/useResponsive';
import cardLandscape from '../../Background and symbol-20260415T085518Z-3-001/Background and symbol/pexels-ben-collins-41034267-7330260.jpg';
import flashGoldLocal from '../../Background and symbol-20260415T085518Z-3-001/Background and symbol/Flash.png';
import flashDarkLocal from '../../Background and symbol-20260415T085518Z-3-001/Background and symbol/Flash v2.png';

type AlphaMap = {
  width: number;
  height: number;
  data: Uint8ClampedArray;
};

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

const loadAlphaMap = (src: string, onReady: (map: AlphaMap) => void) => {
  const image = new Image();
  image.onerror = () => {
    // If image pixels are unavailable, skip alpha-hit mode instead of crashing the UI.
    onReady({ width: 0, height: 0, data: new Uint8ClampedArray(0) });
  };
  image.onload = () => {
    try {
      const canvas = document.createElement('canvas');
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;
      const context = canvas.getContext('2d');
      if (!context) {
        onReady({ width: 0, height: 0, data: new Uint8ClampedArray(0) });
        return;
      }

      context.drawImage(image, 0, 0);
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      onReady({ width: canvas.width, height: canvas.height, data: imageData.data });
    } catch {
      onReady({ width: 0, height: 0, data: new Uint8ClampedArray(0) });
    }
  };
  image.src = src;
};

const getFlashHit = (
  pointerX: number,
  pointerY: number,
  centerX: number,
  centerY: number,
  width: number,
  alphaMap: AlphaMap | null
) => {
  if (!alphaMap || alphaMap.width === 0 || alphaMap.height === 0 || alphaMap.data.length === 0) {
    return { hit: false, normalizedX: 0, normalizedY: 0 };
  }

  const renderedHeight = width * (alphaMap.height / alphaMap.width);
  const left = centerX - (width / 2);
  const top = centerY - (renderedHeight / 2);
  const localX = (pointerX - left) / width;
  const localY = (pointerY - top) / renderedHeight;

  if (localX < 0 || localX >= 1 || localY < 0 || localY >= 1) {
    return { hit: false, normalizedX: 0, normalizedY: 0 };
  }

  const sampleX = Math.floor(localX * alphaMap.width);
  const sampleY = Math.floor(localY * alphaMap.height);
  const alphaIndex = ((sampleY * alphaMap.width) + sampleX) * 4 + 3;
  const isOpaque = alphaMap.data[alphaIndex] > 18;

  return {
    hit: isOpaque,
    normalizedX: clamp((localX - 0.5) * 2, -1, 1),
    normalizedY: clamp((localY - 0.5) * 2, -1, 1)
  };
};

export default function FeaturesSection() {
  const { isMobile } = useResponsive();
  const [leftFlashTilt, setLeftFlashTilt] = useState(0);
  const [rightFlashTilt, setRightFlashTilt] = useState(0);
  const [leftFlashHovered, setLeftFlashHovered] = useState(false);
  const [leftFlashLocalX, setLeftFlashLocalX] = useState(0);
  const [leftFlashLocalY, setLeftFlashLocalY] = useState(0);
  const [rightFlashHovered, setRightFlashHovered] = useState(false);
  const [rightFlashLocalX, setRightFlashLocalX] = useState(0);
  const [rightFlashLocalY, setRightFlashLocalY] = useState(0);
  const [leftFlashAlphaMap, setLeftFlashAlphaMap] = useState<AlphaMap | null>(null);
  const [rightFlashAlphaMap, setRightFlashAlphaMap] = useState<AlphaMap | null>(null);
  const desktopCardWidth = 1704.8;
  const desktopCardHeight = 555;

  useEffect(() => {
    if (typeof window === 'undefined') return;

    loadAlphaMap(flashGoldLocal, setLeftFlashAlphaMap);
    loadAlphaMap(flashDarkLocal, setRightFlashAlphaMap);
  }, []);

  const resetLeftFlash = () => {
    setLeftFlashTilt(0);
    setLeftFlashHovered(false);
    setLeftFlashLocalX(0);
    setLeftFlashLocalY(0);
  };

  const resetRightFlash = () => {
    setRightFlashTilt(0);
    setRightFlashHovered(false);
    setRightFlashLocalX(0);
    setRightFlashLocalY(0);
  };

  const handleLeftFlashHoverMove = (normalizedX: number, normalizedY: number) => {
    if (isMobile) return;

    setLeftFlashTilt(normalizedX);
    setLeftFlashHovered(true);

    setLeftFlashLocalX(normalizedX);
    setLeftFlashLocalY(normalizedY);
  };

  const handleRightFlashHoverMove = (normalizedX: number, normalizedY: number) => {
    if (isMobile) return;

    setRightFlashTilt(normalizedX);
    setRightFlashHovered(true);

    setRightFlashLocalX(normalizedX);
    setRightFlashLocalY(normalizedY);
  };

  const handleFlashCanvasMove = (event: MouseEvent<HTMLDivElement>) => {
    if (isMobile) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const pointerX = event.clientX - rect.left;
    const pointerY = event.clientY - rect.top;

    const leftCenterX = rect.width * ((isMobile ? 30 : 35) / 100);
    const leftCenterY = rect.height * ((isMobile ? 90.5 : 40.8) / 100);
    const leftWidth = isMobile ? 800 : 1000;

    const rightCenterX = rect.width * ((isMobile ? 56 : 48.3) / 100);
    const rightCenterY = rect.height * ((isMobile ? 95 : 58.3) / 100);
    const rightWidth = isMobile ? 800 : 1000;

    const rightHit = getFlashHit(pointerX, pointerY, rightCenterX, rightCenterY, rightWidth, rightFlashAlphaMap);
    if (rightHit.hit) {
      resetLeftFlash();
      handleRightFlashHoverMove(rightHit.normalizedX, rightHit.normalizedY);
      return;
    }

    const leftHit = getFlashHit(pointerX, pointerY, leftCenterX, leftCenterY, leftWidth, leftFlashAlphaMap);
    if (leftHit.hit) {
      resetRightFlash();
      handleLeftFlashHoverMove(leftHit.normalizedX, leftHit.normalizedY);
      return;
    }

    resetLeftFlash();
    resetRightFlash();
  };

  const leftFlashHoverAngle = leftFlashHovered ? -7 + (leftFlashLocalX * -2) : 0;
  const leftFlashHoverOffsetX = leftFlashHovered ? -10 + (leftFlashLocalX * -3) : 0;
  const leftFlashHoverOffsetY = leftFlashHovered ? -8 + (leftFlashLocalY * -2) : 0;
  const rightFlashHoverAngle = rightFlashHovered ? 7 + (rightFlashLocalX * 2) : 0;
  const rightFlashHoverOffsetX = rightFlashHovered ? 10 + (rightFlashLocalX * 3) : 0;
  const rightFlashHoverOffsetY = rightFlashHovered ? -8 + (rightFlashLocalY * -2) : 0;

  return (
    <>
      {/* Description Section */}
      <div style={{
        width: '100%',
        padding: isMobile ? '40px 20px' : '60px 100px',
        background: 'white',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        gap: isMobile ? 24 : 120
      }}>
        {/* Left: Big bold text */}
        <FadeIn direction="left" style={{ flex: isMobile ? '0 0 auto' : '0 0 540px' }}>
          <p style={{
            fontSize: isMobile ? '20px' : '25.6px',
            fontFamily: '"Owners Wide Black", sans-serif',
            fontWeight: '800',
            lineHeight: '1.35',
            color: '#000000',
            margin: 0
          }}>
            <span>Sunzero is the only Sustainable Energy Company that delivers Zero-Capex, AI-driven solutions, Guaranteeing Savings, Reducing Compliance, and </span>
            <span style={{ color: 'rgb(0, 0, 0)' }}>Creating New Revenue streams from Day One.</span>
          </p>
        </FadeIn>

        {/* Right: Two paragraphs */}
        <FadeIn direction="right" delay={0.2} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16, paddingTop: isMobile ? 0 : 8 }}>
          <p style={{
            fontSize: isMobile ? '14px' : '16px',
            fontFamily: 'Geist, sans-serif',
            fontWeight: '400',
            lineHeight: '1.6',
            color: 'rgba(0, 0, 0, 0.35)',
            margin: 0
          }}>
            We offer solutions like Renewable Energy as a Service, Optimised Energy Storage, Enhanced Efficiency, Waste Management, and Supply Chain Refinement.
          </p>
          <p style={{
            fontSize: isMobile ? '14px' : '16px',
            fontFamily: 'Geist, sans-serif',
            fontWeight: '400',
            lineHeight: '1.6',
            color: 'rgba(0, 0, 0, 0.35)',
            margin: 0
          }}>
            Our customers enjoy significantly lower bills, a lower carbon footprint, attain Energy independence and complete Control over their Operations.
          </p>
        </FadeIn>
      </div>

      {/* Service Cards Section */}
      <div style={{
        width: '100%',
        background: 'linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 68.2682%, #FDA720 100%)',
        height: 'min-content',
        overflow: 'clip',
        display: 'flex',
        flexFlow: 'row',
        placeContent: 'center',
        alignItems: 'center',
        gap: 0,
        position: 'relative',
        padding: isMobile ? '0 16px 80px' : '0 100px 100px'
      }}>
        <div style={{ width: '100%' }} onMouseMove={handleFlashCanvasMove} onMouseLeave={() => {
          resetLeftFlash();
          resetRightFlash();
        }}>
        {isMobile ? (
          <FadeIn direction="up" style={{
            position: 'relative',
            width: '100%',
            borderRadius: 24,
            overflow: 'hidden',
            boxShadow: '0 18px 38px rgba(0, 0, 0, 0.2), 0 6px 14px rgba(0, 0, 0, 0.12)',
            background: '#fff'
          }}>
            <div style={{
              position: 'relative',
              height: 220,
              overflow: 'hidden'
            }}>
              <img
                src={cardLandscape}
                alt="SunZero Solutions Background"
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: '72% center',
                  display: 'block'
                }}
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.02) 0%, rgba(8, 16, 24, 0.48) 100%)'
              }} />

              <img
                src={flashGoldLocal}
                alt=""
                style={{
                  position: 'absolute',
                  top: -15,
                  left: '50%',
                  width: 360,
                  height: 'auto',
                  opacity: 0.92,
                  transform: 'translateX(-66%) rotate(-8deg)',
                  pointerEvents: 'none'
                }}
              />
              <img
                src={flashDarkLocal}
                alt=""
                style={{
                  position: 'absolute',
                  top: 26,
                  left: '44%',
                  width: 360,
                  height: 'auto',
                  opacity: 0.94,
                  transform: 'translateX(-4%) rotate(18deg)',
                  pointerEvents: 'none'
                }}
              />
            </div>

            <div style={{
              padding: '16px 14px 8px',
              background: 'linear-gradient(180deg, #FFFFFF 0%, #FFF8EE 100%)',
              display: 'flex',
              flexDirection: 'column',
              gap: 16
            }}>
              {[
                {
                  num: 1,
                  title: 'SEAS-Solar Energy As a Service',
                  body: 'We can shape this brighter future by understanding climate risk, empowering businesses to bring down emissions and minimising carbon pollution through financial incentives.'
                },
                {
                  num: 2,
                  title: 'BEAS-Battery Energy As a Service',
                  body: 'Say no to cost-heavy, high-maintenance diesel generators by using our Li-ION Battery with No Upfront Cost.'
                }
              ].map((card) => (
                <div key={card.num} style={{
                  borderRadius: 14,
                  padding: '12px 12px 10px',
                  border: '1px solid rgba(0, 0, 0, 0.09)',
                  background: 'rgba(255, 255, 255, 0.9)'
                }}>
                  <div style={{
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    border: '1px solid rgba(0,0,0,0.28)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'rgba(0, 0, 0, 0.52)',
                    fontSize: '11px',
                    fontFamily: 'Geist, sans-serif',
                    fontWeight: '700',
                    marginBottom: 8
                  }}>{card.num}</div>
                  <div style={{
                    fontSize: '0.88rem',
                    fontFamily: '"Owners Wide Black", sans-serif',
                    fontWeight: '600',
                    letterSpacing: '0.02em',
                    color: '#000',
                    textTransform: 'uppercase',
                    lineHeight: '1.2',
                    marginBottom: 8
                  }}>{card.title}</div>
                  <div style={{
                    fontSize: '11px',
                    fontFamily: 'Geist, sans-serif',
                    fontWeight: '500',
                    color: 'rgba(0, 0, 0, 0.66)',
                    letterSpacing: '0.01em',
                    lineHeight: '1.38'
                  }}>
                    {card.body}
                  </div>
                </div>
              ))}
            </div>

            <div style={{
              padding: '8px 14px 16px',
              background: 'linear-gradient(180deg, #FFF8EE 0%, #FFF2D9 100%)'
            }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                gap: 10
              }}>
                {[
                  { num: 3, title: 'Energy\nManagement' },
                  { num: 4, title: 'AI & IOT Based\nOptimization' },
                  { num: 5, title: 'ESG Profiling and\nCompliance' },
                  { num: 6, title: 'Energy & Carbon\nTrading' }
                ].map((card) => (
                  <div key={card.num} style={{
                    minHeight: 86,
                    borderRadius: 12,
                    border: '1px solid rgba(0, 0, 0, 0.1)',
                    background: 'rgba(255, 255, 255, 0.88)',
                    padding: '10px 10px 9px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 8
                  }}>
                    <div style={{
                      width: 17,
                      height: 17,
                      borderRadius: '50%',
                      border: '1px solid rgba(0,0,0,0.28)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'rgba(0, 0, 0, 0.52)',
                      fontSize: '10px',
                      fontFamily: 'Geist, sans-serif',
                      fontWeight: '700'
                    }}>{card.num}</div>
                    <div style={{
                      fontSize: '0.76rem',
                      fontFamily: 'Geist, sans-serif',
                      fontWeight: '700',
                      letterSpacing: '0.02em',
                      color: '#111',
                      textTransform: 'uppercase',
                      lineHeight: '1.2',
                      whiteSpace: 'pre-line'
                    }}>{card.title}</div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        ) : (
        <FadeIn direction="up" style={{
          position: 'relative',
          width: '100%',
          height: isMobile ? 360 : desktopCardHeight,
          overflow: 'hidden',
          maxWidth: desktopCardWidth,
          margin: '0 auto',
          boxShadow: '0 24px 56px rgba(0, 0, 0, 0.22), 0 8px 18px rgba(0, 0, 0, 0.12)'
        }}>
          {/* Sunset landscape background */}
          <img
            src={cardLandscape}
            alt="SunZero Solutions Background"
            style={{
              position: 'absolute',
              inset: 0,
              width: '82%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: '100% center',
              display: 'block',
              zIndex: 1
            }}
          />

          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(130, 170, 210, 0.16) 0%, rgba(90, 130, 170, 0.08) 42%, rgba(40, 70, 95, 0.10) 100%)',
            zIndex: 2,
            pointerEvents: 'none'
          }} />
          {/* White card rail overlay */}
          <div style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            width: isMobile ? '57%' : 254,
            background: 'linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 72%, #FFFBF7 100%)',
            boxShadow: '14px 0 36px rgba(0, 0, 0, 0.09), 6px 0 14px rgba(0, 0, 0, 0.05)',
            zIndex: 4
          }} />

          {/* Flash group (matches Framer 1eqr687 structure) */}
          <div style={{ position: 'absolute', inset: 0, zIndex: 5, pointerEvents: 'none' }}>
            <div style={{
              position: 'absolute',
              top: isMobile ? '90.5%' : '40.8%',
              left: isMobile ? '30%' : '35%',
              width: isMobile ? 800 : 1000,
              transform: `translate(-50%, -50%) translate(${leftFlashHoverOffsetX}px, ${leftFlashHoverOffsetY}px) rotate(${(-leftFlashTilt * 2) + leftFlashHoverAngle}deg)`,
              transition: 'transform 220ms cubic-bezier(0.22, 1, 0.36, 1)',
              willChange: 'transform',
              pointerEvents: 'none',
              opacity: 1
            }}>
              <img
                src={flashGoldLocal}
                alt=""
                style={{ display: 'block', width: '100%', height: 'auto', pointerEvents: 'none' }}
              />
            </div>
            <div style={{
              position: 'absolute',
              top: isMobile ? '95%' : '58.3%',
              left: isMobile ? '56%' : '48.3%',
              width: isMobile ? 800 : 1000,
              transform: `translate(-50%, -50%) translate(${rightFlashHoverOffsetX}px, ${rightFlashHoverOffsetY}px) rotate(${(rightFlashTilt * 2) + rightFlashHoverAngle}deg)`,
              transition: 'transform 220ms cubic-bezier(0.22, 1, 0.36, 1)',
              willChange: 'transform',
              pointerEvents: 'none',
              opacity: 1
            }}>
              <img
                src={flashDarkLocal}
                alt=""
                style={{ display: 'block', width: '100%', height: 'auto', pointerEvents: 'none' }}
              />
            </div>
          </div>

          {/* Card 1 overlay - top-left */}
          <div style={{
            position: 'absolute',
            top: isMobile ? 0 : 44,
            left: isMobile ? 30 : 100,
            width: isMobile ? 180 : 300,
            height: isMobile ? 'auto' : 228,
            padding: isMobile ? 0 : 20,
            boxSizing: 'border-box',
            zIndex: 6
          }}>
            <div style={{
              width: isMobile ? 20 : 20,
              height: isMobile ? 20 : 20,
              borderRadius: '50%',
              border: '1px solid rgba(0,0,0,0.28)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'rgba(0, 0, 0, 0.52)',
              fontSize: isMobile ? '11px' : '12.8px',
              fontFamily: 'Geist, sans-serif',
              fontWeight: '700',
              marginBottom: isMobile ? 8 : 10
            }}>1</div>
            <div style={{
              fontSize: isMobile ? '0.9rem' : '1.5rem',
              fontFamily: '"Owners Wide Black", sans-serif',
              fontWeight: '600',
              letterSpacing: '0.02em',
              color: '#000',
              textTransform: 'uppercase' as const,
              lineHeight: '1.1',
              marginBottom: isMobile ? 8 : 10
            }}>SEAS-Solar Energy As a Service</div>
            <div style={{
              fontSize: isMobile ? '9px' : '10.08px',
              maxWidth: isMobile ? 160 : 236,
              fontFamily: 'Geist, sans-serif',
              fontWeight: '500',
              color: 'rgba(0, 0, 0, 0.62)',
              letterSpacing: '0.02em',
              lineHeight: '1.3'
            }}>
              We can shape this brighter future by understanding climate risk, empowering businesses to bring down emissions and minimising carbon pollution through financial incentives.
            </div>
          </div>

          {/* Card 2 overlay - center-right area */}
          <div style={{
            position: 'absolute',
            top: isMobile ? 96 : 128,
            left: isMobile ? '40%' : 720,
            width: isMobile ? 180 : 300,
            height: isMobile ? 'auto' : 286,
            padding: isMobile ? 0 : 20,
            boxSizing: 'border-box',
            zIndex: 6
          }}>
            <div style={{
              width: isMobile ? 20 : 20,
              height: isMobile ? 20 : 20,
              borderRadius: '50%',
              border: '1px solid rgba(0,0,0,0.28)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'rgba(0, 0, 0, 0.52)',
              fontSize: isMobile ? '11px' : '12.8px',
              fontFamily: 'Geist, sans-serif',
              fontWeight: '700',
              marginBottom: isMobile ? 8 : 10
            }}>2</div>
            <div style={{
              fontSize: isMobile ? '0.9rem' : '1.5rem',
              fontFamily: '"Owners Wide Black", sans-serif',
              fontWeight: '600',
              letterSpacing: '0.02em',
              color: '#000',
              textTransform: 'uppercase' as const,
              lineHeight: '1.1',
              marginBottom: isMobile ? 8 : 10
            }}>BEAS-Battery Energy As a Service</div>
            <div style={{
              fontSize: isMobile ? '9px' : '10.08px',
              maxWidth: isMobile ? 160 : 236,
              fontFamily: 'Geist, sans-serif',
              fontWeight: '500',
              color: 'rgba(0, 0, 0, 0.62)',
              letterSpacing: '0.02em',
              lineHeight: '1.3'
            }}>
              Say no to cost-heavy, high-maintenance diesel generators by using our Li-ION Battery with No Upfront Cost.
            </div>
          </div>
          {/* Right: Cards 3-6 */}
          <div style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: isMobile ? 14 : 32,
            width: isMobile ? 'calc(57% - 32px)' : 184,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            gap: isMobile ? 30 : 40,
            paddingTop: isMobile ? 44 : 56,
            paddingBottom: isMobile ? 44 : 56,
            boxSizing: 'border-box',
            zIndex: 6
          }}>
            {[
              { num: 3, title: 'Energy\nManagement' },
              { num: 4, title: 'AI & IOT Based\nOptimization' },
              { num: 5, title: 'ESG Profiling and\nCompliance' },
              { num: 6, title: 'Energy & Carbon\nTrading' }
            ].map((card, idx) => (
              <FadeIn key={card.num} delay={idx * 0.15} direction="right">
                <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? 6 : 6 }}>
                  <div style={{
                    width: isMobile ? 17 : 17,
                    height: isMobile ? 17 : 17,
                    borderRadius: '50%',
                    border: '1px solid rgba(0,0,0,0.28)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'rgba(0, 0, 0, 0.52)',
                    fontSize: isMobile ? '10px' : '13.5px',
                    fontFamily: 'Geist, sans-serif',
                    fontWeight: '700'
                  }}>{card.num}</div>
                  <div style={{
                    fontSize: isMobile ? '0.92rem' : '1.08rem',
                    fontFamily: 'Geist, sans-serif',
                    fontWeight: '600',
                    letterSpacing: '0.02em',
                    color: '#000',
                    textTransform: 'uppercase' as const,
                    lineHeight: '1.1',
                    whiteSpace: 'pre-line',
                    maxWidth: isMobile ? '100%' : 168
                  }}>{card.title}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </FadeIn>
        )}
        </div>

      </div>

      {/* Amber Video Section - rounded */}
      <div style={{
        width: '100%',
        padding: '0 40px',
        paddingBottom: 100,
        background: 'linear-gradient(180deg, #FDA720 0%, #FFFFFF 60%)'
      }}>
        <FadeIn direction="up">
          <div style={{
            width: '100%',
            height: 600,
            borderRadius: 40,
            overflow: 'hidden',
            background: 'rgb(183, 80, 33)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <video autoPlay muted loop playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }}>
              <source src="/assets/sunzero-film.mp4" type="video/mp4" />
            </video>
          </div>
        </FadeIn>
      </div>
    </>
  );
}



import { useEffect, useState } from 'react';
import { useResponsive } from '../hooks/useResponsive';

const hoverArpanSolo = 'https://www.figma.com/api/mcp/asset/061f6082-db41-47ca-8f1e-9cb0fa9b238c';
const hoverArpan = 'https://www.figma.com/api/mcp/asset/49a021a6-d32d-4b27-8f24-ca5df6797c43';
const hoverJoris = 'https://www.figma.com/api/mcp/asset/15677814-ee88-4314-a710-2f70ffe5a5c2';
const hoverPriyanka = 'https://www.figma.com/api/mcp/asset/17d3e9b2-af7b-43ef-9d80-91e89d91d503';
const hoverHarpreet = 'https://www.figma.com/api/mcp/asset/ef5c2ed0-7b7d-4479-92f6-3ed6464b59c3';
const hoverVishesh = 'https://www.figma.com/api/mcp/asset/60f41813-ebbc-4971-988d-19fce42cd05d';
const hoverVikash = 'https://www.figma.com/api/mcp/asset/753d1150-f2fc-47d3-af0f-90da87ca7c2c';

export default function TeamSection() {
  const { isMobile } = useResponsive();
  const [hoveredMember, setHoveredMember] = useState<number | null>(null);
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const urls = [
      hoverArpanSolo,
      hoverArpan,
      hoverJoris,
      hoverPriyanka,
      hoverHarpreet,
      hoverVishesh,
      hoverVikash
    ];
    urls.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  const nameStyleBase = {
    fontFamily: 'Geist, sans-serif',
    fontWeight: 900,
    fontSize: '20px',
    lineHeight: '1.12',
    textTransform: 'uppercase' as const,
    color: '#000',
    whiteSpace: 'nowrap' as const
  };

  const imageBase = {
    width: 130,
    height: 130,
    borderRadius: 20,
    overflow: 'hidden' as const,
    position: 'relative' as const,
    backgroundColor: '#fff'
  };

  const handleTextHover = (memberIdx: number, e: React.MouseEvent) => {
    if (isMobile) return;
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setHoveredMember(memberIdx);
    setHoverPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleTextClick = (memberIdx: number, e: React.MouseEvent) => {
    if (!isMobile) return;
    e.stopPropagation();
    setHoveredMember((current) => (current === memberIdx ? null : memberIdx));
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile) return;
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setHoverPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <div style={{
      width: '100%',
      padding: isMobile ? '60px 20px 40px' : '80px 100px 40px',
      background: 'white',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 40
    }}>
      {/* Team Description with embedded hover images */}
      <div
        style={{
          textAlign: 'center',
          fontSize: isMobile ? '28px' : '48px',
          textTransform: 'uppercase' as const,
          lineHeight: isMobile ? '1.2' : '1.3',
          color: 'rgb(0, 0, 0)',
          maxWidth: 1240,
          position: 'relative'
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoveredMember(null)}
        onClick={() => {
          if (isMobile) setHoveredMember(null);
        }}
      >
        <div>
          <span style={{ fontFamily: '"Owners XNarrow", serif', fontWeight: '400' }}>A TEAM OF EXPERTS </span>
          <span
            style={{
              fontFamily: '"Owners Wide Black", sans-serif',
              fontWeight: '800',
              cursor: 'pointer',
              position: 'relative'
            }}
            onMouseEnter={(e) => handleTextHover(0, e)}
            onClick={(e) => handleTextClick(0, e)}
          >
            SOLAR ENERGY VETRAN
            {hoveredMember === 0 && (
              <div
                style={{
                  position: 'absolute',
                  top: '-220px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 165.255,
                  height: 184.977,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6,
                  zIndex: 10
                }}
              >
                <div style={{ ...nameStyleBase, textAlign: 'center' }}>
                  Arpan Dixit
                </div>
                <div style={{ ...imageBase, width: 131.609, height: 130.407 }}>
                  <img
                    src={hoverArpanSolo}
                    alt="Arpan Dixit"
                    style={{
                      position: 'absolute',
                      width: '380.63%',
                      height: '522.95%',
                      left: '-110.29%',
                      top: '-133.07%'
                    }}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'rgba(0, 0, 0, 0.2)' }} />
                </div>
              </div>
            )}
          </span>
        </div>

        <div>
          <span
            style={{
              fontFamily: '"Owners Wide Black", sans-serif',
              fontWeight: '800',
              cursor: 'pointer',
              position: 'relative'
            }}
            onMouseEnter={(e) => handleTextHover(1, e)}
          >
            Experts in battery storage
            {hoveredMember === 1 && (
              <div
                style={{
                  position: 'absolute',
                  top: '-220px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 383.501,
                  height: 178.103,
                  zIndex: 10
                }}
              >
                <div style={{ position: 'absolute', left: 0, top: 0, transform: 'rotate(-6.15deg)' }}>
                  <div style={nameStyleBase}>Priyanka Tyagi</div>
                </div>
                <div style={{ position: 'absolute', left: 197.5, top: 0, transform: 'rotate(10.03deg)' }}>
                  <div style={nameStyleBase}>Harpreet Sohal</div>
                </div>
                <div style={{ position: 'absolute', left: 28, top: 30, transform: 'rotate(-5.14deg)' }}>
                  <div style={imageBase}>
                    <img
                      src={hoverPriyanka}
                      alt="Priyanka Tyagi"
                      style={{
                        position: 'absolute',
                        width: '120.53%',
                        height: '124.3%',
                        left: '-12.83%',
                        top: '-8.37%'
                      }}
                    />
                  </div>
                </div>
                <div style={{ position: 'absolute', left: 193, top: 26.95, transform: 'rotate(10.3deg)' }}>
                  <div style={imageBase}>
                    <img
                      src={hoverHarpreet}
                      alt="Harpreet Sohal"
                      style={{
                        position: 'absolute',
                        width: '162.98%',
                        height: '204%',
                        left: '-28.93%',
                        top: '-25.55%'
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
          </span>
          <span style={{ fontFamily: '"Owners XNarrow", serif', fontWeight: '400' }}> ALong</span>
        </div>

        <div>
          <span style={{ fontFamily: '"Owners XNarrow", serif', fontWeight: '400' }}>with </span>
          <div
            style={{
              display: 'inline',
              position: 'relative'
            }}
            onMouseEnter={(e) => handleTextHover(2, e)}
            onMouseLeave={() => setHoveredMember(null)}
            onClick={(e) => handleTextClick(2, e)}
          >
            <span
              style={{
                fontFamily: '"Owners Wide Black", sans-serif',
                fontWeight: '800',
                cursor: 'pointer'
              }}
            >
              Masters of AI
            </span>
            <span style={{ fontFamily: '"Owners XNarrow", serif', fontWeight: '400' }}> & </span>
            <span
              style={{
                fontFamily: '"Owners Wide Black", sans-serif',
                fontWeight: '800',
                cursor: 'pointer'
              }}
            >
              DESIGN
            </span>
            
            {hoveredMember === 2 && (
              <div
                style={{
                  position: 'absolute',
                  top: '-230px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 388.452,
                  height: 182.766,
                  zIndex: 10,
                  whiteSpace: 'nowrap'
                }}
              >
                <div style={{ position: 'absolute', left: 0, top: 0, transform: 'rotate(-11.72deg)' }}>
                  <div style={nameStyleBase}>Vishesh Bajpai</div>
                </div>
                <div style={{ position: 'absolute', left: 187.46, top: 0, transform: 'rotate(8.94deg)' }}>
                  <div style={nameStyleBase}>Vikash Mehrotra</div>
                </div>
                <div style={{ position: 'absolute', left: 24.46, top: 28.03, transform: 'rotate(-11.75deg)' }}>
                  <div style={imageBase}>
                    <img
                      src={hoverVishesh}
                      alt="Vishesh Bajpai"
                      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                </div>
                <div style={{ position: 'absolute', left: 195.96, top: 26.44, transform: 'rotate(8.18deg)' }}>
                  <div style={imageBase}>
                    <img
                      src={hoverVikash}
                      alt="Vikash Mehrotra"
                      style={{
                        position: 'absolute',
                        width: '184.44%',
                        height: '190.21%',
                        left: '-40.02%',
                        top: '-1.65%'
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
          <span style={{ fontFamily: '"Owners XNarrow", serif', fontWeight: '400' }}> and</span>
        </div>

        <div>
          <div
            style={{
              display: 'inline',
              position: 'relative'
            }}
            onMouseEnter={(e) => handleTextHover(4, e)}
            onMouseLeave={() => setHoveredMember(null)}
            onClick={(e) => handleTextClick(4, e)}
          >
            <span
              style={{
                fontFamily: '"Owners Wide Black", sans-serif',
                fontWeight: '800',
                cursor: 'pointer'
              }}
            >
              Analytics
            </span>
            <span style={{ fontFamily: '"Owners XNarrow", serif', fontWeight: '400' }}> and </span>
            <span
              style={{
                fontFamily: '"Owners Wide Black", sans-serif',
                fontWeight: '800',
                cursor: 'pointer'
              }}
            >
              Data Experts
            </span>
            
            {hoveredMember === 4 && (
              <div
                style={{
                  position: 'absolute',
                  top: '-230px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 344.605,
                  height: 178.488,
                  zIndex: 10,
                  whiteSpace: 'nowrap'
                }}
              >
                <div style={{ position: 'absolute', left: 0, top: 0, transform: 'rotate(-11.81deg)' }}>
                  <div style={nameStyleBase}>Arpan Dixit</div>
                </div>
                <div style={{ position: 'absolute', left: 160, top: 0, transform: 'rotate(8.8deg)' }}>
                  <div style={nameStyleBase}>Joris Vlasblom</div>
                </div>
                <div style={{ position: 'absolute', left: 0, top: 26, transform: 'rotate(-10.88deg)' }}>
                  <div style={{ ...imageBase, width: 152, height: 152 }}>
                    <img
                      src={hoverArpan}
                      alt="Arpan Dixit"
                      style={{
                        position: 'absolute',
                        width: '380.63%',
                        height: '522.95%',
                        left: '-110.29%',
                        top: '-133.07%'
                      }}
                    />
                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(0, 0, 0, 0.2)' }} />
                  </div>
                </div>
                <div style={{ position: 'absolute', left: 160, top: 29.87, transform: 'rotate(8.97deg)' }}>
                  <div style={{ ...imageBase, width: 130, height: 129 }}>
                    <img
                      src={hoverJoris}
                      alt="Joris Vlasblom"
                      style={{
                        position: 'absolute',
                        width: '118.03%',
                        height: '121.72%',
                        left: '-9.02%',
                        top: '-1.41%'
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Wide pill CTA */}
      <div style={{
        width: '100%',
        padding: isMobile ? '0 20px 40px' : '0 40px 40px',
        display: 'flex',
        justifyContent: 'center'
      }}>
        <div style={{
          width: '100%',
          maxWidth: 1240,
          border: '2px solid #5C7083',
          borderRadius: isMobile ? 20 : 32,
          padding: isMobile ? '18px 16px' : '38px 40px 40px',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 10,
          overflow: 'hidden',
          cursor: 'pointer'
        }}>
          <span style={{
            fontSize: isMobile ? '16px' : '24px',
            fontFamily: 'Geist, sans-serif',
            fontWeight: '800',
            textTransform: 'uppercase' as const,
            color: '#5C7083',
            lineHeight: isMobile ? '20px' : '28.8px',
            textAlign: 'center'
          }}>
            GO NETZERO
          </span>
          <span style={{
            fontSize: isMobile ? '16px' : '24px',
            fontFamily: 'Geist, sans-serif',
            fontWeight: '800',
            textTransform: 'uppercase' as const,
            color: '#5C7083',
            lineHeight: isMobile ? '20px' : '28.8px',
            textAlign: 'center'
          }}>
            Book a Free Call
          </span>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import team1 from '../assets/team/team-1.png';
import team2 from '../assets/team/team-2.png';
import team3 from '../assets/team/team-3.png';
import team4 from '../assets/team/team-4.png';
import team5 from '../assets/team/team-5.png';
import team6 from '../assets/team/team-6.png';

const teamMembers = [
  { img: team1, name: 'Team Member 1' },
  { img: team2, name: 'Team Member 2' },
  { img: team3, name: 'Team Member 3' },
  { img: team4, name: 'Team Member 4' },
  { img: team5, name: 'Team Member 5' },
  { img: team6, name: 'Team Member 6' }
];

export default function TeamSection() {
  const [hoveredMember, setHoveredMember] = useState<number | null>(null);
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });

  const handleTextHover = (memberIdx: number, e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setHoveredMember(memberIdx);
    setHoverPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setHoverPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <div style={{
      width: '100%',
      padding: '80px 100px 40px',
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
          fontSize: '48px',
          textTransform: 'uppercase' as const,
          lineHeight: '1.3',
          color: 'rgb(0, 0, 0)',
          maxWidth: 1240,
          position: 'relative'
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoveredMember(null)}
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
          >
            SOLAR ENERGY VETRAN
            {hoveredMember === 0 && (
              <img
                src={teamMembers[0].img}
                alt="Team member"
                style={{
                  position: 'absolute',
                  width: '80px',
                  height: '80px',
                  borderRadius: '8px',
                  objectFit: 'cover',
                  top: '-100px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  zIndex: 10
                }}
              />
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
                  top: '-100px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  display: 'flex',
                  gap: '12px',
                  zIndex: 10
                }}
              >
                <img
                  src={teamMembers[0].img}
                  alt="Team member"
                  style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '8px',
                    objectFit: 'cover',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                  }}
                />
                <img
                  src={teamMembers[1].img}
                  alt="Team member"
                  style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '8px',
                    objectFit: 'cover',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                  }}
                />
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
                  top: '-100px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  display: 'flex',
                  gap: '12px',
                  zIndex: 10,
                  whiteSpace: 'nowrap'
                }}
              >
                <img
                  src={teamMembers[2].img}
                  alt="Team member"
                  style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '8px',
                    objectFit: 'cover',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                  }}
                />
                <img
                  src={teamMembers[5].img}
                  alt="Team member"
                  style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '8px',
                    objectFit: 'cover',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                  }}
                />
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
                  top: '-100px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  display: 'flex',
                  gap: '12px',
                  zIndex: 10,
                  whiteSpace: 'nowrap'
                }}
              >
                <img
                  src={teamMembers[3].img}
                  alt="Team member"
                  style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '8px',
                    objectFit: 'cover',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                  }}
                />
                <img
                  src={teamMembers[4].img}
                  alt="Team member"
                  style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '8px',
                    objectFit: 'cover',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Wide pill CTA */}
      <div style={{
        width: '100%',
        padding: '0 40px 40px',
        display: 'flex',
        justifyContent: 'center'
      }}>
        <div style={{
          width: '100%',
          maxWidth: 1240,
          border: '2px solid #5C7083',
          borderRadius: 32,
          padding: '38px 40px 40px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 10,
          overflow: 'hidden',
          cursor: 'pointer'
        }}>
          <span style={{
            fontSize: '24px',
            fontFamily: 'Geist, sans-serif',
            fontWeight: '800',
            textTransform: 'uppercase' as const,
            color: '#5C7083',
            lineHeight: '28.8px'
          }}>
            GO NETZERO
          </span>
          <span style={{
            fontSize: '24px',
            fontFamily: 'Geist, sans-serif',
            fontWeight: '800',
            textTransform: 'uppercase' as const,
            color: '#5C7083',
            lineHeight: '28.8px'
          }}>
            Book a Free Call
          </span>
        </div>
      </div>
    </div>
  );
}

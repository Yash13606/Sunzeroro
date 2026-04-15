import team1 from '../assets/team/team-1.png';
import team2 from '../assets/team/team-2.png';
import team3 from '../assets/team/team-3.png';
import team4 from '../assets/team/team-4.png';
import team5 from '../assets/team/team-5.png';
import team6 from '../assets/team/team-6.png';

export default function TeamSection() {
  return (
    <>
      {/* Team Description - Mixed fonts */}
      <div style={{
        width: '100%',
        padding: '80px 100px 40px',
        background: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 40
      }}>
        <div style={{
          textAlign: 'center',
          fontSize: '48px',
          textTransform: 'uppercase' as const,
          lineHeight: '1.3',
          color: 'rgb(0, 0, 0)',
          maxWidth: 1240
        }}>
          <div>
            <span style={{ fontFamily: '"Owners XNarrow", serif', fontWeight: '400' }}>A TEAM OF EXPERTS </span>
            <span style={{ fontFamily: '"Owners Wide Black", sans-serif', fontWeight: '800' }}>SOLAR ENERGY VETRAN</span>
          </div>
          <div>
            <span style={{ fontFamily: '"Owners Wide Black", sans-serif', fontWeight: '800' }}>Experts in battery storage</span>
            <span style={{ fontFamily: '"Owners XNarrow", serif', fontWeight: '400' }}> ALong</span>
          </div>
          <div>
            <span style={{ fontFamily: '"Owners XNarrow", serif', fontWeight: '400' }}>with </span>
            <span style={{ fontFamily: '"Owners Wide Black", sans-serif', fontWeight: '800' }}>Masters of AI & DESIGN</span>
            <span style={{ fontFamily: '"Owners XNarrow", serif', fontWeight: '400' }}> and</span>
          </div>
          <div>
            <span style={{ fontFamily: '"Owners Wide Black", sans-serif', fontWeight: '800' }}>Analytics and Data Experts</span>
          </div>
        </div>

        {/* Wide pill CTA */}
        <div style={{
          width: '100%',
          maxWidth: 1240,
          border: '1.5px solid #5C7083',
          borderRadius: 40,
          padding: '24px 60px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'pointer'
        }}>
          <span style={{
            fontSize: '24px',
            fontFamily: 'Geist, sans-serif',
            fontWeight: '800',
            textTransform: 'uppercase' as const,
            color: '#5C7083'
          }}>
            GO NETZERO
          </span>
          <span style={{
            fontSize: '24px',
            fontFamily: 'Geist, sans-serif',
            fontWeight: '800',
            textTransform: 'uppercase' as const,
            color: '#5C7083'
          }}>
            Book a Free Call
          </span>
        </div>
      </div>

      {/* Team photos - full width grid */}
      <div style={{
        width: '100%',
        height: 900,
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gridTemplateRows: 'repeat(2, 1fr)',
        gap: 0,
        overflow: 'hidden',
        position: 'relative'
      }}>
        {[team1, team2, team3, team4, team5, team6].map((img, idx) => (
          <div key={idx} style={{
            overflow: 'hidden',
            position: 'relative'
          }}>
            <img
              src={img}
              alt={`Team member ${idx + 1}`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: 'grayscale(0.3)',
                transition: 'transform 0.5s ease, filter 0.5s ease'
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLImageElement).style.transform = 'scale(1.05)';
                (e.target as HTMLImageElement).style.filter = 'grayscale(0)';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLImageElement).style.transform = 'scale(1)';
                (e.target as HTMLImageElement).style.filter = 'grayscale(0.3)';
              }}
            />
          </div>
        ))}
      </div>
    </>
  );
}

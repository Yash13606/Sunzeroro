import footerBg from '../assets/background/footer-bg.png';
import { useResponsive } from '../hooks/useResponsive';

export default function Navbar() {
  const { isMobile } = useResponsive();

  return (
    <nav style={{
      width: '100%',
      height: isMobile ? 56 : 70,
      background: 'white',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: isMobile ? '0 20px' : '0 100px',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      borderBottom: '1px solid rgba(0,0,0,0.05)'
    }}>
      <div style={{
        color: '#5C7083',
        fontSize: isMobile ? '11px' : '12.8px',
        fontFamily: 'Geist, sans-serif',
        fontWeight: '600',
        textTransform: 'uppercase',
        cursor: 'pointer'
      }}>
        Home
      </div>

      <div style={{
        display: 'flex',
        alignItems: 'center'
      }}>
        <span
          role="img"
          aria-label="SunZero"
          style={{
            height: isMobile ? 22 : 28,
            width: isMobile ? 110 : 140,
            display: 'inline-block',
            backgroundColor: '#5C7083',
            WebkitMaskImage: `url(${footerBg})`,
            maskImage: `url(${footerBg})`,
            WebkitMaskRepeat: 'no-repeat',
            maskRepeat: 'no-repeat',
            WebkitMaskSize: 'contain',
            maskSize: 'contain',
            WebkitMaskPosition: 'center',
            maskPosition: 'center'
          }}
        />
      </div>

      <div style={{
        color: '#5C7083',
        fontSize: isMobile ? '11px' : '12.8px',
        fontFamily: 'Geist, sans-serif',
        fontWeight: '800',
        textTransform: 'uppercase',
        cursor: 'pointer',
        textAlign: 'right'
      }}>
        GO NEtzero
      </div>
    </nav>
  );
}

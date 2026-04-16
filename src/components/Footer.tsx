import footerBg from '../assets/background/footer-bg.png';
import { useResponsive } from '../hooks/useResponsive';

const footerGradient = 'https://www.figma.com/api/mcp/asset/666d9387-f8f4-4e75-932e-8d1595b8c44c';
const footerWatermark = 'https://www.figma.com/api/mcp/asset/5d9ebcf3-cfaa-4a96-9bba-896cbad15163';

export default function Footer() {
  const { isMobile } = useResponsive();

  return (
    <div style={{
      width: '100%',
      position: 'relative',
      backgroundImage: `url(${footerGradient})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'top'
    }}>
      {/* Footer main section */}
      <div style={{
        width: '100%',
        height: isMobile ? 420 : 520,
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        background: 'transparent'
      }}>

        {/* Bottom content row */}
        <div style={{
          width: '100%',
          padding: isMobile ? '24px 20px' : '28px 100px',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: isMobile ? 'center' : 'space-between',
          alignItems: isMobile ? 'flex-start' : 'center',
          zIndex: 10,
          position: 'relative',
          background: 'transparent'
        }}>
          <div style={{
            fontSize: isMobile ? '16px' : '19.2px',
            fontFamily: 'Geist, sans-serif',
            fontWeight: '400',
            color: 'rgb(255, 255, 255)',
            lineHeight: '1.5'
          }}>
            Let's build a sustainable & efficient future together
          </div>

          <div style={{
            flex: isMobile ? '0 0 auto' : 1,
            width: isMobile ? '100%' : 'auto',
            height: 1,
            margin: isMobile ? '16px 0' : '0 24px',
            background: 'rgba(255, 255, 255, 0.18)'
          }} />

          <div style={{
            fontSize: isMobile ? '16px' : '19.2px',
            fontFamily: 'Geist, sans-serif',
            fontWeight: '700',
            color: 'rgb(255, 255, 255)'
          }}>
            connect@sunzero.in
          </div>
        </div>
      </div>

      {/* Very bottom - watermark area */}
      <div style={{
        width: '100%',
        height: 512,
        position: 'relative',
        overflow: 'hidden'
      }}>
        <img
          src={footerWatermark}
          alt=""
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: '100%',
            height: '172.88%',
            maxWidth: 'none'
          }}
        />
      </div>
    </div>
  );
}

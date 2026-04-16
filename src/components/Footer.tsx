import footerBg from '../assets/background/footer-bg.png';

const footerGradient = 'https://www.figma.com/api/mcp/asset/666d9387-f8f4-4e75-932e-8d1595b8c44c';
const footerWatermark = 'https://www.figma.com/api/mcp/asset/5d9ebcf3-cfaa-4a96-9bba-896cbad15163';

export default function Footer() {
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
        height: 520,
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
          padding: '28px 100px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 10,
          position: 'relative',
          background: 'transparent'
        }}>
          <div style={{
            fontSize: '19.2px',
            fontFamily: 'Geist, sans-serif',
            fontWeight: '400',
            color: 'rgb(255, 255, 255)',
            lineHeight: '1.5'
          }}>
            Let's build a sustainable & efficient future together
          </div>

          <div style={{
            flex: 1,
            height: 1,
            margin: '0 24px',
            background: 'rgba(255, 255, 255, 0.18)'
          }} />

          <div style={{
            fontSize: '19.2px',
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

import footerBg from '../assets/background/footer-bg.png';

export default function Footer() {
  return (
    <>
      {/* Footer main section */}
      <div style={{
        width: '100%',
        height: 900,
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        background: '#5C7083'
      }}>

        {/* Bottom content bar */}
        <div style={{
          width: '100%',
          padding: '40px 100px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 10,
          background: 'rgba(92, 112, 131, 0.8)',
          position: 'relative'
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
            fontSize: '19.2px',
            fontFamily: 'Geist, sans-serif',
            fontWeight: '700',
            color: 'rgb(255, 255, 255)'
          }}>
            connect@sunzero.in
          </div>
        </div>
      </div>

      {/* Very bottom - gradient image area */}
      <div style={{
        width: '100%',
        height: 370,
        background: 'linear-gradient(180deg, #5C7083 0%, #B75021 50%, #FDA720 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <img
          src={footerBg}
          alt="SunZero"
          style={{
            width: '70%',
            maxWidth: 1400,
            height: 'auto',
            opacity: 0.25
          }}
        />
      </div>
    </>
  );
}

export default function Footer() {
  return (
    <>
      {/* Footer with large SunZero branding background */}
      <div style={{
        width: '100%',
        height: 900,
        position: 'relative',
        overflow: 'hidden',
        background: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end'
      }}>
        {/* Large background text / image */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: 0.03
        }}>
          <span style={{
            fontFamily: '"Owners Wide Black", sans-serif',
            fontSize: '300px',
            fontWeight: '800',
            color: '#000',
            whiteSpace: 'nowrap'
          }}>
            SunZero
          </span>
        </div>

        {/* Bottom content bar */}
        <div style={{
          width: '100%',
          padding: '40px 100px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 2,
          background: '#5C7083'
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
        <span style={{
          fontFamily: '"Owners Wide Bold", serif',
          fontSize: '60px',
          fontWeight: '700',
          color: 'rgba(255,255,255,0.2)',
          fontStyle: 'italic',
          letterSpacing: '-1px'
        }}>
          SunZero
        </span>
      </div>
    </>
  );
}

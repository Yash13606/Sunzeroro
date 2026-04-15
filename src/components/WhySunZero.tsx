import whyImg from '../assets/features/why-sunzero-1.png';

export default function WhySunZero() {
  return (
    <div style={{
      width: '100%',
      minHeight: 600,
      background: 'rgb(120, 41, 23)',
      display: 'flex',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Left: Image */}
      <div style={{
        flex: '0 0 45%',
        display: 'flex',
        alignItems: 'stretch',
        position: 'relative'
      }}>
        <img
          src={whyImg}
          alt="Why SunZero"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
      </div>

      {/* Right: Content */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '60px 80px',
        gap: 20
      }}>
        {/* Heading */}
        <div style={{
          fontSize: '25.6px',
          fontFamily: '"Owners Wide Black", sans-serif',
          fontWeight: '800',
          color: 'rgb(253, 167, 32)',
          lineHeight: '1.2'
        }}>
          Why Sunzero
        </div>

        {/* Subheading */}
        <div style={{
          fontSize: '16px',
          fontFamily: 'Geist, sans-serif',
          fontWeight: '700',
          color: 'rgb(253, 167, 32)',
          lineHeight: '1.5',
          maxWidth: 450
        }}>
          What's holding your business back from achieving a verified Net Zero impact?
        </div>

        {/* Problem Questions with accordion-like design */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 0,
          maxWidth: 450,
          marginTop: 12
        }}>
          {/* Active question with arrow */}
          <div style={{
            display: 'flex',
            gap: 12,
            alignItems: 'flex-start',
            paddingBottom: 20,
            borderBottom: '1px solid rgba(255,255,255,0.15)'
          }}>
            <img
              src="/icons/icon-arrow.svg"
              alt=""
              style={{ width: 19, height: 15, marginTop: 4, filter: 'brightness(0) invert(1)' }}
            />
            <div>
              <div style={{
                fontSize: '16px',
                fontFamily: 'Geist, sans-serif',
                fontWeight: '700',
                color: 'rgb(255, 255, 255)',
                lineHeight: '1.5',
                marginBottom: 8
              }}>
                Struggling to cut emissions and turn your sustainability goals into measurable impact?
              </div>
              <div style={{
                fontSize: '16px',
                fontFamily: 'Geist, sans-serif',
                fontWeight: '600',
                color: 'rgba(255, 255, 255, 0.5)',
                lineHeight: '1.5'
              }}>
                We deliver end-to-end Net Zero solutions that turn ambition into measurable action — with zero upfront cost.
              </div>
            </div>
          </div>

          {/* Inactive questions */}
          <div style={{
            padding: '20px 0',
            borderBottom: '1px solid rgba(255,255,255,0.15)'
          }}>
            <div style={{
              fontSize: '16px',
              fontFamily: 'Geist, sans-serif',
              fontWeight: '700',
              color: 'rgba(255, 255, 255, 0.4)',
              lineHeight: '1.5',
              paddingLeft: 31
            }}>
              Are high upfront costs and unclear ROI keeping your sustainability initiatives on hold?
            </div>
          </div>

          <div style={{
            padding: '20px 0',
            borderBottom: '1px solid rgba(255,255,255,0.15)'
          }}>
            <div style={{
              fontSize: '16px',
              fontFamily: 'Geist, sans-serif',
              fontWeight: '700',
              color: 'rgba(255, 255, 255, 0.4)',
              lineHeight: '1.5',
              paddingLeft: 31
            }}>
              With electricity bills climbing and emissions targets looming, are cost-saving decarbonization solutions still off your radar
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { FadeIn } from '../hooks/useAnimations';
import { useResponsive } from '../hooks/useResponsive';

export default function HeroSection() {
  const { isMobile } = useResponsive();
  const videoTop = isMobile ? 220 : 162;

  return (
    <div style={{
      width: '100%',
      height: isMobile ? '90vh' : '120vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      paddingTop: isMobile ? 60 : 50,
      background: 'white',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Heading text */}
      <div style={{
        zIndex: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 0
      }}>
        <FadeIn delay={0.1}>
          <p style={{
            fontSize: isMobile ? '18px' : '25.6px',
            fontFamily: '"Owners Wide Black", sans-serif',
            fontWeight: '800',
            lineHeight: isMobile ? '24px' : '30.72px',
            letterSpacing: '0.256px',
            color: 'rgb(0, 0, 0)',
            textAlign: 'center',
            margin: 0,
            padding: 0
            
          }}>
            We make Net Zero adoption effortless
          </p>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p style={{
            fontSize: isMobile ? '18px' : '25.6px',
            fontFamily: '"Owners Wide Black", sans-serif',
            fontWeight: '800',
            lineHeight: isMobile ? '24px' : '30.72px',
            letterSpacing: '0.256px',
            color: 'rgb(0, 0, 0)',
            textAlign: 'center',
            margin: 0,
            padding: 0,
          
          }}>
            and profitable for every business.
          </p>
        </FadeIn>

        {/* Button */}
        <FadeIn delay={0.4}>
          <div style={{
            marginTop: isMobile ? 12 : 10,
            padding: isMobile ? '8px 16px' : '10px 20px',
            borderRadius: 12,
            border: '1.5px solid #5C7083',
            background: 'transparent',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.3s ease, transform 0.2s ease'
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLDivElement).style.background = '#5C7083';
            (e.currentTarget as HTMLDivElement).style.transform = 'scale(1.05)';
            const span = (e.currentTarget as HTMLDivElement).querySelector('span');
            if (span) span.style.color = 'white';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLDivElement).style.background = 'transparent';
            (e.currentTarget as HTMLDivElement).style.transform = 'scale(1)';
            const span = (e.currentTarget as HTMLDivElement).querySelector('span');
            if (span) span.style.color = '#5C7083';
          }}
          >
            <span style={{
              fontSize: isMobile ? '11px' : '12.8px',
              fontFamily: 'Geist, sans-serif',
              fontWeight: '800',
              textTransform: 'uppercase' as const,
              color: '#5C7083',
              letterSpacing: 'normal',
              transition: 'color 0.3s ease'
            }}>
              Book a Free Call
            </span>
          </div>
        </FadeIn>
      </div>

      {/* Video background */}
      <div style={{
        position: 'absolute',
        top: videoTop,
        left: 0,
        right: 0,
        height: `calc(100% - ${videoTop}px)`,
        zIndex: 1,
        overflow: 'hidden'
      }}>
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        >
          <source src={isMobile ? "/assets/hero-video-mobile.mp4" : "/assets/hero-video.mp4"} type="video/mp4" />
        </video>
      </div>
    </div>
  );
}

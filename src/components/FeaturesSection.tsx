import { FadeIn } from '../hooks/useAnimations';
import { useResponsive } from '../hooks/useResponsive';
import heroBg from '../assets/background/hero-bg.jpg';
import flashDark from '../assets/background/flash.png';
import flashGold from '../assets/background/flash-gold.png';

export default function FeaturesSection() {
  const { isMobile } = useResponsive();

  return (
    <>
      {/* Description Section */}
      <div style={{
        width: '100%',
        padding: isMobile ? '40px 20px' : '60px 100px',
        background: 'white',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        gap: isMobile ? 24 : 120
      }}>
        {/* Left: Big bold text */}
        <FadeIn direction="left" style={{ flex: isMobile ? '0 0 auto' : '0 0 540px' }}>
          <p style={{
            fontSize: isMobile ? '20px' : '25.6px',
            fontFamily: '"Owners Wide Black", sans-serif',
            fontWeight: '800',
            lineHeight: '1.35',
            color: '#000000',
            margin: 0
          }}>
            <span>Sunzero is the only Sustainable Energy Company that delivers Zero-Capex, AI-driven solutions, Guaranteeing Savings, Reducing Compliance, and </span>
            <span style={{ color: 'rgb(0, 0, 0)' }}>Creating New Revenue streams from Day One.</span>
          </p>
        </FadeIn>

        {/* Right: Two paragraphs */}
        <FadeIn direction="right" delay={0.2} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16, paddingTop: isMobile ? 0 : 8 }}>
          <p style={{
            fontSize: isMobile ? '14px' : '16px',
            fontFamily: 'Geist, sans-serif',
            fontWeight: '400',
            lineHeight: '1.6',
            color: 'rgba(0, 0, 0, 0.35)',
            margin: 0
          }}>
            We offer solutions like Renewable Energy as a Service, Optimised Energy Storage, Enhanced Efficiency, Waste Management, and Supply Chain Refinement.
          </p>
          <p style={{
            fontSize: isMobile ? '14px' : '16px',
            fontFamily: 'Geist, sans-serif',
            fontWeight: '400',
            lineHeight: '1.6',
            color: 'rgba(0, 0, 0, 0.35)',
            margin: 0
          }}>
            Our customers enjoy significantly lower bills, a lower carbon footprint, attain Energy independence and complete Control over their Operations.
          </p>
        </FadeIn>
      </div>

      {/* Service Cards Section */}
      <div style={{
        width: '100%',
        padding: isMobile ? '20px 20px 60px' : '40px 100px 100px',
        background: 'white',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        gap: isMobile ? 24 : 20
      }}>
        {/* Left: Big image with Card 1 & 2 overlaid */}
        <FadeIn direction="up" style={{ flex: isMobile ? '0 0 100%' : '0 0 68%', position: 'relative', borderRadius: 20, overflow: 'hidden', minHeight: isMobile ? 300 : 555 }}>
          {/* Sunset landscape background */}
          <img
            src={heroBg}
            alt="SunZero Solutions Background"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />

          {/* Golden lightning bolt - center-left, slightly behind */}
          <img
            src={flashGold}
            alt=""
            style={{
              position: 'absolute',
              top: isMobile ? '54%' : '50%',
              left: isMobile ? '52%' : '47%',
              transform: 'translate(-50%, -50%) rotate(5deg)',
              width: isMobile ? '260px' : '800px',
              height: 'auto',
              zIndex: 1,
              pointerEvents: 'none',
            }}
          />

          {/* Dark blue lightning bolt - center-right, in front */}
          <img
            src={flashDark}
            alt=""
            style={{
              position: 'absolute',
              top: isMobile ? '68%' : '68%',
              left: isMobile ? '70%' : '65%',
              transform: 'translate(-50%, -45%) rotate(-8deg)',
              width: isMobile ? '260px' : '800px',
              height: 'auto',
              zIndex: 5,
              pointerEvents: 'none',
            }}
          />

          {/* Card 1 overlay - top-left */}
          <div style={{ position: 'absolute', top: isMobile ? 12 : 40, left: isMobile ? 12 : 40, right: isMobile ? 'auto' : 'auto', maxWidth: isMobile ? 150 : 260, zIndex: 3 }}>
            <div style={{
              width: isMobile ? 24 : 32, height: isMobile ? 24 : 32, borderRadius: '50%', border: '1.5px solid rgba(255,255,255,0.5)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white',
              fontSize: isMobile ? '11px' : '14px', fontFamily: 'Geist, sans-serif', fontWeight: '500', marginBottom: 8
            }}>1</div>
            <div style={{
              fontSize: isMobile ? '0.75rem' : '1.5rem', fontFamily: '"Owners Wide", serif', fontWeight: '700',
              color: '#000', textTransform: 'uppercase' as const, lineHeight: '110%', marginBottom: isMobile ? 8 : 16
            }}>SEAS-Solar Energy As a Service</div>
            <div style={{
              fontSize: isMobile ? '8px' : '10px', fontFamily: 'Geist, sans-serif', fontWeight: '500',
              color: 'rgba(255,255,255,0.7)', lineHeight: '1.5'
            }}>
              We can shape this brighter future by understanding climate risk, empowering businesses to bring down emissions and minimising carbon pollution through financial incentives.
            </div>
          </div>

          {/* Card 2 overlay - center-right area */}
          <div style={{
            position: 'absolute',
            top: isMobile ? 12 : 40,
            left: isMobile ? '52%' : '56%',
            right: 'auto',
            maxWidth: isMobile ? 150 : 260,
            zIndex: 3
          }}>
            <div style={{
              width: isMobile ? 24 : 32, height: isMobile ? 24 : 32, borderRadius: '50%', border: '1.5px solid rgba(255,255,255,0.5)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white',
              fontSize: isMobile ? '11px' : '14px', fontFamily: 'Geist, sans-serif', fontWeight: '500', marginBottom: 8
            }}>2</div>
            <div style={{
                fontSize: isMobile ? '0.75rem' : '1.5rem', fontFamily: '"Owners Wide", serif', fontWeight: '700',
                color: '#000', fontStyle: 'normal', textTransform: 'uppercase' as const, lineHeight: '110%', marginBottom: isMobile ? 8 : 16
            }}>BEAS-Battery Energy As a Service</div>
            <div style={{
              fontSize: isMobile ? '8px' : '10px', fontFamily: 'Geist, sans-serif', fontWeight: '500',
              color: 'rgba(255,255,255,0.7)', lineHeight: '1.5'
            }}>
              Say no to cost-heavy, high-maintenance diesel generators by using our Li-ION Battery with No Upfront Cost.
            </div>
          </div>
        </FadeIn>

        {/* Right: Cards 3-6 */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 24, paddingTop: isMobile ? 0 : 20 }}>
          {[
            { num: 3, title: 'Energy\nManagement' },
            { num: 4, title: 'AI & IOT Based\nOptimization' },
            { num: 5, title: 'ESG Profiling and\nCompliance' },
            { num: 6, title: 'Energy & Carbon\nTrading' }
          ].map((card, idx) => (
            <FadeIn key={card.num} delay={idx * 0.15} direction="right">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{
                  width: 32, height: 32, borderRadius: '50%', border: '1.5px solid rgba(0,0,0,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#333',
                  fontSize: '14px', fontFamily: 'Geist, sans-serif', fontWeight: '500'
                }}>{card.num}</div>
                <div style={{
                  fontSize: isMobile ? '0.9rem' : '1rem', fontFamily: '"Owners Wide", serif', fontWeight: '700',
                  color: '#000', textTransform: 'uppercase' as const, lineHeight: '110%',
                  whiteSpace: 'pre-line'
                }}>{card.title}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* Gradient transition to amber */}
      <div style={{
        width: '100%',
        height: 200,
        background: 'linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 30%, #FDA720 100%)'
      }} />

      {/* Amber Video Section - rounded */}
      <div style={{
        width: '100%',
        padding: '0 40px',
        paddingBottom: 100,
        background: 'linear-gradient(180deg, #FDA720 0%, #FFFFFF 60%)'
      }}>
        <FadeIn direction="up">
          <div style={{
            width: '100%',
            height: 600,
            borderRadius: 40,
            overflow: 'hidden',
            background: 'rgb(183, 80, 33)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <video autoPlay muted loop playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }}>
              <source src="/assets/sunzero-film.mp4" type="video/mp4" />
            </video>
          </div>
        </FadeIn>
      </div>
    </>
  );
}

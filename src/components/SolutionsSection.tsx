import { useEffect, useRef, useState } from 'react';
import { useResponsive } from '../hooks/useResponsive';
import stickyFull from '../assets/background/sticky-full.png';
import stickyMeasure from '../assets/background/sticky-measure.png';
import stickyBattery from '../assets/background/sticky-battery.png';
import stickyCoins from '../assets/background/sticky-coins.png';

export default function SolutionsSection() {
  const { isMobile } = useResponsive();
  const icons = [
    '/icons/icon-dollar.svg',
    '/icons/icon-bolt-dollar.svg',
    '/icons/icon-measure.svg',
    '/icons/icon-energy.svg',
    '/icons/icon-profit.svg',
    '/icons/icon-recycle.svg'
  ];

  const solutions = [
    {
      label: 'OUR Solutions',
      icon: '/icons/icon-measure.svg',
      title: 'Measure. Manage. Monetize. Your all-in-one path to Net Zero',
      description: 'SunZero brings every step of your Net Zero journey under one roof. We help you track energy use and emissions with clarity, manage performance through smart solar and storage systems, and turn sustainability into measurable financial value. One platform. One partner. A practical path from data to decarbonization.',
      image: stickyMeasure
    },
    {
      label: 'OUR Solution',
      icon: '/icons/icon-energy.svg',
      title: 'From energy to emissions, one partner for your entire sustainability journey',
      description: 'Sustainability should not be fragmented. SunZero integrates clean energy deployment, emissions tracking, and ongoing system management into a single, seamless solution. We design, install, monitor, and optimize so your business can reduce carbon, stabilize costs, and move toward Net Zero with confidence.',
      image: stickyBattery
    },
    {
      label: 'OUR Solution',
      icon: '/icons/icon-profit.svg',
      title: 'Profit meets purpose, powered by SunZero',
      description: 'With SunZero, sustainability becomes a business advantage. Lower operating costs, predictable monthly pricing, reduced emissions, and smarter energy infrastructure work together to strengthen your bottom line. It is not just about doing good. It is about building a more resilient, future-ready enterprise.',
      image: stickyCoins
    }
  ];

  // Track which solution card is active based on scroll
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeImage, setActiveImage] = useState(stickyFull);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const sectionRect = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // If section isn't visible yet, show the full image
      if (sectionRect.top > viewportHeight) {
        setActiveImage(stickyFull);
        return;
      }

      // Check which card is most visible
      let newImage = stickyFull;
      for (let i = cardRefs.current.length - 1; i >= 0; i--) {
        const card = cardRefs.current[i];
        if (card) {
          const cardRect = card.getBoundingClientRect();
          // Card is in the upper half of viewport
          if (cardRect.top < viewportHeight * 0.6) {
            newImage = solutions[i].image;
            break;
          }
        }
      }

      if (newImage !== activeImage) {
        setIsTransitioning(true);
        setTimeout(() => {
          setActiveImage(newImage);
          setIsTransitioning(false);
        }, 150);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeImage]);

  return (
    <>
      {/* Icon Marquee */}
      <div style={{
        width: '100%',
        padding: isMobile ? '24px 0' : '40px 0',
        background: 'white',
        overflow: 'hidden'
      }}>
        <div className="marquee-track" style={{
          display: 'flex',
          gap: 40,
          width: 'max-content'
        }}>
          {[...icons, ...icons, ...icons, ...icons].map((icon, idx) => (
            <img
              key={idx}
              src={icon}
              alt=""
              style={{
                width: isMobile ? 48 : 70,
                height: isMobile ? 48 : 70,
                flexShrink: 0,
                opacity: (idx % icons.length < 1) ? 0.3 : 1
              }}
            />
          ))}
        </div>
        <style>{`
          .marquee-track {
            animation: marquee 20s linear infinite;
          }
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </div>

      {/* Sticky Scroll Section */}
      <div
        ref={sectionRef}
        style={{
          width: '100%',
          background: 'white',
          position: 'relative',
        }}
      >
        {/* Net Zero heading + full image intro */}
        <div style={{
          width: '100%',
          padding: isMobile ? '40px 20px 80px' : '60px 100px 200px',
          position: 'relative',
          overflow: 'hidden',
          minHeight: isMobile ? 'auto' : '100vh',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'flex-start' : 'flex-start',
        }}>
          <div style={{
            fontSize: isMobile ? '32px' : '60.8px',
            fontFamily: '"Owners Wide Black", sans-serif',
            fontWeight: '700',
            color: 'rgb(183, 80, 33)',
            lineHeight: '1.15',
            maxWidth: isMobile ? '100%' : 600,
            position: 'relative',
            zIndex: 2,
            paddingTop: isMobile ? 0 : 60,
          }}>
            Net Zero Made Simple, Scalable & Profitable
          </div>

          {/* Full colored image - absolute positioned to the right */}
          <img
            src={stickyFull}
            alt=""
            style={{
              position: isMobile ? 'relative' : 'absolute',
              bottom: isMobile ? 'auto' : -40,
              right: isMobile ? 'auto' : -40,
              width: isMobile ? '100%' : '60%',
              maxWidth: isMobile ? '100%' : 800,
              objectFit: 'contain',
              zIndex: 1,
              marginTop: isMobile ? 24 : 0
            }}
          />
        </div>

        {/* Sticky container for solution cards + image */}
        <div style={{
          display: 'flex',
          position: 'relative',
          minHeight: isMobile ? 'auto' : '100vh',
          flexDirection: isMobile ? 'column' : 'row'
        }}>
          {/* Left: Scrolling solution cards */}
          <div style={{
            flex: isMobile ? '0 0 auto' : '0 0 50%',
            padding: isMobile ? '0 20px' : '0 100px',
            position: 'relative',
            zIndex: 2,
          }}>
            {solutions.map((solution, idx) => (
              <div
                key={idx}
                ref={(el) => { cardRefs.current[idx] = el; }}
                style={{
                  minHeight: isMobile ? 'auto' : '100vh',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  paddingBottom: isMobile ? 48 : 80,
                  paddingTop: idx === 0 ? 0 : isMobile ? 24 : 40,
                }}
              >
                {/* Label */}
                <div style={{
                  fontSize: '12.8px',
                  fontFamily: 'Geist, sans-serif',
                  fontWeight: '800',
                  color: '#5C7083',
                  textTransform: 'uppercase' as const,
                  marginBottom: 20
                }}>
                  {solution.label}
                </div>

                {/* Icon */}
                <img
                  src={solution.icon}
                  alt=""
                  style={{ width: isMobile ? 52 : 70, height: isMobile ? 52 : 70, marginBottom: 16 }}
                />

                {/* Title */}
                <div style={{
                  fontSize: isMobile ? '20px' : '28.8px',
                  fontFamily: '"Owners Wide Black", sans-serif',
                  fontWeight: '900',
                  color: 'rgb(0, 0, 0)',
                  lineHeight: '1.3',
                  maxWidth: isMobile ? '100%' : 500,
                  marginBottom: 20
                }}>
                  {solution.title}
                </div>

                {/* Description */}
                <div style={{
                  fontSize: isMobile ? '14px' : '19.2px',
                  fontFamily: 'Geist, sans-serif',
                  fontWeight: '500',
                  color: 'rgba(0, 0, 0, 0.4)',
                  lineHeight: '1.6',
                  maxWidth: isMobile ? '100%' : 500,
                  marginBottom: 24
                }}>
                  {solution.description}
                </div>

                {/* CTA Button */}
                <div style={{
                  padding: '10px 20px',
                  borderRadius: 12,
                  border: '1.5px solid #5C7083',
                  background: 'transparent',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background 0.3s ease, transform 0.2s ease',
                  alignSelf: 'flex-start',
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
                    fontSize: '12.8px',
                    fontFamily: 'Geist, sans-serif',
                    fontWeight: '800',
                    textTransform: 'uppercase' as const,
                    color: '#5C7083',
                    transition: 'color 0.3s ease'
                  }}>
                    Book a Free Call
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Sticky image */}
          <div style={{
            flex: isMobile ? '0 0 auto' : '0 0 50%',
            position: isMobile ? 'relative' : 'sticky',
            top: isMobile ? 'auto' : 0,
            height: isMobile ? 'auto' : '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            padding: isMobile ? '0 20px 40px' : 0
          }}>
            <img
              src={activeImage}
              alt="SunZero Solutions"
              style={{
                width: isMobile ? '100%' : '90%',
                maxWidth: isMobile ? '100%' : 700,
                objectFit: 'contain',
                transition: 'opacity 0.4s ease-in-out, transform 0.4s ease-in-out',
                opacity: isTransitioning ? 0.3 : 1,
                transform: isTransitioning ? 'scale(0.95)' : 'scale(1)',
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

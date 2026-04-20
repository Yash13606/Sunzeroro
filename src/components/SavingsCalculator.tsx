import { useEffect, useMemo, useRef, useState } from 'react';
import { useResponsive } from '../hooks/useResponsive';

const frame107Low = 'https://www.figma.com/api/mcp/asset/f3aa740c-c0da-43c2-813f-152286549639';
const ellipse1Low = 'https://www.figma.com/api/mcp/asset/3d2fd923-2cae-4f6e-be16-39391d68bbb5';
const ellipse5Low = 'https://www.figma.com/api/mcp/asset/90816229-0138-41fe-83a2-ef800bb0802f';
const ellipse2Low = 'https://www.figma.com/api/mcp/asset/a50f067f-cd8a-475f-aaaa-ff6338a729d6';
const ellipse4Low = 'https://www.figma.com/api/mcp/asset/544d0671-5315-46c5-8829-d149bcfe2f0c';
const ellipse3Low = 'https://www.figma.com/api/mcp/asset/84e3d599-42a1-42c6-8762-b871bb56f1af';

const frame107Mid = 'https://www.figma.com/api/mcp/asset/95d3ae86-ab64-4f8f-8309-10dcc6cb0b7e';
const frame108Mid = 'https://www.figma.com/api/mcp/asset/2ddbeaad-1de7-4671-a99f-26c37bc373aa';
const ellipse1Mid = 'https://www.figma.com/api/mcp/asset/98de0f40-6ab3-4f92-838d-6e50e5dd13f7';
const ellipse6Mid = 'https://www.figma.com/api/mcp/asset/e97b5323-0a5b-4f32-b1d3-800f9a97bc07';
const ellipse5Mid = 'https://www.figma.com/api/mcp/asset/db69273e-ec49-49ae-8b9e-339621895821';
const ellipse4Mid = 'https://www.figma.com/api/mcp/asset/47fd9aca-eede-4005-8aa0-561ecfd59022';
const ellipse3Mid = 'https://www.figma.com/api/mcp/asset/df340a0a-cf43-4262-9e6f-cbc3f45d39a5';

const frame107High = 'https://www.figma.com/api/mcp/asset/688065cd-11a6-4ced-a8c4-217504a47710';
const frame108High = 'https://www.figma.com/api/mcp/asset/07d49bca-ca39-40f5-8774-fa79123d001f';
const frame109High = 'https://www.figma.com/api/mcp/asset/fed7b837-8592-4577-ab1c-57a147effcca';
const ellipse1High = 'https://www.figma.com/api/mcp/asset/bd9f8362-c8e6-4b4d-9ab4-c31e8e6d7f08';
const ellipse6High = 'https://www.figma.com/api/mcp/asset/aa229084-cdb3-477c-a415-75736fc48886';
const ellipse4High = 'https://www.figma.com/api/mcp/asset/7dc1881a-3ebb-47f3-8218-b52e6fe5d7fa';
const ellipse3High = 'https://www.figma.com/api/mcp/asset/5a18b88e-d93b-4822-800f-2f25f303b466';

export default function SavingsCalculator() {
  const { isMobile } = useResponsive();
  const [monthlyBill, setMonthlyBill] = useState(14000);
  const [isDragging, setIsDragging] = useState(false);
  const [transition, setTransition] = useState(true);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const stops = [14000, 24000, 34000];
  const stopConfigs = [
    {
      value: 14000,
      ringSize: 374,
      knob: { src: ellipse3Low, size: 66.627, left: 262.07, top: 270.51 }
    },
    {
      value: 24000,
      ringSize: 513,
      knob: { src: ellipse3Mid, size: 75, left: 82.5, top: 336.5 }
    },
    {
      value: 34000,
      ringSize: 513,
      knob: { src: ellipse3High, size: 75, left: 218.5, top: 38.5 }
    }
  ];
  const monthlySavings = Math.round(monthlyBill * 0.417);
  const yearlySavings = monthlySavings * 12;
  const knobInset = 26;
  const baseRingSize = isMobile ? 228 : 374;

  useEffect(() => {
    const urls = [
      frame107Low,
      frame107Mid,
      frame108Mid,
      frame107High,
      frame108High,
      frame109High
    ];
    urls.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  const stopAngles = stopConfigs.map((config) => {
    const center = config.ringSize / 2;
    const knobCenterX = config.knob.left + config.knob.size / 2;
    const knobCenterY = config.knob.top + config.knob.size / 2;
    let angle = Math.atan2(knobCenterY - center, knobCenterX - center) * (180 / Math.PI);
    return (angle + 360) % 360;
  });
  const angleDistance = (a: number, b: number) => {
    const diff = Math.abs(a - b);
    return Math.min(diff, 360 - diff);
  };
  const nearestStopIndex = (angle: number) => {
    let bestIndex = 0;
    let bestDistance = Number.POSITIVE_INFINITY;
    stopAngles.forEach((stopAngle, index) => {
      const distance = angleDistance(angle, stopAngle);
      if (distance < bestDistance) {
        bestDistance = distance;
        bestIndex = index;
      }
    });
    return bestIndex;
  };

  const updateFromPointer = (clientX: number, clientY: number) => {
    if (!ringRef.current) return;
    const rect = ringRef.current.getBoundingClientRect();
    const scale = baseRingSize / variant.ringSize;
    
    // Account for the scaled container's actual size in viewport
    const scaledWidth = variant.ringSize * scale;
    const scaledHeight = variant.ringSize * scale;
    
    const centerX = rect.left + scaledWidth / 2;
    const centerY = rect.top + scaledHeight / 2;
    const dx = clientX - centerX;
    const dy = clientY - centerY;
    let angle = Math.atan2(dy, dx) * (180 / Math.PI);
    angle = (angle + 360) % 360;
    const index = nearestStopIndex(angle);
    setTransition(false);
    setMonthlyBill(stops[index]);
    setTimeout(() => setTransition(true), 50);
  };

  const variant = useMemo(() => {
    if (monthlyBill === stops[0]) {
      return {
        ringSize: 374,
        ringLayers: [
          { src: ellipse1Low, style: { inset: 0 } },
          { src: ellipse5Low, style: { top: 26.65, left: 26.21, width: 320.698, height: 320.698 } },
          { src: ellipse2Low, style: { top: 26.65, left: 186.56, width: 160.349, height: 263.327 } },
          { src: ellipse4Low, style: { top: 82.62, left: 84.84, width: 204.323, height: 208.765 } }
        ],
        center: {
          showLabel: true,
          top: 151,
          left: 114,
          width: 146.58,
          fontSize: '28.428px',
          lineHeight: '50.032px',
          letterSpacing: '-0.9097px'
        },
        images: [frame107Low],
        knob: stopConfigs[0].knob
      };
    }
    if (monthlyBill === stops[1]) {
      return {
        ringSize: 513,
        ringLayers: [
          { src: ellipse1Mid, style: { inset: 0 } },
          { src: ellipse6Mid, style: { top: 76, left: 76, width: 361, height: 361 } },
          { src: ellipse5Mid, style: { top: 76, left: 122.85, width: 314.153, height: 361 } },
          { src: ellipse4Mid, style: { top: 139, left: 142, width: 230, height: 235 } }
        ],
        center: {
          showLabel: false,
          top: 234,
          left: 174,
          width: 165,
          fontSize: '32px',
          lineHeight: '56.32px',
          letterSpacing: '-1.024px'
        },
        images: [frame107Mid, frame108Mid],
        knob: stopConfigs[1].knob
      };
    }
    return {
      ringSize: 513,
      ringLayers: [
        { src: ellipse1High, style: { inset: 0 } },
        { src: ellipse6High, style: { top: 76, left: 76, width: 361, height: 361 } },
        { src: ellipse4High, style: { top: 139, left: 142, width: 230, height: 235 } }
      ],
      center: {
        showLabel: false,
        top: 234,
        left: 174,
        width: 165,
        fontSize: '32px',
        lineHeight: '56.32px',
        letterSpacing: '-1.024px'
      },
      images: [frame107High, frame108High, frame109High],
      knob: stopConfigs[2].knob
    };
  }, [monthlyBill]);

  return (
    <div style={{
      width: '100%',
      boxSizing: 'border-box',
      padding: isMobile ? '20px 14px' : '24px 100px',
      background: 'white'
    }}>
      <div style={{
        width: '100%',
        boxSizing: 'border-box',
        maxWidth: 1240,
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: isMobile ? 24 : 40,
        alignItems: 'center'
      }}>
        <div style={{
          fontSize: isMobile ? 28 : 48,
          fontFamily: '"Owners Wide Bold", serif',
          fontWeight: '700',
          color: '#000',
          lineHeight: isMobile ? '34px' : '56.32px',
          textAlign: 'center'
        }}>
          Calculate your savings
        </div>

        <div style={{
          width: '100%',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? 12 : 20,
          height: isMobile ? 'auto' : 560
        }}>
          <div style={{
            flex: isMobile ? '0 0 auto' : '0 0 50%',
            minWidth: 0,
            width: isMobile ? '100%' : undefined,
            background: 'linear-gradient(135deg, #f5f7fa 0%, #f0f3f8 100%)',
            borderRadius: 20,
            padding: isMobile ? '22px 14px' : '60px 40px',
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            gap: isMobile ? 20 : 36,
            alignItems: isMobile ? 'center' : 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
            border: '1px solid rgba(0, 0, 0, 0.04)'
          }}>
            <div style={{
              width: baseRingSize,
              height: baseRingSize,
              flex: '0 0 auto',
              position: 'relative'
            }}>
              <div
                ref={ringRef}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  cursor: isDragging ? 'grabbing' : 'grab',
                  touchAction: 'none',
                  transform: `scale(${baseRingSize / variant.ringSize})`,
                  transformOrigin: 'top left',
                  filter: isDragging ? 'brightness(1.02)' : 'brightness(1)'
                }}
                onPointerDown={(e) => {
                  (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
                  setIsDragging(true);
                  setTransition(false);
                  updateFromPointer(e.clientX, e.clientY);
                }}
                onPointerMove={(e) => {
                  if (isDragging) {
                    updateFromPointer(e.clientX, e.clientY);
                  }
                }}
                onPointerUp={(e) => {
                  (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
                  setIsDragging(false);
                  setTransition(true);
                }}
                onPointerCancel={() => {
                  setIsDragging(false);
                  setTransition(true);
                }}
                onPointerLeave={() => {
                  if (isDragging) {
                    setIsDragging(false);
                    setTransition(true);
                  }
                }}
              >
                {variant.ringLayers.map((layer, index) => (
                  <img
                    key={`${layer.src}-${index}`}
                    src={layer.src}
                    alt=""
                    style={{
                      position: 'absolute',
                      ...layer.style
                    }}
                  />
                ))}

                {variant.knob && (
                  (() => {
                    const center = variant.ringSize / 2;
                    const knobCenterX = variant.knob.left + variant.knob.size / 2;
                    const knobCenterY = variant.knob.top + variant.knob.size / 2;
                    const dx = center - knobCenterX;
                    const dy = center - knobCenterY;
                    const distance = Math.hypot(dx, dy) || 1;
                    const insetX = (dx / distance) * knobInset;
                    const insetY = (dy / distance) * knobInset;
                    return (
                      <img
                        src={variant.knob.src}
                        alt=""
                        style={{
                          position: 'absolute',
                          width: variant.knob.size,
                          height: variant.knob.size,
                          left: variant.knob.left + insetX,
                          top: variant.knob.top + insetY
                        }}
                      />
                    );
                  })()
                )}

                <div style={{
                  position: 'absolute',
                  top: variant.center.top,
                  left: variant.center.left,
                  width: variant.center.width,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 4,
                  textAlign: 'center'
                }}>
                  {variant.center.showLabel && (
                    <div style={{
                      fontSize: 12,
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: '700',
                      color: '#5C7083',
                      letterSpacing: '-0.12px',
                      textTransform: 'uppercase'
                    }}>
                      <div style={{ lineHeight: '1.2' }}>Current</div>
                      <div style={{ lineHeight: '1.2' }}>Monthly Bill</div>
                    </div>
                  )}
                  <div style={{
                    fontSize: variant.center.fontSize,
                    fontFamily: '"Owners Wide Bold", serif',
                    fontWeight: '700',
                    color: '#000',
                    letterSpacing: variant.center.letterSpacing,
                    lineHeight: variant.center.lineHeight
                  }}>
                    ₹{monthlyBill.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: isMobile ? 24 : 40,
              fontFamily: 'Inter, sans-serif',
              fontWeight: '700',
              flex: isMobile ? '0 0 auto' : '1 1 auto',
              justifyContent: 'center',
              paddingLeft: isMobile ? 0 : 8,
              width: isMobile ? '100%' : undefined,
              alignItems: isMobile ? 'center' : 'flex-start',
              textAlign: isMobile ? 'center' : 'left',
              opacity: transition ? 1 : 0.8,
              transition: 'opacity 0.3s ease-in-out'
            }}>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
                alignItems: isMobile ? 'center' : 'flex-start',
                transition: 'opacity 0.4s ease-in-out',
                opacity: transition ? 1 : 0.7
              }}>
                <div style={{
                  fontSize: 13,
                  color: '#5C7083',
                  letterSpacing: '-0.13px',
                  textTransform: 'uppercase',
                  fontWeight: '600'
                }}>
                  Yearly Savings
                </div>
                <div style={{
                  fontSize: isMobile ? 32 : 48,
                  color: '#000',
                  letterSpacing: '-0.36px',
                  lineHeight: '1.15',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: '700',
                  transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
                }}>
                  ₹{yearlySavings.toLocaleString()}
                </div>
              </div>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
                alignItems: isMobile ? 'center' : 'flex-start',
                transition: 'opacity 0.4s ease-in-out',
                opacity: transition ? 1 : 0.7
              }}>
                <div style={{
                  fontSize: 13,
                  color: '#5C7083',
                  letterSpacing: '-0.13px',
                  textTransform: 'uppercase',
                  fontWeight: '600'
                }}>
                  Monthly Savings
                </div>
                <div style={{
                  fontSize: isMobile ? 32 : 48,
                  color: '#000',
                  letterSpacing: '-0.36px',
                  lineHeight: '1.15',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: '700',
                  transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
                }}>
                  ₹{monthlySavings.toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          <div style={{
            flex: isMobile ? '0 0 auto' : '0 0 50%',
            minWidth: 0,
            position: 'relative',
            borderRadius: 20,
            overflow: 'hidden',
            height: isMobile ? 'clamp(220px, 62vw, 320px)' : 'auto'
          }}>
            {variant.images.map((src) => (
              <img
                key={src}
                src={src}
                alt="Savings illustration"
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
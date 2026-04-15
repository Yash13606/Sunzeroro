export default function Navbar() {
  return (
    <nav style={{
      width: '100%',
      height: 70,
      background: 'white',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0 100px',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      borderBottom: '1px solid rgba(0,0,0,0.05)'
    }}>
      <div style={{
        color: '#5C7083',
        fontSize: '12.8px',
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
        <span style={{
          fontFamily: '"Owners Wide Bold", serif',
          fontSize: '20px',
          fontWeight: '700',
          color: '#5C7083',
          fontStyle: 'italic',
          letterSpacing: '-0.5px'
        }}>
          SunZero
        </span>
      </div>

      <div style={{
        color: '#5C7083',
        fontSize: '12.8px',
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

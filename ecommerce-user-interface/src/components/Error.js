const Error = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '95vh',
      }}
    >
      <div
        style={{
          width: '40%',
          backgroundColor: 'rgba(189, 23, 11, .3)',
          textAlign: 'center',
          padding: '2rem',
          borderRadius: '1em',
          outline: '2px solid rgba(189, 23, 11, .6)',
          outlineOffset: '-8px',
        }}
      >
        <h1 style={{ fontSize: '2rem', color: 'red' }}>404 Not Found!</h1>
      </div>
    </div>
  );
};

export default Error;

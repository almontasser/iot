import React, { CSSProperties } from 'react';

interface Props {
  icon: string;
  title: string;
  value: string;
  valueBackgroundColor: string;
  valueVisible: boolean;
}

const SingleRow: React.FC<Props> = ({ icon, title, value, valueBackgroundColor, valueVisible }) => {
  return (
    <div style={styles.row}>
      <div style={styles.content}>
        <img src={icon} alt="Icon" style={styles.icon} />
        <div style={styles.title}>{title}</div>
      </div>
      {valueVisible && <div style={{ ...styles.value, backgroundColor: valueBackgroundColor }}>{value}</div>}
    </div>
  );
};

const styles: { [key: string]: CSSProperties } = {
  row: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: '1px solid #ccc',
    width: '350px',
  },
  icon: {
    padding: '6px',
    width: '40px',
    height: '40px',
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: '16px',
    fontWeight: 'bold',
  },
  value: {
    fontSize: '14px',
    color: '#fff',
    padding: '5px 10px',
    borderRadius: '5px',
  },
};

export default SingleRow;

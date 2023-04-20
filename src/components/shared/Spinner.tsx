import { CircularProgress } from '@mui/material';
import { selectMuiSettings } from '@/modules/mui/muiSelectors';

interface SpinnerProps {
  size?: number;
}

function Spinner({ size }: SpinnerProps) {
  return (
    <div
      style={{
        width: '100%',
        marginTop: size / 2 + 'px',
        marginBottom: size / 2 + 'px',
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
      }}
    >
      <CircularProgress color={'info'} size={size} />
    </div>
  );
}

Spinner.defaultProps = {
  size: 40,
};

export default Spinner;

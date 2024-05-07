import lColors from '@/mui/assets/theme/base/colors';
import MDBox from '@/mui/components/MDBox';

interface DashBorderProps {
  borderTop?: boolean;
  borderRight?: boolean;
  borderBottom?: boolean;
  borderLeft?: boolean;
  children?: any;
  [key: string]: any;
}

function DashBorder({
  borderTop,
  borderRight,
  borderBottom,
  borderLeft,
  children,
  ...props
}: DashBorderProps) {
  const colors = lColors;
  const border = `1px dashed ${colors.inputBorderColor}`;
  return (
    <MDBox
      borderTop={borderTop ? border : null}
      borderRight={borderRight ? border : null}
      borderBottom={borderBottom ? border : null}
      borderLeft={borderLeft ? border : null}
      {...props}
    >
      {children}
    </MDBox>
  );
}

export default DashBorder;

interface SizedBoxProps {
  width?: number;
  height?: number;
}

const SizedBox: React.FC<SizedBoxProps> = ({ width = 0, height = 0 }) => {
  const styles: React.CSSProperties = { width, height };
  return <div style={styles}></div>;
};

export default SizedBox;

import { Container } from './styles';

interface SpinnerProps {
  size?: number;
}

export function Spinner({ size = 90 }: SpinnerProps) {
  return <Container size={size} />;
}

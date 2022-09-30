import { Box } from '@chakra-ui/react';

interface DividerProps {
  color?: string;
}

export function DividerVertical({ color = 'middleGray' }: DividerProps) {
  return <Box h='full' w='1px' bgColor={color} />;
}

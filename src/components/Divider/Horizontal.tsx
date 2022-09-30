import { Box } from '@chakra-ui/react';

interface DividerProps {
  color?: string;
}

export function DividerHorizontal({ color = 'middleGray' }: DividerProps) {
  return <Box w='100%' h='1px' bgColor={color} />;
}

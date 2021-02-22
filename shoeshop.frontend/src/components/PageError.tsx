import React, { useEffect } from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

interface IProps {
  code: number;
  description: string;
}

const PageError: React.FC<IProps> = props => {
  const { code, description } = props;
  useEffect(() => {
    window.document.title = String(code);
  }, [code]);
  return (
    <Box flexDirection="column" position="fixed" top={0} left={0} right={0} bottom={0} display="flex" alignItems="center" justifyContent="center">
      <Typography variant="h1" >
        {code}
      </Typography>
      <Typography variant="body1">
        {description}
      </Typography>
    </Box>
  );
};

export default PageError;
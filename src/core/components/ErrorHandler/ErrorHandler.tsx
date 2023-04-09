interface ErrorHandlerProps {
  error?: string;
}

export function ErrorHandler({ error }: ErrorHandlerProps) {
  return <div>{error || 'Error: Something went wrong!'}</div>;
}

ErrorHandler.defaultProps = {
  error: '',
};

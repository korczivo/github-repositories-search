interface ErrorHandlerProps {
  isLoading: boolean;
  error?: string;
}

export function ErrorHandler({ isLoading, error }: ErrorHandlerProps) {
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <div>{error || 'Error: Something went wrong!'}</div>;
}

ErrorHandler.defaultProps = {
  error: '',
};

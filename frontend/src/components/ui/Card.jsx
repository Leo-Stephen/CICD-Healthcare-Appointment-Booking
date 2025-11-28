export const Card = ({ children, className = '', hover = true, ...props }) => {
  return (
    <div
      className={`card ${hover ? 'transform hover:-translate-y-1' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

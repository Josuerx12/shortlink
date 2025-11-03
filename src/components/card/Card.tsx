export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

const Card = (props: CardProps) => {
  const { className, children, ...rest } = props;

  return (
    <div
      className={`bg-slate-800 p-4 rounded-lg shadow flex items-center justify-between ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Card;

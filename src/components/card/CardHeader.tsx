export interface CardHeaderProps
  extends React.HTMLAttributes<HTMLHeadingElement> {}

const CardHeader = (props: CardHeaderProps) => {
  const { className, children, ...rest } = props;

  return (
    <h3
      className={`text-lg font-medium mb-1 text-slate-200 ${className}`}
      {...rest}
    >
      {children}
    </h3>
  );
};

export default CardHeader;

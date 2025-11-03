export interface CardIconProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardIcon = (props: CardIconProps) => {
  const { className, children, ...rest } = props;

  return (
    <div className={`bg-slate-700 p-3 rounded-full ${className}`} {...rest}>
      {children}
    </div>
  );
};

export default CardIcon;

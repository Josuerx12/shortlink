export interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardBody = (props: CardBodyProps) => {
  return <div className="text-2xl font-bold">{props.children}</div>;
};

export default CardBody;

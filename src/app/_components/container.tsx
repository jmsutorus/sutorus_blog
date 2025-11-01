type Props = {
  children?: React.ReactNode;
};

const Container = ({ children }: Props) => {
  return <div className="container mx-auto px-0 sm:px-5 pb-5">{children}</div>;
};

export default Container;

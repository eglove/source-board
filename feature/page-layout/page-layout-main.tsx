import Navigation from 'source/feature/navigation/navigation';

type PageLayoutMainProperties = {
  children: JSX.Element | JSX.Element[] | string;
};

export function PageLayoutMain({
  children,
}: PageLayoutMainProperties): JSX.Element {
  return (
    <>
      <Navigation />
      {children}
    </>
  );
}

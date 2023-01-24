import Navigation from 'source/feature/navigation/navigation';

type PageLayoutMainProperties = {
  children: JSX.Element | JSX.Element[];
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

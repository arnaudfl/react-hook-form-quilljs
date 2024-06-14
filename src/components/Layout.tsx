interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = (props: LayoutProps) => (
  <div className="relative flex h-screen flex-col">
    <main className="container mx-auto max-w-7xl grow px-6 pt-16">
      {props.children}
    </main>
  </div>
);

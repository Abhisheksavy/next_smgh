import LayoutContent from "./layout-content";
import Providers from "../providers";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Providers>
        <LayoutContent>{children}</LayoutContent>
      </Providers>
    </>
  );
}

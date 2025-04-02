import { ReactNode } from "react";

const SearchLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div>Searchbar Layout</div>
      {children}
    </>
  );
};

export default SearchLayout;

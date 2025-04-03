import { ReactNode } from "react";
import SearchBarContainer from "./search/components/searchBarContainer";

const SearchLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <SearchBarContainer />
      {children}
    </>
  );
};

export default SearchLayout;

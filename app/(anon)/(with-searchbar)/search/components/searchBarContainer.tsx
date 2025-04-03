"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import SearchBarView from "./searchBarView";

const SearchBarContainer = () => {
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();

  const hadleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/search?q=${searchValue}`);
  };

  return (
    <SearchBarView
      onSubmit={hadleSearch}
      setSearchValue={setSearchValue}
      searchValue={searchValue}
    />
  );
};

export default SearchBarContainer;

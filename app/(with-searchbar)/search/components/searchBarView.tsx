interface SearchBarViewProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  searchValue: string;
}

const SearchBarView = ({
  onSubmit,
  setSearchValue,
  searchValue,
}: SearchBarViewProps) => {
  return (
    <form onSubmit={onSubmit} className="flex flex-row gap-x-2.5 w-full">
      <input
        type="text"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearchValue(e.target.value)
        }
        value={searchValue}
        aria-label="검색 입력 창"
        className="border-2 border-red-400 px-2 py-1 rounded flex-1"
        placeholder="영화 제목을 입력하세요"
      />

      <button
        type="submit"
        className="bg-red-400 px-2.5 py-2 rounded text-white "
      >
        검색
      </button>
    </form>
  );
};

export default SearchBarView;

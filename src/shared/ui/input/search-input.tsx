import { Input } from "./input";
import { type InputProps } from "./input-types";
import SearchIcon from "@/shared/assets/icons/search.svg";

function SearchInput(props: Omit<InputProps, "iconLeft">) {
  return (
    <Input
      {...props}
      iconLeft={SearchIcon}
      placeholder={props.placeholder || "Поиск..."}
    />
  );
}

export { SearchInput };

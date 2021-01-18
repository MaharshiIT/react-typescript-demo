import { ChangeEvent, FC, FormEvent, useState } from "react";

interface Props {
  submitListener: (val: string) => void;
  label?: string;
}
const UsersForm: FC<Props> = ({ submitListener, label }) => {
  const [inputValue, setInputValue] = useState<string>("");
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitListener(inputValue);
  };
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="users-input">{label || "Add User"}</label>
        <input id="users-input" type="text" onChange={handleInputChange} />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default UsersForm;
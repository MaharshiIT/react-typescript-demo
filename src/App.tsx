import { FC, useState, useEffect, useRef } from "react";
import "./App.css";
import axios from "axios";
import UsersForm from "./components/UsersForm";
import values from 'lodash/values';
import dropRight from 'lodash/dropRight';

type Addess = {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
}

type Users = {
  id: number;
  name: string;
  email: string;
  address: Addess;
};

const App: FC = () => {
  const [users, setUsers] = useState<Users[]>([
    {
      id: -1,
      name: "",
      email: "",
      address: { street: "", suite: "", city: "", zipcode: "" }
    }
  ]);
  let idCounter = useRef(12);
  useEffect(() => {
    async function setUserData() {
      const { data } = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      setUsers(data);
    }
    setUserData();
  }, []);
  const handleSubmitListener = (name: string) => {
    idCounter.current++;
    const counter = idCounter.current;
    const newUser = [
      ...users,
      {
        id: counter,
        name,
        email: `test${counter}@test.com`,
        address: {
          street: `street${counter}`,
          suite: `suite${counter}`,
          city: `city${counter}`,
          zipcode: `zip${counter}`
        }
      }
    ];
    setUsers(newUser);
  };
  return (
    <>
      <ul>
        {users.map(({ id, name, email, address }) => (
          <li key={id}>
            <p>{name}</p>
            <p>{email}</p>
            <p>{dropRight(values(address)).join(',')}</p>
          </li>
        ))}
      </ul>
      <UsersForm submitListener={handleSubmitListener} />
    </>
  );
};

export default App;

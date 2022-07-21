import { getUserLocalStorage } from "../../context/AuthProvider/util";

export const Home = () => {
  const user = getUserLocalStorage();
  return (
    <div style={{height: '80vh'}}>
      <h1>Olá, {user.name}</h1>
    </div>
  );
};

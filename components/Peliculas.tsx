import { FunctionalComponent } from "preact";
import { Peli } from "../types.ts";

const Peliculas: FunctionalComponent<Peli> = (props) => {
  const { name, staticImageUrl, brand } = props;
  return (
    <div className="peliculas">
      <h1>{name}</h1>
      <img src={staticImageUrl} alt={name} />
      <div>{brand}</div>
    </div>
  );
};

export default Peliculas;

import { useEffect, useState } from "preact/hooks";
import { useSignal } from "@preact/signals";
import axios from "npm:axios";
import Peliculas from "../components/Peliculas.tsx";
import Select from "../components/Select.tsx";
import { Peli } from "../types.ts";
import { FunctionalComponent } from "https://esm.sh/v128/preact@10.19.6/src/index.js";

const Pagefilter: FunctionalComponent = () => {
  const brands = useSignal<Peli[]>([]);
  const [filters, setFilters] = useState({
    brand: "",
    iso: "",
    format: "",
    color: "",
    name: ""
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Peli[]>("https://filmapi.vercel.app/api/films");
        brands.value = response.data;
        console.log("brands:", brands.value);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  });

  const handleFilterChange = (e: Event) => {
    const target = e.target as HTMLSelectElement | HTMLInputElement;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [target.name]: target.value
    }));
  };

  const filteredBrands = brands.value.filter((brand) => {
    return (
      (filters.brand === "" || brand.brand === filters.brand) &&
      (filters.iso === "" || brand.iso.toString() === filters.iso) &&
      (filters.format === "" ||
        (filters.format === "35mm" && brand.formatThirtyFive) ||
        (filters.format === "120 mm" && brand.formatOneTwenty)) &&
      (filters.color === "" ||
        (filters.color === "color" && brand.color) ||
        (filters.color === "blanco y negro" && !brand.color)) &&
      (filters.name === "" || brand.name.toLowerCase().includes(filters.name.toLowerCase()))
    );
  });


  const uniqueBrands = Array.from(new Set(brands.value.map(b => b.brand)));
  const uniqueISOs = Array.from(new Set(brands.value.map(b => b.iso.toString())));
  const formats = ["35mm", "120 mm"];
  const colors = ["color", "blanco y negro"];

  return (
    <div>
      <h1 className="titulos">Todos las peliculas</h1>
      <div className="filters">
        <div className="filter">
          <label htmlFor="brand">Marca:</label>
          <Select name="brand" value={filters.brand} onChange={handleFilterChange} options={uniqueBrands} />
        </div>
        <div className="filter">
          <label htmlFor="iso">ISO:</label>
          <Select name="iso" value={filters.iso} onChange={handleFilterChange} options={uniqueISOs} />
        </div>
        <div className="filter">
          <label htmlFor="format">Formato:</label>
          <Select name="format" value={filters.format} onChange={handleFilterChange} options={formats} />
        </div>
        <div className="filter">
          <label htmlFor="color">Color/B&N:</label>
          <Select name="color" value={filters.color} onChange={handleFilterChange} options={colors} />
        </div>
        <div className="filter">
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            name="name"
            value={filters.name}
            onChange={handleFilterChange}
          />
        </div>
      </div>
      <div className="mostrar">
        {filteredBrands.map((char) => (
          <div key={char.name} className="peliculas">
            <Peliculas name={char.name} staticImageUrl={char.staticImageUrl} brand={char.brand} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pagefilter;

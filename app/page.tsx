import { Pokemons } from "../components/Pokemons";

export default function Home() {
  return (
    <div className=" max-w-6xl mx-auto ">
      {" "}
      <div className="pt-20">
        <Pokemons />{" "}
      </div>
    </div>
  );
}

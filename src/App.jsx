import "./App.css";
import React, { useEffect, useState } from "react";
import PokemonDisplay from "./components/PokemonDisplay";
import Fighting from "./components/Fighting";

function App() {
	const baseURL = "https://pokeapi.co/api/v2/pokemon";
	const [selected, setSelected] = useState(0);
	const [pokemons, setPokemons] = useState([]);
	const [fighting, setFighting] = useState(false);

	const fetchData = async (url) => {
		const response = await fetch(url);
		const data = await response.json();
		return data;
	};

	function capitalizeFirstLetter(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	const startFight = () => {
		setFighting(true);
	};

	const pokemonData = async () => {
		const promise = await fetchData(baseURL + "?limit=151").then((response) =>
			response.results.map(async (pokemon) => {
				const pokemonDetails = await fetchData(pokemon.url);
				return {
					id: pokemonDetails.id,
					name: pokemon.name,
					sprite_front: pokemonDetails.sprites.front_default,
					sprite_back: pokemonDetails.sprites.back_default,
					types: pokemonDetails.types,
					cries: pokemonDetails.cries,
					stats: pokemonDetails.stats,
					moves: pokemonDetails.moves,
				};
			})
		);

		const pokemonData = await Promise.all(promise);
		setPokemons(pokemonData);
	};

	useEffect(() => {
		pokemonData();
		moveHorizontal(1);
	}, []);

	const moveVertical = (direction) => {
		if (fighting) {
			return;
		}
		if (direction == 0) {
			if (selected > 2) {
				setSelected(selected - 3);
			} else {
				setSelected(0);
			}
		} else if (direction == 1) {
			if (selected < pokemons.length - 3) {
				setSelected(selected + 3);
			} else {
				setSelected(pokemons.length - 1);
			}
		}
	};

	const moveHorizontal = (direction) => {
		if (fighting) {
			return;
		}
		if (direction == 0) {
			if (selected > 0) {
				setSelected(selected - 1);
			}
		} else if (direction == 1) {
			if (selected < pokemons.length - 1) {
				setSelected(selected + 1);
			}
		}
	};

	useEffect(() => {
		if (fighting) {
			return;
		}
		const handleKeyPress = (event) => {
			switch (event.key) {
				case "ArrowUp":
					moveVertical(0);
					break;
				case "ArrowDown":
					moveVertical(1);
					break;
				case "ArrowLeft":
					moveHorizontal(0);
					break;
				case "ArrowRight":
					moveHorizontal(1);
					break;
				default:
					break;
			}
		};

		window.addEventListener("keydown", handleKeyPress);

		return () => {
			window.removeEventListener("keydown", handleKeyPress);
		};
	}, [moveVertical, moveHorizontal]);
	const currentPokemon = pokemons.find((pokemon) => pokemon.id == selected + 1);
	return (
		<>
			<div className='main-container'>
				<h1>{selected}</h1>
				<div className='layout'>
					<div className='layout-left'>
						<div className='panel-container'>
							<div className='left-camera-panel'>
								<div className='components-panel'>
									<div className='camera-container'>
										<div className='camera-rim'>
											<div className='camera' />
										</div>
									</div>
									<div className='led-container'>
										<div className='led bg-red' />
										<div className='led bg-yellow' />
										<div className='led bg-green' />
									</div>
								</div>
							</div>
						</div>
						<div className='lower-panel'>
							<div className='screen'>
								<div className='inner-screen'>
									{pokemons && !fighting ? (
										<PokemonDisplay pokemons={pokemons} selected={selected} />
									) : (
										<>
											{fighting && selected && (
												<Fighting
												pokemon={pokemons.find(
													(pokemon) => pokemon.id == selected + 1
												)}
												enemy={
													pokemons[
														Math.floor(Math.random() * pokemons.length)
													]
												}
												/>
											)}
											</>
									)}
								</div>
							</div>
							<div className='button-container'>
								<div className='button bg-black' onClick={startFight} />
								<div className='interaction-container'>
									<div className='flat-buttons-container'>
										<div className='flat-button bg-red' />
										<div className='flat-button bg-blue' />
									</div>
									<div className='green-screen' />
								</div>
								<div className='pad-container'>
									<div>
										<div className='pad' onClick={() => moveVertical(0)} />
									</div>
									<div className='middle-pads'>
										<div className='pad' onClick={() => moveHorizontal(0)} />
										<div className='pad' />
										<div className='pad' onClick={() => moveHorizontal(1)} />
									</div>
									<div>
										<div className='pad' onClick={() => moveVertical(1)} />
									</div>
								</div>
							</div>
						</div>
						<div />
					</div>
					<div className='layout-right'>
						<div className='right-cutout' />
						<div className='right-panel-container'>
							<div className='right-panel'>
								<div className='right-screen-container'>
									<div className='right-screen' />
								</div>
								<div>
									<div className='blue-line'>
										<div className='blue-button' id='button1' />
										<div className='blue-button' id='button2' />
										<div className='blue-button' id='button3' />
										<div className='blue-button' id='button4' />
										<div className='blue-button' id='button5' />
									</div>
									<div className='blue-line'>
										<div className='blue-button' id='button1' />
										<div className='blue-button' id='button2' />
										<div className='blue-button' id='button3' />
										<div className='blue-button' id='button4' />
										<div className='blue-button' id='button5' />
									</div>
								</div>
								<div className='right-lower-buttons'>
									<div className='white-line'>
										<div className='white-button' />
										<div className='white-button' />
									</div>
									<div className='led-buttons'>
										<div className='right-flat-buttons'>
											<div className='flat-button bg-black' />
											<div className='flat-button bg-black' />
										</div>
										<div className='right-led' />
									</div>
								</div>
								<div className='right-lower-buttons'>
									<div className='lower-screen'>
										{selected &&
											capitalizeFirstLetter(currentPokemon.types[0].type.name)}
									</div>
									<div className='lower-screen'>
										{selected &&
											currentPokemon.types[1] &&
											capitalizeFirstLetter(currentPokemon.types[1].type.name)}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default App;

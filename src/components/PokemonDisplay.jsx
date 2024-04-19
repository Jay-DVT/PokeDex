import React, { useEffect, useRef } from "react";

const PokemonDisplay = ({ pokemons, selected }) => {
	const containerRef = useRef(null);

	function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

	useEffect(() => {
		const container = containerRef.current;
		if (container) {
			const selectedPokemonElement =
				container.getElementsByClassName("bg-yellow")[0];

			if (selectedPokemonElement) {
				const selectedTopEdge = selectedPokemonElement.offsetTop;
				const selectedBottomEdge =
					selectedTopEdge + selectedPokemonElement.offsetHeight;
				const scrollTop = container.scrollTop;
				const containerHeight = container.clientHeight;

				if (
					selectedTopEdge < scrollTop ||
					selectedBottomEdge > scrollTop + containerHeight
				) {
					container.scrollTo({
						top:
							selectedTopEdge -
							containerHeight / 2 +
							selectedPokemonElement.offsetHeight / 2 -
							263,
					});
				}
			}
		}
	}, [selected]);

	return (
		<div
			ref={containerRef}
			className='left-screen-pokemon'
			style={{ overflowY: "auto", whiteSpace: "nowrap" }}
		>
			{pokemons.map((pokemon, index) => (
				<div
					className={`pokemon-card ${
						selected + 1 == pokemon.id ? "bg-yellow" : ""
					}`}
					key={index}
				>
					<img src={pokemon.sprite_front} alt={pokemon.name} />
					<div>{capitalizeFirstLetter(pokemon.name)}</div>
				</div>
			))}
		</div>
	);
};

export default PokemonDisplay;

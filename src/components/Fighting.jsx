import React, { useState } from 'react';


const Fighting = ({ pokemon, enemy }) => {
    const [hp, setHp] = useState(pokemon.stats[0].base_stat);
    const [enemyHp, setEnemyHp] = useState(enemy.stats[0].base_stat);

	function capitalizeFirstLetter(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}


	return (
		<div className='background-container'>
			<div className='friendly-pokemon'>
                <div className="statblock">
                    <div>{capitalizeFirstLetter(pokemon.name)}</div>
                    <div>{hp + '/' + pokemon.stats[0].base_stat} HP</div>
                </div>
				<img src={pokemon.sprite_back} alt={pokemon.name} />
			</div>
			<div className='enemy-pokemon'>
				<img src={enemy.sprite_front} alt={pokemon.name} />
                <div className="statblock">
                    <div>{capitalizeFirstLetter(enemy.name)}</div>
                    <div>{enemyHp + '/' + enemy.stats[0].base_stat} HP</div>
                </div>
			</div>
		</div>
	);
};

export default Fighting;

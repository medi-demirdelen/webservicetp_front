import React from 'react';
import { useNavigate } from "react-router-dom";
import { StatsContext } from "../App";
import axios from 'axios';

function Home({stats}) {

    const navigate = useNavigate();
    const [showStatus, setStatus] = React.useState(false);
    const [showEnemy, setEnemy] = React.useState(false);
    const [heroName, setHeroName] = React.useState("");

    React.useEffect(() => {
        axios.get("https://api.fungenerators.com/name/generate?category=elf&limit=1")
            .then(r => {
                setHeroName(r.data['contents']['names'][0]);
            })
    }, []);

    // eslint-disable-next-line no-unused-vars
    const [statsValue, setStatsValue] = React.useContext(StatsContext);

    function goToBattle(enemyId) {
        navigate("/battle/"+enemyId);
    }

    return (
        <div className="Home">
            <div className="Category" onClick={() => {
                setEnemy(!showEnemy);
            }}>
                Combattre
            </div>
            {
                showEnemy &&
                <div className="EnemyCategory">
                    <div className="SubCategory" onClick={() => {
                        goToBattle(1);
                    }}>
                        Ennemi #1
                    </div>
                    <div className="SubCategory" onClick={() => {
                        goToBattle(2);
                    }}>
                        Ennemi #2
                    </div>
                </div>
            }
            <div className="Category" onClick={() => {
                setStatus(!showStatus);
            }}>
                Status
            </div>
            {
                showStatus && 
                <div className="Status">
                    { "Nom : " + heroName }<br/>
                    { "Niveau : " + statsValue.level }<br/>
                    { "EXP : " + statsValue.exp }<br/>
                    { "HP : " + (stats['player']['hp'] + (2 * (statsValue.level-1)) )}<br/>
                    { "Atk : " + (stats['player']['atk'] + (statsValue.level-1) )}<br/>
                    { "Def : " + (stats['player']['def'] + (statsValue.level-1) )}<br/>
                    { "Argent : " + statsValue.money }
                </div>
            }
        </div>
    );
}

export default Home;
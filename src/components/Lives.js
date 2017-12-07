import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import * as styles from './Lives.scss';


const playAgainButton = (gameOver,playAgain) => {
  if (gameOver) return (<Button onClick={playAgain} bsStyle="primary">
          Play Again
        </Button>);
}

const GameOver = ({gameOver}) => {
  if (gameOver) 
    return <div className={styles.gameOverLabel}>Game Over</div>;
  else 
    return null;
}

export const Lives = ({numLives,gameOver,playAgain}) => (<div className={styles.lives}>
  Lives: {numLives} <GameOver gameOver={gameOver}/>
        {' '}
        {playAgainButton(gameOver,playAgain)}

</div>)

// (c) Nir Oren 2017

import React from 'react';
import {connect} from 'react-redux';
import styles from './GameArea.scss';
import {MOVE_LEFT,MOVE_RIGHT,REST_IN_PLACE} from '../constants/ActionTypes';
import {MAX_RIGHT,TIMER_FREQUENCY,MAX_BOTTOM,SPRITE_SIZE,ADD_MISSLE_EVERY_X_SECOND} from '../constants/Params';
import * as actionCreators from '../actions';
import {Lives} from '../components/Lives';

import explosion from '../assets/explosion.mp3';

class GameArea extends React.Component {

  timerId = null;

  handleMouseDown(e) {

    if (this.props.gameOver)
      return;

    switch (e.button) {
        case (2):
          this.props.goRightHandler();
          break;
        case (0):
          this.props.goLeftHandler();
          break;
        default:
    }
  }

  handleMouseUp(e) {
    this.props.restInPlace();
  }

  handleKeyDown(e) {
    if (this.props.gameOver)
      return;

    switch (e.code) {
      case 'ArrowLeft':
        this.props.goLeftHandler();
        break;
      case 'ArrowRight':
        this.props.goRightHandler();
        break;
      default:
    }
  }

  handleKeyUp(e) {
    this.props.restInPlace();
  }

  stopContextMenu(e) {
    e.preventDefault();
  }

  componentDidMount() {

      document.addEventListener('mousedown', this.handleMouseDown.bind(this) );
      document.addEventListener('mouseup', this.handleMouseUp.bind(this));
      document.addEventListener('keydown', this.handleKeyDown.bind(this));
      document.addEventListener('keyup', this.handleKeyUp.bind(this));
      document.addEventListener('contextmenu', this.stopContextMenu.bind(this));

      this.timerId = window.setInterval( this.timer.bind(this), TIMER_FREQUENCY );      
  }

  componentWillUnmount() {

      document.removeEventListener('mousedown', this.handleMouseDown);
      document.removeEventListener('mouseup', this.handleMouseUp);
      document.removeEventListener('keydown', this.handleKeyDown);
      document.removeEventListener('keyup', this.handleKeyUp);
      document.removeEventListener('contextmenu', this.stopContextMenu);

      window.clearInterval(this.timerId);
    
  }
  
  timer() {
    switch (this.props.direction) {
      case MOVE_LEFT:
          this.props.dispatch(actionCreators.moveLeft());
          break;
      case MOVE_RIGHT:
          this.props.dispatch(actionCreators.moveRight());
          break;      
      case REST_IN_PLACE: 
          this.props.dispatch(actionCreators.restInPlace());
          break; 
      default:         
    }
    this.checkCollision();
    this.addMissles();
    this.props.dispatch(actionCreators.misslesNext());
  }

  checkCollision() {
    if (this.props.missles.length===0 || this.props.gameOver)
      return;

    for (let i=this.props.missles.length-1;i>=0;i--) {

      let missle = this.props.missles[i];
      if (missle.boom) continue;
      if (missle.y > MAX_BOTTOM-SPRITE_SIZE+30
        && missle.x > this.props.location-(SPRITE_SIZE)
        && missle.x <= this.props.location+(SPRITE_SIZE)
        ){
          let audio = new Audio(explosion);
          audio.play();

          this.props.dispatch(actionCreators.reduceLives());
          this.props.dispatch(actionCreators.boomMissle(i))
        }
    }
  }

  addMissles() {
    let r = Math.random(0);
    if (r < (TIMER_FREQUENCY/1000) / ADD_MISSLE_EVERY_X_SECOND) {
      const randomX = Math.round(Math.random(0) * MAX_RIGHT);
      const tendencyToFace = Math.random(0);
      const finalLocation = Math.round( 
        this.props.location*tendencyToFace + 
        randomX*(1-tendencyToFace) 
      );
      this.props.dispatch(actionCreators.addMissle(finalLocation));
    }
  }

  playAgainHandler() {
    this.props.dispatch(actionCreators.newGame());
  }

  render() {
    let faceStyle;
    switch (this.props.direction) {
      case MOVE_LEFT:
        faceStyle = styles.faceLeft;
        break;
      case MOVE_RIGHT:
        faceStyle = styles.faceRight;
        break;
      default:
        faceStyle = styles.faceCenter;
    }

    let missles = this.props.missles.map( 
      (item,counter) => <div key={counter} style={{top:`${item.y}px`,left:`${item.x}px`}} className={item.boom?styles.missleBoom:styles.missle} /> );

    let outerStyle = styles.outerArea+(this.props.gameOver?' '+styles.outerGameOver:'');

    return ( <div className={outerStyle}>
      <div className={styles.livesArea}> 
        <Lives numLives={this.props.numLives} gameOver={this.props.gameOver} playAgain={() => this.playAgainHandler()}/>
      </div>
      <div className={styles.gameArea}>
        <div style={{left:`${this.props.location}px`}} className={faceStyle} />
        {missles}
    </div>          
  </div>
  );}
}

const mapStateToProps = (state) => ({
  location: state.gameReducer.ui.location,
  direction: state.gameReducer.ui.direction,
  missles: state.gameReducer.missles,
  numLives: state.gameReducer.numLives,
  gameOver: state.gameReducer.gameOver,
})

const mapDispatchToProps = (dispatch) => ({
    goLeftHandler: () => dispatch(actionCreators.moveLeft()),
    goRightHandler: () => dispatch(actionCreators.moveRight()),
    restInPlace: () => dispatch(actionCreators.restInPlace()),
    misslesNext: () => dispatch(actionCreators.misslesNext()),
    dispatch: dispatch
})

const statefulGameArea = connect(
  mapStateToProps,
  mapDispatchToProps
)(GameArea);

export default statefulGameArea;

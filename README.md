# The Missile Attack Game
### Front End Developer - Code Exercise

## Game Flow

The purpose of the game is to dodge missiles dropping from the top of the screen.  
The player has an avatar standing at the bottom of the screen, which can be moved left or right with the arrow keys (keyboard).  
The top left corner of the screen contains a lives indicator which starts at 3, and drops by one each time a missile touches the avatar. When it reaches 0, the game ends and a popup is presented on top of the game asking the player if s/he wants to play again.  
## Game Mechanics
Missiles should fall from the top of the screen. The X coordinates should be randomized with higher probability given to the X coordinates of the Avatar.  
The avatar should have a left facing image, a right facing image and a front facing image when idle.  
Bonus Features (optional):  
1. Add throttle to the frequency in which missiles are dropped. So they start slow and increase frequency over time.  
2. Try to consider the avatar's current movement when choosing the missiles X coordinates.  
3. Add different angles to the missiles drop route.  
4. Add blast animation and sound when a missile hits the avatar.  
5. Provide nice cheats to the game. Use your imagination   

## Implementation
The requirement is for desktop only version.  
The game should be written as SPA using React and Redux.  
The state should be fully controlled. don't use setState -- everything should be controlled components.  
Use free images from the web for the avatar and missile (don't invest time on this).  
The game can support only one orientation. Supporting both orientations is optional.

Good luck!

# Tutorial para correr el proyecto 

## Tecnologias y librerias que se usaron:
- React
- bootstrap 5
- sweetalert2
- Html
- Css

### ¿Cómo correr el proyecto?
Se debe instalar la libreria de SweetAlert2 para poder ver las alertas.
como se uso React para correr el proyecto debe usar npm start.

### ¿Cómo jugar?
battleship es un juego de ataque por turnos donde el objetivo es undir los barcos del enemigo.
1. Para iniciar debe colocar sus barcos en la tabla del jugador se permiten 5 barcos con 4 casillas de largo (que es el largo del barco).
2. Cada vez que coloque un barco debe hacer click en el boton 'Colocar nuevo barco' ya que esto establece la longitud del barco a 0 y permite colocar otro barco, una vez colocado los 5 barco el botón se deshabilita.
3. Una vez Establecido sus barcos y su estrategia es hora de atacar!!! Cada vez que haga click las casillas del tablero de la computadora se capturara el evento de atacar, donde se pintara verde si no hay barcos y  rojo si es que hay uno.
4. Si es que gana o pierde saltara una alerta avisando el resultado.
5. Tiene la opción de poder volver a jugar apretando en el boton reiniciar.

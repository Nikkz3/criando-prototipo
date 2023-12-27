class CannonBall {
    constructor(x,y) {
        var options = {
            isStatic: true 
        };
        this.r = 30;
        this.body = Bodies.circle(x, y, this.r, options);
        this.image = loadImage("./assets/cannonball.png");
        this.trajectory = [];
        
        World.add(world, this.body);
    }



  shoot() {
    // Calculando um novo ângulo subtraindo 28 graus do ângulo atual do canhão
    var newAngle = cannon.angle - 28;
    // Convertendo o ângulo para radianos
    var newAngle = newAngle * (3.14 / 180);
    // Calculando a velocidade com base no novo ângulo usando p5.Vector
    var velocity = p5.Vector.fromAngle(newAngle);
    // Multiplicando a velocidade por 0.5
    velocity.mult(0.5);
    // Tornando o corpo da bola de canhão não estático
    Matter.Body.setStatic(this.body, false);
    // Configurando a velocidade do corpo com base na velocidade calculada
    Matter.Body.setVelocity(this.body, {
      x: velocity.x * (180 / 3.14),
      y: velocity.y * (180 / 3.14)
    });
  }


  // Método para exibir a bola de canhão na tela
  display() {
    // Obtendo a posição atual da bola de canhão
    var pos = this.body.position;
    push();  // Salvando o estado de renderização atual
    imageMode(CENTER);  // Configurando o modo de exibição da imagem para o centro
    // Desenhando a imagem da bola de canhão na posição atual
    image(this.image, pos.x, pos.y, this.r, this.r);
    pop();  // Restaurando o estado de renderização anterior

    if (this.body.velocity.x >0 && pos.x > 10) {
        var position = [pos.x, pos.y];
        this.trajectory.push(position);
    }
    for (var i = 0; i < this.trajectory.length; i++) {

        image(this.image, this.trajectory[i][0], this.trajectory[i][1], 5, 5);
    }
  }
}



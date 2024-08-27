var path, boy, cash, diamonds, jwellery, sword;
var pathImg, boyImg, cashImg, diamondsImg, jwelleryImg, swordImg;
var treasureCollection = 0;
var cashG, diamondsG, jwelleryG, swordGroup;

//Game States
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("Runner-1.png", "Runner-2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg = loadAnimation("gameOver.png");
}

function setup(){
  createCanvas(windowWidth, windowHeight); // Ajuste a tamaño del dispositivo

  // Fondo de la carretera
  path = createSprite(width/2, 200);
  path.addImage(pathImg);
  path.velocityY = 4;

  // Crear el sprite del corredor
  boy = createSprite(width/2, height - 20, 20, 20);
  boy.addAnimation("SahilRunning", boyImg);
  boy.scale = 0.08;
  
  // Grupos para los objetos
  cashG = new Group();
  diamondsG = new Group();
  jwelleryG = new Group();
  swordGroup = new Group();
}

function draw() {
  if (gameState === PLAY) {
    background(0);
    boy.x = World.mouseX;

    // Crear límites de borde
    edges = createEdgeSprites();
    boy.collide(edges);

    // Reiniciar el fondo
    if (path.y > height) {
      path.y = height / 2;
    }

    // Generar objetos
    createCash();
    createDiamonds();
    createJwellery();
    createSword();

    // Verificar colisiones
    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection += 50;
    } 
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection += 100;
    } 
    else if (jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      treasureCollection += 150;
    } 
    else if (swordGroup.isTouching(boy)) {
      gameState = END;
      boy.addAnimation("SahilRunning", endImg);
      boy.x = width / 2;
      boy.y = height / 2;
      boy.scale = 0.6;

      // Destruir grupos y detener movimiento
      cashG.destroyEach();
      diamondsG.destroyEach();
      jwelleryG.destroyEach();
      swordGroup.destroyEach();

      cashG.setVelocityYEach(0);
      diamondsG.setVelocityYEach(0);
      jwelleryG.setVelocityYEach(0);
      swordGroup.setVelocityYEach(0);
    }

    drawSprites();
    textSize(20);
    fill(255);
    text("Tesoro: " + treasureCollection, width - 150, 30);
  }
}

function createCash() {
  if (World.frameCount % 200 === 0) {
    var cash = createSprite(Math.round(random(50, width - 50)), 40, 10, 10); // Modificar las posiciones
    cash.addImage(cashImg);
    cash.scale = 0.12;
    cash.velocityY = 5;
    cash.lifetime = height / cash.velocityY;
    cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 320 === 0) {
    var diamonds = createSprite(Math.round(random(50, width - 50)), 40, 10, 10); // Modificar las posiciones
    diamonds.addImage(diamondsImg);
    diamonds.scale = 0.03;
    diamonds.velocityY = 5;
    diamonds.lifetime = height / diamonds.velocityY;
    diamondsG.add(diamonds);
  }
}

function createJwellery() {
  if (World.frameCount % 410 === 0) {
    var jwellery = createSprite(Math.round(random(50, width - 50)), 40, 10, 10); // Modificar las posiciones
    jwellery.addImage(jwelleryImg);
    jwellery.scale = 0.13;
    jwellery.velocityY = 5;
    jwellery.lifetime = height / jwellery.velocityY;
    jwelleryG.add(jwellery);
  }
}

function createSword() {
  if (World.frameCount % 530 === 0) {
    var sword = createSprite(Math.round(random(50, width - 50)), 40, 10, 10); // Modificar las posiciones
    sword.addImage(swordImg);
    sword.scale = 0.1;
    sword.velocityY = 4;
    sword.lifetime = height / sword.velocityY;
    swordGroup.add(sword);
  }
}

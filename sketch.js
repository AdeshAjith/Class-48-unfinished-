var hero,invader,earth,Invader,hlaser1,lifearray,dearth
var backGround,MeteorImage,InvaderImage,heroImage,earthImage,dearthimg
var invadergrp, Hlasergrp, lasergrp, meteorgrp, herogrp
var count = 0
var posarray = []
var score=0
var lifecount=0
var elifecount = 0
var gamestate = "play"

function preload(){
  earthImage = loadImage("images/Earth.png")
  heroImage = loadImage("images/SuperHero.png")
  backGround = loadImage("images/Space.jpg")
  MeteorImage = loadImage("images/Meteor.png")
  InvaderImage = loadImage("images/Invaders.png")
  LifeImage = loadImage("images/LIfe.png")
  dearthimg = loadImage("images/Destroyed Earth.jpg")
}

function setup() {

  createCanvas(1200,650);

  invadergrp = createGroup()
  Hlasergrp = createGroup()
  lasergrp = createGroup()
  meteorgrp = createGroup()
  herogrp = createGroup()

  hero = createSprite(600,400)
  hero.addImage(heroImage)
  hero.scale = 0.12
  herogrp.add(hero)

  earth = createSprite(600,575,100,100)
  earth.addImage(earthImage)
  earth.scale = 0.15


  life5 = createSprite(1000,20,20,20)
  life5.addImage(LifeImage)
  life5.scale = 0.06
  life4 = createSprite(1040,20,20,20)
  life4.addImage(LifeImage)
  life4.scale = 0.06
  life3 = createSprite(1080,20,20,20)
  life3.addImage(LifeImage)
  life3.scale = 0.06
  life2 = createSprite(1120,20,20,20)
  life2.addImage(LifeImage)
  life2.scale = 0.06
  life1 = createSprite(1160,20,20,20)
  life1.addImage(LifeImage)
  life1.scale = 0.06

  lifearray = [life5,life4,life3,life2,life1]

  elife1 = createSprite(1020,80,20,20)
  elife1.addImage(earthImage)
  elife1.scale = 0.05
  elife2 = createSprite(1080,80,20,20)
  elife2.addImage(earthImage)
  elife2.scale = 0.05
  elife3 = createSprite(1140,80,20,20)
  elife3.addImage(earthImage)
  elife3.scale = 0.05

  elifeArray = [elife1,elife2,elife3]
  
}

function draw() {
  background(backGround);

  if(gamestate === "play"){

    textSize(20)
    fill("white")
    text ("Score"+":"+score,100,50)
    hero.velocityX = 0,
    hero.velocityY = 0

    if(keyDown(RIGHT_ARROW)){
      hero.velocityX = 5
    }

    if(keyDown(LEFT_ARROW)){
      hero.velocityX = -5
    }

    if(keyWentDown('SPACE')){
      Hlaser()
    } 

    for (var i = 0; i < invadergrp.length; i++) {
      if (invadergrp[i].isTouching(Hlasergrp)) {
        if(posarray[i]===invadergrp[i].newPosition.x){
          posarray.splice(i,1)
        }
        invadergrp[i].destroy();
        score = score+2
        count=count-1
      } 
    }

    for (var i = 0; i < lasergrp.length; i++) {
      if(lasergrp[i].isTouching(hero)){
        lifecount=lifecount+1
        lasergrp[i].destroy()
        for (var j = 0; j < 5; j++) {
          if(2*j===lifecount-2 && lifecount<11){
            lifearray[j].remove()
          }
        }
        if(lifecount>=10){
          gamestate="end"
        }
      }
    }
      
    for(var i = 0; i < meteorgrp.length; i++) {
      if(meteorgrp[i].isTouching(earth)){
        elifecount = elifecount+1
        meteorgrp[i].destroy();
      }
      for (var j = 0; j < 3; j++) {
        if(j===elifecount-1 && elifecount<4){
          elifeArray[j].remove()
        }
      }
      if(elifecount>=3){
        gamestate="end"
      }
      if(meteorgrp[i].isTouching(Hlasergrp)) {
        meteorgrp[i].destroy();
        score = score+3
      }  
      
      else if (meteorgrp[i].isTouching(herogrp)) {
        meteorgrp[i].destroy();
        score = score-3
      } 
    }

    if(score===6 && lifecount>0){
      var extralife = lifecount/2 
      switch(extralife){
        case 1: lifearray.push(life5)
        lifecount = lifecount-2
        break;
        case 2: lifearray.push(life4)
        lifecount = lifecount-2
        break;
        case 3: lifearray.push(life3)
        lifecount = lifecount-2
        break;
        case 4: lifearray.push(life2)
        lifecount = lifecount-2
        break;
        case 5:lifearray.push(life1)
        lifecount = lifecount-2
        break;
        default:break;
      }
    }
    
    Meteors()
    Invaders()

    drawSprites();
  }

  if(gamestate==="end"){

    Hlasergrp.destroyEach()
    lasergrp.destroyEach()
    meteorgrp.destroyEach()
    
    earth.remove()
    
    dearth = createSprite(600,325)
    dearth.addImage(dearthimg)
    dearth.scale = 2
    drawSprites();

    textSize(30)
    strokeWeight(3)
    stroke("red")
    fill("red")
    text("EARTH IS DESTROYED", 400, 325)

    hero.velocityX = 0,
    hero.velocityY = 0
  }
}

function Meteors(){
  
  if(frameCount%100 === 0){
    var rand = Math.round(random(300,900))
    var Meteor = createSprite(rand,-50)
    Meteor.addImage(MeteorImage)
    Meteor.velocityY = 3
    Meteor.scale = 0.05
    Meteor.lifetime = 250

    meteorgrp.add(Meteor)
  }
}

function Invaders(){

  var rand = Math.round(random(300,900))
  if(frameCount%40 === 0){
    
    if(count<=4){
     
      Invader = createSprite(rand,20)
      Invader.addImage(InvaderImage)
      Invader.scale = 0.05
      invadergrp.add(Invader)

      posarray.push(Invader.position.x)

      count = count+1

      var laser1 = createSprite(Invader.x-5,40,5,12)
      laser1.shapeColor = "red"
      laser1.velocityY = 2
      laser1.lifetime = 325

      var laser2 = createSprite(Invader.x+5,40,5,12)
      laser2.shapeColor = "red"
      laser2.velocityY = 2
      laser2.lifetime = 325 

      lasergrp.add(laser1)
      lasergrp.add(laser2)
    }
  }

  if(frameCount%100 === 0 && count===5){

    var rand1 = Math.round(random(0,4))

    var laser3 = createSprite(posarray[rand1]-5,40,5,12)
    laser3.shapeColor = "red"
    laser3.velocityY = 2
    laser3.lifetime = 325

    var laser4 = createSprite(posarray[rand1]+5,40,5,12)
    laser4.shapeColor = "red"
    laser4.velocityY = 2
    laser4.lifetime = 325

    lasergrp.add(laser3)
    lasergrp.add(laser4)
  }
}

function Hlaser(){
  hlaser = createSprite(hero.x+10,hero.y-80,5,12)
  hlaser.shapeColor = "red"
  hlaser.velocityY = -7
  hlaser.lifetime = 175

  Hlasergrp.add(hlaser)
}
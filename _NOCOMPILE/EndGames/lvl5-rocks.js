(function(){

function lvl5(io){
	//CANVAS VARS
	this.io = io;
	this.cHeight = io.canvas.height;
	this.cWidth = io.canvas.width;
	this.imgPath = 'img/';
	this.loadResources = 0;
	this.totalResources = 5;
	
	//COLOR PALLET
	this.red = '#C91E1B';
	this.sunset = '#F05722';
	this.orange = '#E35D08';
	this.yellow = '#EFC318';
	this.lime = '#ABB82C';
	this.green = '#13774F';
	this.turquoise = '#117BB3';
	this.blue = '#3158DC';
	this.navy = '#332D8C';
	this.purple = '#4A1A84';
	this.burgundy = '#730835';
	this.brown = '#795548';
	this.white = '#F9F9F9';
	this.black = '#4D4D4D';
	this.grey = '#CCCCCC';

	//GAME VARS
	this.MIN_SIZE = 25/2;
	this.MAX_SIZE = 45/2;
	this.goal =
	this.goalTouch =
	this.goalEffect = undefined;
	this.goalTime = 150;
	this.goalTouchTime = 0;
	
	this.platform = undefined;
	this.platformBodyDef = new b2BodyDef;
	this.platformFixDef = new b2FixtureDef;
	
	this.gameEnd = false;
	   
}; iio.lvl5 = lvl5;

lvl5.prototype.setup = function(){

	this.io.setBGColor(this.black);
	this.io.addToGroup('BACKGROUND',new iio.Rect(this.cWidth/2,this.cHeight/2,this.cWidth,this.cHeight).addImage(this.imgPath+'lvl5.png'),-30);

	var fixDef = new b2FixtureDef;
	fixDef.friction = 1;
	fixDef.restitution = 0.5;
	
	var bodyDef = new b2BodyDef;
	bodyDef.type = b2Body.b2_staticBody;
	
	
	//GROUND
	fixDef.shape = new b2PolygonShape;
	fixDef.shape.SetAsBox(pxConv(this.cWidth/2,true),pxConv(0,true));
	bodyDef.position.Set(pxConv(this.cWidth/2,true),pxConv(this.cHeight,true));
	this.prepShape(bodyDef, fixDef).setFillStyle('blue');
	

	//BASIN WALLS
	
	fixDef.shape = new b2PolygonShape;
	fixDef.shape.SetAsBox(pxConv(0,true),pxConv(150/2,true));
	bodyDef.position.Set(pxConv(0 - 0,true),pxConv(this.cHeight - 75,true));
	
	this.prepShape(bodyDef, fixDef).setFillStyle('blue');
	
	fixDef.shape = new b2PolygonShape;
	fixDef.shape.SetAsBox(pxConv(0,true),pxConv(150/2,true));
	bodyDef.position.Set(pxConv(this.cWidth - 0,true),pxConv(this.cHeight - 75,true));
	this.prepShape(bodyDef, fixDef).setFillStyle('blue');
	
	//WORLD BOUNDRIES
	
	fixDef.friction = 0;
	
	fixDef.shape = new b2PolygonShape;
	fixDef.shape.SetAsBox(pxConv(0,true),pxConv(200,true));
	bodyDef.angle=-Math.PI/6;
	bodyDef.position.Set(pxConv(0 - 100,true),pxConv(this.cHeight - 320,true));
	this.prepShape(bodyDef, fixDef).setFillStyle('red');
	
	fixDef.shape = new b2PolygonShape;
	fixDef.shape.SetAsBox(pxConv(0,true),pxConv(200,true));
	bodyDef.angle=Math.PI/6;
	bodyDef.position.Set(pxConv(this.cWidth + 100,true),pxConv(this.cHeight - 320,true));
	this.prepShape(bodyDef, fixDef).setFillStyle('red');
	
	fixDef.shape = new b2PolygonShape;
	fixDef.shape.SetAsBox(pxConv(0,true),pxConv(210,true));
	bodyDef.angle=-Math.PI/3;
	bodyDef.position.Set(pxConv(this.cWidth + 30,true),pxConv(-110,true));
	this.prepShape(bodyDef, fixDef).setFillStyle('yellow');
	
	fixDef.shape = new b2PolygonShape;
	fixDef.shape.SetAsBox(pxConv(0,true),pxConv(210,true));
	bodyDef.angle=Math.PI/3;
	bodyDef.position.Set(pxConv(-30,true),pxConv(-110,true));
	this.prepShape(bodyDef, fixDef).setFillStyle('yellow');
	
	fixDef.friction = 1;
	bodyDef.angle = 0;

	//PLATFORM
	
	this.platformBodyDef.type = b2Body.b2_kinematicBody;
	this.platformFixDef.shape = new b2PolygonShape;
	this.platformFixDef.shape.SetAsBox(pxConv(this.cWidth/5,true),pxConv(5,true));

	this.platformBodyDef.position.Set(pxConv(this.cWidth/2,true),pxConv(this.cHeight - (10 + 100),true));	
	
	this.platform = this.io.addObj(world.CreateBody(this.platformBodyDef)).CreateFixture(this.platformFixDef);
   	//this.platform.GetBody().SetLinearVelocity(new b2Vec2(0,0));

	this.platform.GetShape().prepGraphics(this.io.b2Scale)
	.setFillStyle(this.green);
	
		
		
	//GOAL
	fixDef.isSensor = true;
	fixDef.userData = 'goal';
	fixDef.shape = new b2PolygonShape;
	fixDef.shape.SetAsBox(pxConv(62/2,true),pxConv(59/2,true));
	bodyDef.position.Set(pxConv(this.cWidth/2,true),pxConv(75,true));
	
	this.goalEffect = this.io.addToGroup('GOALEFFECTS', new iio.Circle(pxConv(this.cWidth/2),pxConv(75),0).setFillStyle('rgba(255,255,255,0.2)'));
	
	this.prepShape(bodyDef, fixDef).addImage(this.imgPath + 'star.png')
	

	
	//SHAPES!
	
	fixDef = new b2FixtureDef;
	fixDef.friction = 0.3;
	fixDef.restitution = 0.5;
	fixDef.density = 5;
	fixDef.userData = 'blocks';
	bodyDef.type = b2Body.b2_dynamicBody;
	fixDef.shape = new b2PolygonShape;
	
	fixDef.shape.SetAsBox(pxConv(this.MIN_SIZE,true),pxConv(this.MIN_SIZE,true));
	bodyDef.position.Set(pxConv(this.cWidth/2,true),pxConv(this.cHeight - this.MIN_SIZE,true));
	this.prepShape(bodyDef, fixDef).setFillStyle(this.navy);
	
	fixDef.shape.SetAsBox(pxConv(this.MIN_SIZE,true),pxConv(this.MIN_SIZE,true));
	bodyDef.position.Set(pxConv(this.cWidth/2,true),pxConv(this.cHeight - this.MIN_SIZE,true));
	this.prepShape(bodyDef, fixDef).setFillStyle(this.turquoise);
	
	fixDef.shape.SetAsBox(pxConv(this.MAX_SIZE,true),pxConv(this.MAX_SIZE,true));
	bodyDef.position.Set(pxConv(this.cWidth/2,true),pxConv(this.cHeight - this.MAX_SIZE,true));
	this.prepShape(bodyDef, fixDef).setFillStyle(this.sunset);
	
	fixDef.shape.SetAsBox(pxConv(this.MAX_SIZE,true),pxConv(45,true));
	bodyDef.position.Set(pxConv(this.cWidth/2 - this.MAX_SIZE,true),pxConv(this.cHeight - (45),true));
	this.prepShape(bodyDef, fixDef).setFillStyle(this.red);
	
	fixDef.shape.SetAsBox(pxConv(this.MAX_SIZE,true),pxConv(this.MIN_SIZE,true));
	bodyDef.position.Set(pxConv(this.cWidth/2 - 45,true),pxConv(this.cHeight - (45),true));
	this.prepShape(bodyDef, fixDef).setFillStyle(this.blue).setStrokeStyle(this.black,2);
	
	fixDef.shape.SetAsBox(pxConv(45,true),pxConv(this.MAX_SIZE/2,true));
	bodyDef.position.Set(pxConv(this.cWidth/2 - 80,true),pxConv(this.cHeight - (45),true));
	this.prepShape(bodyDef, fixDef).setFillStyle(this.purple);
	

	
	fixDef.shape.SetAsArray([
			new b2Vec2(pxConv(-80,true)/4, pxConv(-0,true)/4), 
			new b2Vec2(pxConv(80,true)/4, pxConv(-0,true)/4), 
			new b2Vec2(pxConv(120,true)/4, pxConv(120,true)/4), 
			new b2Vec2(pxConv(-120,true)/4, pxConv(120,true)/4)
		]);
bodyDef.position.Set(pxConv(this.cWidth/2 + this.MAX_SIZE,true),pxConv(this.cHeight - (this.MAX_SIZE),true));
	
	    this.prepShape(bodyDef, fixDef).setFillStyle(this.burgundy);    
	  

}//SETUP

lvl5.prototype.step = function(){
	var lio = this;
	
	if(this.gameEnd == true){
		//console.log(world);
		world.m_gravity.x = 50;


//REMOVE FROM LOOP!
	  var node = world.GetBodyList(); 
	  var i = 0;
	  //MAKE ALL BLOCKS AWAKE!
	  	while(node){
	 		var curr = node;
			node = node.GetNext();
			if(curr.GetType() == b2Body.b2_dynamicBody){
				if(curr.GetFixtureList().GetUserData() == 'blocks'){
					i++;
					
					curr.SetSleepingAllowed(false);
					//curr.GetFixtureList().GetShape().m_radius = 10;
					//console.log(curr.GetPosition());
				}
			}
		}
	}else{
		world.m_gravity.x = 0;
	}
	
	//	this.platform.GetBody().SetLinearVelocity(new b2Vec2(0,3));
	if(this.goalTouchTime >= this.goalTime){
		this.gameOver = true;
	}
	if(this.goalTouch){
		if(this.goalTouch.GetBody() != selectedBody){
			this.goalEffect.radius = this.goalTouchTime;
			this.goalTouchTime++;
		}else{
			this.goalTouchTime = 0; 
			this.goalEffect.radius = this.goalTouchTime;
		}
	}
	listener.BeginContact = function(contact) {
		if(contact.GetFixtureB().GetUserData() == 'goal'){
			lio.goalTouch = contact.GetFixtureA();
			lio.goal = contact.GetFixtureB();
		}	
	}
	listener.EndContact = function(contact) {
		if(contact.GetFixtureB().GetUserData() == 'goal'){
			lio.goalTouchTime = 0; 
			lio.goalTouch = undefined;
			lio.goalEffect.radius = 0;
		}
	}
	
}//STEP
lvl5.prototype.prepShape = function(bodyDef, fixDef,group,zIndex){
	if(!group){
		group = 'worldObj';
	}
	if(!zIndex){
		zIndex = 0;
	}

	return  this.io.addToGroup(group,world.CreateBody(bodyDef),zIndex)
	        .CreateFixture(fixDef)
	        .GetShape()
		    .prepGraphics(this.io.b2Scale); 
};

iio.AppManager.prototype.activateLevel5 = function(io){
	this.level = new iio.lvl5(io);
	return this.level;
}

})();
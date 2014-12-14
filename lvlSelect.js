(function(){
//Definition

function lvlSelect(io){
	//CANVAS VARS
	this.io = io;
	this._io = io;
	this.cHeight = io.canvas.height;
	this.cWidth = io.canvas.width;
	this.imgPath = 'img/';
	this.loadResources = 0;
	this.totalResources = 5;
	

	this.btnSpaceX = 40;
	this.btnMargin = 80;

	this.btnSpaceY = 40;


	this.btnSize = 65;
	
	//Levels
	this.lvlButtons =  new Array();
	   
}; iio.lvlSelect = lvlSelect;

lvlSelect.prototype.setup = function(){
	
	this.io.addToGroup('BACKGROUND',new iio.Rect(pxConv(this.cWidth/2),pxConv(this.cHeight/2),pxConv(this.cWidth),pxConv(this.cHeight)).addImage(this.imgPath+'mountain.png'),-30);
	
	this.backBtn = this.io.addToGroup('MENU',new iio.Rect(pxConv(35),pxConv(25), pxConv(this.btnSpaceX), pxConv(this.btnSpaceX)).addImage('img/backBtn.png'),20)

	this.lvlButtons.push(null);
	var j = 0;
	var k = 0;
	var colorNum = 0;
	var color = getColor(colorNum);
	console.log(color);

	for(var i = 0; i < MAX_LEVELS ; i++){
			if(i % 4 === 0){
				colorNum++;
				j++;
				color = getColor(colorNum);
				k = 0;

			}
		this.lvlButtons.push(this.io.addToGroup('LEVELBTNS',new iio.Rect(pxConv(this.btnSpaceX + this.btnMargin *k ),pxConv(this.btnSpaceY + (this.btnMargin *j)), pxConv(this.btnSize), pxConv(this.btnSize)).setStrokeStyle(color[1],pxConv(3))));	
		k++;
	}
		
	/*this.lvlButtons.push(this.io.addToGroup('LEVELBTNS',new iio.Rect(pxConv(this.btnSpaceX),pxConv(this.btnSpaceY), pxConv(this.btnSize), pxConv(this.btnSize)).setStrokeStyle(colors['red'][1],4)
	));

	this.lvlButtons.push(this.io.addToGroup('LEVELBTNS',new iio.Rect(pxConv(this.btnMargin + this.btnSpaceX),pxConv(this.btnSpaceY), pxConv(this.btnSize), pxConv(this.btnSize)).setStrokeStyle(colors['burgundy'][1],4)
	));
	
	this.lvlButtons.push(this.io.addToGroup('LEVELBTNS',new iio.Rect(pxConv(this.btnMargin*2 + this.btnSpaceX),pxConv(this.btnSpaceY), pxConv(this.btnSize), pxConv(this.btnSize)).setStrokeStyle(colors['blue'][1],4) 
	));

	this.lvlButtons.push(this.io.addToGroup('LEVELBTNS',new iio.Rect(pxConv(this.btnMargin*3 + this.btnSpaceX),pxConv(this.btnSpaceY), pxConv(this.btnSize), pxConv(this.btnSize)).setStrokeStyle(colors['turquoise'][1],4)
	));



	this.lvlButtons.push(this.io.addToGroup('LEVELBTNS',new iio.Rect(pxConv(this.btnSpaceX),pxConv(this.btnSpaceY + this.btnMargin ), pxConv(this.btnSize), pxConv(this.btnSize)).setStrokeStyle(colors['purple'][1],4)
	));

	this.lvlButtons.push(this.io.addToGroup('LEVELBTNS',new iio.Rect(pxConv(this.btnMargin*2 + this.btnSpaceX),pxConv(this.btnSpaceY + this.btnMargin ), pxConv(this.btnSize), pxConv(this.btnSize)).setStrokeStyle(colors['navy'][1],4)
	));

*/

	//Paint all 


	for(var i = 1 ; i < this.lvlButtons.length ; i++){

		if(localStorage["level." + i] == "true"){
			this.lvlButtons[i].addObj(new iio.Text(i).setFont(pxConv(40)+'px KGWhattheTeacherWants')
			.setTextAlign('center')
			.setFillStyle(this.lvlButtons[i].styles.strokeStyle));

			var btnPos = new iio.Vec(this.lvlButtons[i].pos);
			btnPos.y += pxConv(13);
			this.lvlButtons[i].objs[0].pos = btnPos;
		}else{
			this.lvlButtons[i].addObj(new iio.Rect().addImage('img/lock.png')
			.setImgSize(pxConv(32),pxConv(37))
			.setAlpha(0.7));

			//this.lvlButtons[i].setStrokeStyle(colors['black'][1][0]).setAlpha(0.7);

		}

	}

	
	if(CocoonJS.nativeExtensionObjectAvailable){ 
		fullscreen1Params = {
		    "fullscreenAdUnit" : "f28daed244254154944ad407ba31ce99",
		    "refresh" : 20
		};
	

		//PUT THIS INTO A PROMISE 
		if(!adReady){
			console.log('loading ad');
	    	fullscreen1 = CocoonJS.Ad.createFullscreen(fullscreen1Params);
		}else{
			console.log('refreshing ad');
			fullscreen1.refreshFullScreen();
		}
		
	    fullscreen1.onFullScreenShown.addEventListener(function()
	    {
	        console.log("fullscreen1 onFullScreenShown");
	    });
	    fullscreen1.onFullScreenHidden.addEventListener(function()
	    {
	        console.log("fullscreen1 onFullScreenHidden");
	        //fullscreen1.refreshFullScreen();
	    });
	    fullscreen1.onFullScreenReady.addEventListener(function()
	    {
	    	adReady = true;
	        console.log("fullscreen1 onFullScreenReady");
	    });
	}

}
lvlSelect.prototype.step = function(){
}
iio.AppManager.prototype.activateLevelSelect = function(io){
this.level = new iio.lvlSelect(io);
return this.level;
}

})();
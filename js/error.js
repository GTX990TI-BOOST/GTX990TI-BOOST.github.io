function init(){
	imgs=document.getElementsByTagName("img");
	_length=imgs.length;
	width=130;
	θ=0;
	delta=0.014;
	_angle=2*Math.PI/_length;
	resize();
	round();
}
function round(){
	for(var i=0;i<_length;i++){
		imgs[i].style.zIndex=Math.round(Math.sin(_angle*i+θ)*100);
		imgs[i].style.height=Math.round(width*10/(19-9*Math.sin(_angle*i+θ)))+"px";
		imgs[i].style.left=content.x+Math.round(content.x*.7*Math.cos(_angle*i+θ))+"px";
		imgs[i].style.top=content.y+Math.round(content.y*.2*Math.sin(_angle*i+θ))+"px";
	}
	θ+=delta;
	setTimeout("round()",10);
}
function resize(){
	content={};
	content.height=document.documentElement.clientHeight;
	content.width=document.documentElement.clientWidth;
	content.y=Math.floor((content.height-width)/2);
	content.x=Math.floor((content.width-width)/2);
}

window.onload=function(){
	init();
	window.document.onselectstart=function(){
		return false;
	};
	window.document.ondragstart=function(){
		return false;
	};
	window.onresize=resize;
}
window.onwheel=function(e){
	try{
		if(e.wheelDelta>0){
			delta+=0.001;
		}else delta-=0.001;
	}catch(err){

	}
}
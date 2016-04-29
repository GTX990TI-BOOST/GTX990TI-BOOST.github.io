
//test browser
if(!/AppleWebKit|Firefox|MSIE 10.0|MSIE 11.0/.test(window.navigator.userAgent))
{
	window.location.replace('error.html');
}
window.onload=function(){
	init_picture();
	init_music();
}

//contextMenu
window.document.onclick=function(){
	document.getElementById('contextMenu').style.display="none";
}
window.document.oncontextmenu=function(){
	var e=document.getElementById('contextMenu');
	e.style.display="block";
	if(event.x+e.offsetWidth>document.documentElement.clientWidth)
		e.style.left=event.x-e.offsetWidth+"px";
	else
		e.style.left=event.x+"px";
	if(event.y+e.offsetHeight>document.documentElement.clientHeight)
		e.style.top=event.y-e.offsetHeight+"px";
	else
		e.style.top=event.y+"px";
	return false;
}

//select drag
window.document.onselectstart=function(){
	return false;
}
window.document.ondragstart=function(){
	return false;
}

//scroll up down
window.onscroll=function(){
	var scroll=document.body.scrollTop;
	var e=document.getElementById('scrollTop');
	if(scroll>200){
		e.className="scrollTopOn";
		e.onclick=function(){
			document.body.scrollTop=0
		};
	}else{
		e.className="scrollTop";
		e.onclick=void 0;
	}
}

//picture
function init_picture(){
	current=0;
	timeout=0;
	play_next();
}
function picture_on(n){
	document.getElementById('main_pic').src="./images/csu"+n+".jpg";
	piclist=document.getElementById('thumb').getElementsByTagName('img');
	current=n;
	for(var x=0;x<5;x++)
	{
		if(x==n)
			piclist[x].className="on";
		else
			piclist[x].className="";
	}
	clearTimeout(timeout);
}
function picture_next_on(){
	timeout=setTimeout(play_next,1500);
}
function play_next(){
	if(current==4)
		current=0;
	else
		current++;
	picture_on(current);
	picture_next_on();
}

//music
function init_music(){
	music={
		"now":0,
		"song":[
			"1.mp3","2.mp3"
		]
	};
	document.getElementById('music_audio').src="./music/"+music.song[music.now];
	document.getElementById('music_audio').play();
}
function play_pause_music(){
	var e=document.getElementById('music_audio');
	var e_c=document.getElementById('music_status');
	if(e.paused){
		e.play();
		e_c.innerText="暂停音乐";
	}else{
		e.pause();
		e_c.innerText="播放音乐";
	}
}
function change_music()
{
	music.now++;
	if(music.now==music.song.length)music.now=0;
	document.getElementById('music_status').innerText="暂停音乐";
	document.getElementById('music_audio').src="./music/"+music.song[music.now];
}
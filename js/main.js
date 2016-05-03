if(!/AppleWebKit|Firefox|MSIE 10.0|MSIE 11.0/.test(window.navigator.userAgent)){
  window.location.replace('./error.html');
}

document.addEventListener('DOMContentLoaded', function(){
  init_picture();
  init_music();
  init_contextmenu();
  init_scroll();
  document.onselectstart=function(){
    event.preventDefault();
  }
  document.ondragstart=function(){
    return false;
  }
})

function init_contextmenu(){
  document.addEventListener('click', function(){
    document.getElementById('contextMenu').style.display = "none";
  });
  document.oncontextmenu = function(){
    event.preventDefault();
    var obj = document.getElementById('contextMenu');
    obj.style.display="block";
    if(event.x + obj.offsetWidth > document.documentElement.clientWidth)
      obj.style.left = event.x - obj.offsetWidth + "px";
    else
      obj.style.left = event.x + "px";
    if(event.y + obj.offsetHeight > document.documentElement.clientHeight)
      obj.style.top = event.y - obj.offsetHeight + "px";
    else
      obj.style.top = event.y + "px";
  }
}

function smooth_scroll(el){
  this.el = el;
  this.target = 0;
  this.position = 0;
  this.speed = .1;
  this.status = false;
  var that = this;
  this.move = function(){
    var delta = (this.target - this.position) * this.speed;
    if(delta == 0){
      this.status = false;
    } else if(this.status){
      delta = delta > 0 ? Math.ceil(delta) : Math.floor(delta);
      this.position += delta;
      this.draw();
    }
  }
  this.go = function(x){

    if(typeof x == 'number' && x <= this.el.scrollHeight - document.documentElement.clientHeight && x >= 0){
      this.status = true;
      this.target = x;
      this.position = this.el.scrollTop;
      this.move();
    }
  }
  this.draw = function(){
    this.el.scrollTop = this.position;
    setTimeout(function(){
      that.move();
    },20);
  }
  this.el.addEventListener('mousewheel', function(){
    that.status = false;
  })
}

function init_scroll(){
  document.all.contact_me.onclick = function(){
    body.go(document.body.scrollHeight - document.documentElement.clientHeight);
  }
  var obj = document.getElementById('scrollTop');
  var body = new smooth_scroll(document.body);
  obj.onclick = function(){
    body.go(0);
  };
  document.onscroll = function(){
    var top = document.body.scrollTop;
    if (top > 200) {
      obj.className = "scrollTopOn";
    } else {
      obj.className = "scrollTop";
    }
  }
}

function init_picture(){
  var current = 0;
  var timer = 0;
  var piclist = document.getElementById('thumb').getElementsByTagName('img');
  var piclen = piclist.length;
  for(var x = 0; x < piclen; x++){

    piclist[x].onmouseout = (function(x){
      return function(){
        delay_time(x)
      }
    })(x)

    piclist[x].onmouseover = (function(x){
      return function(){
        picture_on(x)
      }
    })(x)

  }
  play_next();

  function picture_on(n){
    current = n;
    document.getElementById('main_pic').src = "./images/csu" + n + ".jpg";
    for(var x = 0; x < piclen; x++){
      if( x == n)
        piclist[x].className = "on";
      else
        piclist[x].className = "";
    }
    clearTimeout(timer);
  }

  function delay_time(){
    timer = setTimeout(play_next,1500);
  }

  function play_next(){
    if(current==4)
      current=0;
    else
      current++;
    picture_on(current);
    delay_time();
  }
}

function init_music(){
  var music={
    "now":0,
    "song":[
      "1.mp3","2.mp3"
    ]
  };
  
  function play_pause_music(){
    var e = document.getElementById('music_audio');
    var e_c = document.getElementById('music_status');
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

}




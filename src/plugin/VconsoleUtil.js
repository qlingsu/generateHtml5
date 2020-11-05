import VConsole from "vconsole";

window.VconsoleUtil = {
    longtouchtimer:null,
    longtouch:5000,//长按时间
    longtouchflag:false,//标志位
    vconsoleObj:null
}

var startfunction=function(){
    window.VconsoleUtil.longtouchtimer = setTimeout(function(){
      if(VConsole){
        if(!window.VconsoleUtil.longtouchflag && !window.VconsoleUtil.vconsoleObj){
            window.VconsoleUtil.vconsoleObj = new VConsole();
        }else if(window.VconsoleUtil.longtouchflag && window.VconsoleUtil.vconsoleObj){
            window.VconsoleUtil.vconsoleObj.destroy();
            window.VconsoleUtil.vconsoleObj = null;
        }
        window.VconsoleUtil.longtouchflag = !window.VconsoleUtil.longtouchflag;
      }
  },window.VconsoleUtil.longtouch);
}
var endfunction=function(){
  clearTimeout(window.VconsoleUtil.longtouchtimer);
  window.VconsoleUtil.longtouchtimer = null;
}

window.ontouchstart = startfunction;
window.ontouchend = endfunction;
window.ontouchmove = endfunction;
window.onmousedown = startfunction;
window.onmouseup = endfunction;
window.onmousemove = endfunction;
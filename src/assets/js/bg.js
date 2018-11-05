
      var words = Array(256).join("1").split("")
      function draw(canvas, can, w, h){
        can.fillStyle='rgba(255,255,255,0.1)'
        can.fillRect(0,0,w,h);
        can.fillStyle=color2();
        words.map((y, n) => {
        let	text = String.fromCharCode(Math.ceil(65+Math.random()*57)); 
        let	x = n*10;
          can.fillText(text,x,y)
          words[n]=( y > 300 + Math.random() * 484 ? 0:y+10 );
          return y
        });
      }
  
      // function color1(){
      //   var colors=[0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f'];
      //   var color="";
      //   for( var i=0; i<6; i++){
      //     var n=Math.ceil(Math.random()*15);
      //     color += "" + colors[n];
      //   }
      //   return '#'+color;
      // }
  
      function color2(){
        var color = Math.ceil(Math.random()*16777215).toString(16); 
        while(color.length<6){
          color = '0'+color;
        }
        return '#'+color;
      }
      // function color3(){
      //   return "#" + (function(color){
      //     return new Array(7-color.length).join("0")+color;
      //   })((Math.random()*0x1000000 << 0).toString(16))
      // }
    export default draw
    
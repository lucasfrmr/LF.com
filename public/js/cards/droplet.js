function Droplet(){

    this.x = random(0, width);
    this.y = random(0, height)-height;
    this.dropletSize = 50; 
    this.xoff1 = random(0, width);
    //this.xoff2 = 10000
    
    
    
   this.fall = function(){
     this.y += 3;
     
     if(this.y > height){this.y = 0;}
   
   }
    
   this.pnoise = function(){
    this.xoff1 += 0.01;
    //this.xoff2 += 0.01;
    
    this.x = map(noise(this.xoff1), 0, 1, 0, width);
    //this.y = map(noise(this.xoff2), 0, 1, 0, height);
   }
    
    
    this.show = function(){
      //translate(width/2, height/2);
      fill(255);
      rect(this.x, this.y, this.dropletSize, this.dropletSize)
    
    }
  
  
  }
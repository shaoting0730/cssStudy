一：meta viewport控制

```
//1px像素线条
<meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=0">
//0.5像素线条
<meta name="viewport" content="width=device-width,initial-scale=0.5,user-scalable=0">
```
不过此时要注意页面整体布局和图片方面的CSS变化。

二：使用border-image
首先需要自己制作一个0.5像素的线条作为线条背景图片。

```
p{
    border-width: 0 0 1px 0; 
    border-image: imageUrl 2 0 round; 
}
```
三：使用background-image
即利用背景图片渐变，从有色到透明，给人0.5像素的视觉体验。

```
p{
    background-image: -webkit-linear-gradient(bottom,red 50%,transparent 50%); 
    background-image: linear-gradient(bottom,red 50%,transparent 50%); 
    background-size:  100% 1px; 
    background-repeat: no-repeat; 
    background-position: bottom right; 
}
```
四：使用transform: scale()

```
div{
     width:200px;
     height: 200px;
     background:lightgreen;
     border:1px red solid;
     transform: scale(0.5);
    }
```
五: 利用gradient渲染

```
div{
     width:100px;
     height: 1px;
     background: linear-gradient(#fff 50%, #000 50%);
   }
```

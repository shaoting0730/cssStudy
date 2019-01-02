var dom = document.getElementById('clock');  // 获取该canvas元素
var todayDom = document.getElementById('today');
var ctx = dom.getContext('2d');  // 获取canvas上下文
var width = ctx.canvas.width;   // 获取宽度
var height = ctx.canvas.height;   // 获取高度
var rem =  width / 200; // 比例
var r = width / 2;  //半径

/**
 * 绘制时钟外框
 * parms 无 
 */
function drawBackground() {
    ctx.save();
    ctx.translate(r, r); // 重新定义原点
    ctx.beginPath();   // 开始绘制
    ctx.lineWidth = 10 * rem; // 线宽
    ctx.arc(0, 0, r - ctx.lineWidth / 2, 0, 2 * Math.PI, false);    // 绘制圆形
    ctx.stroke();  //  绘制路径(不实心)

    var hourNumbers = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2];
    ctx.font = 18 * rem + 'px Arial';  // 文字字体大小
    ctx.textAlign = 'center';   // 对齐方式
    ctx.textBaseline = 'middle';  // 基准线
    // 绘制数字
    hourNumbers.forEach(function (number, i) {
        var rad = 2 * Math.PI / 12 * i;  //弧度
        var x = Math.cos(rad) * (r - 30 * rem); // X
        var y = Math.sin(rad) * (r - 30 * rem); // Y
        ctx.fillText(number, x, y);  // 绘制文本
    });
    // 绘制各个小原点
    for (var i = 0; i < 60; i++) {
        var rad = 2 * Math.PI / 60 * i; //弧度
        var x = Math.cos(rad) * (r - 18 * rem); //x
        var y = Math.sin(rad) * (r - 18 * rem); //y
        ctx.beginPath();
        if (i % 5 === 0) {
            ctx.fillStyle = '#000';
            ctx.arc(x, y, 2 * rem, 0, 2 * Math.PI, false);
        } else {
            ctx.fillStyle = '#ccc';
            ctx.arc(x, y, 2 * rem, 0, 2 * Math.PI, false);
        }
        ctx.fill();

    }
}
/**
 * 绘制时针
 * parms: hour 小时数
 *        minute 分钟数
 */
function drawHour(hour,minute) {
    ctx.save(); // 保存状态
    ctx.beginPath();
    var rad = 2 * Math.PI / 12 * hour; //小时弧度
    var mrad = 2 * Math.PI / 12 / 60 * minute; //分钟弧度
    ctx.rotate(rad + mrad);  //旋转
    ctx.lineWidth = 4 * rem; //线宽
    ctx.lineCap = 'round'; //线端为圆形
    ctx.moveTo(0, 10 * rem); //起点
    ctx.lineTo(0, -r / 2); //终点
    ctx.stroke(); //绘制路径(实心)
    ctx.restore(); //释放状态
}
/**
 * 绘制分针
 * params: minute 分钟数
 */
function drawMinute(minute) {
    ctx.save(); // 保存状态
    ctx.beginPath();
    var rad = 2 * Math.PI / 60 * minute; //弧度
    ctx.rotate(rad);  //旋转
    ctx.lineWidth = 3 * rem; //线宽
    ctx.lineCap = 'round'; //线端为圆形
    ctx.moveTo(0, 10 * rem); //起点
    ctx.lineTo(0, -r + 30 * rem); //终点
    ctx.stroke(); //绘制路径(实心)
    ctx.restore(); //释放状态
}

/**
 * 绘制秒针
 * params:second 秒数
 */
function drawSecond(second) {
    ctx.save(); // 保存状态
    ctx.beginPath();
    ctx.fillStyle = 'red'; // 线条颜色
    var rad = 2 * Math.PI / 60 * second; //弧度
    ctx.rotate(rad);  //旋转
    ctx.moveTo(-2 * rem, 20 * rem);
    ctx.lineTo(2 * rem, 20 * rem);
    ctx.lineTo(1, -r + 18 * rem);
    ctx.lineTo(-1, -r + 18 * rem);
    ctx.fill();
    ctx.restore(); //释放状态  
}

/**
 * 绘制圆帽
 * param: 无
 */
function drawDot(){
    ctx.beginPath();
    ctx.fillStyle = '#ffffff';
    ctx.arc(0,0,3 * rem,0,2*Math.PI,false);
    ctx.fill();
}

/**
 * 每秒执行一次
 * 让真实时间 绘制
 */
function draw(){
    ctx.clearRect(0,0,width,height); //清掉canvas
    var now = new Date();

    var year = now.getFullYear();       //年
    var month = now.getMonth() + 1;     //月
    var day = now.getDate();            //日

    var hour = now.getHours();  // 时
    var minute = now.getMinutes();   // 分
    var second = now.getSeconds();   // 秒

    var today = year + "-";
    if(month < 10)
    today += "0";
    today += month + "-";
    if(day < 10)
    today += "0";
    today += day + " ";
    if(hour < 10)
    today += "0";
    today += hour + ":";
    if (minute < 10) clock += '0'; 
    today += minute;
    todayDom.innerHTML = today;

    drawBackground();
    drawHour(hour,minute);
    drawMinute(minute);
    drawSecond(second);
    drawDot();
    ctx.restore();   
}


draw();
setInterval(draw,1000);

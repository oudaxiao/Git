//导航栏：实现点击连接隐藏或显示输入框
function add() {
	var div1 = document.getElementById('div1');
	var hidden = document.getElementById("hidden")
	var height = parseInt(div1.style.height ||
		div1.clientHeight ||
		div1.offsetHeight ||
		div1.scrollHeight);
	console.log(height);
	if(height < 70) {
		div1.style.height = '100px';
	} else {
		div1.style.height = '61px';
	}
}
//轮播图，实现方法：一层层叠加在一起再进行切换
//所以无法形成横向轮播效果
var items = document.getElementsByClassName('item');
var points = document.getElementsByClassName('point')
var goPreBtn = document.getElementById('goPre');
var goNextBtn = document.getElementById('goNext');
var time = 0
var index = 0; //表示第几层在展示
var clearActive = function() { //清理active
	for(var i = 0; i < items.length; i++) {
		items[i].className = 'item';
	}
	for(var i = 0; i < items.length; i++) {
		points[i].className = 'point';
	}
}
var goIndex = function() { //有active的能
	//实现item中的内容展示出来，无active的隐藏
	clearActive();
	items[index].className = 'item active';
	points[index].className = 'point active';
}
var goNext = function() { //按钮的切换效果
	if(index < 2) {
		index++;
	} else {
		index = 0
	}
	goIndex();
}
var goPre = function() {
	if(index == 0) {
		index = 2;
	} else {
		index--
	}
	goIndex();
}
goNextBtn.addEventListener('click', function() {
	goNext()
})
goPreBtn.addEventListener('click', function() {
	goPre()
})
for(var i = 0; i < points.length; i++) { //实现点击按钮后计时器清零，防止切换时间出问题
	points[i].addEventListener('click', function() {
		var pointIndex = this.getAttribute('data-index');
		index = pointIndex;
		goIndex();
		time = 0;
	})
}
setInterval(function() { //反复定时器
	time++;
	if(time == 100) {
		goNext();
		time = 0;
	}
}, 100)
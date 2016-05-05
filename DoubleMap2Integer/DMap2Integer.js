/*
*	doubleValue要映射到整数的值
*/
function DMI(doubleValue){
	var intValue = new Number();
	var douValue = new Number(doubleValue);
	/*
	*	在计算机里实际存储不存在不循环小数，所以任何数都可以映射到一个整数，因为可以显示为n/m的形式
	*/
	var dStr = douValue.toString();
	//return intValue;
}

DMI.prototype.isDouble=function(value){
	if(isNaN(value)){
		alert("输入值有误，不是数字类型！");
		return;
	}
	var d = value + "";
	if(d.indexOf(".")>=0)return true;
	return false;
}
/*
*	从矩阵中获取该元素所在位置的序号，比如（2,3）该位置的序号应该为从9*9的方阵中取，则为8，其实际值应该为2/3
*	具体排序如下
*	1 3 6 10 15
*	2 5 9 14
*	4 8 13
*	7 12
*	11
*	可以看出排序方法类似用坐标的方式把所有有理数均映射到一个二元数上，从（1，1）开始，沿着反对角线数，当n，m>1时（n.m）位置的值为n/m，若n=m则值为1
*	这种情况下该序号不能与值一一对应，应该舍弃该序号，或者跳过。这里我们选择跳过，则从max(m.n)的最小值来计算的话，当m+n-1>2时，每增加1，则按之前的序号计算，就应该减去m+n-1，
*	实际上m+n-1可以看做该坐标所在对角线的横坐标等于1时的纵坐标
*	所以2/3对应的整数应该是7
*	1  3  5  9  13 19 25
*	2  -  8  12 18 24
*	4  7  -  17 23 
*	6  11 16 -
*	10 15 22
*	14 21
*	20
*	@parameter dn一个二元数
*/
DMI.prototype.getNoFromMatrix = function(dn){
	var result = 0;
	//第几列开始
	var start_y = dn.n+dn.m-1;
	for(var i=1,len=start_y;i<len;i++){
		result += i;
	}
	result = result + dn.n;
	if(start_y%2==1){
		result = result - Math.floor(start_y/2);
		if(dn.n<dn.m){
			result ++;
		}
	}else{
		result = result - Math.floor(start_y/2)+1;
	}
	return result;
}
/**
*	将数字转换成一个坐标（n,m）
*/
DMI.prototype.trans2DN = function(dv){
	var DN = new dn(1,1);
	dv = dv+"";
	var int_part = (dv+"").substring(0,dv.indexOf(".")>0?dv.indexOf("."):dv.length);
	/**
	*	获取小数部分，从小数点后到最后一位有效数字
	*/
	var dec_part = dv.substring(dv.indexOf(".")+1);
	if(dec_part.lastIndexOf(0)<dec_part.length-1){
		//表示目前的都是有效数字
	}else{
		for(var i=0,len=dec_part.length-1;i<len;i++){
			if(dec_part.lastIndexOf(0)>=dec_part.length-1){
				dec_part = dec_part.substring(0,dec_part.lastIndexOf("0"));
			}
		}
	}

	//小数有效位数长度
	var dl = dec_part.length;
	var toInt = Math.pow(10,dl);

	var n = dv*toInt.toFixed(0);
	var m = toInt;

	while(n%2 == 0){
		n = (n*0.5).toFixed(0);
		m = (m*0.5).toFixed(0);
	}
	while(n%5 == 0){
		n = (n*0.2).toFixed(0);
		m = (m*0.2).toFixed(0);
	}
	dn.n = n-0;
	dn.m = m-0;
	return dn;
}
/**
*	二元数
*/
function dn(n,m){
	this.n = n;
	this.m = m;
	/**
	*	distance表示到某点的几何距离，默认是与零点的距离
	*/
	this.distance = Math.pow(m,2) + Math.pow(n,2);
}
/**
*	计算两点间的距离
*/
dn.prototype.calcDistance = function(p){
	var dx = Math.abs(this.n - p.n);
	var dy = Math.abs(this.m - p.m);
	var distance_2 = Math.pow(dx,2)+Math.pow(dy,2);
	var distance = Math.sqrt(distance_2);
	var o = {
		dx : dx,
		dy : dy,
		dxy : distance,
		dxy_2 : distance_2
	};
	return o;
}
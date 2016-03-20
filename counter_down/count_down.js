function counter(config,callback){
				this.times = 0;
				this.years = 0;
				this.months = 0;
				this.days = 0;
				this.hours = 0;
				this.minutes = 0;
				this.seconds = 0;
				this.hudredMS = 0;//100毫秒
				this.tenMS = 0;//10毫秒
				this.milliseconds = 0;
				this.format = config.format?config.format:"d-h-m-ss";//显示格式
				//this.formatTpl = "";
				var year = "年";
				var month = "月";
				var day = "天";
				var hour = "小时";
				var minute = "分";
				var second = "秒";
				if(config.target){
					var target = config.target;
					console.log(target);
				}else{
					$.alert("渲染目标未定义"); 
				}
				
				var nowTime = new Date().getTime();
				
				var componentId = nowTime;
				var countLong = Math.floor((config.endTime.getTime() - nowTime)/1000);//获取需计时时间 单位：s
				console.log(countLong);

				var _days = Math.floor(countLong/(60*60*24));//总共多少天
				var _hours = Math.floor(countLong/(60*60));//总共多少小时
				var _minute = (Math.floor(countLong/60));//总多少分钟

				var hours_show = _hours - 24*_days;
				var minute_show = _minute - 60*_hours;
				var seconds_show = countLong - 60*_minute;
				console.log(hours_show+' ' +minute_show+" "+seconds_show);
				var formatTpl = '';
				//console.log(formatTpl);

				switch (this.format){
					case "y-M-d-h-m-ss" :  formatTpl = "<span></span>"; break;
					case "M-d-h-m-ss" : formatTpl = "<span></span>";break;
					case "d-h-m-ss" : formatTpl = '<span id="'+componentId+'"><font name="days">'+_days+'</font><font>天</font><font name="hours">'+hours_show+'</font><font>小时</font><font name="minutes">'+minute_show+'</font><font>分</font><font name="seconds">'+seconds_show+'</font><font>秒</font></span>';break;
					case "h-m-ss" : formatTpl = '<span id="'+componentId+'"><font name="hours"></font><font>小时</font><font name="minutes"></font><font>分</font><font name="seconds"></font><font>秒</font></span>';break;
					case "m-ss" : formatTpl = '<span id="'+componentId+'"><font name="minutes"></font><font>分</font><font name="seconds"></font><font>秒</font></span>';break;
					case "ss" : formatTpl = '<span id="'+componentId+'"><font name="seconds"></font><font>秒</font></span>';break;
				}
					
				/**
				*	计时开始
				**/
				function beginWork(){
					$(target).html(formatTpl);//taget满足css选择器
					_setTimer();
				}
				/**
				*	秒计时
				**/
				function _secondCount(){
					var s = $("#" + componentId + " font[name=seconds]");
					var _s = Number(s.html());
					if(_s > 0){
						s.html(_s - 1);
						//console.log("");
					}else{
						if(_minuteCount(1)){
							s.html(59);
							return true;
						}else{
							console.log(new Date().getTime() - nowTime);
							return false;
						}
					}
					_setTimer();
					return true;
				}

				/**
				*	分计时
				**/
				function _minuteCount(_from){
					var m = $("#" + componentId + " font[name=minutes]");
					var _m = Number(m.html());
					if(_m > 0){
						m.html(_m-1);
					}else{
						if(_hourCount()){
							m.html(59);
							return true;
						}else{
							return false;
						}
					}
					_setTimer();
					return true;
				}

				/**
				*	小时计时
				**/
				function _hourCount(){
					var h = $("#" + componentId + " font[name=hours]");
					var _h = Number(h.html());
					if(_h > 0){
						h.html(_h-1);
					}else{
						if(_dayCount()){
							h.html(23);
							return true;
						}else{
							return false;
						}
					}
					_setTimer();
					return true;
				}

				/**
				*	天计时
				**/
				function _dayCount(){
					if(_days == 0)return false;
					var d = $("#" + componentId + " font[name=days]");
					var _d = Number(d.html());
					if(_d > 0){
						d.html(_d - 1);
					}else{
						return false;
					}
					_setTimer();
					return true;
				}

				function _setTimer(){
					setTimeout(_secondCount, 997);
				}

				/*var nowNum = $("#counter span").html();
				var times = nowTime -latest;
				latest = nowTime;
				console.log(times);
				if(Number(nowNum) > 0){
					$("#counter span").html(Number(nowNum)-1);
				}
				if(Number(nowNum)>0){
					if(times>1000){
						setTimeout(counter, 2000-times);
					}else{
						setTimeout(counter, 1000);
					}
				}else{
					console.log(nowTime-start);
				}*/
				this.render = function(){
					beginWork();
				}

		}

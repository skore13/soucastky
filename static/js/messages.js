ui = {
		errored: false,
		slideState: 0, // 0 - hidden 1 - sliding down 2 - shown 3 - sliding up
		progress: 0,
		showMessage: function(message){
			error = typeof error !== 'undefined' ? error : false;
			if(error) {
				$("#info-text").html(message);
				$("#info").addClass("error");
				ui.slideState=1;
				$("#info").slideDown(200,function(){ui.slideState=2});
				ui.errored = true;
			} else if(!ui.errored) {
				$("#info-text").html(message);
			
				if(ui.slideState == 0){
					ui.slideState=1;
					$("#info")
						.slideDown({
							duration:200,
							step: function(now,fx){ui.progress = now/fx.end;},
							done: function(){ui.slideState=2}
						})
						.delay(2000)
						.show(0,function(){ui.slideState=3})
						.slideUp({
							duration:200,
							step: function(now,fx){ui.progress = now/fx.end;},
							done: function(){ui.slideState = 0 }
						});
				} else if(ui.slideState == 1) {
					$("#info").stop().stop().stop().stop();
					$("#info")
						.slideDown({
							duration: 200-200*progress,
							step: function(now,fx){ui.progress = now/fx.end;},
							done: function(){ui.slideState=2}
						})
						.delay(2000)
						.show(0,function(){ui.slideState=3})
						.slideUp({
							duration:200,
							step: function(now,fx){ui.progress = now/fx.end;},
							done: function(){ui.slideState = 0 }
						});
				} else if(ui.slideState == 2) {
					$("#info").stop().stop().stop().stop();
					$("#info")
						.delay(2000)
						.show(0,function(){ui.slideState=3})
						.slideUp({
							duration:200,
							step: function(now,fx){ui.progress = now/fx.end;},
							done: function(){ui.slideState = 0 }
						});
				} else {
					$("#info").stop().stop().stop().stop();
					$("#info").slideDown({
							duration: 200*progress,
							step: function(now,fx){ui.progress = now/fx.end;},
							done: function(){ui.slideState=2}
						})
						.delay(2000)
						.show(0,function(){ui.slideState=3})
						.slideUp({
							duration:200,
							step: function(now,fx){ui.progress = now/fx.end;},
							done: function(){ui.slideState = 0 }
						});
				}
			}
		}
	};

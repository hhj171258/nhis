// JavaScript Document
$(function(){
	nav();
	tabmenu(".complain ul li",".complain_tab_content"); //신고센터
	tabmenu(".notice ul li",".notice_tab_content"); //공지사항
	iconClick("nav ol li:nth-child(2) a", "ol .depth2", 100); //전체메뉴
	iconClick("nav ol li:nth-child(3) a", ".pop_search", 100); //검색
	familySite();
	quick();

	$(".mainbanner .autoplay").slick({
		autoplay: true,
		prevArrow: ".mainbanner .prev", 
		nextArrow: ".mainbanner .next",
	});
	currentSlide();
	$(".mainbanner .autoplay").on("afterChange", function(){currentSlide();});
	$(".mainbanner .prev").on("click", function(){currentSlide();});
	$(".mainbanner .next").on("click", function(){currentSlide();});
	stopPlay(".mainbanner .autoplay", ".mainbanner .ctrl_btn .stop", "slickPause");
	stopPlay(".mainbanner .autoplay", ".mainbanner .ctrl_btn .play", "slickPlay");

});



/* 분야별 사이트 바로가기 */
function site(){
	if($(".site").is(":visible")){
		$(".site").slideUp(500);
		$(this).text("분야별 업무사이트 보기");
		$("div.depth2").css({"top": 121}); //nav 윗쪽이 밀려나는 것 보정
		$(".quick").stop().animate({"top": 140},{duration: 800}, {easing : "linear"}); // quick 밀려나는 것 보정
	} else {
		$(".site").slideDown(500);
		$(this).text("분야별 업무사이트 닫기");
		$("div.depth2").css({"top": 396}); //nav 윗쪽이 밀려나는 것 보정
		$(".quick").stop().animate({"top": 415},{duration: 800}, {easing : "linear"}); // quick 밀려나는 것 보정
	}
}
//index.html에서 onClick으로 실행

/* 메뉴 */
function nav(){
	$(".depth1 > li").mouseover(function(){
		$("nav ol li:nth-child(2) a").removeClass("on"); //전체메뉴 숨기기
		$("ol .depth2").hide();
		$("nav ol li:nth-child(3) a").removeClass("on"); //검색 숨기기
		$(".pop_search").hide();
		$(this).children("div.depth2").stop().slideDown(400);
		$(this).children("a").addClass("on"); //빨간색 삼각형
	});
		$(".depth1 > li").mouseleave(function(){
		$(this).children("div.depth2").stop().slideUp(400);
		$(this).children("a").removeClass("on");
	});
}

/* 검색, 전체메뉴 */
function iconClick(icon, content, time){
	$(icon).click(function(){
		if($(content).is(":visible")){
			$(content).fadeOut(time);
			$(this).removeClass("on");
		} else {
			$(content).fadeIn(time);
			$(this).addClass("on");
		}
	});
}

/* banner */
function currentSlide(){
	var current = $(".mainbanner .autoplay").slick('slickCurrentSlide') +1;
	var total = $(".mainbanner .autoplay .slick-slide").not(".slick-cloned").last().index();
	$(".mainbanner .ctrl_btn .page").html(current + '  /  ' + total);
}

function stopPlay(slickSlide, slickBtn, slickMethod){
	$(slickBtn).on("click", function(){
		$(slickSlide).slick(slickMethod);
		$(this).parent().children().removeClass("off");
		$(this).addClass("off");
	});
}

/* 맞춤메뉴 */
function customOver(){
	$(".custom_service_submenu").stop().slideDown(500);
}
function customLeave(){
	$(".custom_service_submenu").stop().slideUp(500);
}
// index.html에서 onMouseover, onMouseOut으로 실행

/* 탭메뉴 */
function tabmenu(tab, contentAll){
	$(tab).removeClass("on").eq(0).addClass("on");
	$(contentAll).hide().eq(0).show();
	
	$(tab).click(function(){
		$(tab).removeClass("on");
		$(this).addClass("on");

		$(contentAll).hide();
		var contentIndex = $(this).index();
		$(contentAll).eq(contentIndex).show();
	})
}

/* 패밀리 사이트 */
function familySite(){
	$(".footer_familysite ul > li > a").click(function(){
		if($(this).next("ol").is(":visible")){
			$(this).next("ol").hide();
		} else {
			if($(".footer_familysite ul ol").is(":visible")){
				$(".footer_familysite ul ol").hide();
			}
			$(this).next("ol").show();
		}
	})
}

/* 퀵메뉴 */
$(document).ready(function(){
	var scrollTop = $(document).scrollTop();
	if($(".site").is(":visible")){
		$(quick).stop().animate({"top": scrollTop + 20},{duration: 800}, {easing : "linear"});
	}
});

function quick(){
	$(document).scroll(function(){
		var scrollTop = $(document).scrollTop();
		if($(".site").is(":visible")){
			var siteHeight = $(".site").outerHeight();
			if(scrollTop <= (siteHeight + 140) ){
				$(".quick").stop().animate({"top": (siteHeight + 140)},{duration: 800}, {easing : "linear"});
			} else {
				$(".quick").stop().animate({"top": scrollTop + 20},{duration: 800}, {easing : "linear"});
			}
		} else{
			if(scrollTop <=  140){
				$(".quick").stop().animate({"top":  140},{duration: 800}, {easing : "linear"});
			} else {
				$(".quick").stop().animate({"top": scrollTop + 20},{duration: 800}, {easing : "linear"});
			}
		}
	});
}
$.fn.exists = function () {
    return this.length !== 0;
}

function getViewport_width() {
	var viewPortWidth;
	if(typeof window.innerWidth != 'undefined') {viewPortWidth = window.innerWidth}
	else if(typeof document.documentElement != 'undefined' && typeof document.documentElement.clientWidth != 'undefined' && document.documentElement.clientWidth != 0){viewPortWidth = document.documentElement.clientWidth}
	else{viewPortWidth = document.getElementsByTagName('body')[0].clientWidth;}
	return viewPortWidth;
}

function getViewport_height() {
	var viewPortHeight;
	if(typeof window.innerHeight != 'undefined') {viewPortHeight = window.innerHeight}
	else if(typeof document.documentElement != 'undefined' && typeof document.documentElement.clientHeight != 'undefined' && document.documentElement.clientHeight != 0){viewPortHeight = document.documentElement.clientHeight}
	else{viewPortHeight = document.getElementsByTagName('body')[0].clientHeight;}
	return viewPortHeight;
}

function equalHeights(objClass){
	objClass.css('height','');
	temp=0;
	objClass.each(function(index){if($(this).height()>temp) temp = $(this).height();});
	objClass.css('height', temp+"px");
}
/* ---------------------------------------------------------------------------------------- */
if($(".headerMenu").exists())
{
	setup_mobileMenu();
	$(window).resize(function(){setup_mobileMenu();})
	
	$('a.headerMenu_mobileIcon').on( "click", function() {
		toggle_mobileMenu();
		return false;
	});
	
	$(".headerMenu").click(function(e){e.stopPropagation();});
	$('.headerSearch').click(function(e){e.stopPropagation();});
	$('.headerTabs').click(function(e){e.stopPropagation();});
	
	$("body").click(function(){
		if(getViewport_width()<=1024){
			$('.headerSearch_pop').slideUp();
			$('.headerMenu ul').slideUp();
			$('.headerTabs ul').slideUp();			
		}
	});
	
	$(window).scroll(function() {
		if(getViewport_width()<=1024){
			$('.headerSearch_pop').slideUp();
			$('.headerMenu ul').slideUp();
			$('.headerTabs ul').slideUp();			
		}
	});
}

function setup_mobileMenu()
{
	if(getViewport_width()<=1024)
	{
		if(getViewport_width()<=414)
		{
			$('.headerMenu ul').width(getViewport_width()-20);
		}
		else $('.headerMenu ul').css('width','');
	}
	else
	{
		$('.headerSearch_pop').css('display','');
		$('.headerTabs ul').css('display','');
	}
}

function toggle_mobileMenu(objBin)
{
	$('.headerMenu ul').slideToggle();
	$('.headerSearch_pop').slideUp();
	$('.headerTabs ul').slideUp();
}

function headerTab_toggle()
{
	$('.headerTabs ul').slideToggle();
	$('.headerSearch_pop').slideUp();
	$('.headerMenu ul').slideUp();
}

function headerSearch_toggle()
{
	$('.headerSearch_pop').slideToggle();
	$('.headerMenu ul').slideUp();
	$('.headerTabs ul').slideUp();
}

function searchCategory_tabToggle(tabNum)
{
	$('.searchCategory_more_tabs li a').removeClass('active');
	$($('.searchCategory_more_tabs li a')[tabNum]).addClass('active');

	$('.searchCategory_moreMobileTab a').removeClass('active');
	$($('.searchCategory_moreMobileTab')[tabNum]).find('a').addClass('active');
	
	$('.searchCategory_morePanel').removeClass('active');
	$($('.searchCategory_morePanel')[tabNum]).addClass('active');
}

if($(".jobsResults_item").exists())
{
	$(".jobsResults_item a").click(function(e){e.stopPropagation();});
	
	setup_jobItem_toggle();
	$(window).resize(function(){setup_jobItem_toggle();});
	
	setTimeout(function(){equalHeights($('.jobsResults_panelBtns a div'));},1);
	$(window).resize(function(){equalHeights($('.jobsResults_panelBtns a div'));});
}

function setup_jobItem_toggle()
{
	$('.jobsResults_dDown').css('display', '');
	$('.jobsResults_mobdDown').css('display', '');
	$('.jobsResults_item').unbind("click");
	
	if(getViewport_width()>1024)
	{
		$('.jobsResults_item.active').find('.jobsResults_dDown').show();
	}
	else
	{
		$('.jobsResults_item.active').find('.jobsResults_mobdDown').show();
		$('.jobsResults_item.active').find('.jobsResults_dDown').show();
	}
	
	if(getViewport_width()>1024)
	{
		$('.jobsResults_item').on( "click", function() {
			if($(this).hasClass('active'))
			{
				$('.jobsResults_dDown').slideUp();
				$('.jobsResults_item').removeClass('active');
			}
			else
			{
				$('.jobsResults_dDown').slideUp();
				$('.jobsResults_item').removeClass('active');
				$(this).find('.jobsResults_dDown').slideDown();
				$(this).addClass('active');
			}
			return false;
		});	
	}
	else
	{
		$('.jobsResults_item').on( "click", function() {
			if($(this).hasClass('active'))
			{
				$('.jobsResults_mobdDown').slideUp();
				$('.jobsResults_dDown').slideUp();
				$('.jobsResults_item').removeClass('active');
			}
			else
			{
				$('.jobsResults_mobdDown').slideUp();
				$('.jobsResults_dDown').slideUp();
				$('.jobsResults_item').removeClass('active');
				
				$(this).find('.jobsResults_mobdDown').slideDown();
				$(this).find('.jobsResults_dDown').slideDown();
				$(this).toggleClass('active');
			}
			return false;
		});	
	}	
}

function toggle_chkAll(objChk)
{
	$('.searchResults_item input').each(function(){
		if(!($(this).attr('disabled'))) $(this).prop('checked', objChk.checked);
	});
}

function itemPanel_mobileToggle(objLink)
{
	$(objLink).parent().toggleClass('active');
	$(objLink).parent().find('.searchResults_itemPanel_dDown').slideToggle();
}

if($(".searchResults_bottomPanel").exists())
{
	if(getViewport_width()>1024)
	{
		$(window).on('scroll', function() {
			bodyTop = $(this).scrollTop();
			bodyBottom = $(this).scrollTop() + getViewport_height();
			holderOffset = $('.searchResults_bottom').offset().top;
			if(bodyBottom < holderOffset) $('.searchResults_bottomPanel').addClass('fixed');
			else $('.searchResults_bottomPanel').removeClass('fixed');
		});
		$(window).resize(function(){$('.searchResults_bottomPanel').width($('.searchResults_bottom').width());})		
	}
	
	$('.searchResults_bottomPanel').width($('.searchResults_bottom').width());
}

if($("a.clientsCard_treeBranch").exists())
{
	$('a.clientsCard_treeBranch').on( "click", function() {
		$($(this).parent().find('ul')[0]).slideToggle(400, function(){
			$(this).parent().toggleClass('active');
		});

		return false;
	});
}

function toggleTeamGallery(objLink, teamNum)
{
	$(objLink).parent().parent().find('.clientsCard_teamGalleryHolder').slideToggle(400, function(){
		$(objLink).toggleClass('active');
		$(window).trigger("resize");
	});
}

function toggleDetailsMobile()
{
	$('.clientsCard_details').toggleClass('showDetails');
}

function toggleMobile_teamContact(objLink)
{
	$(objLink).toggleClass('active');
	$(objLink).parent().find('.clientsCard_team').slideToggle();
}

function toggleMobile_jobApplicants(objLink)
{
	$(objLink).toggleClass('active');
	$(objLink).parent().find('.jobApplicants_DDown').slideToggle();
}

if($(".eventTooltip_pop").exists())
{
	$('.jobApplicants_process li').click(function(e){
		if(getViewport_width()<=800)
		{
			$('.jobApplicants_process li').removeClass('active');
			$('.eventTooltip_pop.active').removeClass('active');
			$(this).addClass('active');
			$(this).find('.eventTooltip_pop').addClass('active');
		}
		e.stopPropagation();
		return false;
	});
	
	$("body").click(function(){
		if(getViewport_width()<=800)
		{
			$('.jobApplicants_process li').removeClass('active');
			$('.eventTooltip_pop.active').removeClass('active');
		}
	});
	$(window).scroll(function(){
		if(getViewport_width()<=800)
		{
			$('.jobApplicants_process li').removeClass('active');
			$('.eventTooltip_pop.active').removeClass('active');
		}
	});
}


function addEvent_mobileToggle(objLink)
{
	$(objLink).toggleClass('active');
	$(objLink).next('.nextEvent_item').slideToggle(400, function(){
		$(objLink).next('.nextEvent_item').toggleClass('active');
		
	});
}
/*
<a href="#" onclick="addEvent_mobileToggle(this); return false;" class="addEvent_mobileToggle active">ראיון פרונטלי</a>
<div class="nextEvent_item nextEvent_disabled active">
*/
var isMobile = false; //initiate as false
// device detection
if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) isMobile = true;

/* shows accessible outline only on keydown*/
if(!isMobile)
{
	var outlineStyle = document.createElement('style');
	outlineStyle.type = 'text/css';
	outlineStyle.id = 'outlineHandle';
	$('body').append(outlineStyle);

	$("body").mousedown(function(){
		document.getElementById('outlineHandle').innerHTML='a, label{outline: none !important;}';
		keyboardActive = false;
	});

	$("body").keydown(function(){
		document.getElementById('outlineHandle').innerHTML='';
		keyboardActive = true;
	});
}
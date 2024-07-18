// $('li:not(.sub-menu):not(.disabled)').click(function(){
//     menuLoadContent($(this), '', 'header');
// });

// _______________
// sidebar  ---------  
// container ------------ (select container )   
// ct ----------- this (select item that got event click)
// ___________________________________________________________________________
function menuLoadContent(ct, sidebar, container){
	if($('#header #primary-menu .primary-page span').text() == '')
		$('#header #primary-menu .primary-page span').text($('#page-title h1').text());
	let options = {};
	options.ct = ct;
	// options.title = ct.find('> .lnk span:first-of-type').text();
	 options.title = ct.find('span.title').text();    // ------------- اضافة شركة
	options.action = ct.attr('action');    // ------------- link
    // options ={
    //     ct:"li-selector",
    //     title:"اضافة شركة",
    //     action:"https://app.ertaqy.com/ar/d/ertaqy.com/0/contacts/contact-add?BA__536C4BA15FC4657A29031B1291D9A2B771AB2CC3507AEF607F076F2F0786BFC27DF695AB85179B428A4886903C272152"
    // }
	
	if(options.action == '') return;
	
	if($('.content-wrap').attr('current-page-url') == options.action && $('.top-social > li.active').length > 0)
		ertaqyLiveChatPopupHide();
	else{
		// if(ct.attr('action-mode') == 'draw-main-content'){
		// 	options.parentType = container;
		// 	if(sidebar)	
		// 		options.sidebar = sidebar;
		// 	if(ct.attr('action') != '' )
		// 		_drawInMainContent(options);
		// }
		// if(ct.attr('action-mode') == 'draw-content-with-sidebar'){
		// 	options.parentType = 'header';
		// 	_drawInMainContentAndSidebar(options);
		// 	orderTransIdArray = [];
		// }
		// if(ct.attr('action-mode') == 'draw-in-sidebar'){
		// 	options.parentType = 'header';
		// 	_drawInContentSidebar(options);
		// }
	}
	if(ct.attr('action-mode') == 'sidebar1'){
		if($('#header-mode-sidebar .modal-sidebar-content').html() != '')
			$('#header-mode-sidebar .modal-sidebar-content').html('');
		ertaqyLiveChatPopupHide();
		// ___________________________________________structure for sidebar _____________________________________________________
		var sidebarOptions = {};
		sidebarOptions.Title = options.title;   // ------------- اضافة شركة
		sidebarOptions.Size = 'lg';
		sidebarOptions.ModalCssClass = 'sideBarLeftL1';
		sidebarOptions.ModalId = 'header-mode-sidebar';	// 'sideBarLeftL1';
		sidebarOptions.Url = options.action;     //https://app.ertaqy.com/ar/d/ertaqy.com/0/contacts/contact-add?BA__536C4BA15FC4657A29031B1291D9A2B771AB2CC3507AEF607F076F2F0786BFC27DF695AB85179B428A4886903C272152 

		openModalSidebar(sidebarOptions);
	}
}

// ____________________________
function openModalSidebar(options) { 
		// options.Title
	// options.Size
	// options.ModalCssClass
	// options.RemoveContent
	// options.ModalId
	// options.ModalName
	// options.modalKey
	// options.SetOverlay
	// options.sideBarsList
	// options.tabs
	// options.Url
	// options.SuccessTriggerEvent
	// options.alwaysFunction1
	// options.event
	// options.clearBeforeAppend
	// options.alwaysFunctionExcute
	
	
	// ______________________if no content found create structure then append to  parent wrapper__________________________
	if($('#' + options.ModalId).length == 0){
		var modalSidebar = '<div class="modal-sidebar" id="' + options.ModalId + '">'+
								'<a href="javascript:void(0);" class="modal-sidebar-close"><i class="fa fa-arrow-left"></i></a>'+
								'<div class="modal-sidebar-title"><span></span></div>'+
								'<div class="modal-sidebar-content content"></div>'+
							'</div>';
		$('#wrapper').append(modalSidebar);
	}
	var dir = $('body').attr('dir') == 'rtl' ? 'left' : 'right';
	if(options.Title)
		$('#' + options.ModalId + ' .modal-sidebar-title span').html(options.Title);
	if(options.Size)
		$('#' + options.ModalId).attr('size', options.Size);
	if($('.employee-payroll-tabs').length == 1)
		$('.employee-payroll-tabs').css('left', $('#sidebar-emp-payroll').width());
	if(options.ModalCssClass)
		$('#' + options.ModalId).addClass(options.ModalCssClass);
	// set RemoveContent
	if(options.RemoveContent == undefined)
		options.RemoveContent = true;
	$('#' + options.ModalId).attr('remove-content', options.RemoveContent);
	// set sideBarsList
	if(options.sideBarsList == undefined)
		options.sideBarsList = false;
	$('#' + options.ModalId).attr('list', options.sideBarsList);
	// set SetOverlay
	if(options.SetOverlay == undefined)
		options.SetOverlay = true;
	// set tabs
	if(options.tabs == undefined)
		options.tabs = true;
	// set alwaysFunctionExcute
	if(options.alwaysFunctionExcute == undefined)
		options.alwaysFunctionExcute = true;
// ______________________________if contnent is known inside this selector____________________________________
	if($('#' + options.ModalId + ' .modal-sidebar-content').html() != ''){
		if(options.alwaysFunction1 && options.alwaysFunctionExcute == true)
					/* sidebarOptions.alwaysFunction1 = function(){
											if(ct.closest('ul').parent().attr('id') == 'd9eae63c-9c2b-4c34-8f7a-40b83d195658' && $('.operator-container').html() == '')
												$('.postcontent .loginWelMsg, .postcontent .main-div').show();
											if(window.innerWidth < 480)
												closeHeaderAfterDrawContent();
										} */
			options.alwaysFunction1(options);

			// ___________________________close side bar by x mark   مش ظاهر____________________________________ 
		if(options.sideBarsList){
			var prevModalId = $('.sideBars-opened-list li.active a:first').attr('modal-id');
			$('#' + prevModalId).hide();
			setTimeout( function(){ 
				$('.sideBars-opened-list').css(dir, $('#' + options.ModalId).width()).show();
			}, 200 );
			$('.sideBars-opened-list li.active').removeClass('active');
			$('.sideBars-opened-list li a[modal-id="' + options.ModalId +'"]').parent().addClass('active');
			$('#' + options.ModalId).addClass('shadow');
		}
		
	}
// ________________________________ handle form when url is known________________________________________________________________
	if(options.Url){    
		var options1 = {};
		options1.url = options.Url;
		options1.type = "POST";
		options1.requestKey = options.ModalId;
		options1.done = function(doneOptions){				
			$('#' + options.ModalId + ' .modal-sidebar-content').append(doneOptions.paramData); 
			
			var $form = $('#' + options.ModalId).find('form');
			if($form && $form.find('.input-html-group').length > 0){
				$form.find('.input-html-group input, .input-html-group textarea').each(function(){
					if($(this).val() != '')
						$(this).val(_htmlDecode($(this).val()));
				})
			}
			
			if (options.SuccessTriggerEvent)
				options.SuccessTriggerEvent();
			
			if(options.sideBarsList){
				$('#draggable-container .sideBars-opened').show();
				$('.sideBars-opened-list').css(dir, $('#' + options.ModalId).width()).show();
				$('.modal-sidebar.shadow').removeClass('shadow');
				setTimeout( function(){ 
					$('#' + options.ModalId).addClass('shadow');
				}, 350 );
				var prevModalId = $('.sideBars-opened-list li.active a:first').attr('modal-id');
				$('#' + prevModalId).hide();
				$('.sideBars-opened-list li.active').removeClass('active');
				if(_sideBarsOpenedArray.indexOf(options.ModalId) == -1){
					_sideBarsOpenedArray.push(options.ModalId);
					$('.sideBars-opened-list').append('<li class="active"><a href="javascript:void(0);" modal-id="' + options.ModalId + '">' + options.ModalName + '</a><a href="javascript:void(0);" class="_close">x</a></li>');
					$('.sideBars-opened-list').attr('sideBars-opened-ids', _sideBarsOpenedArray);
				}
				else
					$('.sideBars-opened-list li a[modal-id="' + options.ModalId +'"]').parent().addClass('active');
				
				$('.sideBars-opened-list li a').unbind('click');
				$('.sideBars-opened-list li a').click(function(){
					sideBarsOpenedListClick($(this));
				});
			}
			$('[data-toggle="tooltip"]').tooltip();
		};
		options1.always = function(alwaysOptions){
			if (options.alwaysFunction1)
				options.alwaysFunction1(options);
			// ________________________________ handle tabs ________________________________________________________________

			if(options.tabs){
				if($('.tabs .nav li')){
					$('.tabs .nav li').unbind('click');
					$('#' + options.ModalId + ' .tabs .nav li').click(function() {
						if($(this).hasClass('disabled'))
							return false;
						var tabsId = $(this).closest('.tabs').attr('id');
						$('#' + options.ModalId + ' .tabs[id="' + tabsId + '"] ul li.active').removeClass('active');
						$('#' + options.ModalId + ' .tabs[id="' + tabsId + '"] .tab-content .tab-pane.active').removeClass('active');
						$(this).addClass('active');
						$('#' + options.ModalId + ' .tabs[id="' + tabsId + '"] .tab-content .tab-pane[id=tabs-' + $(this).attr('type') + ']').addClass('active');
					});
				}
			}
		};
		_ertaqyAjax(options1);
	}
		
	// ________________________close side bar by using arrow button_____________________
	$('#' + options.ModalId + ' .modal-sidebar-close').unbind('click');
	$('#' + options.ModalId + ' .modal-sidebar-close').click(function(){
		modalSidebarClose($(this));
	});
	
	// ________________________get z-index value of prev modals before append new modal________________________
	var modalZindex, modalZindexArray = [];
	$('.modal-sidebar').each(function(){
		modalZindexArray.push($(this).css('z-index'))
	});
	modalZindex = Math.max.apply(Math, modalZindexArray);
	
	// $('#' + options.ModalId).show('slide', { direction: dir }, 500);
	$('#' + options.ModalId).show();
	$('#' + options.ModalId).css('z-index', modalZindex + 1);
	
	if(options.SetOverlay == true)
		$('.body-overlay').addClass('appear sidebar');
};
function menuLoadContent(ct, sidebar, container){
	if($('#header #primary-menu .primary-page span').text() == '')
		$('#header #primary-menu .primary-page span').text($('#page-title h1').text());
	options = {};
	options.ct = ct;
	// options.title = ct.find('> .lnk span:first-of-type').text();
	options.title = ct.find('span.title').text();
	options.action = ct.attr('action');
	
	if(options.action == '') return;
	
	if($('.content-wrap').attr('current-page-url') == options.action && $('.top-social > li.active').length > 0)
		ertaqyLiveChatPopupHide();
	else{
		if(ct.attr('action-mode') == 'draw-main-content'){
			options.parentType = container;
			if(sidebar)	
				options.sidebar = sidebar;
			if(ct.attr('action') != '' )
				_drawInMainContent(options);
		}
		if(ct.attr('action-mode') == 'draw-content-with-sidebar'){
			options.parentType = 'header';
			_drawInMainContentAndSidebar(options);
			orderTransIdArray = [];
		}
		if(ct.attr('action-mode') == 'draw-in-sidebar'){
			options.parentType = 'header';
			_drawInContentSidebar(options);
		}
	}
	if(ct.attr('action-mode') == 'draw-in-operator'){
		options.parentType = 'operator';
		_drawInOperator(options);
	}
	if(ct.attr('action-mode') == 'draw-in-header'){
		_drawInHeader(options);
	}
	if(ct.attr('action-mode') == 'draw-in-custom-selector'){
		// options.customSelctor = $('.content-wrap .postcontent .livechat-container');
		options.id = ct.attr('id');
		_drawInCommsPopup(options);
	}
	if(ct.attr('action-mode') == 'sidebar1'){
		if($('#header-mode-sidebar .modal-sidebar-content').html() != '')
			$('#header-mode-sidebar .modal-sidebar-content').html('');
		ertaqyLiveChatPopupHide();
		
		var sidebarOptions = {};
		sidebarOptions.Title = options.title;
		sidebarOptions.Size = 'lg';
		sidebarOptions.ModalCssClass = 'sideBarLeftL1';
		sidebarOptions.ModalId = 'header-mode-sidebar';	// 'sideBarLeftL1';
		sidebarOptions.Url = options.action;
		/* sidebarOptions.alwaysFunction1 = function(){
											if(ct.closest('ul').parent().attr('id') == 'd9eae63c-9c2b-4c34-8f7a-40b83d195658' && $('.operator-container').html() == '')
												$('.postcontent .loginWelMsg, .postcontent .main-div').show();
											if(window.innerWidth < 480)
												closeHeaderAfterDrawContent();
										} */
		
		openModalSidebar(sidebarOptions);
	}
	if(ct.attr('action-mode') == 'popup'){
		var options2 = {};
		options2.modalKey = 'send-sms';
		options2.url = options.action;
		options2.done = function(options2){
			openModalPopup();
			$('.formModal').find('.modalPopUpContainer').html(options2.paramData);
		};
		_ertaqyAjax(options2);
	}
}
function do_nothing() { 
	//alert('click-twice');
	return false;
}

// prevent a second click for 2 seconds. :)
$('body a').on('click', function(e) { 
	$(e.currentTarget).click(do_nothing); 
	setTimeout(function(){
		$(e.currentTarget).unbind('click', do_nothing);
	}, 700);
});

// prevent a second click for 2 seconds. :)
$('body button').on('click', function(e) { 
  $(e.currentTarget).click(do_nothing); 
  setTimeout(function(){
	$(e.currentTarget).unbind('click', do_nothing);
  }, 700);
});



function toggleFullscreen(elem) {
  elem = elem || document.documentElement;
  if (!document.fullscreenElement && !document.mozFullScreenElement &&
    !document.webkitFullscreenElement && !document.msFullscreenElement) {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
}
function modalSidebarClose(ct){
	var dir = $('body').attr('dir') == 'rtl' ? 'left' : 'right';
	if(ct.parent().attr('remove-content') == 'false' && ct.parent().attr('list') == 'true'){
		$('.modal-sidebar').hide("slide", { direction: dir }, 300);
		$('.sideBars-opened-list').hide("slide", { direction: dir }, 300);
	}
	else
		ct.closest('.modal-sidebar').hide("slide", { direction: dir }, 300);
	
	if(ct.parent().attr('remove-content') == 'true' && ct.parent().attr('list') == 'false'){
		setTimeout( function(){ 
			ct.parent().find('.modal-sidebar-content, .modal-sidebar-title span').html('');
		}, 350 );
	}
	setTimeout( function(){ 
		if(ct.parent().attr('list') == 'false')
			ct.parent().attr('class', 'modal-sidebar');
		if($('.modal-sidebar[list="false"]:not(.sideBar-chat)').filter(function() {return $(this).css('display') == 'block'; }).length == 0){
			$('.body-overlay').removeClass('appear sidebar');
		}
		
		// order
		if($('.modal-sidebar').hasClass('sideBarLeftL1') && $('.orderDetails-container').length == 1)
			createNewBillClick('reload', '');

		// operator live chat
		// if($('.modal-sidebar').filter(function() {return $(this).css('display') == 'block'; }).length == 0)
		if($('.ertaqy-comms-popup[type="livechat"]').css('display') == 'block' && $('.modal-sidebar').filter(function() {return $(this).css('display') == 'block'; }).length == 0)
			$('.app .app-one').removeClass('side-by-side');
	}, 350 );
	if($('.employee-payroll-tabs').length == 1){
		$('.employee-payroll-tabs').hide("slide", { direction: dir }, 300);
		setTimeout( function(){ $('.employee-payroll-tabs').remove();}, 350 );
	}
	if($('#cms-page-add-edit-modal').length == 1 && ct.parent().attr('id').indexOf('paragraph-') != -1 && ct.parent().attr('id').indexOf('-ctrls') != -1)
		$('#cms-page-add-edit-modal').show("slide", { direction: dir }, 300);
	if($('#cms-page-add-edit-modal').length == 1 && ct.parent().attr('id').indexOf('paragraph-') != -1 && ct.parent().attr('id').indexOf('-security') != -1)
		$('#cms-page-add-edit-modal').show("slide", { direction: dir }, 300);
	
	if($('.top-social .ertaqy-comms-icon').hasClass('active'))
		$('.top-social .ertaqy-comms-icon').removeClass('active');
	if($('.top-social .kb').hasClass('active'))
		$('.top-social .kb').removeClass('active');
};
/* function openModalSidebar(options){
	_delay( function(){ openModalSidebarL2(options);}, 1000 );
} */
function _do_nothing() { 
	// alert('click-twice');
	return false;
}

	
var openModalSidebarModals = {};
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
	
	if(options.modalKey)
		openModalSidebarModals[options.modalKey] = options;

	// avoid double click: not verified
	if(options.event && $(options.event.currentTarget)) {
		$(options.event.currentTarget).click(_do_nothing); 
		setTimeout(function(){
			$(options.event.currentTarget).unbind('click', _do_nothing);
		}, 700);
	}

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
			options.alwaysFunction1(options);
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
	else{
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
		/* if(options.Url){
			$('#ajax-loader').fadeIn();
			$.post(options.Url, null, function(data) {
			})
			.success(function(data){
				
				// if(options.clearBeforeAppend == true)
					// $('#' + options.ModalId + ' .modal-sidebar-content').html('');
				
				$('#' + options.ModalId + ' .modal-sidebar-content').append(data); 
				
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
					$('.sideBars-opened-list').css('left', $('#' + options.ModalId).width()).show();
					$('.modal-sidebar.shadow').removeClass('shadow');
					setTimeout( function(){ 
						$('#' + options.ModalId).addClass('shadow');
					}, 350 );
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
			})
			.fail(function(xhr, status, error) {
				console.log(xhr);console.log(status);console.log(error);
			})
			.always(function() {
				$('#ajax-loader').fadeOut();
				if (options.alwaysFunction1)
					options.alwaysFunction1(options);
				
				if(options.tabs){
					if($('.tabs .nav li')){
						$('.tabs .nav li').unbind('click');
						$('.tabs .nav li').click(function() {
							var tabsId = $(this).closest('.tabs').attr('id');
							console.log('tabsId' + tabsId);
							$('.tabs[id="'+tabsId+'"] ul li.active').removeClass('active');
							$('.tabs[id="'+tabsId+'"] .tab-content .tab-pane.active').removeClass('active');
							$(this).addClass('active');
							$('.tabs[id="'+tabsId+'"] .tab-content .tab-pane[id=tabs-' + $(this).attr('type') + ']').addClass('active');
						});
					}
				}
			});
		} */
		else{
			if (options.alwaysFunction11)		
				options.alwaysFunction11(options)
		}	
	}
	
	$('#' + options.ModalId + ' .modal-sidebar-close').unbind('click');
	$('#' + options.ModalId + ' .modal-sidebar-close').click(function(){
		modalSidebarClose($(this));
	});
	
	// get z-index value of prev modals before append new modal
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
function sideBarsOpenedListClick(ct){
	if(ct.hasClass('_close')){
		var modalId = ct.parent().find('a:first').attr('modal-id');
		_sideBarsOpenedArray.splice(_sideBarsOpenedArray.indexOf(modalId), 1);
		$('#' + modalId).hide().remove();
		$('.sideBars-opened-list').attr('sideBars-opened-ids', _sideBarsOpenedArray);
		if(ct.parent().hasClass('active')){
			var newSideBar = ct.parent().is(':last-child') ? ct.parent().prev().find('a:first') : ct.parent().next().find('a:first');
			sideBarsOpenedListClick(newSideBar);
		}
		$('.sideBars-opened-list li a[modal-id="' + modalId +'"]').parent().remove();
		if($('.sideBars-opened-list li').length == 1)
			$('#draggable-container .sideBars-opened, .sideBars-opened-list').hide();
		
		if( modalId.indexOf('ticket-') != -1 ){
			// leave group
			var ticketId = modalId.split('ticket-')[1];
			/* var json = { toFunc: "_ertaqyTicketAccess", toType: 'group-others', toId: ticketId, toDb: 'interaction-access', accessType: 'end', interactionId: ticketId, interactionType: 1};
			_signalrSrvSendJson(json); */
			var json = { toFunc: "_ertaqyTicketAccess", toType: 'group', toId: 'tickets-list', toType2: 'group', toId2: ticketId, toDb: 'interaction-access', accessType: 'end', interactionId: ticketId, interactionType: 1 };
			_signalrSrvSendJson(json);
			_signalrSrvRemoveGroup(ticketId, 11);
		}else if( modalId.indexOf('contact-') != -1 ){
			// leave group
			var contactId = modalId.split('contact-')[1];
			/* var json = { toFunc: "_ertaqyContactAccess", toType: 'group-others', toId: contactId, toDb: 'contact-access', accessType: 'end', contactId: contactId};
			_signalrSrvSendJson(json); */
			var json = { toFunc: "_ertaqyContactAccess", toType: 'group', toId: 'contacts-list', toType2: 'group', toId2: contactId, toDb: 'contact-access', accessType: 'end', contactId: contactId };
			_signalrSrvSendJson(json);
			_signalrSrvRemoveGroup(contactId, 11);
		}
	}
	else if(ct.hasClass('closeAll')){
		var sideBarsOpened = $('.sideBars-opened-list').attr('sideBars-opened-ids').split(',');
		for(var i = 0; i < sideBarsOpened.length; i++){
			$('#' + sideBarsOpened[i]).remove();
			$('.sideBars-opened-list li a[modal-id="' + sideBarsOpened[i] + '"]').parent().remove();
			if( sideBarsOpened[i].indexOf('ticket-') != -1 ){
				// leave group
				var ticketId = sideBarsOpened[i].split('ticket-')[1];
				/* var json = { toFunc: "_ertaqyTicketAccess", toType: 'group-others', toId: ticketId, toDb: 'interaction-access', accessType: 'end', interactionId: ticketId, interactionType: 1};
				_signalrSrvSendJson(json); */
				var json = { toFunc: "_ertaqyTicketAccess", toType: 'group', toId: 'tickets-list', toType2: 'group', toId2: ticketId, toDb: 'interaction-access', accessType: 'end', interactionId: ticketId, interactionType: 1 };
				_signalrSrvRemoveGroup(ticketId, 11);
				_signalrSrvSendJson(json);
			}else if( sideBarsOpened[i].indexOf('contact-') != -1 ){
				// leave group
				var contactId = sideBarsOpened[i].split('contact-')[1];
				/* var json = { toFunc: "_ertaqyContactAccess", toType: 'group-others', toId: contactId, toDb: 'contact-access', accessType: 'end', contactId: contactId};
				_signalrSrvSendJson(json); */
				var json = { toFunc: "_ertaqyContactAccess", toType: 'group', toId: 'contacts-list', toType2: 'group', toId2: contactId, toDb: 'contact-access', accessType: 'end', contactId: contactId };
				_signalrSrvSendJson(json);
				_signalrSrvRemoveGroup(contactId, 11);
			}
		}
		_sideBarsOpenedArray = [];
		$('.sideBars-opened-list').attr('sideBars-opened-ids', _sideBarsOpenedArray);
		$('#draggable-container .sideBars-opened, .sideBars-opened-list').hide();
	}
	else{
		if(!ct.parent().hasClass('active')){
			var modalId = ct.parent().find('a:first').attr('modal-id');
			var modalZindex, modalZindexArray = [];
			$('.modal-sidebar').each(function(){
				modalZindexArray.push($(this).css('z-index'))
			});
			modalZindex = Math.max.apply(Math, modalZindexArray);
			
			if($('#' + modalId).css('display', 'none'))
				$('#' + modalId).show();
			$('.modal-sidebar').removeClass('shadow');
			$('#' + modalId).css('z-index', modalZindex + 1).addClass('shadow');
			var prevModalId = $('.sideBars-opened-list li.active a:first').attr('modal-id');
			$('#' + prevModalId).hide();
			$('.sideBars-opened-list li.active').removeClass('active');
			$('.sideBars-opened-list li a[modal-id="' + modalId +'"]').parent().addClass('active');
			
			var dir = $('body').attr('dir') == 'rtl' ? 'left' : 'right';
			$('.sideBars-opened-list').css(dir, $('#' + modalId).width());
		}
	}
}
function openModalPopup(cssClass){
	var modalPopup = '<div class="formModal">'+
						'<div class="modalPopUpContainer"></div>'+
					'</div>';
	if($('#wrapper').find('.formModal').length == 0)
		$('#wrapper').append(modalPopup);
	if(cssClass != undefined)
		$('.formModal .modalPopUpContainer').addClass(cssClass);
	$('.formModal').addClass('modalPopUp');
	$('.modalPopUp').fadeIn();
}
function openDeleteModalPopup(){
	var deleteModalPopup = '<div class="formModalDelete" style="display: none;">'+
								'<div class="deleteModalPopUpContainer"></div>'+
							'</div>';
					
	var rtlContent = '<p class="nobottommargin">هل انت متأكد ؟</p>'+
					'<div class="col-xs-6 noleftpadding"><button type="submit" class="deleteDetails btn btn-primary btn-sm topmargin-15">نعم</button></div>'+
					'<div class="col-xs-6 noleftpadding"><button type="submit" class="detailsCancel btn btn-default btn-sm topmargin-15 fright">الغاء</button></div>';
					
	var ltrContent = '<p class="nobottommargin">Are You Sure?</p>'+
					'<div class="col-xs-6 noleftpadding"><button type="submit" class="deleteDetails btn btn-primary btn-sm topmargin-15">Yes</button></div>'+
					'<div class="col-xs-6 noleftpadding"><button type="submit" class="detailsCancel btn btn-default btn-sm topmargin-15 tleft">Cancel</button></div>';
					
	if($('#wrapper').find('.formModalDelete').length == 0)
		$('#wrapper').append(deleteModalPopup);
	$('.deleteModalPopUpContainer').html('');
	$('body').hasClass('rtl') ? $('.deleteModalPopUpContainer').append(rtlContent) : $('.deleteModalPopUpContainer').append(ltrContent);
	$('.formModalDelete').addClass('modalPopUp');
	$('.modalPopUp').fadeIn();
}
function doPopover(trigger, placement) {
	// placement = bottom - top - right - left
	// trigger = focus - hover - manual - click	// you may pass multiple triggers; separate them with a space. `manual` cannot be combined with any other trigger.
	
	var $pop = $(options.elem);
	setTimeout( function(){ 
		$pop.popover('toggle');
	}, 200 );
	// return 
	$pop.popover({
		title: '',
		toggle: 'popover',
		html: true,
		trigger: options.trigger,
		placement: options.place,
		content: options.data,
	}).popover('toggle');
};
function getUrlWithPath(){
	var url = window.location.protocol + "//" + window.location.host + window.location.pathname;
	if(url.match(/\/$/)) // end with ? will remove it
		url = url.slice(0,-1);
	return url;
};
function getPnlUrlPrefix(){
	var paths = window.location.pathname.split('/');
	if(paths[0] == '')
		paths.splice(0, 1);
	if(window.location.href.indexOf('http://app.feasibiliti.com/') > -1)
		var prefix = window.location.protocol + "//" + window.location.host + "/" + paths[0] + "/";
	else
		var prefix = window.location.protocol + "//" + window.location.host + "/" + paths[0] + "/" + paths[1]+ "/" + paths[2] + "/" + paths[3] + "/";
	return prefix;
};
function _urlPathWithHash() {
	
	var paths = window.location.pathname.split('/');
	if(paths[0] == '')	paths.splice(0, 1);
	
	// window.location.protocol + "//" + window.location.host + 
	// var url = window.location.pathname + window.location.hash.slice(1);
	var hash = window.location.hash.slice(1);
	if(hash.match(/^\//))	// start with / will remove it
		hash = hash.slice(1);
	var url = paths[0] + "/" + paths[1] + "/" + paths[2] + "/" + paths[3] + "/" + hash;
	if(url.match(/\/$/)) // end with ? will remove it
		url = url.slice(0,-1);
	return url.split('?')[0];
}
function _urlWithHash() {

	var paths = window.location.pathname.split('/');
	if(paths[0] == '')	paths.splice(0, 1);

	//var url = window.location.protocol + "//" + window.location.host + window.location.pathname + window.location.hash.slice(1);
	var hash = window.location.hash.slice(1);
	if(hash.match(/^\//))
		hash = hash.slice(1);
	var url;
	if(window.location.href.indexOf('http://app.feasibiliti.com/') > -1)
        url = window.location.protocol + "//" + window.location.host + "/" + paths[0] + "/" + hash;
	else
		url = window.location.protocol + "//" + window.location.host + "/" + paths[0] + "/" + paths[1] + "/" + paths[2] + "/" + paths[3] + "/" + hash;
	if(url.match(/\/$/)) // end with ? will remove it
		url = url.slice(0,-1);
	return url.split('?')[0];
}
function getUrlForPushState(url, title){
	// current url
	var paths = window.location.pathname.split('/');
	if(paths[0] == '')	paths.splice(0, 1);
	var prefix = window.location.protocol + "//" + window.location.host + "/" + paths[0] + "/" + paths[1] + "/" + paths[2] + "/" + paths[3] + "/" + paths[4] + "#";
	
	// clicked url
	var paths2 = url.split('/');
	if(paths2[0] == '')
		paths2.splice(0, 1);
	
	var newPathname = '', index;
	
	if(window.location.href.indexOf('http://app.feasibiliti.com/') > -1)
		index = 4;
	else
		index = 7;
	
	var orderChk = false;
	for (i = index; i < paths2.length; i++) {
		switch(paths2[i]) {
			case "pos":
			case "sales":
			case "purchases":
			case "production":
			{
				orderChk = true;
				break;
			}
			default: break;
		}
		newPathname += "/";
		newPathname += paths2[i];
	}
	
	
	prefix = window.location.protocol + "//" + window.location.host + window.location.pathname;
	
	// if(orderChk && paths2.length > 8) {
	if(orderChk) {
		var currentHash = window.location.hash.slice(1);
		if(currentHash != '') {
			if(currentHash.match(/^\//))	// start with / will remove it
				currentHash = currentHash.slice(1);
			var currentPaths = currentHash.split('/');
			//if (paths2[8].split('?')[0] != 'new')
			if (currentPaths.length > 2 && currentPaths[2].split('?')[0] != 'new')
				newPathname = newPathname.split('?')[0]; // remove querystring
		}
	}
	
	var prefix2 = prefix + '#' + newPathname;
	if(title){
		document.title = title;
		var newTitle = {"pageTitle":document.title}
	}
	window.history.pushState(newTitle, "", prefix2);
	
	// updateHeaderActionsSalesLinks('.apps .popover-content .quickaddmnu .quickaddmnu-shortcut', false);
};


var _tableFixedHeaderSets = {};
function _tableFixedHeaderSet(options) {
	// console.log(options)
	if(options == undefined)
		options = {};
	if(options.divParentSelector == undefined) options.divParentSelector = 'div.table-fixed-header';
	if(options.tableSelector == undefined) options.tableSelector = options.divParentSelector + ' > table:visible'; // table.fixed-header:visible
	if(options.clearWidth == undefined) options.clearWidth = true;
	if(options.mainHeight == undefined || options.mainHeight <= 0) options.mainHeight = $(window).height();
	var tableVertical = $(options.divParentSelector).hasClass('table-vertical');

	
	var colWidths = {};
	if(options.tableName != undefined && options.tableName != '')
		colWidths = _tableFixedHeaderSets[options.tableName]
	if(colWidths == undefined) colWidths = {};
	
	$(options.tableSelector).each(function() {
		
		var thead = $(this).find(' > thead');
		var tbody = $(this).find(' > tbody');
		// Clear
		/* COMMENTED BY MHMD
		thead.removeClass('fixed-element');
		thead.css('width', 'inherit');
		tbody.css('width', 'inherit');
		tbody.css('display', 'table-row-group');
		thead.find('tr th:not(.hidden)').css('width', 'inherit');
		tbody.find('tr td:not(.hidden)').css('width', 'inherit');
		// if(options.clearWidth) {
			// if(options.tableName != undefined && options.tableName != '')
				// _tableFixedHeaderSets[options.tableName] = {};
		// }
		*/

		// Calc After Clear
		var twidth = thead.outerWidth();

		var maxWidth;
		var maxHeight;
		var widthInRow = 0;
		var heightInRow = 0;
		var cell;
		var columns = thead.find('tr th.col-sticky').length;
		var stickyFound = false;
		var stickyStopTh = false;
		var stickyStopTd = false;
		// console.log('Columns:' + columns);
		if(columns > 0) {
			for (i = 1; i <= columns; i++) {
			    stickyFound = false;
				maxWidth = 0;
				maxHeight = 0;
				
				tbody.find('tr td:not(.hidden):nth-child(' + i + ')').each(function() {
					maxWidth = Math.max($(this).outerWidth(), maxWidth);
					if (tableVertical)	maxHeight = Math.max($(this).outerHeight(), maxHeight);
				});
				if(maxWidth != 0) colWidths[i] = maxWidth;

				cell = tbody.find('tr td:not(.hidden):nth-child(' + i + ')');
				if (tableVertical)	cell.css('height', maxHeight);	else	cell.css('width', maxWidth);
				if(cell.hasClass('col-sticky')) {	if (tableVertical)	cell.css('top', heightInRow);	else	cell.css('right', widthInRow); 	stickyFound = true; }
				cell = thead.find('tr th:not(.hidden):nth-child(' + i + ')')
				if (tableVertical)	cell.css('height', maxHeight);	else	cell.css('width', maxWidth);
				if(cell.hasClass('col-sticky')) { 	if (tableVertical)	cell.css('top', heightInRow);	else	cell.css('right', widthInRow);	stickyFound = true; }

                if(stickyFound) {
                    widthInRow += maxWidth;
					if (tableVertical)	heightInRow += maxHeight;
				}
				
			}
		}


		if (tableVertical) {
			var bodyWidth = 0;
			thead.find('tr').each(function() {
				$(this).css('right', bodyWidth);
				bodyWidth += $(this).outerWidth();
			});
			if(thead.outerWidth() < bodyWidth)
				thead.css('width', bodyWidth);
			else
				bodyWidth = thead.outerWidth();
			
			tbody.find('tr').each(function() {
				bodyWidth += $(this).outerWidth();
			});
			if(tbody.outerWidth() < bodyWidth)
				tbody.css('width', bodyWidth);
		}

		/* COMMENTED BY MHMD
		if(widthInRow > 0)
			$(this).closest('div.table-responsive').css('margin-right', widthInRow);
		
		if(options.tableName != undefined && options.tableName != '')
			_tableFixedHeaderSets[options.tableName] = colWidths;
		
		thead.addClass('fixed-element');
		thead.css('width', twidth+'px');
		tbody.css('width', twidth+'px');
		tbody.css('display', 'inline-block');
		*/
		
		
		// Margin Top
		var otherFixedElementsTop = 0;
		if($(this).attr('fixed-elements') != undefined){
			var fixedElements = $(this).attr('fixed-elements').split(',');
			$.each( fixedElements, function( index, elmSelector ) {
				// Clear
				elm = $(elmSelector);
				if(elm.length > 0) {
					/* COMMENTED BY MHMD
					elm.removeClass('fixed-element');
					elm.css('width', 'inherit'); // when calculate get inherit
					elm.css('width', elm.outerWidth()+'px'); // before set fixed again
					elm.css('margin-top', otherFixedElementsTop+'px');
					elm.addClass('fixed-element');
					*/
					otherFixedElementsTop = otherFixedElementsTop + elm.outerHeight();
					// console.log(elmSelector + ' Height: ' + elm.outerHeight());
				}
			});
			
			/* COMMENTED BY MHMD
			// thead.css('margin-top', otherFixedElementsTop+'px');	// thead position is fixed
			thead.css('top', otherFixedElementsTop); // form height & thead position is sticky
			tbody.css('margin-top', otherFixedElementsTop); // form height & thead position is sticky
			// otherFixedElementsTop = otherFixedElementsTop + thead.outerHeight();
			// tbody.css('margin-top', otherFixedElementsTop + 'px'); 	// thead position is fixed
			*/

		}
		// console.log(options.mainHeight);
		// console.log(otherFixedElementsTop);
		
		// var windowHeight = window.outerHeight
		var topbarAndpageTitle = 0; //87;
		var offsetTopScreen = $(this).offset().top;
		// console.log(offsetTopScreen);
		// console.log(options.mainHeight +', '+ offsetTopScreen +', '+ otherFixedElementsTop)
		var tbodyHeight = options.mainHeight - offsetTopScreen - otherFixedElementsTop - 8; // - 83;
		var tbodyWidth = $('.postcontent').width();
		$(this).closest(options.divParentSelector).css('height', tbodyHeight + 'px');
		if($(this).closest('td').hasClass('print-content-cell'))	// report
			$(this).closest(options.divParentSelector).css('width', tbodyWidth + 'px');
	});
}


function setTablePaging(){
	var pr = $('.table-paging .paging-right');
	var pl = $('.table-paging .paging-left');
	
	var page_current = parseInt(pr.attr('page')); if (page_current == NaN) page_current=0;
	var count_current = parseInt(pl.attr('count_perpage')); if (count_current == NaN) count_current=0;
	var count_total = parseInt(pl.attr('count_all')); if (count_total == NaN) count_total=0;
	var count_returned = parseInt(pl.attr('count_returned')); if (count_returned == NaN) count_returned=0;
	
	var page_total = Math.floor(count_total / count_current) // remove decimals
	if (page_total == 0) page_total = 1;
	if (count_current < count_total) page_total = page_total + 1;
	
	// console.log('page_current ' + page_current);
	// console.log('count_current ' + count_current);
	// console.log('count_total ' + count_total);
	// console.log('page_total ' + page_total);
	// console.log('count_returned ' + count_returned);
	
	var next = $('.table-paging .paging-right .paging-next');
	var prev = $('.table-paging .paging-right .paging-prev');
	
	if(page_current == 1) 
		prev.addClass('disabled'); 
	else
		prev.removeClass('disabled');
	if( !prev.hasClass('disabled') ){
		prev.attr('page', page_current-1);
	
		prev.click(function(){
			if($(this).closest('.reportCont-search').length == 1)	// reports
				$(this).closest('.reportCont-search').find('.ctrl-search-options-page').val($(this).attr('page'));
			else
				$(this).closest('.table-paging').parent().parent().find('.ctrl-search-options-page').val($(this).attr('page'));
			
			var searchClick = $(this).parent().attr('search');
			if($('.table-paging').closest('.table-responsive').length == 1)
				var btnSearch = $(this).closest('.table-responsive').prev().find('.pagingSearch');
			else if($(this).closest('.reportCont-search').length == 1)	// reports
				var btnSearch = $(this).closest('.reportCont-search').find('.pagingSearch');
			else	// contacts list - fixed
				var btnSearch = $(this).closest('.table-paging').parent().prev().find('.pagingSearch');
				
			if (!btnSearch && btnSearch.length != 0)
			    btnSearch = $('.pagingSearch');

			if (searchClick && typeof window[searchClick] === 'function') 
				window[searchClick](btnSearch);
			else
				contactsSearchClick(btnSearch);
			
			return false;
		});
	}
	
	if(page_current == page_total || count_returned == count_total)
		next.addClass('disabled'); 
	else 
		next.removeClass('disabled');
	if( !next.hasClass('disabled') ){
		next.attr('page', page_current+1);
		next.click(function(){
			if($(this).closest('.reportCont-search').length == 1)	// reports
				$(this).closest('.reportCont-search').find('.ctrl-search-options-page').val($(this).attr('page'));
			else
				$(this).closest('.table-paging').parent().parent().find('.ctrl-search-options-page').val($(this).attr('page'));
			
			var searchClick = $(this).parent().attr('search');
			if($('.table-paging').closest('.table-responsive').length == 1)
				var btnSearch = $(this).closest('.table-responsive').prev().find('.pagingSearch');
			else if($(this).closest('.reportCont-search').length == 1)	// reports
				var btnSearch = $(this).closest('.reportCont-search').find('.pagingSearch');
			else	// contacts list - fixed
				var btnSearch = $(this).closest('.table-paging').parent().prev().find('.pagingSearch');
			
			if (!btnSearch && btnSearch.length != 0)
			    btnSearch = $('.pagingSearch');

			if (searchClick && typeof window[searchClick] === 'function') 
				window[searchClick](btnSearch);
			else
				contactsSearchClick(btnSearch);
			
			return false;
		});
	}
};
function setTablePagingRev2(parentTable, parentContainer){
	var pr = $(parentTable).find('.table-paging .paging-right');
	var pl = $(parentTable).find('.table-paging .paging-left');
	
	var page_current = parseInt(pr.attr('page')); if (page_current == NaN) page_current=0;
	var count_current = parseInt(pl.attr('count_perpage')); if (count_current == NaN) count_current=0;
	var count_total = parseInt(pl.attr('count_all')); if (count_total == NaN) count_total=0;
	var count_returned = parseInt(pl.attr('count_returned')); if (count_returned == NaN) count_returned=0;
	
	var page_total = Math.floor(count_total / count_current) // remove decimals
	if (page_total == 0) page_total = 1;
	if (count_current < count_total) page_total = page_total + 1;
	
	// console.log('page_current ' + page_current);
	// console.log('count_current ' + count_current);
	// console.log('count_total ' + count_total);
	// console.log('page_total ' + page_total);
	// console.log('count_returned ' + count_returned);
	
	var next = $(parentTable).find('.table-paging .paging-right .paging-next');
	var prev = $(parentTable).find('.table-paging .paging-right .paging-prev');
	
	if(page_current == 1) 
		prev.addClass('disabled'); 
	else
		prev.removeClass('disabled');
	
	if( !prev.hasClass('disabled') ){
		prev.attr('page', page_current-1);
	
		prev.click(function(){
			// $(this).closest('.table-paging').parent().parent().find('.ctrl-search-options-page').val($(this).attr('page'));
			$(parentContainer).find('.ctrl-search-options-page').val($(this).attr('page'));
			
			var searchClick = $(this).parent().attr('search');
			if($('.table-paging').closest('.table-responsive').length == 1)
				var btnSearch = $(this).closest('.table-responsive').prev().find('.pagingSearch');
			else if($(this).closest('.reportCont-search').length == 1)	// reports
				var btnSearch = $(this).closest('.reportCont-search').find('.pagingSearch');
			else	// fixed list
				var btnSearch = $(this).closest('.table-paging').parent().prev().find('.pagingSearch');
			if (!btnSearch && btnSearch.length != 0)
			    btnSearch = $('.pagingSearch');

			if (searchClick && typeof window[searchClick] === 'function') 
				window[searchClick](btnSearch);
			else
				contactsSearchClick(btnSearch);
			
			return false;
		});
	}
	
	if(page_current == page_total || count_returned == count_total)
		next.addClass('disabled'); 
	else 
		next.removeClass('disabled');
	if( !next.hasClass('disabled') ){
		next.attr('page', page_current+1);
		next.click(function(){
			// $(this).closest('.table-paging').parent().parent().find('.ctrl-search-options-page').val($(this).attr('page'));
			$(parentContainer).find('.ctrl-search-options-page').val($(this).attr('page'));
			
			var searchClick = $(this).parent().attr('search');
			if($('.table-paging').closest('.table-responsive').length == 1)
				var btnSearch = $(this).closest('.table-responsive').prev().find('.pagingSearch');
			else if($(this).closest('.reportCont-search').length == 1)	// reports
				var btnSearch = $(this).closest('.reportCont-search').find('.pagingSearch');
			else	// fixed list
				var btnSearch = $(this).closest('.table-paging').parent().prev().find('.pagingSearch');
			if (!btnSearch && btnSearch.length != 0)
			    btnSearch = $('.pagingSearch');

			if (searchClick && typeof window[searchClick] === 'function') 
				window[searchClick](btnSearch);
			else
				contactsSearchClick(btnSearch);
			
			return false;
		});
	}
};
function setContactAddress(container){
	var addressPart1, addressPart2, addressPart3;
	
	if(container == 'sidebar'){
		addressPart1 = $('.tasksListContainer table tbody .col-address .address-part1');
		addressPart2 = $('.tasksListContainer table tbody .col-address .address-part2');
		addressPart3 = $('.tasksListContainer table tbody .col-address .address-part3');
	}
	else{
		addressPart1 = $('table tbody .col-address .address-part1');
		addressPart2 = $('table tbody .col-address .address-part2');
		addressPart3 = $('table tbody .col-address .address-part3');
	}
	
	addressPart1.find('span').each(function(){
		$(this).html($(this).text()+', ');
	});
	addressPart2.find('span').each(function(){
		$(this).html($(this).text()+', ');
	});
	addressPart3.find('.address-buildno').attr('title', 'المبنى');
	addressPart3.find('.address-floor').attr('title', 'الطابق');
	addressPart3.find('.address-flat').attr('title', 'الشقة');
};
function _drawInMainContent(drawOptions){
	var options = {};
	options.url = drawOptions.action;
	options.type = "POST";
	options.done = function(options){
		$('.content-wrap .postcontent > div').html('').append(options.paramData);
		$('.content-wrap').attr('current-page-url', drawOptions.action);
		ertaqyLiveChatPopupHide();

		if(drawOptions.parentType != 'content'){
			/* if($('#header #primary-menu .primary-page span').text() == '')
				$('#header #primary-menu .primary-page span').text($('#page-title h1').text()); */
			$('#page-title h1').text(drawOptions.title);
			$('#page-title .breadcrumb li.active').text(drawOptions.title);
		}
		
		getUrlForPushState(drawOptions.action, drawOptions.title);
		
		/* ---------- ERP ---------- */
		if($(".orderDetailsLnk").length == 1)
			orderDetailsChangeLnkOnClick($(this));
		
		if($('.orderDetails-container').length == 0){
			$('#page-title .prevOrdersList').remove();
			$('#page-title h1').css('position','unset');
		}
		/* ---------- ERP ---------- */
		
		if($('.content-wrap .sidebar .sidebar-widgets-wrap').html() != '' && drawOptions.sidebar != 1)
			$('.content-wrap .sidebar .sidebar-widgets-wrap').html('');	
		
		if($('.tabs').length == 1){
			if( $('.tabs .nav li') ) {
				if( $('.tabs .nav li').filter(function() {return $(this).hasClass('active') }).length == 0 && $('.tabs .tab-content .tab-pane').filter(function() {return $(this).hasClass('active') }).length == 0)
					$('.tabs .nav li:first-child, .tabs .tab-content .tab-pane:first-child').addClass('active');
				$('.tabs .nav li').click(function() {
					if(!$(this).hasClass('disabled')){
						$('.tabs ul li.active').removeClass('active');
						$('.tabs .tab-content .tab-pane.active').removeClass('active');
						$(this).addClass('active');
						$('.tabs .tab-content .tab-pane[id=tabs-' + $(this).attr('type') + ']').addClass('active');
					}
				});
			}
		}
		
		$('.dropdown-toggle').dropdown();
		calculateWidths();
		setActiveToLink(drawOptions.ct, drawOptions.parentType);
	};
	_ertaqyAjax(options);
};
function _drawInMainContentWithSidebar(options){
	_drawInMainContentAndSidebar(options);
}
function _drawInMainContentAndSidebar(drawOptions){
	
	var options = {};
	options.url = drawOptions.action;
	options.type = 'POST';
	if(drawOptions.postData != undefined)
		options.data = drawOptions.postData
	options.done = function(options){
		if(drawOptions.title){
			$('#page-title h1').text(drawOptions.title);
			$('#page-title .breadcrumb li.active').text(drawOptions.title);
		}
		
		/* if(drawOptions.orderStatus)
			getUrlForPushState(drawOptions.action, drawOptions.title, drawOptions.orderStatus);
		else */
		getUrlForPushState(drawOptions.action, drawOptions.title, '');
		
		if($(options.paramData).find('#sidebar-septa')) {
			var divs = options.paramData.split('<div id="sidebar-septa"></div>');
			dataSidebar = divs[0];
			dataContent = divs[1];
			
			$('.content-wrap .sidebar .sidebar-widgets-wrap').html('').append(dataSidebar);
			$('.content-wrap .postcontent > div').html('').append(dataContent);
			$('.content-wrap').attr('current-page-url', drawOptions.action);
			ertaqyLiveChatPopupHide();
			
			/* ---------- ERP ---------- */
			if($('.orderDetails-container').length == 1 && $('.orderDetails-container').attr('stock') != '1'){
				// $('#page-title .prevOrdersList').remove();
				var prevOrdersList = '<ul class="prevOrdersList"><li><button class="btn btn-default btn-xs newOrder dis0Items disQtyMin" type="button"><i class="fa fa-plus"></i></button></li></ul>';
				if($('#page-title .prevOrdersList').length == 0)
					$('#page-title h1').after(prevOrdersList);
				
				if(window.innerWidth > 767){
					$('#page-title h1').css('position', 'absolute');
					var titleWidth = $('#page-title h1').outerWidth();
					$('#page-title .prevOrdersList').css('margin-right', titleWidth + 15);
				}
			}
			if($('.orderDetails-container').length == 1){
				salesOrderSuccessTriggers();
				// setDynamicDateTimePicker();
				// ProductsTypeahead();
				windowLoadFunction();
				orderCalculateWidths();
			}
			/* ---------- ERP ---------- */
			
			calculateWidths();
			// dashboardLoadSuccessTriggers();
			
			if($('.modal-sidebar').css('display') == 'block')
				modalSidebarClose($('.modal-sidebar:last-of-type .modal-sidebar-close'));
		}
	
		if(drawOptions.parentType == 'header')
			setActiveToLink(drawOptions.ct, drawOptions.parentType);
	};
	options.always = function(){
							if (drawOptions.alwaysFunction)
								drawOptions.alwaysFunction();
						};
	_ertaqyAjax(options);
}
function _drawInContentSidebar(drawOptions){
	
	var options = {};
	options.url = drawOptions.action;
	options.type = "POST";
	options.done = function(options){
		if(drawOptions.title){
			$('#page-title h1').text(drawOptions.title);
			$('#page-title .breadcrumb li.active').text(drawOptions.title);
		}
		
		if(drawOptions.afterDone)
			drawOptions.afterDone(drawOptions);
		else{
			/* if(drawOptions.orderStatus)
				getUrlForPushState(drawOptions.action, drawOptions.title, drawOptions.orderStatus);
			else */
			getUrlForPushState(drawOptions.action, drawOptions.title, '');
		}
			
		$('.content-wrap .sidebar .sidebar-widgets-wrap').html('').append(options.paramData);
		$('.content-wrap .postcontent > div').html('');
		$('.content-wrap').attr('current-page-url', drawOptions.action);
		ertaqyLiveChatPopupHide();
		
		setActiveToLink(drawOptions.ct, drawOptions.parentType);
		// linkQueryStrEdit('.sidebar #content-list');
		
		if($('.orderDetails-container').length == 0){
			$('#page-title .prevOrdersList').remove();
			$('#page-title h1').css('position','unset');
		}
		
		if($('.sidebar #content-list').length == 1){
			$('.sidebar #content-list ul li').each(function(){
				var ct = $(this);
				if(ct.find('a').attr('action') == '')	
					ct.addClass('disabled');
			});
			$('.sidebar #content-list ul li a').unbind('click');
			$('.sidebar #content-list ul li a').click(function(event){
				var ct = $(this);
				if(!ct.parent().hasClass('disabled') && ct.attr('action') != ''){
					ct.closest('ul').find('li.active').removeClass('active');
					ct.parent().addClass('active');
					// loadReportContent(event);
					menuLoadContent(ct, 1, 'sidebar');
				}
			});
			$('.sidebar #content-list ul li').each(function(){
				var ct = $(this);
				ct.find('i.disabled').closest('li').addClass('disabled');
				ct.find('i.disabled').removeClass('disabled');
			});
			
			menuLoadContent($('.sidebar #content-list ul li:first-child a'), 1, 'sidebar');
			// $('.sidebar #content-list ul li:first-child a').click();
		}
		
		
		/* if($('#content-list').length > 0 && $('#content-list').hasClass('side-menu')){
			$('#content-list li a i.disabled').closest('li').addClass('disabled');
		} */
		// calculatesForSalesBillOrder();
		calculateWidths();
		
		if($('.sideBarLeftL2').css('display') == 'block')
			sideBarLeftClose();
	
		// if(drawOptions.parentType == 'header')
			// setActiveToLink(drawOptions.ct, drawOptions.parentType);
	};
	_ertaqyAjax(options);
};
function _drawInHeader(options){
	$('#ajax-loader').fadeIn();
	
    $.post(options.action, null, function(data) {
    })
    .success(function(data){
		
		$('#page-title .project-name').remove();
		$('#page-title h1').text('');
		
		$('#header #primary-menu > div > ul').html('').append(data);
		$('.content-wrap .postcontent > div').html('');
		ertaqyLiveChatPopupHide();
		
		window.history.pushState('', '', getPnlUrlPrefix() + 'projects');
		changeHeaderHrefBasedOnActionMode();
		dashboardLoadSuccessTriggers();
		menuLoadContent($('#header #primary-menu ul li[id="1959c550-d16d-415e-85de-f36688398bb2"]'), '', 'header');
	})
    .fail(function(xhr, status, error) {
		console.log(xhr);console.log(status); console.log(error);
    })
    .always(function() {
		$('#ajax-loader').fadeOut();
    }); 
}
function _drawInCommsPopup(opts){
	$('#ajax-loader').fadeIn();
	
	// $('.modal-sidebar').hide();
	if($('.sideBars-opened-list').attr('sidebars-opened-ids') != '' && $('.sideBars-opened-list').css('display') == 'block')
		modalSidebarClose($('.modal-sidebar[id="' + $('.sideBars-opened-list li.active a').attr('modal-id') + '"] .modal-sidebar-close'));
	
	if(!$('#tasks-list').hasClass('sideBar-chat') && $('#tasks-list').css('display') == 'block')
		modalSidebarClose($('#tasks-list .modal-sidebar-close'));
	
	if($('.modal-sidebar:not(.sideBar-chat)').filter(function() {return $(this).css('display') == 'block'; }).length > 0){
		$('.modal-sidebar:not(.sideBar-chat)').each(function(){			
			modalSidebarClose($(this).find('.modal-sidebar-close'));
		})
	}
	
	var type = '';
	
	$('.top-social .ertaqy-comms-icon').removeClass('active').addClass('hidden');
	if(opts.mode != 'change')
		$('#wrapper .ertaqy-comms-popup').hide();
	
	if(opts.id == '00f06c35-1523-4b7e-9035-59b4ca3f2b85'){	// email
		type = 'emails';
		icon = $('.top-social .emails');
	}
	if(opts.id == '9ea02afb-ab00-47a5-9343-c52c901c2e71'){	// livechat
		type = 'livechat';
		icon = $('.top-social .live-chat');
	}
	
	var customContainer = $('#wrapper .ertaqy-comms-popup[type="' + type + '"]');
	if(customContainer.find('.popup-content').html() == '' || opts.mode == 'change'){
		var options = {};
		options.url = opts.action;
		options.type = "POST";
		options.done = function(options){
			customContainer.find('.popup-content').html(options.paramData);
			$('.dropdown-toggle').dropdown();
			$('.ertaqy-comms-popup[type="emails"] .emails-container .mail-nav ul li i.auto-load').parent().click();
			afterDrawInCommsPopup();
			const doc = document.documentElement;
			doc.style.setProperty('--doc-height', `${window.innerHeight}px`);
		};
		_ertaqyAjax(options);
	}
	else{
		afterDrawInCommsPopup();
		if(type == 'livechat' && $('.sideBar-chat').length != 0)
			$('.sideBar-chat').show();
		
		$('#ajax-loader').fadeOut();
	}
	
	var isMobile = false;
	if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
		|| /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
		isMobile = true;
	}
	function afterDrawInCommsPopup(){
		if(customContainer.length != 0)
			customContainer.show();
		// if($('body').attr('data-user') == '00000000-0000-0000-0000-000000000002')
		icon.addClass('active').removeClass('hidden');
		if($('.sideBar-chat').css('display') == 'block')
			$('.sideBar-chat').hide();
		if(type == 'livechat' && !isMobile)
			$('.conversation .reply .attach-options .options-list .img-capture').hide();
	}
	
	$('.ertaqy-comms-popup .popup-title .reload').bindOnce('click', function(){
		var ct = $(this);
		var isRepling = isMultiRead = false;
		var chatId = $('.conversation').attr('chat-id');
		if(chatId == undefined)	chatId = '';
		if(ct.parent().parent().attr('type') == 'livechat'){
			if($('.conversation-content .heading .token[status="read"] span').text() > 1)
				isMultiRead = true;
			if($('.conversation .reply .reply-main .reply-message').val() != '')
				isRepling = true;
			if( !$('.conversation-content .voice-recording').hasClass('hidden') )
				$('.conversation .reply .voice-recording .cancel').click();
		}
		
		var options = {};
		options.url = ct.parent().parent().attr('data-href');
		options.type = "POST";
		options.done = function(options){
			customContainer.find('.popup-content').html(options.paramData);
			if(ct.parent().parent().attr('type') == 'livechat'){
				$('.dropdown-toggle').dropdown();
				if(chatId != ''){
					if(isRepling){
						var json = {toType: 'group-others', toId: chatId, toDb: 'chat-access', accessType: 'reply-cancel', chatId: chatId, interactionType: 2 };
						_signalrSrvSendJson(json);
						_signalrSrvRemoveGroup('chat-' + chatId + '-reply', 11);
					}
					if(isMultiRead){
						var json = {toType: 'group-others', toId: chatId, toDb: 'chat-access', accessType: 'end', chatId: chatId, interactionType: 2};
						_signalrSrvSendJson(json);
						_signalrSrvRemoveGroup(chatId, 11);
					}
				}
				
				if(!isMobile)
					$('.conversation .reply .attach-options .options-list .img-capture').hide();
			}
			else if(ct.parent().parent().attr('type') == 'emails')
				$('.ertaqy-comms-popup[type="emails"] .emails-container .mail-nav ul li i.auto-load').parent().click();
		};
		_ertaqyAjax(options);
	});
}
function _drawInSideBarLeft(options){
	var parentSideBar, sidebarOptions = {};
	if(options.actionMode == 'sidebar1')
		parentSideBar = 'sideBarLeftL1';
	if(options.actionMode == 'sidebar3')
		parentSideBar = 'sideBarLeftL3';

	sidebarOptions.Title = options.title;
	sidebarOptions.Size = 'lg';
	sidebarOptions.ModalCssClass = parentSideBar;
	sidebarOptions.ModalId = parentSideBar;
	sidebarOptions.Url = options.action;
	sidebarOptions.alwaysFunction1 = options.alwaysFunction1;
	sidebarOptions.SuccessTriggerEvent = options.SuccessTriggerEvent;
	
	openModalSidebar(sidebarOptions);
};
function _drawInPopUp(options){
	openModalPopup();
	$('#ajax-loader').fadeIn();
	
    $.post(options.action, null, function(data) {
    })
    .success(function(data){
		$('.formModal').addClass('modalPopUp').fadeIn();
		if(options.cssClass)
			$('.formModal .modalPopUpContainer').addClass(options.cssClass);
		if(options.title)
			$('.formModal .modalPopUpContainer').append('<div class="drawInPopUp-header"><a class="drawInPopUp-close"><i class="fa fa-times"></i></a><span>'+ options.title +'</span></div>');
		
		$('.formModal .modalPopUpContainer').append(data);
		
		$('.modalPopUpContainer .drawInPopUp-close').click(function(){
			modalClose();
			setTimeout( function(){ 
				$('.formModal .modalPopUpContainer').removeClass(options.cssClass);
			}, 400); 
		});
		
		if($('.modalPopUpContainer .orderDetails-container').length > 0){
			$('.modalPopUpContainer').find('.side-menu-trigger, .menu-overlay, .side-menu, #sidebar-septa').remove();
			salesOrderSuccessTriggers();
			// setDynamicDateTimePicker();
			// ProductsTypeahead();
			// calculateWidths();
			windowLoadFunction();
		}
		
    })
    .fail(function(xhr, status, error) { 
		console.log(xhr); console.log(status); console.log(error);
    })
    .always(function() {
		$('#ajax-loader').fadeOut();
    });  
	
};

function setActiveToLink(ct, container){
	var _parent = container == 'header' ? $('#header #primary-menu') : $('.sidebar #content-list');
	var _ct = container == 'header' ? ct : ct.parent();
 	_parent.find('ul > li').each(function(){
		var ct2 = $(this);
		if( !ct2.hasClass('sub-menu') ){
			if(ct2.hasClass('opened')){
				ct2.removeClass('opened');
				ct2.find('ul').slideUp();
				ct2.find('ul li').removeClass('active');
			}
		}
	});
	_parent.find('ul li.active').removeClass('active');
	if(_ct.closest('li').hasClass('sub-menu')){
		_ct.closest('li').addClass('opened');
		_ct.closest('li').find('ul').slideDown();
	}
	_ct.addClass('active');
};

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

function headerTriggerBtn(ct){
	if(window.innerWidth < 480){
		modalSidebarClose($('.modal-sidebar[style*="display: block;"] .modal-sidebar-close'));
		if($('.ertaqy-comms-popup').filter(function() {return $(this).css('display') == 'block'; }).length != 0)
			ertaqyLiveChatPopupHide();
		setTimeout( function(){ 
			$('.body-overlay').toggleClass('appear header');
			if($('.body-overlay').hasClass('appear header')){
				$('#header').removeClass('closeHeader').addClass('openHeader');
				/*
				$('#header').css('width', $('body').hasClass('rtl') ? 220 : 260);
				$('#header .header-tabs').css('width', $('body').hasClass('rtl') ? 219 : 259);
				*/
				// by mhmd
				$('#header').css('width', 250);
				$('#header .header-tabs').css('width', 249);
			}
			else{
				$('#header').removeClass('openHeader').addClass('closeHeader');
				$('#header').css('width', '0');
				$('#header .header-tabs').css('width', '0');
				$('.body-overlay').removeClass('appear');
			}
		}, 400 );
	}
	else{
		// var requestActionUrl = ct.attr("request-action") + "&val=";
		if (ct.hasClass('more')) {
			/* requestActionUrl = requestActionUrl + "0";
			$.post(	requestActionUrl, function(data){})
			.success(function(data){})
			.fail(function(xhr, textStatus, error) {})
			.always(function() {}); */  
			
			ct.removeClass('more').addClass('less');
			$('.side-header #header').removeClass('openHeader').addClass('closeHeader');
			// $('#header #primary-menu .primary-page').hide();
		} 
		else if (ct.hasClass('less')) {
			/* requestActionUrl = requestActionUrl + "1";
			$.post(	requestActionUrl, function(data){})
			.success(function(data){})
			.fail(function(xhr, textStatus, error) {})
			.always(function() {});  */ 
			
			ct.removeClass('less').addClass('more');
			$('.side-header #header').removeClass('closeHeader').addClass('openHeader');
			// $('#header #primary-menu .primary-page').show();
		}
			
		if($('li.sub-menu').hasClass('opened')){
			$('li.sub-menu').find('> ul').slideUp(500); 
			$('li.sub-menu').removeClass('opened');
		}	
		calculateWidths();
	}
};
function sidemenuTriggerBtn(ct){
	var scrollWidth = window.innerWidth - document.documentElement.clientWidth;

	var ct = $('#trigger-menu-sideMenu');
	var requestActionUrl = ct.attr("request-action") + "&val=";
	
	if (ct.hasClass('openedSidebar')) {	
		requestActionUrl = requestActionUrl + "0";
		// request url 
		$.post(	requestActionUrl, function(data){})
		.success(function(data){})
		.fail(function(xhr, textStatus, error) {})
		.always(function() {}); 
		
		ct.removeClass('openedSidebar').addClass('closedSidebar');
		$('.side-menu').removeClass('opened').addClass('closed');
		
		$('.ltr #trigger-menu-sideMenu').css('border-radius', '0 2px 2px 0');
		$('.rtl #trigger-menu-sideMenu').css('border-radius', '2px 0 0 2px');
		$('.ltr #trigger-menu-sideMenu i').removeClass('fa-arrow-left').addClass('fa-arrow-right');
		$('.rtl #trigger-menu-sideMenu i').removeClass('fa-arrow-right').addClass('fa-arrow-left');
	}
	else if (ct.hasClass('closedSidebar')) {		
		requestActionUrl = requestActionUrl + "1";
		// request url 
		$.post(	requestActionUrl, function(data){})
		.success(function(data){})
		.fail(function(xhr, textStatus, error) {})
		.always(function() {});  
		
		ct.removeClass('closedSidebar').addClass('openedSidebar');
		$('.side-menu').removeClass('closed').addClass('opened');
		
		$('.ltr #trigger-menu-sideMenu').css('border-radius', '2px 0 0 2px');
		$('.rtl #trigger-menu-sideMenu').css('border-radius', '0 2px 2px 0');
		$('.ltr #trigger-menu-sideMenu i').removeClass('fa-arrow-right').addClass('fa-arrow-left');
		$('.rtl #trigger-menu-sideMenu i').removeClass('fa-arrow-left').addClass('fa-arrow-right')
	}	
	
	calculateWidths();
	orderCalculateWidths();
}
function calculateWidths(){
	var windowHeight = window.innerHeight;
	// var windowWidth = window.innerWidth;
	var windowWidth = document.documentElement.clientWidth || document.body.clientWidth;
	var scrollWidth = window.innerWidth - document.documentElement.clientWidth;	
	
	var headerWidth = $("#header").outerWidth();
	var rtlOpenedHeaderWidth = 250;
	var ltrOpenedHeaderWidth = 260;
	var closedHeaderWidth = 43;
	
	if($('#header').hasClass('openHeader'))
		headerWidth = $('body').hasClass('rtl') ? rtlOpenedHeaderWidth : ltrOpenedHeaderWidth;
	else
		headerWidth = window.innerWidth < 480 ? 0 : closedHeaderWidth;
	
	var topBarHeight = $(".top-bar").outerHeight();
	var pgTitHeight = $("#page-title").outerHeight();
	var topBarHeightAndpageTitleHeight = topBarHeight + pgTitHeight;
	var topBarHeightAndpageTitleHeightMinusFullHeight = windowHeight - topBarHeightAndpageTitleHeight;
	
	var sideMenuWidth = $(".side-menu").outerWidth();
	if($('.side-menu').hasClass('operator-sidemenu'))
		sideMenuWidth = 220;
	else if($('.side-menu').hasClass('deliver-sidemenu'))
		sideMenuWidth = 330;
	else if($('.side-menu').hasClass('order-sidemenu'))
		sideMenuWidth = $('.side-menu').hasClass('opened') ? 500 : 0;
	
	var headerWidthMinusFullWidth = windowWidth - headerWidth;
	var headerWidthPlussideMenu = headerWidth + sideMenuWidth;
	var fullWidthMinusHeaderWidthMinusSideMenuWidthMinusScrollWidth  = windowWidth - sideMenuWidth - headerWidth - scrollWidth;
	var fullWidthMinusHeaderWidthMinusScrollWidth  = windowWidth - headerWidth - scrollWidth;
	
	$('#trigger-menu-sideMenu').css('top', topBarHeightAndpageTitleHeight);
	
	if(window.innerWidth < 992){
		if($('body').hasClass('rtl'))
			$('#content').css({'width': fullWidthMinusHeaderWidthMinusScrollWidth , 'margin-right': headerWidth});
		else
			$('#content').css({'width': fullWidthMinusHeaderWidthMinusScrollWidth , 'margin-left': headerWidth});
		$('.side-header:not(.open-header) #wrapper').css({'margin-left': '0', 'margin-right': '0'});
	}
	if(window.innerWidth > 991){
		$('#content').css({'width': 'auto' , 'margin-right': '0'});
		$('.ltr.side-header:not(.open-header) #wrapper').attr('style', 'margin-left: ' + headerWidth + 'px !important');
		$('.rtl.side-header:not(.open-header) #wrapper').attr('style', 'margin-right: ' + headerWidth + 'px !important');
	}
	if(window.innerWidth < 768){
		$('#trigger-menu-sideMenu').removeClass('openedSidebar').addClass('closedSidebar');
		$('.side-menu').removeClass('opened').addClass('closed');
		$('.ltr #trigger-menu-sideMenu i').removeClass('fa-arrow-left').addClass('fa-arrow-right');
		$('.rtl #trigger-menu-sideMenu i').removeClass('fa-arrow-right').addClass('fa-arrow-left');
		$('.ltr #trigger-menu-sideMenu').css({'border-radius': '0 2px 2px 0', 'left': headerWidth});
		$('.rtl #trigger-menu-sideMenu').css({'border-radius': '2px 0 0 2px', 'right': headerWidth});
		$('.ltr .side-menu').css('left', '0');
		$('.rtl .side-menu').css('right', '0');

		var fullWidthMinusHeaderWidthMinusScrollWidth = windowWidth - headerWidth - scrollWidth;			//sideMenuWidth = 0
		$('.postcontent').css('width', fullWidthMinusHeaderWidthMinusScrollWidth);
		$('.ertaqy-comms-popup').css('width', windowWidth);
	}
	if(window.innerWidth > 767){
		$('.ltr .side-menu').css('left', headerWidth);
		$('.rtl .side-menu').css('right', headerWidth);
		$('.side-menu').css({'top': topBarHeightAndpageTitleHeight, 'height': topBarHeightAndpageTitleHeightMinusFullHeight});
		if($('.side-menu').hasClass('opened')){
			$('.ltr #trigger-menu-sideMenu').css('left', headerWidthPlussideMenu - 32);
			$('.rtl #trigger-menu-sideMenu').css('right', headerWidthPlussideMenu - 32);
			$('.side-menu').css('width', sideMenuWidth)
		}else{
			$('.ltr #trigger-menu-sideMenu').css('left', headerWidthPlussideMenu);
			$('.rtl #trigger-menu-sideMenu').css('right', headerWidthPlussideMenu);
			$('.side-menu').css('width', sideMenuWidth)
		}
		$('.postcontent').css('width', fullWidthMinusHeaderWidthMinusSideMenuWidthMinusScrollWidth);
		$('.ertaqy-comms-popup').css('width', fullWidthMinusHeaderWidthMinusSideMenuWidthMinusScrollWidth);
	}
	if(window.innerWidth > 479){
		$('#page-title').css('width', headerWidthMinusFullWidth);
		$('.ltr #page-title').css('left', headerWidth);
		$('.rtl #page-title').css('right', headerWidth);
		$('#header').css('width', headerWidth);
		$('#header .header-tabs').css('width', headerWidth - 1);
	}
	if(window.innerWidth < 480){
		/* $('#header').css('border-left', 'none');
		$('.ltr.side-header:not(.open-header) #wrapper').attr('style', 'margin-left: '+'0px !important');
		$('.rtl.side-header:not(.open-header) #wrapper').attr('style', 'margin-right: '+'0px !important');
		$('.ltr #trigger-menu-sideMenu').css('left', '0');
		$('.rtl #trigger-menu-sideMenu').css('right', '0'); */
		$('#content').css({'width': windowWidth , 'margin-right': '0'});
		$('#page-title').css('width', windowWidth);
		$('.rtl #page-title').css('right', '0');
		$('.ltr #page-title').css('left', '0');
		$('#header').css('width', '0');
		$('#header .header-tabs').css('width', '0');
		$('.postcontent').css('width', windowWidth);
		$('.body-overlay').removeClass('appear header');
		$('#header').removeClass('openHeader').addClass('closeHeader');
	}
	
}
function headerLinkAutoLoad(){
	$('#header #primary-menu ul li').each(function(){
		var ct = $(this);
		if(ct.find('div i').hasClass('auto-load'))
			menuLoadContent(ct, '', 'header');
	});
}
// cms-preview=true
function linkQueryStrEdit(container){
	$(container).find('ul li').each(function(){
		var ct = container.indexOf('header') > -1 ? $(this) : $(this).find('> a');
		var url = ct.attr('action');
		var firstIndex = url.indexOf('?');
		var secoundIndex = url.indexOf('?', firstIndex + 1);
		if(firstIndex != -1 && secoundIndex != -1) {
			var newUrl = url.substring(0, secoundIndex) + url.substring(secoundIndex).replace('?', '&');
			ct.attr('action', newUrl);
		}
	});
}
function windowLoad(){
	$('#wrapper').append('<div id="ajax-loader"></div><div class="body-overlay">'+
						 '</div><ul class="alertMsgsContainer"></ul>'+
						 '<div id="draggable-container">'+
							'<div class="options ui-draggable"></div>'+
						 '</div>');
						 
	if(window.innerWidth > 479)
		$('#header').addClass('openHeader');
	
	// linkQueryStrEdit('#header #primary-menu');
	if($('.header-tabs').length == 0)
		changeHeaderHrefBasedOnActionMode();
	if($('.sidebar #content-list').length == 0 && $('.header-tabs').length == 0)
		headerLinkAutoLoad();
	else
		menuLoadContent($('.sidebar #content-list ul li:first-child a'), 1, 'sidebar');	
	
	// lang popover
	if($('.top-social .lang .popover-content .menu-lang').length != 0){		
		var currentUrl = window.location.href;
		var currentUrlSplit = window.location.href.split('/');
		$('.top-social .lang .popover-content .menu-lang').each(function(){
			var ct = $(this);
			currentUrlSplit[3] = ct.attr('lang');
			ct.find('a').attr('href', currentUrlSplit.join('/'));
		});
	}
};
function windowResize(){
	$('#primary-menu li.opened').find('> ul:not(.tab-nav)').css('display', 'none');
	$('#primary-menu li.opened').removeClass('opened');
	
	if($('#header').length == 1){
		var headerStatus = $('#header').attr('class').split(' ').pop();
		if(window.innerWidth > 479){
			if(headerStatus == 'openHeader'){
				$('#header').removeClass('closeHeader').addClass('openHeader');
				$('.trigger-menu-item').removeClass('less').addClass('more');
			}
			else{
				$('#header').removeClass('openHeader').addClass('closeHeader');
				$('.trigger-menu-item').removeClass('more').addClass('less');
			}
		}
	}
};
function windowLoadResize(){
	if(window.innerWidth < 480){
		$('#header').removeClass('openHeader closeHeader').css('display','block');
		$('.trigger-menu-item').removeClass('more').addClass('less');
	}
	calculateWidths();
};
function dashboardLoadSuccessTriggers(){
	$('.btnFullscreen').click( function() {
		toggleFullscreen();
	});
	$('.trigger-menu-item').click(function(){
		headerTriggerBtn($(this));
	});
	$('#trigger-menu-sideMenu').click(function(){
		sidemenuTriggerBtn($(this));
	});
	$('#header #primary-menu li.sub-menu').hover(function(e){
		e.stopPropagation();
	})
	$('#header #primary-menu li.sub-menu:not(.menu-title)').unbind('click');
	$('#header #primary-menu li.sub-menu:not(.menu-title)').click(function(){
		var ct = $(this);
		if(!ct.hasClass('disabled') && $('#header').hasClass('openHeader')){
			ct.toggleClass('opened');
			ct.find('> ul').slideToggle(200); 
		}
	}).find('> ul').click(function (event) {
		event.stopPropagation();
	});
	if($('.body-overlay')){
		$('.body-overlay').unbind('click');
		$('.body-overlay').click(function(){
			var ct = $(this);
			if(ct.hasClass('sidebar')){
				if($('.modal-sidebar').filter(function() {return $(this).css('display') == 'block'; }).length == 1)
					modalSidebarClose($('.modal-sidebar[style*="display: block;"] .modal-sidebar-close'));
				else
					modalSidebarClose($('.modal-sidebar:last-of-type .modal-sidebar-close'));
			}
			if(ct.hasClass('header')){
				$('#header').removeClass('openHeader').addClass('closeHeader');
				$('#header').css('width', '0');
				ct.attr('class', 'body-overlay');
			}
		});
	}
	$('#header #primary-menu ul li:not(.sub-menu):not(.disabled)').unbind('click');
	$('#header #primary-menu ul li:not(.sub-menu):not(.disabled)').click(function(){
		menuLoadContent($(this), '', 'header');
	});
	$('.sidebar #content-list ul li a').unbind('click');
	$('.sidebar #content-list ul li a').click(function(){
		menuLoadContent($(this), 1, 'sidebar');
	});

	if($('#draggable-container .sideBars-opened')){
		$('#draggable-container .sideBars-opened').unbind('click');
		$('#draggable-container .sideBars-opened').click(function(){
			var dir = $('body').attr('dir') == 'rtl' ? 'left' : 'right';
			$('#' + $('.sideBars-opened-list li.active a:first').attr('modal-id')).show('slide', { direction: dir }, 500);
			setTimeout( function(){ 
				$('.sideBars-opened-list').css(dir, $('#' + options.ModalId).width()).show();
			}, 500 );
		})
	}
};
function changeHeaderHrefBasedOnActionMode(){
	// console.log('changeHeaderHrefBasedOnActionMode');
	$('#header #primary-menu ul li').each(function(){
		var ct = $(this);
		var actionMode = ct.attr('action-mode');
		var action = ct.attr('action');
		if( (actionMode != '' && actionMode.indexOf('draw') != -1) || actionMode == 'sidebar1' || actionMode == 'sidebar3' || actionMode == 'popup'){
			ct.find('a div').unwrap();
			ct.find('div').addClass('lnk');
		}
		else if(action == '' && !ct.hasClass('sub-menu')){
			if(ct.attr('id') != '0c915b2d-de36-4204-8de5-4b4ffdbf02af')
				ct.addClass('disabled');
			ct.find('a div').unwrap();
			ct.find('div').addClass('lnk');
		}
	});
};
$(window).load(function() {
	$('#ajax-loader').fadeOut();
	windowLoad();
	windowLoadResize();
	dashboardLoadSuccessTriggers();
})
$(window).resize(function() {
	windowResize();
	windowLoadResize();
});
$(document).ready(function(){
	$('[data-toggle="tooltip"]').tooltip();
	$("body").tooltip({ selector: '[data-toggle=tooltip]' });
    $('.dropdown-toggle').dropdown();

	$('.popover-window').popover({
	    html: true,
	    title : '',
		trigger: 'manual',
		placement: $(this).find('.popover-content').attr('placement'),
	    content: function () {
	        return $(this).find('.popover-content').html();
	    }
	}).click(function(e) {
	    $(this).popover('toggle');
		popoverSuccessTriggers();
		$('.top-bar .dialer .popover').removeClass('show').addClass('hide');
		$('.popover-window').not(this).popover('hide');
		// $('.top-bar .dialer .popover').removeClass('show').addClass('hide');
	    e.stopPropagation();
	});
	$('body').on('click', function (e) {
	    $('.popover-window').each(function () {
	        if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
	            $(this).popover('hide');
				$('body').removeClass('no-overflow');
	        }
	    });
	});
});
$(function() {
	//header class is changed when scroll ?! why ?! ---- this code for solving this unknown problem
    $(window).scroll(function() {    
		if($('.trigger-menu-item').hasClass('less'))
			$('#header').addClass('closeHeader');
		else if($('.trigger-menu-item').hasClass('more'))
			$('#header').addClass('openHeader');
    });
});


function contentDraw(contentOptions){	

	// contentOptions.Url
	// contentOptions.PostData
	// contentOptions.Action
	// contentOptions.ContainerSelector
	// contentOptions.TriggerButton1Selector
	// contentOptions.TriggerButton1ClickHandler
	// contentOptions.TriggerButton2Selector
	// contentOptions.TriggerButton2ClickHandler
	
    $('#ajax-loader').fadeIn();
	
	if(contentOptions.Debug) {
		console.log(contentOptions.Url);
		console.log(contentOptions.PostData);
	}
    $.post(contentOptions.Url, contentOptions.PostData, function(data) {
    })
    .success(function(data){
		switch(contentOptions.Action) {
			case 'appendJson':	
				var dataString =  JSON.stringify(data);	
				$(contentOptions.ContainerSelector).html('');	
				$(contentOptions.ContainerSelector).append(dataString);  // add data to table	
				break;	
			case 'clearANDappend':
				$(contentOptions.ContainerSelector).html('');
				$(contentOptions.ContainerSelector).append(data);
				break;
			case 'replace':
				$(contentOptions.ContainerSelector).replaceWith(data); // replace specific row
				break;
			case 'appendBefore':
				$(contentOptions.ContainerSelector).before(data); // replace specific row
				break;
			case 'appendAfter':
				$(contentOptions.ContainerSelector).after(data); // replace specific row
				break;
			default:
			case 'append':
				$(contentOptions.ContainerSelector).append(data);  // add data to table
				break;
		}
		
		
		var $form = $(contentOptions.ContainerSelector).find('form');
		if($form.find('.input-html-group').length > 0){
			$form.find('.input-html-group input, .input-html-group textarea').each(function(){
				if($(this).val() != '')
					$(this).val(_htmlDecode($(this).val()));
			})
		}
		
		/* if(contentOptions.TriggerButton1Selector) {
			$(contentOptions.TriggerButton1Selector).unbind('click');
			$(contentOptions.TriggerButton1Selector).click(contentOptions.TriggerButton1ClickHandler);
		}
		if(contentOptions.TriggerButton2Selector) {
			$(contentOptions.TriggerButton2Selector).unbind('click');
			$(contentOptions.TriggerButton2Selector).click(contentOptions.TriggerButton2ClickHandler);
		}
		if(contentOptions.TriggerButton3Selector) {
			$(contentOptions.TriggerButton3Selector).unbind('click');
			$(contentOptions.TriggerButton3Selector).click(contentOptions.TriggerButton3ClickHandler);
		} */
		
		if (contentOptions.SuccessTriggerEvent)
			contentOptions.SuccessTriggerEvent();

		if(contentOptions.SuccessFunction)
			contentOptions.SuccessFunction(contentOptions, data);
		
		if($(contentOptions.ContainerSelector).find('.tabs').length == 1){
			if( $(contentOptions.ContainerSelector).find('.tabs .nav li') ) {
				if( $(contentOptions.ContainerSelector).find('.tabs .nav li').filter(function() {return $(this).hasClass('active') }).length == 0 && $(contentOptions.ContainerSelector).find('.tabs .tab-content .tab-pane').filter(function() {return $(this).hasClass('active') }).length == 0)
					$(contentOptions.ContainerSelector).find('.tabs .nav li:first-child, .tabs .tab-content .tab-pane:first-child').addClass('active');
				$(contentOptions.ContainerSelector).find('.tabs .nav li').click(function() {
					if(!$(this).hasClass('disabled')){
						$(contentOptions.ContainerSelector).find('.tabs ul li.active').removeClass('active');
						$(contentOptions.ContainerSelector).find('.tabs .tab-content .tab-pane.active').removeClass('active');
						$(this).addClass('active');
						$(contentOptions.ContainerSelector).find('.tabs .tab-content .tab-pane[id=tabs-' + $(this).attr('type') + ']').addClass('active');
					}
				});
			}
		}
		
    })
    .fail(function(xhr, status, error) {
		console.log(xhr);
		console.log(status);
		console.log(error);
    })
    .always(function() {
		$('#ajax-loader').fadeOut();
		
		if (contentOptions.alwaysFunction)
			contentOptions.alwaysFunction();
		
		if (contentOptions.alwaysFunction1)
			contentOptions.alwaysFunction1(contentOptions);
		
		/* if(contentOptions.alwaysFunctionExist == true){
			if(contentOptions.formButtonAlwaysSelector){
				$(contentOptions.formButtonAlwaysSelector).click(contentOptions.formButtonAlwaysClickHandler);
			}
			else{
				if (contentOptions.formButtonAlwaysClickHandler)
					contentOptions.formButtonAlwaysClickHandler();
			}
			console.log('alwaysFunctionExist '+contentOptions.alwaysFunctionExist);
		} 
		else{
			console.log('alwaysFunctionExist '+contentOptions.alwaysFunctionExist);
		} */
    });  
}
function modalDraw(options){	// Step#1 action for button to open form in modal

	// options.modalKey
	// options.formUrl
	// options.formPostData
	// options.formContainerSelector
	// options.formButtonSaveSelector
	// options.formButtonSaveClickHandler
	// options.formButtonCancelSelector
	// options.formButtonCancelClickHandler
	// options.SaveUrl
	// options.SaveAction
	// options.SaveContainerSelector
	// options.TriggerButton1Selector
	// options.TriggerButton1ClickHandler
	// options.TriggerButton2Selector
	// options.TriggerButton2ClickHandler
	
    $('#ajax-loader').fadeIn();
    //$('#modalPopUpBg').fadeIn();
	
	//var modalOpenObj = {};
	//modalOpenObj.url = options.formUrl;
	//modalOpenObj.container = options.SaveContainerSelector;
	//modalOpenObj.action = options.SaveAction;
	modalsOpened[options.modalKey] = options;
	
    $.post(options.formUrl, options.formPostData, function(data){
    })
    .success(function(data){ 
        
		/* $(options.formContainerSelector).addClass('modalPopUp');
        $('.modalPopUp').fadeIn(); */
		openModalPopup();
		
		var findInnerDiv = $(options.formContainerSelector).html();
		if(!findInnerDiv){
			$(options.formContainerSelector).html(data);
		}
		else{
			$(options.formContainerSelector).find('.modalPopUpContainer').html(data);
		}
		
		var btn = $(options.formButtonSaveSelector);
		var $form = btn.parents('form:first');
		if($form.find('.input-html-group').length > 0){
			$form.find('.input-html-group input, .input-html-group textarea').each(function(){
				if($(this).val() != '')
					$(this).val(_htmlDecode($(this).val()));
			})
		}
				
		if(options.formButtonSaveSelector)
			$(options.formButtonSaveSelector).click(options.formButtonSaveClickHandler);

		if(options.formButtonCancelSelector)
			$(options.formButtonCancelSelector).click(options.formButtonCancelClickHandler);
		
		if(options.formButton1Selector)
			$(options.formButton1Selector).click(options.formButton1ClickHandler);
		
		// if(options.formButtonNewClientSelector)
			// $(options.formButtonNewClientSelector).click(options.formButtonNewClientClickHandler);

     })
    .fail(function(xhr, textStatus, error) {
		console.log( "error" );
		console.log('xhr= '+xhr.statusText);
		console.log('textStatus= '+textStatus);
		console.log('error= '+error);
	})
    .always(function() {
		$('#ajax-loader').fadeOut();
		
		if($('.modalPopUpContainer #popUp-tabs').length == 1){
			$('.modalPopUpContainer #popUp-tabs .nav li').click(function() {
				if(!$(this).hasClass('disabled')){
					$('.modalPopUpContainer #popUp-tabs ul li.active, .modalPopUpContainer #popUp-tabs .tab-content .tab-pane.active').removeClass('active');
					$(this).addClass('active');
					$('.modalPopUpContainer #popUp-tabs .tab-content .tab-pane[id=tabs-' + $(this).attr('type') + ']').addClass('active');
				}
			});
		}
		
		if (options.alwaysFunction)
			options.alwaysFunction();
		
		if (options.alwaysFunction1)
			options.alwaysFunction1(options);
		
		/* if(options.alwaysFunctionExist == true){
			if(options.formButtonAlwaysSelector){
				$(options.formButtonAlwaysSelector).click(options.formButtonAlwaysClickHandler);
			}else{
				options.formButtonAlwaysClickHandler();
			}
			console.log('alwaysFunctionExist '+options.alwaysFunctionExist);
		}else{
			console.log('alwaysFunctionExist '+options.alwaysFunctionExist);
		} */
    });   
}
function modalCloseFormJsonSave(modalKey) {		// Step#2 action of save button in form dynamically drawed in modal

    $('#ajax-loader').fadeIn();
	
	var options = modalsOpened[modalKey];
	// options.modalKey
	// options.formUrl
	// options.formPostData
	// options.formContainerSelector
	// options.formButtonSaveSelector
	// options.formButtonSaveClickHandler
	// options.formButtonCancelSelector
	// options.formButtonCancelClickHandler
	// options.SaveUrl
	// options.SaveAction
	// options.SaveContainerSelector
	// options.TriggerButton1Selector
	// options.TriggerButton1ClickHandler
	// options.TriggerButton2Selector
	// options.TriggerButton2ClickHandler
	
	// var modalOpenObj = modalsOpened[modalKey];
	// modalOpenObj.url = formUrl;
	// modalOpenObj.container = formResultPlace;
	// modalOpenObj.action = formResultAction;
	// modalOpenObj = modalsOpened[modalKey];
	
	var stop = false;
	
	var btn = $(options.formButtonSaveSelector);
	var $form = btn.parents('form:first'); //$("#"+formId);
	if($form.find('.input-html-group').length > 0){
		$form.find('.input-html-group input, .input-html-group textarea').each(function(){
			if($(this).val() != ''){
				/* console.log('Encoding -------------------------');
				console.log(_htmlEncode($(this).val())); */
				$(this).val(_htmlEncode($(this).val()));
			}
		})
	}
	
	var jsonData = getFormData($form);

	$(options.formButtonSaveSelector).attr('disabled', 'disabled');
	
	// Reinitialize Validation because form added dynamically
    $form.removeData('validator');
    $form.removeData('unobtrusiveValidation');
    $.validator.unobtrusive.parse($form);

	// Check Form is valid	
	if(!$form.valid()) {
		btn.removeAttr('disabled');
		console.log('validation error');
		$('#ajax-loader').fadeOut();
		if($form.find('.validSummery').length > 0){
			$form.find('.validSummery').html('');
			$form.find('.field-validation-error').each(function(){
				if($(this).find('span').length > 0){
					var inputValidTxt = $(this).parent().find('label').text().replace(':','')
					$form.find('.validSummery').append('<div>* الرجاء ادخال '+ inputValidTxt +'</div>')
				}
			});
		}
		return false;
	}
	
	// Push Button Value as submited as normal from mvc
	jsonData[btn.attr("name")] = btn.attr("value");
    $.post(	options.SaveUrl, jsonData, function(data){
    })
    .success(function(data){
		console.log('data= '+data);
		// Same Form Server Side Validation: form not cleared
		if(data.indexOf("<form ") != -1 && data.indexOf("id=\""+$form.attr("id")+"\" ") != -1) {
			
			
			var findInnerDiv = $(options.formContainerSelector).html();
			if(!findInnerDiv){
				$(options.formContainerSelector).html(data);
			}
			else{
				$(options.formContainerSelector).find('.modalPopUpContainer').html(data);
			}
			//$(options.formContainerSelector).html(data);
			$(options.formButtonSaveSelector).click(options.formButtonSaveClickHandler);
			$(options.formButtonCancelSelector).click(options.formButtonCancelClickHandler);
			return false;
		}
		else {
			// Add html (post result) to body
			switch(options.SaveAction) {
				case 'edit':
					if($('tr').hasClass('noDataRow'))
						$('tr.noDataRow').replaceWith('');
					$(options.SaveContainerSelector).replaceWith(data); // replace specific row
					break;
				case 'replaceNew':
					options.SuccessFunction(options, data);
					break;
				case 'add-first':
					$(options.SaveContainerSelector).before(data);// replace new specific row
					break;
				default:
				case 'add':
					if($('tr').hasClass('noDataRow'))
						$('tr.noDataRow').replaceWith('');
					$(options.SaveContainerSelector).append(data);  // add data to table
					break;
			}
			// Add click event to new dynamically added triggers
			/* if(options.TriggerButton1Selector) {
				$(options.TriggerButton1Selector).unbind('click');
				$(options.TriggerButton1Selector).click(options.TriggerButton1ClickHandler);
			}

			if(options.TriggerButton2Selector) {
				$(options.TriggerButton2Selector).unbind('click');
				$(options.TriggerButton2Selector).click(options.TriggerButton2ClickHandler);
			} */
			
			if(options.TriggerButton3Selector) {
				$(options.TriggerButton3Selector).unbind('click');
				$(options.TriggerButton3Selector).click(options.TriggerButton3ClickHandler);
			}
			
			if (options.SuccessTriggerEvent)
				options.SuccessTriggerEvent();
			
			modalClose();
			return false;	
			
		}
    })
	.fail(function(xhr, textStatus, error) {
			console.log( "error" );
			console.log('xhr= '+xhr.statusText);
			console.log('textStatus= '+textStatus);
			console.log('error= '+error);		
    })
	.always(function() {
		$('#ajax-loader').fadeOut();
		
		if (options.modalCloseFormSaveAlwaysFunction)
			options.modalCloseFormSaveAlwaysFunction(options);
		
		if (options.modalCloseFormSaveAlwaysFunction2)
			options.modalCloseFormSaveAlwaysFunction2(options);
		
		if(options.alwaysFunctionAfterSaveExist == true){
			if(options.formButtonAlwaysSelector){
				$(options.formButtonAlwaysSelector).click(options.formButtonAlwaysClickHandlerAfterSave);
			}else{
				options.formButtonAlwaysClickHandlerAfterSave();
			}
			console.log('alwaysFunctionExist '+options.alwaysFunctionAfterSaveExist);
		}else{
			console.log('alwaysFunctionExist '+options.alwaysFunctionAfterSaveExist);
		}
    });
}

function modalCancelForm(modalKey){
	var options = modalsOpened[modalKey];
	
	if (options.modalCancelFunction)
		options.modalCancelFunction(options);
}

function postFormDownload(options) {
	
    $('#ajax-loader').fadeIn();
	
	if (options.modalKey)
		modalsOpened[options.modalKey] = options;
	
	// options.modalKey
	// options.resultsUrl
	// options.resultsContainerSelector
	// options.PostData
	
	var btn = null;
	
	if(options.btn == null && event != undefined && event != null)
		btn = $(event.currentTarget);
	
	if(btn == null && options.btn != null)
		btn = $(options.btn);
	
	if(btn == null)
		alert("Form Post Button is null");
	
	//if(btn.html() == undefined)
	//	btn = $(options.btn);
	
	var $form = btn.parents('form:first'); //$("#"+formId);
	
	var jsonData = [];
	if($form)
	{
		jsonData = getFormData($form);

		// Reinitialize Validation because form added dynamically
		$form.removeData('validator');
		$form.removeData('unobtrusiveValidation');
		$.validator.unobtrusive.parse($form);
		
		// Check Form is valid	
		if($form.form && !$form.valid()) {
			console.log('validation error');
			$('#ajax-loader').fadeOut();
			return false;
		}
	}
	// Push Button Value as submited as normal from mvc
	jsonData[btn.attr("name")] = btn.attr("value");
	
	if(!options.resultsUrl) {
		alert("Options error");
		return false;
	}
	//console.log('contentOptions.resultsUrl: ' + options.resultsUrl);
    $.post(	options.resultsUrl, jsonData, function(data){
    })
	.success(function(data){
		console.log('data = ' + data);
		
		// Same Form Server Side Validation: form not cleared
		if(data.indexOf("<form ") != -1 && data.indexOf("id=\""+$form.attr("id")+"\" ") != -1) {
			alert("server side validation error");
			return false;
		}
		else {
		
			if (!options.downloadFile)
				options.downloadFile = 'file-name.xls'

			var blob = new Blob([data]);
			var link = document.createElement('a');
			link.href = window.URL.createObjectURL(blob);
			link.download = options.downloadFile;
			link.click();

			// $("body").append("<iframe src='" + options.resultsUrl+ "' style='display: none;' ></iframe>");
			return false;	
		}
    })
	.fail(function(xhr, textStatus, error) {
		console.log('error');
		console.log('xhr= '+xhr.statusText);
		console.log('textStatus= '+textStatus);
		console.log('error= '+error);
			
    })
	.always(function() {
		$('#ajax-loader').fadeOut();
    });   
}
// Usage: post data search form to results page
function contentDrawPostFormRev2(options) {	
    $('#ajax-loader').fadeIn();
	
	if (options.modalKey)
		modalsOpened[options.modalKey] = options;
	
	// options.modalKey
	// options.resultsUrl
	// options.resultsContainerSelector
	// options.PostData
	
	var stop = false;	
	/* if(options.eventCustom != undefined && options.eventCustom != null)
		event = options.eventCustom; */

	var btn = null;
	if(options.btn == null && event != undefined && event != null)
		btn = $(event.currentTarget);
	
	if(btn == null && options.btn != null)
		btn = $(options.btn);
	
	if(btn == null)
		alert("Form Post Button is null");
	
	//if(btn.html() == undefined)
	//	btn = $(options.btn);
	
	var $form = btn.parents('form:first'); //$("#"+formId);
	if($form.find('.input-html-group').length > 0){
		$form.find('.input-html-group input, .input-html-group textarea').each(function(){
			if($(this).val() != ''){
				/* console.log('Encoding -------------------------');
				console.log(_htmlEncode($(this).val())); */
				$(this).val(_htmlEncode($(this).val()));
			}
		})
	}
	
	var jsonData = [];
	if($form)
	{
		jsonData = getFormData($form);

		// Reinitialize Validation because form added dynamically
		$form.removeData('validator');
		$form.removeData('unobtrusiveValidation');
		$.validator.unobtrusive.parse($form);
		
		// Check Form is valid	
		if($form.form && !$form.valid()) {
			console.log('validation error');
			$('#ajax-loader').fadeOut();
			return false;
		}
	}
	// Push Button Value as submited as normal from mvc
	jsonData[btn.attr("name")] = btn.attr("value");
	
	if(!options.resultsUrl) {
		alert("Options error");
		return false;
	}
	
    /* var xhr;
	console.log(xhr)
	if(xhr && xhr.readyState != 4)
		xhr.abort();
    xhr =  */
	$.post(options.resultsUrl, jsonData, function(data){
    })
	.success(function(data){
		console.log('data = ' + data);
		
		// Same Form Server Side Validation: form not cleared
		if(data.indexOf("<form ") != -1 && data.indexOf("id=\""+$form.attr("id")+"\" ") != -1) {
			alert("server side validation error");
			return false;
		}
		else {
			
			if(options.SuccessFunction)
				options.SuccessFunction(options, data);
			
			// Add html (post result) to body
			if(options.resultsContainerSelector)
				$(options.resultsContainerSelector).replaceWith(data); // replace specific row
			
			if(options.resultsContainerSelectorAdd){
				$(options.resultsContainerSelectorAdd).append(data); // add specific row
			}
			
			if(options.resultsContainerSelectorClearAndAppend){
				$(options.resultsContainerSelectorClearAndAppend).html('');
				$(options.resultsContainerSelectorClearAndAppend).append(data); // add specific row
			}
			
			// remove html (post result) to body
			if(options.deleteResultSelector)
				$(options.deleteResultSelector).replaceWith('');
			
			// Add click event to new dynamically added triggers
			if (options.SuccessTriggerEvent)
				options.SuccessTriggerEvent();
			
			return false;	
		}
    })
	.fail(function(xhr, textStatus, error) {
		console.log('error');
		console.log('xhr= '+xhr.statusText);
		console.log('textStatus= '+textStatus);
		console.log('error= '+error);
    })
	.always(function() {
		$('#ajax-loader').fadeOut();

		if (options.alwaysFunction)
			options.alwaysFunction();
		
		if (options.alwaysFunction1)
			options.alwaysFunction1(options);
		
		/* if(options.alwaysFunctionExist == true){
			if(options.formButtonAlwaysSelector){
				$(options.formButtonAlwaysSelector).click(options.formButtonAlwaysClickHandler);
			}
			else{
				if (options.formButtonAlwaysClickHandler)
					options.formButtonAlwaysClickHandler();
			}
			console.log('alwaysFunctionExist '+options.alwaysFunctionExist);
		}
		else{
			console.log('alwaysFunctionExist '+options.alwaysFunctionExist);
		} */
    });   
}
function contentDrawPostForm(contentDrawPostFormOptions) {	

	if (contentDrawPostFormOptions.modalKey)
		modalsOpened[contentDrawPostFormOptions.modalKey] = contentDrawPostFormOptions;

	var btn = null;
	if(contentDrawPostFormOptions.btn == null && event != undefined && event != null)
		btn = $(event.currentTarget);
	
	if(btn == null && contentDrawPostFormOptions.btn != null)
		btn = $(contentDrawPostFormOptions.btn);
	
	if(btn == null)
		alert("Form Post Button is null");
	
	var options = {};
	options.modalKey = contentDrawPostFormOptions.modalKey;
	options.url = contentDrawPostFormOptions.resultsUrl;
	options.formBtn = contentDrawPostFormOptions.btn;
	options.type = "POST";
	if(contentDrawPostFormOptions.requestKey)
		options.requestKey = contentDrawPostFormOptions.requestKey;

    if(contentDrawPostFormOptions.btn &&  $.type(contentDrawPostFormOptions.btn) === "string") // fix btn send as selector instead of object
        contentDrawPostFormOptions.btn = $(contentDrawPostFormOptions.btn);

	if(contentDrawPostFormOptions.btn && contentDrawPostFormOptions.btn.hasClass('pagingSearch'))
		options.formValidate = false;
	
	options.done = function(options){
		if(contentDrawPostFormOptions.SuccessFunction)
			contentDrawPostFormOptions.SuccessFunction(contentDrawPostFormOptions, options.paramData);
		
		if(contentDrawPostFormOptions.resultsContainerSelector)
			$(contentDrawPostFormOptions.resultsContainerSelector).replaceWith(options.paramData); // replace specific row
		
		if(contentDrawPostFormOptions.resultsContainerSelectorAdd){
			$(contentDrawPostFormOptions.resultsContainerSelectorAdd).append(options.paramData); // add specific row
		}
		
		if(contentDrawPostFormOptions.resultsContainerSelectorClearAndAppend){
			$(contentDrawPostFormOptions.resultsContainerSelectorClearAndAppend).html('');
			$(contentDrawPostFormOptions.resultsContainerSelectorClearAndAppend).append(options.paramData); // add specific row
		}
		
		// remove html (post result) to body
		if(contentDrawPostFormOptions.deleteResultSelector)
			$(contentDrawPostFormOptions.deleteResultSelector).replaceWith('');
		
		// Add click event to new dynamically added triggers
		if (contentDrawPostFormOptions.SuccessTriggerEvent)
			contentDrawPostFormOptions.SuccessTriggerEvent();
	};
	options.always = function(){
		if (contentDrawPostFormOptions.alwaysFunction)
			contentDrawPostFormOptions.alwaysFunction();
		
		if (contentDrawPostFormOptions.alwaysFunction1)
			contentDrawPostFormOptions.alwaysFunction1(contentDrawPostFormOptions);
	};
	_ertaqyAjax(options);
};
/* Modal Objects */
var modalsOpened = {};

/* Content Save */
function contentSave(contentOptions){	

	// contentOptions.Url
	// contentOptions.PostData
	// contentOptions.ContainerSelector
	
    $('#ajax-loader').fadeIn();
    //$('#modalPopUpBg').fadeIn();

	//modalsOpened[contentOptions.modalKey] = contentOptions;
	//console.log(modalsOpened);
	
    $.post(contentOptions.Url, contentOptions.PostData, function(data) {
    })
    .success(function(data){ 
		var dataIndexed = {};
		$.map(data, function(n, i){
			dataIndexed[n['name']] = n['value'];
		});
		
		if(dataIndexed["result"] === 'success' || dataIndexed["النتيجة"] === 'تم'){
			alertSuccessMessage(dataIndexed);
		}
		else if(dataIndexed["result"] === 'failure' || dataIndexed["النتيجة"] === 'فشل'){
			alertFailureMessage(dataIndexed);
		}
		
		$(contentOptions.ContainerSelector).replaceWith(dataIndexed["message"]); // replace specific row
    })
    .fail(function(xhr, textStatus, error) {
		console.log(xhr);
		console.log( "error" );
		console.log(xhr.statusText);
		console.log(textStatus);
		console.log(error);
    })
    .always(function() {
		$('#ajax-loader').fadeOut();
    });  
}

/* Modal Draw DeleteFunctions */
function modalDrawDelete(deleteOptions){	// Step#1 action for delete button to open modal delet with yes or no
	
	// deleteOptions.modalKey
	// deleteOptions.deleteUrl
	// deleteOptions.deletePostData
	// deleteOptions.deleteContainerSelectorPopup
	// deleteOptions.deleteButtonDeleteSelector
	// deleteOptions.deleteButtonDeleteClickHandler
	// deleteOptions.deleteButtonCancelSelector
	// deleteOptions.deleteButtonCancelClickHandler
	// deleteOptions.deleteContainerSelector
	// deleteOptions.saveActionSelector


	
    //$('#ajax-loader').fadeIn();
    $('#modalPopUpBg').fadeIn();
	openDeleteModalPopup();
	//var modalOpenObj = {};
	//modalOpenObj.url = deleteOptions.deleteUrl;
	//modalOpenObj.container = deleteOptions.deleteContainerSelector;
	//modalOpenObj.action = deleteOptions.SaveAction;
	modalsOpened[deleteOptions.modalKey] = deleteOptions;
	
	$(deleteOptions.deleteContainerSelectorPopup).addClass('modalPopUp');
		
    //$('.modalPopUp').fadeIn();
	
	var $events = jQuery._data(jQuery(deleteOptions.deleteButtonDeleteSelector)[0], "events" );
	
	if(typeof $events != "undefined"){
		$(deleteOptions.deleteButtonDeleteSelector).unbind();
	if(deleteOptions.deleteButtonDeleteSelector)
		$(deleteOptions.deleteButtonDeleteSelector).click(deleteOptions.deleteButtonDeleteClickHandler);
		
	}
	else{
		if(deleteOptions.deleteButtonDeleteSelector)
			$(deleteOptions.deleteButtonDeleteSelector).click(deleteOptions.deleteButtonDeleteClickHandler);
	}
			
	if(deleteOptions.deleteButtonCancelSelector)
		$(deleteOptions.deleteButtonCancelSelector).click(deleteOptions.deleteButtonCancelClickHandler);
	
	$(deleteOptions.deleteButtonDeleteSelector).focus();
	$('.deleteModalPopUpContainer').keydown(function (e) {
		if(e.which == 27)  // the escape key code
			deleteOptions.deleteButtonCancelClickHandler();
	});   
}
function modalDeleteClose(modalKey) {		// Step#2 action of confirm delete button in delete modal

    $('#ajax-loader').fadeIn();
	
	var deleteOptions = modalsOpened[modalKey];

	// Push Button Value as submited as normal from mvc
	//jsonData[btn.attr("name")] = btn.attr("value");
	
    $.post(	deleteOptions.deleteUrl, deleteOptions.deletePostData, function(data){

    })
    .success(function(data){
		// Draw no data if last record
		var table = $(deleteOptions.deleteContainerSelector).closest('table tbody');
		var tableLength = $(table).find('tr').length;
		if(tableLength > 1){
			//$('.noDataRow').css('display','none');
			$(table).find('.noDataRow').replaceWith('');
		}
		else{
			//$('.noDataRow').css('display','table-row');
			if($('body').hasClass('rtl'))
				$(table).append('<tr class="noDataRow center"><td colspan="20">لا يوجد</td></tr>');
			else
				$(table).append('<tr class="noDataRow center"><td colspan="20">No Data</td></tr>');
		}
		
		// Delete html 
		
		$(deleteOptions.deleteContainerSelector).replaceWith(''); 
		
		if(deleteOptions.SuccessFunction)
			deleteOptions.SuccessFunction(deleteOptions);
			
		var dataIndexed = {};
		$.map(data, function(n, i){
			dataIndexed[n['name']] = n['value'];
		});
		
		// Hide for popup
		$('.modalPopUp').fadeOut();

		if(dataIndexed["result"] === 'success' || dataIndexed["النتيجة"] === 'تم')
			alertSuccessMessage(dataIndexed);
		else if(dataIndexed["result"] === 'failure' || dataIndexed["النتيجة"] === 'فشل')
			alertFailureMessage(dataIndexed);
	
		// Appear msg		
		/* $('.sb-msg p').replaceWith();
		$('.successmsgContainer').fadeIn();
		if($('body').hasClass('rtl'))
			$('.sb-msg').append('<p>'+ dataIndexed["message"]+'</p>'); 
		else
			$('.sb-msg').append('<p>'+ dataIndexed["message"]+'</p>');  */
		
		modelIsClosed = false;

		
		/* $('.deleteDetailsMsgCancel').click(function () {
			modalClose();
		}); */
		
		setTimeout( function(){ 
			modalCloseCheckFirst();
		}  , 500 );
		
		return false;
		
    })
    .fail(function(xhr, textStatus, error) {
		console.log(xhr.statusText);
		console.log(textStatus);
		console.log(error);			
    })
    .always(function() {
		$('#ajax-loader').fadeOut();
		if (deleteOptions.modalDeleteCloseSaveAlwaysFunction)
			deleteOptions.modalDeleteCloseSaveAlwaysFunction(deleteOptions);
	
		if (deleteOptions.modalDeleteCloseSaveAlwaysFunction2)
			deleteOptions.modalDeleteCloseSaveAlwaysFunction2(deleteOptions);
    });
}
var modelIsClosed = false;
/* Modal Close Functions */
var modalClose = function(){
	modelIsClosed = true;
	
	if($('.modalPopUp').find('div').hasClass('modalPopUpContainer')){
		$('.modalPopUp .modalPopUpContainer').html(''); 
	}
	else if($('.modalPopUp').find('div').hasClass('deleteModalPopUpContainer')){
		//do nothing
	}
	else{
		$('.modalPopUp').html('');
	}
	setTimeout(function(){
		$('.formModal .modalPopUpContainer').attr('class', 'modalPopUpContainer'); 
	}, 450);
	//$('.modalPopUp').css('display','none');
	$('.modalPopUp').fadeOut();
	$('.modalPopUp').removeClass('modalPopUp');	
    $('#modalPopUpBg').fadeOut();
	
	/* $('.successmsgContainer').fadeOut();
	$('.sb-msg p').replaceWith(''); */
}
function modalCloseCheckFirst(){	// Close Modal but check first if is closed before manually
	if(modelIsClosed) 
		return;
	else
		modalClose();
}
function alertSuccessMessage(dataIndexed, message, time){	// Close Modal but check first if is closed before manually
	if(message == undefined)
		message = dataIndexed["message"];
	
	var msgBody = $("<li class='alertSuccessMsgContainer alertMsg'>"+
						"<div class='style-msg successmsg'>"+
							"<div class='sb-msg'><p>" + message + "</p></div>"+
							"<button type='button' class='alertClose'>×</button>"+
						"</div>"+
					"</li>"); 
			
	if($('.alertMsgsContainer').find('.alertSuccessMsgContainer').length == 0)
		$('.alertMsgsContainer').append(msgBody);
		
	$('.alertSuccessMsgContainer .alertClose').click(function () {
		$(this).closest('.alertMsg').replaceWith('');
	});
	
	if(time == undefined || time == '')
		time = 3000;
	setTimeout( function(){ 
		msgBody.replaceWith('');
	}  , time ); 
}
function alertFailureMessage(dataIndexed, message, time){	// Close Modal but check first if is closed before manually
	if(message == undefined)
		message = dataIndexed["message"];
	
	var msgBody = $("<li class='alertFailureMsgContainer alertMsg'>"+
							"<div class='style-msg errormsg'>"+
								"<div class='sb-msg'><p>" + message + "</p></div>"+
								"<button type='button' class='alertClose'>×</button>"+
							"</div>"+
						"</li>"); 
						
	if($('.alertMsgsContainer').find('.alertFailureMsgContainer').length == 0)
		$('.alertMsgsContainer').append(msgBody);
		
	$('.alertFailureMsgContainer .alertClose').click(function () {
		$(this).closest('.alertMsg').replaceWith('');
	});
	
	if(time == undefined || time == '')
		time = 3000;
	setTimeout( function(){ 
		msgBody.replaceWith('');
	}  , time ); 
}
/*--------------------- Nestable START ------------------*/
var _nestableObjects = {
//  "1" : false,
//  "2" : true,
//  "3" : false
};
// Keep call nestable before init
function _nestableInit(nestObj, nestId) {		// Store current values
	if (!nestObj) return;
	if (!nestId && nestObj.id) nestId = nestObj.id
	_nestableObjects[nestId] = _nestableChangeToArray(nestObj.nestable('serialize'));
	
	/* console.log('_nestableInit:');
	console.log(nestObj);
	console.log(_nestableObjects[nestId]); */
}
var _nestableChangeSkip = false;
function _nestableChange(e, nestObj, nestId) {	// detect if changes in values and request save page

	if(_nestableChangeSkip) return;
	
	if (!nestObj) return;
	if (!nestId && nestObj.id) nestId = nestObj.id
	
	var arrOriginal = _nestableObjects[nestId];
	var arrNew = _nestableChangeToArray(nestObj.nestable('serialize'));
	
	var arrDiff = [];

	var array_item;
	
	// get Changes Updates between two arrays
	// get Deleted from arrNew compare to arrOrigjnal
	var arrNewItem;
    $.map(arrOriginal, function(o, x){
		arrNewItem = null;
		$.map(arrNew, function(n, y){
			if(o.id == n.id) { // get Updates
				arrNewItem = n;
			}
		});	
		
		if(arrNewItem) {// found
			if(o.arrange != arrNewItem.arrange || o.parent_id != arrNewItem.parent_id) {
				arrNewItem['action'] = 'update';
				arrDiff.push(arrNewItem);
			}
		}
		else { // not found: deleted from arrNew
			arrNewItem = o;
			arrNewItem['action'] = 'delete';
			arrDiff.push(arrNewItem);
		}
    });	
	
	// get new added to arrNew
	var found = false;
	$.map(arrNew, function(n, y) {
		found = false;
		$.map(arrOriginal, function(o, x) {
			if(o.id == n.id) { // get Updates
				found = true;
			}
		});
		
		if(!found) { // not found: new added
			arrNewItem = n;
			arrNewItem['action'] = 'add';
			arrDiff.push(arrNewItem);
		}
    });	

	var strDiff = '';
	var strSepta = ''
    $.map(arrDiff, function(n, i){
		strDiff = strDiff + strSepta + "{\"id\": \""+n.id+"\", \"parent_id\": \""+n.parent_id+"\", \"arrange\": \""+n.arrange+"\", \"action\": \""+n.action+"\"}";
		strSepta = ', ';
	});
	strDiff = "["+strDiff+"]";
	//console.log(arrDiff);
	//console.log(strDiff);
	
	return strDiff;
}
function _nestableChangeToArray(nest){

    var indexed_array = [];

	var array_item;
	var children;
	var overloop = 20; // maximum depth
	// console.log(nest);
    $.map(nest, function(n, i){
		array_item = {};
        array_item['id'] = n.id;
        array_item['parent_id'] = null;
        array_item['arrange'] = i + 1;
		indexed_array.push(array_item);
		if(n.children || overloop == 0)
			_nestableChangeToArray_Childs(n.children,indexed_array,n.id);
    });
	
	//console.log(indexed_array);
    return indexed_array;
}
function _nestableChangeToArray_Childs(children, addToArray, parent_id, overloop){

	var array_item = {};
	overloop = overloop - 1;
    $.map(children, function(n, i){
		array_item = {};
        array_item['id'] = n.id;
        array_item['parent_id'] = parent_id;
        array_item['arrange'] = i + 1;
		addToArray.push(array_item);
		if(n.children || overloop == 0)
			_nestableChangeToArray_Childs(n.children,addToArray,n.id);
    });	

}
var fileUploaderLoad = function(containerSelector, fileUploadSelectorId, parentType, parentId){
	var options = {};

	options.FileUploadSelectorId = fileUploadSelectorId;
	options.ParentId = parentId;
	options.ParentType = parentType;
	options.ContainerSelector = containerSelector;		
	uploadFiles(options);
};
/*--------------------- Nestable END ------------------*/




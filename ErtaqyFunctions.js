async function _ertaqyAjax(options) {
	
	// options.modalKey		to get options again after open the modal
	// options.type			POST, GET
	// options.url			REQUIRED

	// options.formBtn		If simulate submit form
	// options.formBtnName		If simulate submit form
	// options.formBtnValue		If simulate submit form
	
	// options.data				ex. JSON.stringify( { "key":"value1" } ) only if json
	// options.cache		default false
	// options.async		default true
	// options.crossDomain	default false
	// options.crossDomainErtaqy	default false
	// options.withCredentials	default false
	// options.dataType		default html
	// options.contentType	application/x-www-form-urlencoded; charset=UTF-8
	// options.beforeSend	function(xhr)

	// options.requestKey	will abort previous request if found, default 'global-request'
	// options.event		event call this function
	// options.formValidate	default true
	
	// options.resultFuncAwait	use await in results function
	// options.done			function(options) 	result
		// options.success		function(options)
		// options.notValid		function(options)
	// options.error		function(options)	xhr, status, error) {
	// options.fail			function(options)	xhr, status, error ) {
	// options.always		function(options)
	
	
	if(options.event) {
		$(options.event.currentTarget).click(do_nothing); 
		setTimeout(function(){ $(options.event.currentTarget).unbind('click', do_nothing); }, 700);
	}
	
	if($('#ajax-loader').length == 0)
		$('body').append('<div id="ajax-loader"></div>');
	$('#ertaqy-chat-loader').length == 1 ? $('#ertaqy-chat-loader').fadeIn() : $('#ajax-loader').fadeIn();
	
	if(!options) alert("_ertaqyAjax options is not defined");
	if(options.url == undefined) {
		console.error("_ertaqyAjax options have no url");
		return;
	}
	else{		
		if(options.url.endsWith('?'))
			options.url = options.url.substring(0, options.url.length - 1)
		if(_getUrlQueryStrings()['sqltrace'] == '1' && options.url.indexOf('sqltrace=') == -1)
			options.url += (options.url.indexOf('?') == -1 ? '?' : '&' ) + 'sqltrace=1';
	}
	if(options.success == undefined) options.success = options.done; // till change all done to success

	if(options.resultFuncAwait == undefined) options.resultFuncAwait = true;

	if(options.data == undefined) options.data = null;
	if(options.requestKey == undefined) options.requestKey = 'global-request';

	if(options.type == undefined) options.type = "GET";
	if(options.cache == undefined) options.cache = false;
	if(options.async == undefined) options.async = true;
	if(options.crossDomain == undefined) options.crossDomain = false;
	if(options.withCredentials == undefined) options.withCredentials = false;
	if(options.dataType == undefined) options.dataType = "html"; //"json";
	if(options.contentType == undefined) options.contentType = "application/x-www-form-urlencoded; charset=UTF-8"; //"application/json"
	if(options.formValidate == undefined) options.formValidate = true;
	
	if (options.modalKey && options.modalKey != null && options.modalKey != undefined && options.modalKey != '')
		_ertaqyModalsOpened[options.modalKey] = options;

	if(options.crossDomain && options.crossDomain && options.crossDomainErtaqy && options.beforeSend == undefined) {
		options.beforeSend = function(xhr) {
			if($.cookie('_AUI') != undefined)
				xhr.setRequestHeader("ertaqy-aui", $.cookie('_AUI'));
			if($.cookie('_AUF') != undefined)
				xhr.setRequestHeader("ertaqy-auf", $.cookie('_AUF'));
			if($.cookie('_ISL') != undefined)
				xhr.setRequestHeader("ertaqy-token", $.cookie('_ISL'));
			if($.cookie('_USR') != undefined)
				xhr.setRequestHeader("ertaqy-username", $.cookie('_USR'));
		}
	}

	if (options.log)
		console.log(options);
	
	if(options.type == 'POST' && options.formBtn) {
	
		var jsonData = {};
		
		// if(options.data) {
		//	alert ('data can not be set in post form');
		//	return false;
		// }
		
		var btn = $(options.formBtn);
		if(btn.length > 0) {
			var $form = btn.parents('form:first'); //$("#"+formId);
			if (!$form) {
				alert('form not found'); return false;
			}
			
			if($form.find('.input-html-group').length > 0){
				$form.find('.input-html-group input, .input-html-group textarea').each(function(){
					if ($(this).val() != '') {
						//console.log('Encoding -------------------------');
						//console.log(_htmlEncode($(this).val()));
						$(this).val(_htmlEncode($(this).val()));
					}
				})
			}
			
			jsonData = getFormData($form);
			btn.attr("disabled", true);
			
			// Reinitialize Validation because form added dynamically
			$form.removeData('validator');
			$form.removeData('unobtrusiveValidation');
			$.validator.unobtrusive.parse($form);
			
			
			var formIsValid = true;
			if(options.formValidate) {
				try {
					
					// set required to dynmaic checkBoxList
					$form.find('.form-control-cbl[required]').each(function(){
						var ct = $(this);
						if( (ct.parent().css('display') == 'block' || !ct.hasClass('hidden')) && ct.find('input[type="checkbox"]:checked').length == 0){
							if(ct.next().find('span').length == 0)
								ct.next().append('<span id="' + ct.next().attr('data-valmsg-for') + '-error" class="">' + ct.attr('data-val-required') + '</span>');
						}
					});
					
					// Fix inputs without name attribute, avoid form error
					$form.find('input:not([name])').each(function(){
						$(this).attr('name', $(this).attr('id'));
					});
					
					if($form && $form != undefined && $form.length > 0)
						formIsValid = $form.valid();
					
					if (!recaptcha_check($form))
						formIsValid = false;
					
					
				}
				catch(err) {
					formIsValid = true;
					console.log("Error in form: " + err.message);
				}
			}
			
			// Check Form is valid	
			if(options.formValidate && $form && $form != undefined && $form.length > 0 && !formIsValid) { // !$form.valid()
				btn.attr("disabled", false);
				if($form.hasClass('loading')){	
					$form.removeClass('loading');
					btn.find('i.fa-spinner').remove();
				}
				// console.log('validation error');
				$('#ertaqy-chat-loader').length == 1 ? $('#ertaqy-chat-loader').fadeOut() : $('#ajax-loader').fadeOut();
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
			
			// recaptcha is clicked
			if($form.find('.g-recaptcha').length == 1){
				var recaptcha = $form.find("#g-recaptcha-response").val();
				if (recaptcha === ""){
					btn.attr("disabled", false);
					return false;
				}
			}
			
			// Push Button Value as submited as normal from mvc
			jsonData[btn.attr("name")] = btn.attr("value");
		}
		if(options.formBtnName && options.formBtnValue)
			jsonData[options.formBtnName] = options.formBtnValue;
		
		if (!options.data) options.data = {};
		$.each(jsonData, function(key, value) {
			options.data[key] = value;
		});
		// options.data = jsonData;
		
	}

	var ajaxReqNew;
	var ajaxReqPrev;
	if(options.requestKey)	ajaxReqPrev = _ertaqyAjaxRequests[options.requestKey];

	ajaxReqNew = $.ajax({
		type: options.type,
		cache: options.cache,            
		async: options.async, 
		crossDomain: options.crossDomain,
		url: options.url,
		xhrFields: {
			withCredentials: options.withCredentials
		},
        headers: {
            "Accept": "*/*"
			// "application/json",
            // "Access-Control-Allow-Origin": "*" // '"' + _getUrlHost() + '"'// 
			// "Access-Control-Allow-Credentials": "true"
        },
		data: options.data,
		dataType: options.dataType,
		contentType: options.contentType,
		beforeSend: function(xhr) {
			
			if(_ertaqyAjaxCounts == 0) { //  || _ertaqyAjaxAlertSlowMsg == null
				// _ertaqyAjaxAlertSlowMsg = setTimeout(function(){$('.ertaqyAjaxSlowMsg').removeClass('hidden');}, 10000);
			}
			_ertaqyAjaxCounts++;

			if(btn) setTimeout( function(){btn.attr("disabled", false); }, 2000 ); // allow button again if loading takes time
			
			// Stop Previous Request with same requestKey
			if(ajaxReqPrev != undefined && ajaxReqPrev.readyState < 4){
				ajaxReqPrev.abort();
				$('#ertaqy-chat-loader').length == 1 ? $('#ertaqy-chat-loader').fadeIn() : $('#ajax-loader').fadeIn();
			}

			if(options.beforeSend)
				options.beforeSend(xhr);
		}
	})
	.done( function( data ) {
		
		if (options.log)
			console.log('data= ' + data);
		
		// Same Form Server Side Validation: form not cleared
		if (options.formBtn && data.indexOf("<form ") != -1 && $form != undefined && data.indexOf("id=\"" + $form.attr("id") + "\" ") != -1) {
			if (options.log) console.log('done but failed, modalKey: ' + options.modalKey);
			if (options.notValid && options.notValid!= null) {
				options.paramData = data;
				//if(options.resultFuncAwait && _isAsyncFunction(options.notValid))
				//	await options.notValid(options);
				//else
					options.notValid(options);
			}
			return false;
		}
		else {
			
			if (options.log) console.log('done success, modalKey: ' + options.modalKey);
			if (options.success && options.success != null) {
				options.paramData = data;
				//if(options.resultFuncAwait && _isAsyncFunction(options.success))
				//	await options.success(options);
				//else
					options.success(options);
			}
			
			if (options.downloadFile && options.downloadFile != '') {
				var blob = new Blob([data]);
				var link = document.createElement('a');
				link.href = window.URL.createObjectURL(blob);
				link.download = options.downloadFile;
				link.click();
			}
			
		}
	})
	.error( function (xhr, status, error) {
		if (options.error && options.error != null) {
			options.paramXhr = xhr;
			options.paramStatus = status;
			options.paramError = error;
			
			//if(options.resultFuncAwait && _isAsyncFunction(options.error))
			//	await options.error(options);
			//else
				options.error(options);
		}
	})
	.fail( function( xhr, status, error ) {
		if(options.fail && options.fail != null) {
			options.paramXhr = xhr;
			options.paramStatus = status;
			options.paramError = error;
			//if(options.resultFuncAwait && _isAsyncFunction(options.fail))
			//	await options.fail(options);
			//else
				options.fail(options);
		}		
	})
	.always( function() {
		
		_ertaqyAjaxCounts--;
		if (_ertaqyAjaxCounts == 0) { // lastone
			$('.ertaqyAjaxSlowMsg').addClass('hidden');
			clearTimeout(_ertaqyAjaxAlertSlowMsg);
			_ertaqyAjaxAlertSlowMsg = null;
		}
		
		$('#ertaqy-chat-loader').length == 1 ? $('#ertaqy-chat-loader').fadeOut() : $('#ajax-loader').fadeOut();

		if(btn) btn.attr("disabled", false);
		if(options.always && options.always != null) {
			//if(options.resultFuncAwait && _isAsyncFunction(options.always))
			//	await options.always(options);
			//else
				options.always(options);
		}

		if(options.requestKey)	delete _ertaqyAjaxRequests[options.requestKey]; // no need to call to abort again
		
	});
		
	
	// current request, to be checked next request if doublicated, before await when
	if(options.requestKey)	_ertaqyAjaxRequests[options.requestKey] = ajaxReqNew; // set current new ajaxRequest to allow abort in next call
	
	// await here instead of await ajax, to check dublicates in beforeStart
	await $.when(ajaxReqNew).done();
	
}
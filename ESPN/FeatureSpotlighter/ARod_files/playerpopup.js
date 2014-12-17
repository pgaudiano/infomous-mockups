jQuery(document).ready(function($){
	
	function addFaveHtml(langString) {
		if (langString == 'ES') {
			$('.player-popup-fave').html('<div class="player-popup-addfav-content"><a class="player-popup-addfav-btn" href="#"><img src="http://a.espncdn.com/prod/assets/worldcup2010/icon_plus_blue.png">&nbsp;&nbsp;miESPN</a></div>');
		} else {
			$('.player-popup-fave').html('<div class="player-popup-addfav-content"><a class="player-popup-addfav-btn" href="#"><span style="padding-right:2px;">+</span><img src="http://a2.espncdn.com/prod/assets/clubhouses/2010/logo_myespn_60x10.png" style="padding-top:1px;"></a></div>');
		}
		$('.player-popup-addfav-btn').click(function(){
			var sportId = $('.player-popup-fave').attr('sportId');
			var playerId = $('.player-popup-fave').attr('playerId');
			var langString = $('.player-popup-fave').attr('lang');
			var playerName = $('.player-popup-fave').attr('playerName');
			var sportName = $('.player-popup-fave').attr('sport');
			addPlayerPopupFave(sportId, playerId, langString);
			anTrackLink(this,'espn','playerpopup',sportName+'_playerId='+playerId+'_'+playerName+'_addfavorite_loggedin-add');
			return false;
		});			
		return false;
	}
	
	function isFaveHtml(langString) {
		var playerName = $('.player-popup-fave').attr('playerName');
		var playerId = $('.player-popup-fave').attr('playerId');
		var sportName = $('.player-popup-fave').attr('sport');
		if (langString == 'ES') {
			$('.player-popup-fave').html('<div class="player-popup-myfav-content"><a href="http://espn.go.com/personalization/index?language=es" name="&lpos=playerpopup&lid='+sportName+'_playerId='+playerId+'_'+playerName+'_addfavorite_loggedin-modify"><img height="13" style="float:left;" src="http://a.espncdn.com/prod/assets/memberservices/ms-selected-star.gif"> miESPN</a></div>');
		} else {
			$('.player-popup-fave').html('<div class="player-popup-myfav-content"><a href="http://espn.go.com/personalization/index" name="&lpos=playerpopup&lid='+sportName+'_playerId='+playerId+'_'+playerName+'_addfavorite_loggedin-modify"><img height="13" style="float:left;" src="http://a.espncdn.com/prod/assets/memberservices/ms-selected-star.gif"><img src="http://a2.espncdn.com/prod/assets/clubhouses/2010/logo_myespn_60x10.png" style="padding-top:1px;"></a></div>');
		}
		return false;
	}
	
	function addLoginHtml(langString) {
		var playerName = $('.player-popup-fave').attr('playerName');
		var playerId = $('.player-popup-fave').attr('playerId');
		var sportName = $('.player-popup-fave').attr('sport');
		if (langString == 'ES') {
			$('.player-popup-fave').html('<div class="player-popup-addfav-content"><a href="http://espn.go.com/personalization/index?language=es" name="&lpos=playerpopup&lid='+sportName+'_playerId='+playerId+'_'+playerName+'_addfavorite_loggedout"><img src="http://a.espncdn.com/prod/assets/worldcup2010/icon_plus_blue.png">&nbsp;&nbsp;miESPN</a></div>');
		} else {
			$('.player-popup-fave').html('<div class="player-popup-addfav-content"><a href="http://espn.go.com/personalization/index" name="&lpos=playerpopup&lid='+sportName+'_playerId='+playerId+'_'+playerName+'_addfavorite_loggedout"><span style="padding-right:2px;">+</span><img src="http://a2.espncdn.com/prod/assets/clubhouses/2010/logo_myespn_60x10.png" style="padding-top:1px;"></a></div>');
		}
	}
	
	function closePlayerPopup() {
		if ($('.player-popup-content').length > 0) {
			$('.player-popup-content').hide();
			$('.player-popup-arrow').hide();
		}
		return false;
	}
	
	function openPlayerPopup(obj,link) {
		var array = link.split('/');
		var sport = '';
		var id = 0;
		var idIndex = 0;
		$.each(array, function(i, val) {
			if (val.length == 3 || val == 'college-football' || val == 'mens-college-basketball' || val == 'college-sports' || val == 'colleges') {
				sport = val;
				if (val == 'college-football') { sport = 'ncf'; }
				if (val == 'mens-college-basketball') { sport = 'ncb'; }
				return false;
			}
		});
		if (link.indexOf('playerId=') > -1) {
			id = link.substring(link.indexOf('playerId=')+9, link.length);
		} else {
			$.each(array, function(i, val) {
				if (val == 'id') {
					idIndex = i;
					return false;
				}
			});
			if (idIndex != 0 && array.length > idIndex+1) {
				id = array[idIndex+1];
			}
		}
		if (sport != '' && id != 0) {
			var lang = 'EN'
			if (link.indexOf('deportes') > -1) {
				lang = 'ES'
			}		
			if ($('.player-popup-content').length == 0) {
				$('#content-wrapper').append('<div class="player-popup-arrow"><img src="http://a.espncdn.com/i/golf/leaderboard/playerPopupGrey/popup_arrow_00.png"></div><div class="player-popup-content"></div>');
				$('.player-popup-content').hide();
				$('.player-popup-arrow').hide();			
			}
			var popupContent = $('.player-popup-content');
			var popupArrow = $('.player-popup-arrow');
			var postop = obj.offset().top;
			var posleft = obj.offset().left;
			var stringlength = obj.width();
			var parentoffset = $('.span-4').offset().top + $(window).scrollTop();
			$.ajax({
				type:"GET",
				url: '/'+sport+'/format/popupPlayerCard',
				data: 'id='+id+'&lang='+lang+'&link='+link,
				dataType: "html",
				success: function(html){
					if (parentoffset > postop-280) {
						popupArrow.html('<img src="http://a.espncdn.com/i/golf/leaderboard/playerPopupGrey/popup_arrow_01.png">');
						popupArrow.css('top',postop-80);
						popupContent.css('top',postop-50);
					} else {
						popupArrow.html('<img src="http://a.espncdn.com/i/golf/leaderboard/playerPopupGrey/popup_arrow_00.png">');
						popupArrow.css('top',postop-280);
						popupContent.css('top',postop-280);
					}
					popupArrow.css('left',posleft+stringlength);
					popupContent.css('left',posleft+90+stringlength);
					popupContent.html(html);
					popupArrow.show();
					popupContent.show();
					if ($('.player-popup-fave').length > 0) {
						var loggedIn = espn.core.loggedIn;
						if (loggedIn) {
							var showAddButton = true;
							var sportId = $('.player-popup-fave').attr('sportId');
							espn.p13n.get({
								"success" : function(data) {
									if (data!=null && data!='UNDEF' && typeof(data.myPlayers) != 'UNDEF' && data.myPlayers != null) {
										$.each(data.myPlayers, function(i,item) {
											if (typeof(item.sport) != 'UNDEF' && item.sport != null) {
												if (item.sport == sportId && item.id == id){
													showAddButton = false;
												}
											}
										});
									}
									if (showAddButton) {
										addFaveHtml(lang);
										return false;
									} else {
										isFaveHtml(lang);
										return false;
									}
								}
							});
						} else {
							addLoginHtml(lang);
						}
						var playerFullName = $('.player-popup-fave').attr('playerName');
						anTrackLink(this,'espn', 'player-popup', sport+'_playerId='+id+'_'+playerFullName);
					}				
					$(document).click(function(e){
						if (e.button != 2 && !$(e.target).parents().is('.player-popup-content')) {
							closePlayerPopup();
						}
					});
				}	
			});
		}
		return false;
	}
	
	function addPlayerPopupFave(sportId, playerId, langString) {
		espn.p13n.add(
			{"players":sportId+":"+playerId},
			{"success":function(){
				isFaveHtml(langString);
			}}
		);
		return false;
	}
	
	$(".closePopup").live('click',function(e){
		if (e.button != 2) {
			closePlayerPopup();
		}
		return false;
	});
	
	$("a[href*='mlb/players/profile'],a[href*='mlb/player/_/'],a[href*='nfl/players/profile'],a[href*='nfl/player/_/'],a[href*='nhl/players/profile'],a[href*='nhl/player/_/'],a[href*='ncf/player/profile'],a[href*='ncf/player/_/'],a[href*='college-football/player/profile'],a[href*='college-football/player/_/'],a[href*='ncb/player/profile'],a[href*='ncb/player/_/'],a[href*='mens-college-basketball/player/profile'],a[href*='mens-college-basketball/player/_/'],a[href*='nba/player/_/'],a[href*='football/recruiting/player/_/']").click(function(){
		var thisLink = $(this).attr('href');
		if (thisLink.indexOf('deportes') == -1) {
			openPlayerPopup($(this),thisLink);
			return false;
		}
	});
		
});
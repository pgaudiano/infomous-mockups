$("div.ec-glossary-columns li").each(function(){
	var term = $(this).children('a').attr('href');
	$(this).prepend('<a href="javascript:nw=window.open(\'http://www.infomous.com/site/mockups/economist/topics/infomous.php?q='+ term + '\', \'_blank\', \'width=720,height=420,menubar=no,toolbar=no,location=no,resizable=no,scrollbars=no\'); void(0);"><img src="http://www.infomous.com/site/mockups/economist/topics/infomous_icon_16x16.png" class="infomous-icon" /></a> ');
	}
);
console.log('executed');

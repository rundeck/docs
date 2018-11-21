function setupAutocomplete(sitedata){
	jQuery('input.navquery').devbridgeAutocomplete({
  		lookup: jQuery.map(site,function (page) {
  			return {value: page.alltitles, key: page.title, data:page};
  		}),
  		onSelect: function(suggestion){
  			document.location=window._pageRelpath+suggestion.data.outpath;
  		}
  });
}
jQuery(function(){
	

	jQuery.getJSON(window._pageRelpath+'site.json',function(data){
		var site=data;
		setupAutocomplete(site);		
	});
});

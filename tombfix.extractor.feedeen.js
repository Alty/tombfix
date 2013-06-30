<<<<<<< HEAD
/**
	* tombfix.service.extractors.feedeen - PatchFor Tombfix
	* TombfixをFeedeenで使えるようにするTombfix用パッチ
	*
	* 参考：Tombloo/chrome/content/library/31_Tombloo.Service.extractors.js、GoogleReader部分
	* @version 0.02
	* @date 2013-06-30
	* @author Alty <fujihisa@gmail.com>
	* @license Same as Tombloo, Tomblfy
	* @updateURL https://github.com/Alty/tombfix/blob/master/tombfix.extractor.feedeen.js
**/

(function(undefined) {
	Tombfix.Service.extractors.register(
	{
		name : 'Feedeen',
		getItem : function(ctx, getOnly) {
			if(!ctx.href.match('//feedeen.com/d')) {
				return;
			}
			if(ctx.inFrame) { // クリック先がiframe内の場合
				var ifr_parent = ctx.target.ownerDocument.defaultView.parent;
				var item = ifr_parent.document.querySelector('.fd_expanded');
			} else {
				var item = ctx.document.querySelector('.fd_expanded');
			}

			if(item) {
				var res = {
					author : item.querySelector('.fd_sitename').textContent,
					title  : item.querySelector('.fd_title').textContent,
					feed   : item.querySelector('.fd_siteurl').getAttribute('href'),
					href   : item.querySelector('.fd_url').getAttribute('href').replace(/[?&;](fr?(om)?|track|ref|FM)=(r(ss(all)?|df)|atom)([&;].*)?/,''),
				};
			} else {
				return
			}

			if(!getOnly) {
				ctx.title = res.feed +(res.title? ' - ' + res.title : '');
				ctx.href  = res.href;
				ctx.host  = res.href.match('http://(.*?)/')[1];
			}

			return res;
		},
	}, 'Photo', false);
})();

(function(undefined) {
	// Feedeen Quote用
	Tombfix.Service.extractors.register(
	{
		name : 'Quote - Feedeen' ,
		ICON : 'http://feedeen.com/favicon.ico' ,
		check: function(ctx) {
			return Tombfix.Service.extractors.Feedeen.getItem(ctx, true) && ctx.selection;
		},
		extract : function(ctx) {
			with(Tombfix.Service.extractors) {
				Feedeen.getItem(ctx);
				return Quote.extract(ctx);
			}
		},
	}, 'Photo', false);

	// Feedeen Reblog用
	Tombfix.Service.extractors.register(
	{
		name: 'ReBlog - Feedeen' ,
		ICON: 'http://feedeen.com/favicon.ico' ,
		check: function(ctx) {
			var item = Tombfix.Service.extractors.Feedeen.getItem(ctx, true);
			return item && (
				item.href.match('^http://.*?\\.tumblr\\.com/') ||
				(ctx.onImage && ctx.target.src.match('^http://data\.tumblr\.com/'))); // 現在のtumblrは*media.tumblr.com?
		},
		extract : function(ctx) {
			with(Tombfix.Service.extractors){
				Feedeen.getItem(ctx);
				return ReBlog.extractByLink(ctx, ctx.href);
			}
		},
	}, 'Photo', false);

	// Feedeen Photo
	Tombfix.Service.extractors.register(
	{
		name : 'Photo - Feedeen',
		ICON : 'http://feedeen.com/favicon.ico',
		check : function(ctx){
			return Tombfix.Service.extractors.Feedeen.getItem(ctx, true) &&
				ctx.onImage;
		},
		extract : function(ctx){
			var exts = Tombfix.Service.extractors;
			exts.Feedeen.getItem(ctx);
			return exts.check(ctx)[0].extract(ctx);
		},
	}, 'Photo', false);

	// Feedeen Link用
	Tombfix.Service.extractors.register(
	{
		name : 'Link - Feedeen',
		ICON : 'http://feedeen.com/favicon.ico',
		check : function(ctx){
			return Tombfix.Service.extractors.Feedeen.getItem(ctx, true)
		},
		extract : function(ctx){
			with(Tombfix.Service.extractors) {
				Feedeen.getItem(ctx);
				return Link.extract(ctx);
			}
		},
	}, 'Photo', false);
})();
<<<<<<< HEAD

=======
=======
/**
	* tombfix.service.extractors.feedeen - PatchFor Tombfix
	* Feedeen上でTombfixを使えるようにするTombfix用パッチ
	*
	* 参考：Tombloo/chrome/content/library/31_Tombloo.Service.extractors.js、GoogleReader部分
	* @version 0.01
	* @date 2013-06-29
	* @author Alty <fujihisa@gmail.com>
	* @license Same as Tombloo, Tomblfy
	* @updateURL https://github.com/Alty/tombfix/blob/master/tombfix.extractor.feedeen.js
**/

// Feedeen記事取得用
(function(undefined) {
	Tombfix.Service.extractors.register(
	{
		name : 'Feedeen',
		getItem : function(ctx, getOnly) {
			if(!ctx.href.match('//feedeen.com/d')) {
				return;
			}
			if(ctx.inFrame) { // クリック先がiframe内の場合
				var ifr_parent = ctx.target.ownerDocument.defaultView.parent;
				// ↓対象記事のstyleが空であることに依存してるので要改善
				var item = ifr_parent.document.querySelectorAll("div[style=''] > div");
			} else {
				var item = ctx.document.querySelectorAll("div[style=''] > div");
			}

			if(item) {
				// ↓クエリ探索で引っかかる順に依存してるので要改善
				var res = {
					author : item[1].textContent.replace(/from/, ''),
					title  : item[0].textContent,
					feed   : item[1].querySelector("a").getAttribute("href"),
					href   : item[0].querySelector("a").getAttribute("href").replace(/[?&;](fr?(om)?|track|ref|FM)=(r(ss(all)?|df)|atom)([&;].*)?/,''),
				};

			} else {
				return
			}

			if(!getOnly) {
				ctx.title = res.feed +(res.title? ' - ' + res.title : '');
				ctx.href  = res.href;
				ctx.host  = res.href.match('http://(.*?)/')[1];
			}

			return res;
		},
	}, 'Photo', false);
})();

(function(undefined) {
	// Feedeen Quote用
	Tombfix.Service.extractors.register(
	{
		name : 'Quote - Feedeen' ,
		ICON : 'http://feedeen.com/favicon.ico' ,
		check: function(ctx) {
			return Tombfix.Service.extractors.Feedeen.getItem(ctx, true) && ctx.selection;
		},
		extract : function(ctx) {
			with(Tombfix.Service.extractors) {
				Feedeen.getItem(ctx);
				return Quote.extract(ctx);
			}
		},
	}, 'Photo', false);

	// Feedeen Reblog用
	Tombfix.Service.extractors.register(
	{
		name: 'ReBlog - Feedeen' ,
		ICON: 'http://feedeen.com/favicon.ico' ,
		check: function(ctx) {
			var item = Tombfix.Service.extractors.Feedeen.getItem(ctx, true);
			return item && (
				item.href.match('^http://.*?\\.tumblr\\.com/') ||
				(ctx.onImage && ctx.target.src.match('^http://data\.tumblr\.com/'))); // 現在のtumblrは*media.tumblr.com?
		},
		extract : function(ctx) {
			with(Tombfix.Service.extractors){
				Feedeen.getItem(ctx);
				return ReBlog.extractByLink(ctx, ctx.href);
			}
		},
	}, 'Photo', false);

	// Feedeen Photo
	Tombfix.Service.extractors.register(
	{
		name : 'Photo - Feedeen',
		ICON : 'http://feedeen.com/favicon.ico',
		check : function(ctx){
			return Tombfix.Service.extractors.Feedeen.getItem(ctx, true) &&
				ctx.onImage;
		},
		extract : function(ctx){
			var exts = Tombfix.Service.extractors;
			exts.Feedeen.getItem(ctx);
			return exts.check(ctx)[0].extract(ctx);
		},
	}, 'Photo', false);

	// Feedeen Link用
	Tombfix.Service.extractors.register(
	{
		name : 'Link - Feedeen',
		ICON : 'http://feedeen.com/favicon.ico',
		check : function(ctx){
			return Tombfix.Service.extractors.Feedeen.getItem(ctx, true)
		},
		extract : function(ctx){
			with(Tombfix.Service.extractors) {
				Feedeen.getItem(ctx);
				return Link.extract(ctx);
			}
		},
	}, 'Photo', false);
})();
>>>>>>> 06ec94f1b1a178ca8cae7c81ee21a3aa2fce1fb4
>>>>>>> 1f1241ea43d8b0d30c4a94d9265072d3bf2d62df

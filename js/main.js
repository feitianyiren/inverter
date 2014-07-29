define("screen",["zepto"],function(e){var t=function(){this.init()};return e.extend(t.prototype,{init:function(){var t=e("#screen"),n=parseInt(t.css("width"),10);this.$screen=t,this.width=n,t.height(n),this.bindEvent()},reset:function(){this.$screen.empty(),this.$squares=e()},create:function(t){var n,r=this.$screen,i=(this.width-6*t)/t,s=e('<div class="row"></div>'),o=e('<div class="square js-square"></div>');if(this.n&&this.n===t)return this.$squares.removeClass("square-active"),0;this.reset(),this.n=t,o.width(i).height(i);for(n=0;n<t;n++)s.append(o.clone());for(n=0;n<t;n++)r.append(s.clone(!0,!0));this.$squares=r.find(".js-square")},bindEvent:function(){function i(e){return e.not(".square-active").length>0?!1:!0}function s(e,t){var n=Math.floor(e/t),r=e%t,i=[];return i.push(e),n+1<t&&i.push((n+1)*t+r),n-1>-1&&i.push((n-1)*t+r),r-1>-1&&i.push(n*t+r-1),r+1<t&&i.push(n*t+r+1),i}function o(t,n,r){var o=n.index(t),u=s(o,r);u.forEach(function(e){n.eq(e).toggleClass("square-active")}),e(document).trigger("screen/click"),i(n)&&e(document).trigger("screen/success")}var t=this.$screen,n=this,r=document.hasOwnProperty("ontouchstart")?"tap":"click";t.on(r,".js-square",function(t){var r=e(this);o(r,n.$squares,n.n),t.preventDefault()})}}),t}),define("storage",[],function(){var e=function(){this.init()};return e.prototype={init:function(){function e(){var e=!1;return typeof window.localStorage=="object"?e=localStorage:typeof window.globalStorage=="object"&&(e=window.globalStorage),e}this.storage=e()},getStorage:function(){return this.storage},save:function(e,t){var n=this.storage,r=!1;return n!==!1&&(r=n.setItem(e,t)),r},load:function(e){var t=this.storage,n="";return t!==!1&&(n=t.getItem(e)),n}},e}),define("score",["zepto","storage"],function(e,t){var n=function(){this.init()};return e.extend(n.prototype,{init:function(){var n=new t,r=parseInt(n.load("curLevel"),10)||1,i=parseInt(n.load("supLevel"),10)||1,s=parseInt(n.load("supClick"),10)||0,o=parseInt(n.load("curClick"),10)||0,u=parseInt(n.load("totalClick"),10)||0,a=e("#cur-level"),f=e("#sup-level"),l=e("#cur-click"),c=e("#total-click");this.storage=n,this.$curLevel=a,this.$supLevel=f,this.$curClick=l,this.$totalClick=c,this.curLevel=r,this.supLevel=i,this.supClick=s,this.curClick=o,this.totalClick=u,this.updateView()},getLevel:function(){return this.curLevel},addClick:function(){this.curClick+=1,this.totalClick+=1,this.updateView()},addLevel:function(){this.curLevel+=1;if(this.curLevel>this.supLevel||this.curLevel===this.supLevel&&this.supClick>this.totalClick)this.supLevel=this.curLevel,this.supClick=this.totalClick,e(document).trigger("score/hightLevel",[this.supLevel,this.supClick]);return this.save(),this.updateView(),this.curLevel},resetLevel:function(){var e=this.storage;return this.curLevel=parseInt(e.load("curLevel"),10)||1,this.curClick=parseInt(e.load("curClick"),10)||0,this.totalClick=parseInt(e.load("totalClick"),10)||0,this.updateView(),this.curLevel},reset:function(){this.curLevel=1,this.curClick=0,this.totalClick=0,this.updateView()},save:function(){var e=this.storage;e.save("curLevel",this.curLevel),e.save("supLevel",this.supLevel),e.save("supClick",this.supClick),e.save("curClick",this.curClick),e.save("totalClick",this.totalClick)},updateView:function(){this.$curLevel.html(this.curLevel),this.$supLevel.html(this.supLevel+"("+this.supClick+"次点击)"),this.$curClick.html(this.curClick),this.$totalClick.html(this.totalClick)}}),n}),require.config({shim:{zepto:{exports:"Zepto"}}}),require(["zepto","screen","score"],function(e,t,n){function u(t,n){var r=encodeURIComponent("http://yanhaijing.com/inverter"),i=encodeURIComponent("我在变色方块小游戏中，逆天用了"+n+"次点击，通过了第"+(t-1)+"关，你，你，你快快来挑战我吧@颜海镜 "),s=encodeURIComponent("media/5.png"),o=encodeURIComponent("我在变色方块小游戏中，逆天用了"+n+"次点击，通过了第"+(t-1)+"关，你，你，你快快来挑战我吧"),u=encodeURIComponent("变色方块小游戏"),a=encodeURIComponent("变色方块"),f="http://service.weibo.com/share/share.php?url="+r+"&title="+i+"&pic="+s,l="http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url="+r+"&desc="+o+"&title="+a+"&summary="+u+"&pic="+s,c="http://yanhaijing.com/inverter 我在变色方块小游戏中，逆天用了"+n+"次点击，通过了第"+(t-1)+"关，你，你，你快快来挑战我吧@颜海镜 ";e("#share-weibo").attr("href",f),e("#share-qq").attr("href",l),e(".ds-thread textarea").val(c)}var r=new t,i=new n,s=e(".js-pop"),o=document.hasOwnProperty("ontouchstart")?"tap":"click";e(function(){var e=i.getLevel();r.create(e)}),e(document).on("screen/success",function(){var t;e("#success-pop").show(),t=i.addLevel(),e("#success-pop").find(".js-pop-body").html("即将进入第"+t+"关"),r.create(t),window.setTimeout(function(){e("#success-pop").hide()},2e3)}).on("screen/click",function(){i.addClick()}).on("score/hightLevel",function(t,n,r){e("#success-pop").hide(),e("#hightLevel-pop").show(),u(n,r)}),s.on(o,function(t){e(this).hide(),t.preventDefault()}),e("#restart-game").on(o,function(e){i.reset(),r.create(1),e.preventDefault()}),e("#pop-restart-game").on(o,function(t){e("#restart-game-pop").show(),t.preventDefault()}),e("#restart-level").on(o,function(e){r.create(i.resetLevel()),e.preventDefault()}),e("#pop-restart-level").on(o,function(t){e("#restart-level-pop").show(),t.preventDefault()}),e("#pop-intro").on(o,function(t){e("#intro-pop").show(),t.preventDefault()}),e(".js-share-btn").on(o,function(e){e.stopPropagation()}),e("#share").on(o,function(t){e("#share-pop").show(),t.preventDefault()}),e("#hight-share").on(o,function(t){e("#share-pop").show(),t.preventDefault(),t.stopPropagation()}),e("#share-weixin").on(o,function(t){e("#share-pop").hide(),e("#hightLevel-pop").hide(),e("#weixin-shade").show(),t.preventDefault(),t.stopPropagation()}),e("#weixin-shade").on(o,function(t){e("#weixin-shade").hide(),t.preventDefault()})}),define("index",function(){});
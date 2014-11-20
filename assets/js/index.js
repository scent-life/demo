require(['navigation-view', 'scroll-view', 'scroll-view/plugin/scrollbar', 'router', 'node', 'event-dom/gesture/tap'], function(NavigationView, ScrollView, ScrollBar, router, $, GestureTap) {

    var INDEX_PAGE = 'p0';

    var navigationView = new NavigationView({
        render: 'body'
    }).render();


    function getStepTpl(targetStep) {
        return $('#' + targetStep).html();
    }

    function switchStep(targetStep) {
        navigationView.push({
            viewId: targetStep,
            xclass: 'page-view'
            //animation: ['slide-top', 'slide-bottom'] //使用动画效果切换视图
        });
    }

    function switchPage(pageId) {
        var activeView = navigationView.get('activeView'),
            activeViewId = activeView && activeView.get('viewId');

        var animation = 'slide-right';

        if (activeViewId && pageId < activeViewId) {
            animation = 'slide-left';
        }

        navigationView.push({
            xclass:    'page-view',
            viewId:    pageId,
            animation: animation
        });

        if (activeView) {
            navigationView.removeChild(activeView);
        }
        //console.log(animation);
    }

    var PageView = ScrollView.extend({
        getViewId: function() {
            return this.get('viewId');
        },
        createDom: function() {
            var viewId = this.get('viewId');
            this.get('contentEl')
                .html( getStepTpl(viewId), true )
                .addClass(viewId);

        },
        bindUI: function() {
            this.get('contentEl').all('.nav').on(GestureTap.TAP, function(ev) {
                ev.halt();
                router.navigate( $(this).attr('href') );
            });
        },
        enter: function() {
            this.sync();
            this.timer = setInterval(this.sync.bind(this), 200);
            //setTimeout(this.sync.bind(this), 400);
            //this.sync();
            $(window).on('resize', this.sync, this);
        },
        leave: function() { //navigationView.pop()会触发事件进入该函数
            $(window).detach('resize', this.sync, this);
            clearInterval(this.timer);

        }
    }, {
        xclass: 'page-view',
        ATTRS: {
            plugins: [ScrollBar] //使用了 ScrollBar 插件，则该视图右侧栏有滚动条显示
        }
    });

    router.get('/', function (request) {
        switchPage(INDEX_PAGE);
    });

    router.get('/:page', function (request) {
        switchPage(request.params.page)
    });

    router.config({
        urlRoot: '/',
        useHash: false,
        triggerRoute: true
    });

    router.navigate(location.pathname);
    router.start();
    window.navigationView = navigationView;
});

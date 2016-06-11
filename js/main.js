var mineArray,  //地雷数组
    lastNum,  //剩余雷数
    countNum,  //未被揭开的方块数
    inGame = 0,  //游戏状态，0为结束，1为进行中，2为初始化完毕但未开始
    startTime;  //开始时间
    //以下操作1表示揭开一个方块，操作2表示标记一个小旗，操作3表示标记一个问号，操作4表示若某个方块周围的地雷全都标记完，则将其周围剩下的方块挖开


$(document).ready(function() {
    $('#main').mouseup(function(e) {
        var clicked = $(e.target),
            id = clicked.attr('id'),
            cX = parseInt(id.substring(1, id.indexOf('-'))),  //所点击方格的X坐标
            cY = parseInt(id.substring(id.indexOf('-') + 1));  //所点击方格的Y坐标
        if(inGame == 1) {
            if(e.which == 1) {
                if(clicked.hasClass('hidden') && !clicked.hasClass('flag')) {
                    openBlock(cX,cY);  //左键点击未揭开且未插旗方块即执行操作1
                } else if(!clicked.hasClass('hidden')) {
                    openNearBlock(cX,cY);  //由于同时点击左右键实现起来比较麻烦，所以改成用点击左键实现操作4
                }
            } else if(e.which == 3 && clicked.hasClass('hidden')) {  //右键点击操作2，如果允许使用问号标记，则可执行操作3
                if(clicked.hasClass('flag')) {
                    clicked.removeClass('flag');
                    if($('#check').attr('checked')) clicked.addClass('check');
                    lastNum ++;
                    countNum ++;
                } else if(clicked.hasClass('check')) {
                    clicked.removeClass('check');
                } else {
                    clicked.addClass('flag');
                    lastNum --;
                    countNum --;
                }
                $('#lastnum').text(lastNum);
            }
            if(lastNum == countNum) endGame(1);  //因为最后剩下的方块均为雷时应直接结束游戏，因此设置为剩余雷数和未被揭开的方块数相等的时候结束游戏
        } else if(inGame == 2) {
            if(e.which == 1) {  //初始化完毕后只允许点击左键开始游戏
                openBlock(cX,cY);
                inGame = 1;
                var now = new Date();
                startTime = now.getTime();
                timer();
            }
        }
    });

    $('#main').bind('contextmenu', function(){ return false; });  //阻止默认右击事件
});
var mineArray,  //��������
    lastNum,  //ʣ������
    countNum,  //δ���ҿ��ķ�����
    inGame = 0,  //��Ϸ״̬��0Ϊ������1Ϊ�����У�2Ϊ��ʼ����ϵ�δ��ʼ
    startTime;  //��ʼʱ��
    //���²���1��ʾ�ҿ�һ�����飬����2��ʾ���һ��С�죬����3��ʾ���һ���ʺţ�����4��ʾ��ĳ��������Χ�ĵ���ȫ������꣬������Χʣ�µķ����ڿ�


$(document).ready(function() {
    $('#main').mouseup(function(e) {
        var clicked = $(e.target),
            id = clicked.attr('id'),
            cX = parseInt(id.substring(1, id.indexOf('-'))),  //����������X����
            cY = parseInt(id.substring(id.indexOf('-') + 1));  //����������Y����
        if(inGame == 1) {
            if(e.which == 1) {
                if(clicked.hasClass('hidden') && !clicked.hasClass('flag')) {
                    openBlock(cX,cY);  //������δ�ҿ���δ���췽�鼴ִ�в���1
                } else if(!clicked.hasClass('hidden')) {
                    openNearBlock(cX,cY);  //����ͬʱ������Ҽ�ʵ�������Ƚ��鷳�����Ըĳ��õ�����ʵ�ֲ���4
                }
            } else if(e.which == 3 && clicked.hasClass('hidden')) {  //�Ҽ��������2���������ʹ���ʺű�ǣ����ִ�в���3
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
            if(lastNum == countNum) endGame(1);  //��Ϊ���ʣ�µķ����Ϊ��ʱӦֱ�ӽ�����Ϸ���������Ϊʣ��������δ���ҿ��ķ�������ȵ�ʱ�������Ϸ
        } else if(inGame == 2) {
            if(e.which == 1) {  //��ʼ����Ϻ�ֻ�����������ʼ��Ϸ
                openBlock(cX,cY);
                inGame = 1;
                var now = new Date();
                startTime = now.getTime();
                timer();
            }
        }
    });

    $('#main').bind('contextmenu', function(){ return false; });  //��ֹĬ���һ��¼�
});
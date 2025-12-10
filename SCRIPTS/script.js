$(document).ready(function () {


    $('#welcomeOverlay').fadeIn(400);

    $('#welcome-btn').click(function () {
        $('#welcomeOverlay').fadeOut(400);
    });

   
    $('#dayStyle').click(function () {
        $('body').removeClass('night').addClass('day');
    });

    $('#nightStyle').click(function () {
        $('body').removeClass('day').addClass('night');
    });

   
    $('#devInfo').click(function () {
        $('#devOverlay').fadeIn(300);
    });

    $('#devClose').click(function () {
        $('#devOverlay').fadeOut(300);
    });

   
    const galleryImages = [
        "https://picsum.photos/id/1015/300/200",
        "https://picsum.photos/id/1024/300/200",
        "https://picsum.photos/id/1035/300/200",
        "https://picsum.photos/id/1041/300/200",
        "https://picsum.photos/id/1050/300/200",
        "https://picsum.photos/id/1062/300/200",
        "https://picsum.photos/id/1074/300/200"
    ];

    $('#gallery').html('<div class="gallery-inner"></div>');
    const gInner = $('.gallery-inner');

    galleryImages.forEach(src => {
        gInner.append(`<img class="gallery-img" src="${src}">`);
    });

    let currentIndex = 0;

    function updateGallery() {
        gInner.css('transform', `translateX(-${currentIndex * 220}px)`);
    }

    $('#gRight').click(function () {
        if (currentIndex < galleryImages.length - 1) {
            currentIndex++;
            updateGallery();
        }
    });

    $('#gLeft').click(function () {
        if (currentIndex > 0) {
            currentIndex--;
            updateGallery();
        }
    });

    /* === АВТОПРОКРУТКА ГАЛЕРЕИ === */
    let autoSlide = null;

    $('#gPlay').click(function () {
        if (autoSlide) return;
        autoSlide = setInterval(() => {
            if (currentIndex < galleryImages.length - 1) {
                currentIndex++;
            } else {
                currentIndex = 0;
            }
            updateGallery();
        }, 2000);
    });

    $('#gPause').click(function () {
        clearInterval(autoSlide);
        autoSlide = null;
    });

 
    $('.tab-headers li').click(function () {
        const tab = $(this).data('tab');
        $('.tab-headers li').removeClass('active');
        $(this).addClass('active');
        $('.tab').removeClass('active');
        $('#' + tab).addClass('active');
    });

   
    let timerInterval;
    let timerSec = 0;

    function updateTimer() {
        let h = String(Math.floor(timerSec / 3600)).padStart(2, '0');
        let m = String(Math.floor((timerSec % 3600) / 60)).padStart(2, '0');
        let s = String(timerSec % 60).padStart(2, '0');
        $('#timer').text(h + ':' + m + ':' + s);
    }

    $('#timerStart').click(function () {
        clearInterval(timerInterval);
        timerInterval = setInterval(() => {
            timerSec++;
            updateTimer();
        }, 1000);
    });

    $('#timerStop').click(function () {
        clearInterval(timerInterval);
    });

    $('#timerReset').click(function () {
        timerSec = 0;
        updateTimer();
    });

    for (let i = 1; i <= 5; i++) {
        $('#dragPanel').append('<img class="drag-item" src="https://picsum.photos/seed/' + i + '/150/100">');
    }

    $('.drag-item').draggable();


    const keyboardKeys = [
        '1','2','3','4','5','6','7','8','9','0',
        'q','w','e','r','t','y','u','i','o','p',
        'a','s','d','f','g','h','j','k','l',
        'z','x','c','v','b','n','m','.'
    ];

    keyboardKeys.forEach(k => {
        $('#virtualKeyboard').append('<button class="key">' + k + '</button>');
    });

    $(document).on('click', '.key', function () {
        $('#vkInput').val($('#vkInput').val() + $(this).text());
    });

  
    $('#helpToggle').click(function () {
        $('#helpPanel').removeClass('hidden');
    });

    $('#helpClose').click(function () {
        $('#helpPanel').addClass('hidden');
    });

    $('#helpSend').click(function () {
        sendHelpMessage();
    });

    $('#helpInput').on('keypress', function (e) {
        if (e.key === "Enter") {
            sendHelpMessage();
        }
    });

    function sendHelpMessage() {
        const msg = $('#helpInput').val().trim();
        if (msg.length === 0) return;

        $('#helpLog').append('<div class="help-message user-msg">' + msg + '</div>');
        $('#helpInput').val("");
        $('#helpLog').scrollTop($('#helpLog')[0].scrollHeight);

        setTimeout(() => {
            let reply = getBotReply(msg);
            $('#helpLog').append('<div class="help-message bot-msg">' + reply + '</div>');
            $('#helpLog').scrollTop($('#helpLog')[0].scrollHeight);
        }, 400);
    }

    function getBotReply(text) {
        text = text.toLowerCase();

        if (text.includes("hello")) return "Hi, what can i help you with?";
        if (text.includes("gallery")) return "Gallery has autoslide function you can press Start if you want to try it!";
        if (text.includes("timer")) return "Timer starts at pressing button Start and stops at pressing button Stop";
        if (text.includes("help")) return "I can help you anytime! Just state your problem";

        return "Sorry but right now we dont have enough information to answer your question.";
    }

});

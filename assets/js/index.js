$(document).ready(function () {
    initCountDown();
    function initCountDown() {
        var end = new Date('2024-06-30T09:09:59');
        var timer = countdown(
            function (ts) {
                // Tạo chuỗi định dạng theo days-hours-minutes-seconds
                var formattedTime = `
                <div class="countdown-item">
                    <span class="number">${ts.days}</span>
                    <span class="label">days</span>
                </div>
                <span class="separator">-</span>
                <div class="countdown-item">
                    <span class="number">${ts.hours}</span>
                    <span class="label">hours</span>
                </div>
                <span class="separator">-</span>
                <div class="countdown-item">
                    <span class="number">${ts.minutes}</span>
                    <span class="label">minutes</span>
                </div>
                <span class="separator">-</span>
                <div class="countdown-item">
                    <span class="number">${ts.seconds}</span>
                    <span class="label">seconds</span>
                </div>
            `;

                // Hiển thị bộ đếm ngược trong phần tử có id 'countdown'
                document.getElementsByClassName('countdown')[0].innerHTML = formattedTime;
            },
            end,
            countdown.DAYS | countdown.HOURS | countdown.MINUTES | countdown.SECONDS
        );
    }
    handleDropdown();
    function handleDropdown() {
        let dropdowns = $('.dropdown');

        dropdowns.each(function (index, dropdown) {
            $(dropdown).on('click', function () {
                $('.dropdown-content').hide();
                $(this).find('.dropdown-content').show();
            });
        });
    }
    let dropdownItem = $('.dropdown-item');
    dropdownItem.on('click', function (event) {
        event.stopPropagation();
        let _this = $(this);
        let dropdown = _this.closest('.dropdown');
        let value = _this.text();
        dropdown.find('.dropbtn').text(value);
        dropdown.find('.dropdown-content').hide();
    });
    var flkty = Flickity.data(".carousel.product-slider");
    flkty.on('scroll', function(progress) {
        let progressBar = $(".slider-progress")[0];
        progress = Math.max(0, Math.min(1, progress));
        progressBar.style.width = progress * 100 + '%';
      });
});
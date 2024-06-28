$(document).ready(function () {
  initCountDown();
  function initCountDown() {
    var end = new Date("2024-06-30T09:09:59");
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
        document.getElementsByClassName("countdown")[0].innerHTML =
          formattedTime;
      },
      end,
      countdown.DAYS | countdown.HOURS | countdown.MINUTES | countdown.SECONDS
    );
  }
  handleDropdown();
  function handleDropdown() {
    let dropdowns = $(".dropdown");

    dropdowns.each(function (index, dropdown) {
      $(dropdown).on("click", function () {
        $(".dropdown-content").hide();
        $(this).find(".dropdown-content").show();
      });
    });
  }
  let dropdownItem = $(".dropdown-item");
  dropdownItem.on("click", function (event) {
    event.stopPropagation();
    let _this = $(this);
    let dropdown = _this.closest(".dropdown");
    let value = _this.text();
    dropdown.find(".dropbtn").text(value);
    dropdown.find(".dropdown-content").hide();
  });
  var flkty = Flickity.data(".carousel.product-slider");
  flkty.on("scroll", function (progress) {
    let progressBar = $(".slider-progress")[0];
    progress = Math.max(0, Math.min(1, progress));
    progressBar.style.width = progress * 100 + "%";
  });
  //Compare
  initComparisons()
  function initComparisons() {
    var x, i;
    /*find all elements with an "overlay" class:*/
    x = document.getElementsByClassName("img-comp-overlay");
    for (i = 0; i < x.length; i++) {
      /*once for each "overlay" element:
          pass the "overlay" element as a parameter when executing the compareImages function:*/
      compareImages(x[i]);
    }
    function compareImages(img) {
      var slider,
        img,
        clicked = 0,
        w,
        h;
      /*get the width and height of the img element*/
      w = img.offsetWidth;
      h = img.offsetHeight;
      /*set the width of the img element to 50%:*/
      img.style.width = w / 2 + "px";
      /*create slider:*/
      slider = $('.img-comp-slider')[0];
      /*insert slider*/
      img.parentElement.insertBefore(slider, img);
      /*position the slider in the middle:*/
      slider.style.top = h / 2 - slider.offsetHeight / 2 + "px";
      slider.style.left = w / 2 - slider.offsetWidth / 2 + "px";
      /*execute a function when the mouse button is pressed:*/
      slider.addEventListener("mousedown", slideReady);
      /*and another function when the mouse button is released:*/
      window.addEventListener("mouseup", slideFinish);
      /*or touched (for touch screens:*/
      slider.addEventListener("touchstart", slideReady);
      /*and released (for touch screens:*/
      window.addEventListener("touchend", slideFinish);
      function slideReady(e) {
        /*prevent any other actions that may occur when moving over the image:*/
        e.preventDefault();
        /*the slider is now clicked and ready to move:*/
        clicked = 1;
        /*execute a function when the slider is moved:*/
        window.addEventListener("mousemove", slideMove);
        window.addEventListener("touchmove", slideMove);
      }
      function slideFinish() {
        /*the slider is no longer clicked:*/
        clicked = 0;
      }
      function slideMove(e) {
        var pos;
        /*if the slider is no longer clicked, exit this function:*/
        if (clicked == 0) return false;
        /*get the cursor's x position:*/
        pos = getCursorPos(e);
        /*prevent the slider from being positioned outside the image:*/
        if (pos < 0) pos = 0;
        if (pos > w) pos = w;
        /*execute a function that will resize the overlay image according to the cursor:*/
        slide(pos);
      }
      function getCursorPos(e) {
        var a,
          x = 0;
        e = e.changedTouches ? e.changedTouches[0] : e;
        /*get the x positions of the image:*/
        a = img.getBoundingClientRect();
        /*calculate the cursor's x coordinate, relative to the image:*/
        x = e.pageX - a.left;
        /*consider any page scrolling:*/
        x = x - window.pageXOffset;
        return x;
      }
      function slide(x) {
        /*resize the image:*/
        img.style.width = x + "px";
        /*position the slider:*/
        slider.style.left = img.offsetWidth - slider.offsetWidth / 2 + "px";
      }
    }
  }
  //quantity
  $('.quantity .icon').on('click', function () {
    let _this = $(this);
    let input = $('#input-quantity');
    let inputVal = parseInt(input.val());
    if (_this.hasClass('add')) {
      inputVal = ++inputVal;
      input.val(inputVal);
    } else if (_this.hasClass('minus') && inputVal > 1) {
      inputVal = --inputVal;
      input.val(inputVal);
    }
  })

  //tooltip
  $('.tooltips').append("<span class='tooltip-wrapper'></span>");
  $('.tooltips:not([tooltip-position])').attr('tooltip-position', 'bottom');

  $('.bundle-item').on('click', function () {
    let _this = $(this);
    $('.bundle-item').removeClass('active');
    _this.addClass('active');
    let tooltipData = _this.data('tooltip');
    $('.hotspot').removeClass('active');
    let tooltipTitle = $('.hotspot_' + tooltipData).attr('tooltip');
    let tooltipPrice = $('.hotspot_' + tooltipData).attr('price');
    let appendContent = `<p class="tooltip-title">${tooltipTitle}</p><p class="tooltip-price">${tooltipPrice}</p>`
    $('.hotspot_' + tooltipData).find('span').empty().append(appendContent);
    $('.hotspot_' + tooltipData).addClass('active');
  });
  $('.hotspot').on('click', function () {
    let _this = $(this);
    let bundleItem = $('.bundle-item');
    let tooltipData = _this.data('tooltip');
    $('.hotspot').removeClass('active');
    bundleItem.each(function (index, item) {
      let _item = $(item);
      _item.removeClass('active');
      if (_item.data('tooltip') == tooltipData) {
        _item.addClass('active');
        _this.addClass('active');
        let tooltipTitle = _this.attr('tooltip');
        let tooltipPrice = _this.attr('price');
        let appendContent = `<p class="tooltip-title">${tooltipTitle}</p><p class="tooltip-price">${tooltipPrice}</p>`
        _this.find('span').empty().append(appendContent);
      }
    })
  });
  $('.hotspot_1').trigger('click');
  //accordion
  $(".at-title").click(function () {
    $(this)
      .toggleClass("active")
      .next(".at-tab")
      .slideToggle()
      .parent()
      .siblings()
      .find(".at-tab")
      .slideUp()
      .prev()
      .removeClass("active");
  });
  //Tabs
  $('.tab-button').on('click', function(){
    $('.tab-button').removeClass('active');
    $(this).addClass('active');
    openCity($(this).data('tab'));
  });
  function openCity(cityName) {
    let i;
    let x = $('.city');
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";  
    }
    $('#'+cityName).fadeIn();
  }
});



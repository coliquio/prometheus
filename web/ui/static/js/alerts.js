function init() {
  $(".alert_header").click(function() {
    var expanderIcon = $(this).find("i.icon-chevron-down");
    if (expanderIcon.length !== 0) {
      expanderIcon.removeClass("icon-chevron-down").addClass("icon-chevron-up");
    } else {
      var collapserIcon = $(this).find("i.icon-chevron-up");
      collapserIcon.removeClass("icon-chevron-up").addClass("icon-chevron-down");
    }
    $(this).next().toggle();
  });

  $("div.show-annotations").click(function() {
    const targetEl = $('div.show-annotations');
    const icon = $(targetEl).children('i');

    if (icon.hasClass('glyphicon-unchecked')) {
        $(".alert_annotations").show();
        $(".alert_annotations_header").show();
        $(targetEl).children('i').removeClass('glyphicon-unchecked').addClass('glyphicon-check');
        targetEl.addClass('is-checked');
    } else if (icon.hasClass('glyphicon-check')) {
        $(".alert_annotations").hide();
        $(".alert_annotations_header").hide();
        $(targetEl).children('i').removeClass('glyphicon-check').addClass('glyphicon-unchecked');
        targetEl.removeClass('is-checked');
    }
  });

  $("div.show-active").click(function() {
    const targetEl = $('div.show-active');
    const icon = $(targetEl).children('i');
    const rootEl = document.querySelector('html body div table tbody').children;

    if (icon.hasClass('glyphicon-unchecked')) {
        $(".alert_active").show();
        $(".alert_active_header").show();
        $(targetEl).children('i').removeClass('glyphicon-unchecked').addClass('glyphicon-check');
        targetEl.addClass('is-checked');

        // disable all non active alerts
        for (let curEl  of document.getElementsByClassName('alert-success')) {
            curEl.style.display="none";
        }
        // check if we can disable groups
        let emptyGroup = true
        let rowToBeHidden = new Array();
        let index = rootEl.length - 1;
        // go from bottem to top to hidde last row
        while (index >= 0) {
            if (rootEl[index].className == "") {
                if (emptyGroup) {
                    rowToBeHidden.push(rootEl[index]);
                }
                emptyGroup = true;
            } else {
                if (rootEl[index].className != "alert_details" && rootEl[index].style.display != "none") {
                    emptyGroup = false;
                }
            }
            index = index - 1;
        }
        for (let curEl of rowToBeHidden) {
            curEl.style.display = "none";
        }
    } else if (icon.hasClass('glyphicon-check')) {
        $(".alert_active").hide();
        $(".alert_active_header").hide();
        $(targetEl).children('i').removeClass('glyphicon-check').addClass('glyphicon-unchecked');
        targetEl.removeClass('is-checked');

        // enable ALL hidden elements
        for (let curEl of rootEl) {
            if (curEl.className != "alert_details" && curEl.style.display == "none") {
                curEl.style.display = "";
            }
        }
    }
  });
}

$(init);

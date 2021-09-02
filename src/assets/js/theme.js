var MotaAdmin = function () {
  var e = $(window).width(),
    t = function () {
      jQuery("select").length > 0 && jQuery("select").selectpicker()
    },
    n = function () {
      $("#preloader").fadeOut(1500), setTimeout(function () {
        $("#main-wrapper").addClass("show")
      }, 1500)
    },
    a = function () {
      e <= 991 && (jQuery(".menu-tabs .nav-link").on("click", function () {
        jQuery(this).hasClass("open") ? (jQuery(this).removeClass("open"), jQuery(".fixed-content-box").removeClass("active"), jQuery(".hamburger").show()) : (jQuery(".menu-tabs .nav-link").removeClass("open"), jQuery(this).addClass("open"), jQuery(".fixed-content-box").addClass("active"), jQuery(".hamburger").hide())
      }), jQuery(".close-fixed-content").on("click", function () {
        jQuery(".fixed-content-box").removeClass("active"), jQuery(".hamburger").removeClass("is-active"), jQuery("#main-wrapper").removeClass("menu-toggle"), jQuery(".hamburger").show()
      }))
    },
    o = function () {
      var e = $(window).height() - 206;
      $(".chatbox .msg_card_body").css("height", e)
    };
  return {
    init: function () {
      var e;
      t(), n(), jQuery("#menu").length > 0 && $("#menu").metisMenu(), jQuery(".metismenu > .mm-active ").each(function () {
          !jQuery(this).children("ul").length > 0 && jQuery(this).addClass("active-no-child")
        }), $("#checkAll").on("change", function () {
          $("td input:checkbox, .custom-checkbox input:checkbox").prop("checked", $(this).prop("checked"))
        }), $(".nav-control").on("click", function () {
          $("#main-wrapper").toggleClass("menu-toggle"), $(".hamburger").toggleClass("is-active")
        }),
        function () {
          for (var e = window.location, t = $("ul#menu a").filter(function () {
              return this.href == e
            }).addClass("mm-active").parent().addClass("mm-active"); t.is("li");) t = t.parent().addClass("mm-show").parent().addClass("mm-active")
        }(), $("ul#menu>li").on("click", function () {
          "mini" === $("body").attr("data-sidebar-style") && (console.log($(this).find("ul")), $(this).find("ul").stop())
        }), e = window.outerHeight, ((e = window.outerHeight) > 0 ? e : screen.height) && $(".content-body").css("min-height", e + 60 + "px"), $('a[data-action="collapse"]').on("click", function (e) {
          e.preventDefault(), $(this).closest(".card").find('[data-action="collapse"] i').toggleClass("mdi-arrow-down mdi-arrow-up"), $(this).closest(".card").children(".card-body").collapse("toggle")
        }), $('a[data-action="expand"]').on("click", function (e) {
          e.preventDefault(), $(this).closest(".card").find('[data-action="expand"] i').toggleClass("icon-size-actual icon-size-fullscreen"), $(this).closest(".card").toggleClass("card-fullscreen")
        }), $('[data-action="close"]').on("click", function () {
          $(this).closest(".card").removeClass().slideUp("fast")
        }), $('[data-action="reload"]').on("click", function () {
          var e = $(this);
          e.parents(".card").addClass("card-load"), e.parents(".card").append('<div class="card-loader"><i class=" ti-reload rotate-refresh"></div>'), setTimeout(function () {
            e.parents(".card").children(".card-loader").remove(), e.parents(".card").removeClass("card-load")
          }, 2e3)
        }),
        function () {
          const e = $(".header").innerHeight();
          $(window).scroll(function () {
            "horizontal" === $("body").attr("data-layout") && "static" === $("body").attr("data-header-position") && "fixed" === $("body").attr("data-sidebar-position") && ($(this.window).scrollTop() >= e ? $(".deznav").addClass("fixed") : $(".deznav").removeClass("fixed"))
          })
        }(), jQuery(".dz-scroll").each(function () {
          var e = jQuery(this).attr("id");
          new PerfectScrollbar("#" + e, {
            wheelSpeed: 2,
            wheelPropagation: !0,
            minScrollbarLength: 20
          })
        }), a(), $(".btn-number").on("click", function (e) {
          e.preventDefault(), fieldName = $(this).attr("data-field"), type = $(this).attr("data-type");
          var t = $("input[name='" + fieldName + "']"),
            n = parseInt(t.val());
          isNaN(n) ? t.val(0) : "minus" == type ? t.val(n - 1) : "plus" == type && t.val(n + 1)
        }), jQuery(".dz-chat-user-box .dz-chat-user").on("click", function () {
          jQuery(".dz-chat-user-box").addClass("d-none"), jQuery(".dz-chat-history-box").removeClass("d-none")
        }), jQuery(".dz-chat-history-back").on("click", function () {
          jQuery(".dz-chat-user-box").removeClass("d-none"), jQuery(".dz-chat-history-box").addClass("d-none")
        }), jQuery(".dz-fullscreen").on("click", function () {
          jQuery(".dz-fullscreen").toggleClass("active")
        }), jQuery(".dz-fullscreen").on("click", function (e) {
          document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement ? document.exitFullscreen ? document.exitFullscreen() : document.msExitFullscreen ? document.msExitFullscreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitExitFullscreen && document.webkitExitFullscreen() : document.documentElement.requestFullscreen ? document.documentElement.requestFullscreen() : document.documentElement.webkitRequestFullscreen ? document.documentElement.webkitRequestFullscreen() : document.documentElement.mozRequestFullScreen ? document.documentElement.mozRequestFullScreen() : document.documentElement.msRequestFullscreen && document.documentElement.msRequestFullscreen()
        }), jQuery(".deznav-scroll").length > 0 && new PerfectScrollbar(".deznav-scroll"), o(),
        function () {
          if (jQuery("#daily-sales-chart").length > 0) {
            const e = document.getElementById("daily-sales-chart").getContext("2d");
            new Chart(e, {
              type: "bar",
              data: {
                defaultFontFamily: "Poppins",
                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                datasets: [{
                  label: "Expense",
                  backgroundColor: "#7b00f6",
                  hoverBackgroundColor: "#7b00f6",
                  data: ["20", "14", "18", "25", "27", "22", "12", "24", "20", "14", "18", "16"]
                }, {
                  label: "Earning",
                  backgroundColor: "#dfe3ec",
                  hoverBackgroundColor: "#dfe3ec",
                  data: ["12", "18", "14", "7", "5", "10", "20", "8", "12", "18", "14", "16"]
                }]
              },
              options: {
                legend: {
                  display: !1
                },
                title: {
                  display: !1
                },
                tooltips: {
                  mode: "index",
                  intersect: !1
                },
                responsive: !0,
                maintainAspectRatio: !1,
                scales: {
                  xAxes: [{
                    display: !1,
                    stacked: !0,
                    barPercentage: .5,
                    ticks: {
                      display: !1
                    },
                    gridLines: {
                      display: !1,
                      drawBorder: !1
                    }
                  }],
                  yAxes: [{
                    display: !1,
                    stacked: !0,
                    gridLines: {
                      display: !1,
                      drawBorder: !1
                    },
                    ticks: {
                      display: !1
                    }
                  }]
                }
              }
            })
          }
        }(),
        function () {
          if (jQuery("#ShareProfit").length > 0) {
            const e = document.getElementById("ShareProfit").getContext("2d");
            new Chart(e, {
              type: "doughnut",
              data: {
                defaultFontFamily: "Poppins",
                datasets: [{
                  data: [45, 25, 20],
                  borderWidth: 3,
                  borderColor: "rgba(255, 243, 224, 1)",
                  backgroundColor: ["rgba(58, 122, 254, 1)", "rgba(255, 159, 0, 1)", "rgba(41, 200, 112, 1)"],
                  hoverBackgroundColor: ["rgba(58, 122, 254, 0.9)", "rgba(255, 159, 0, .9)", "rgba(41, 200, 112, .9)"]
                }]
              },
              options: {
                weight: 1,
                cutoutPercentage: 65,
                responsive: !0,
                maintainAspectRatio: !1
              }
            })
          }
        }(), jQuery(".right-sidebar .nav-link").on("click", function () {
          jQuery(".chatbox").addClass("active")
        }), jQuery(".chatbox-close").on("click", function () {
          jQuery(".chatbox").removeClass("active")
        })
    },
    load: function () {
      t(), n()
    },
    resize: function () {
      e = $(window).width(), o(), a()
    }
  }
}();
jQuery(document).ready(function () {
  "use strict";
  MotaAdmin.init()
}), jQuery(window).on("load", function () {
  "use strict";
  MotaAdmin.load()
}), jQuery(window).on("resize", function () {
  "use strict";
  MotaAdmin.resize()
});

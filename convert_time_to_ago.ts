export function timeSince(timeStamp: any) {
  if (!(timeStamp instanceof Date)) {
    timeStamp = new Date(timeStamp);
  }

  if (isNaN(timeStamp.getDate())) {
    return "Invalid date";
  }

  var now: any = new Date(),
    secondsPast = (now.getTime() - timeStamp.getTime()) / 1000;

  var formatDate = function (date, format, utc) {
    var MMMM: string[] = [
      "\x00",
      "Tháng một",
      "Tháng hai",
      "Tháng ba",
      "Tháng bốn",
      "Tháng năm",
      "Tháng sáu",
      "Tháng bảy",
      "Tháng tám",
      "Tháng chín",
      "Tháng mười",
      "Tháng mười một",
      "Tháng mười hai",
    ];
    var MMM: string[] = [
      "\x01",
      "Th.1",
      "Th.2",
      "Th.3",
      "Th.4",
      "Th.5",
      "Th.6",
      "Th.7",
      "Th.8",
      "Th.9",
      "Th.10",
      "Th.11",
      "Th.12",
    ];
    var dddd: string[] = [
      "\x02",
      "Chủ nhật",
      "Thứ hai",
      "Thứ ba",
      "Thứ tư",
      "Thứ năm",
      "Thứ 6",
      "Thứ 7",
    ];
    var ddd: string[] = ["\x03", "CN", "T2", "T3", "T4", "T5", "T6", "T7"];

    function ii(i, len) {
      var s = i + "";
      len = len || 2;
      while (s.length < len) s = "0" + s;
      return s;
    }

    var y = utc ? date.getUTCFullYear() : date.getFullYear();
    format = format.replace(/(^|[^\\])yyyy+/g, "$1" + y);
    format = format.replace(/(^|[^\\])yy/g, "$1" + y.toString().substr(2, 2));
    format = format.replace(/(^|[^\\])y/g, "$1" + y);

    var M = (utc ? date.getUTCMonth() : date.getMonth()) + 1;
    format = format.replace(/(^|[^\\])MMMM+/g, "$1" + MMMM[0]);
    format = format.replace(/(^|[^\\])MMM/g, "$1" + MMM[0]);
    format = format.replace(/(^|[^\\])MM/g, "$1" + ii(M));
    format = format.replace(/(^|[^\\])M/g, "$1" + M);

    var d = utc ? date.getUTCDate() : date.getDate();
    format = format.replace(/(^|[^\\])dddd+/g, "$1" + dddd[0]);
    format = format.replace(/(^|[^\\])ddd/g, "$1" + ddd[0]);
    format = format.replace(/(^|[^\\])dd/g, "$1" + ii(d));
    format = format.replace(/(^|[^\\])d/g, "$1" + d);

    var H = utc ? date.getUTCHours() : date.getHours();
    format = format.replace(/(^|[^\\])HH+/g, "$1" + ii(H));
    format = format.replace(/(^|[^\\])H/g, "$1" + H);

    var h = H > 12 ? H - 12 : H == 0 ? 12 : H;
    format = format.replace(/(^|[^\\])hh+/g, "$1" + ii(h));
    format = format.replace(/(^|[^\\])h/g, "$1" + h);

    var m = utc ? date.getUTCMinutes() : date.getMinutes();
    format = format.replace(/(^|[^\\])mm+/g, "$1" + ii(m));
    format = format.replace(/(^|[^\\])m/g, "$1" + m);

    var s = utc ? date.getUTCSeconds() : date.getSeconds();
    format = format.replace(/(^|[^\\])ss+/g, "$1" + ii(s));
    format = format.replace(/(^|[^\\])s/g, "$1" + s);

    var f = utc ? date.getUTCMilliseconds() : date.getMilliseconds();
    format = format.replace(/(^|[^\\])fff+/g, "$1" + ii(f, 3));
    f = Math.round(f / 10);
    format = format.replace(/(^|[^\\])ff/g, "$1" + ii(f));
    f = Math.round(f / 10);
    format = format.replace(/(^|[^\\])f/g, "$1" + f);

    var T = H < 12 ? "AM" : "PM";
    format = format.replace(/(^|[^\\])TT+/g, "$1" + T);
    format = format.replace(/(^|[^\\])T/g, "$1" + T.charAt(0));

    var t = T.toLowerCase();
    format = format.replace(/(^|[^\\])tt+/g, "$1" + t);
    format = format.replace(/(^|[^\\])t/g, "$1" + t.charAt(0));

    var tz = -date.getTimezoneOffset();
    var K = utc || !tz ? "Z" : tz > 0 ? "+" : "-";
    if (!utc) {
      tz = Math.abs(tz);
      var tzHrs = Math.floor(tz / 60);
      var tzMin = tz % 60;
      K += ii(tzHrs) + ":" + ii(tzMin);
    }
    format = format.replace(/(^|[^\\])K/g, "$1" + K);

    var day = (utc ? date.getUTCDay() : date.getDay()) + 1;
    format = format.replace(new RegExp(dddd[0], "g"), dddd[day]);
    format = format.replace(new RegExp(ddd[0], "g"), ddd[day]);

    format = format.replace(new RegExp(MMMM[0], "g"), MMMM[M]);
    format = format.replace(new RegExp(MMM[0], "g"), MMM[M]);

    format = format.replace(/\\(.)/g, "$1");

    return format;
  };

  if (secondsPast < 0) {
    // Future date
    return timeStamp;
  }
  if (secondsPast < 60) {
    // Less than a minute
    return parseInt(secondsPast) + " giây trước";
  }
  if (secondsPast < 3600) {
    // Less than an hour
    return parseInt(secondsPast / 60) + " phút trước";
  }
  if (secondsPast <= 86400) {
    // Less than a day
    return parseInt(secondsPast / 3600) + " giờ trước";
  }
  if (secondsPast <= 172800) {
    // Less than 2 days
    return "Hôm qua " + formatDate(timeStamp, "h:mmtt");
  }
  if (secondsPast > 172800) {
    // After two days
    var timeString;

    if (secondsPast <= 604800)
      timeString =
        formatDate(timeStamp, "dddd") +
        " lúc " +
        formatDate(timeStamp, "h:mmtt");
    // with in a week
    else if (now.getFullYear() > timeStamp.getFullYear())
      timeString = formatDate(timeStamp, "d MMMM, yyyy");
    // a year ago
    else if (now.getMonth() > timeStamp.getMonth())
      timeString = formatDate(timeStamp, "d MMMM, yyyy");
    // months ago
    else
      timeString =
        formatDate(timeStamp, "d MMMM, yyyy") +
        " lúc " +
        formatDate(timeStamp, "h:mmtt"); // with in a month

    return timeString;
  }
}

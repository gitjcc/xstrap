/**
 * Created by Administrator on 2017/1/6.
 */
;(function () {

    var psecond = 1000,
        pminute = 60*psecond,
        phour = 60*pminute,
        pday = 24*phour,
        pweek = 7*pday;

    function gettime(date) {
        var nowDate = date ? date : new Date();

        var time = nowDate.getTime(),
            msecond = nowDate.getMilliseconds(),
            second = nowDate.getSeconds(),
            minute = nowDate.getMinutes(),
            hour = nowDate.getHours(),
            dayWeek = nowDate.getDay(),
            dayMonth = nowDate.getDate(),
            month = nowDate.getMonth(),
            year = nowDate.getFullYear();

        var dayPass = hour*phour + minute*pminute + second*psecond + msecond,
            dayStart = time - dayPass,
            dayEnd = dayStart + pday,
            yesterdayStart = dayStart - pday,
            pastDayStart = time - pday;

        var weekPass = dayWeek * pday + dayPass,
            weekStart = time - weekPass,
            weekEnd = weekStart + pweek,
            lastWeekStart = weekStart - pweek,
            pastWeekStart = time - pweek;

        var monthStart = (new Date(year, month, 1)).getTime(),
            monthEnd = (new Date(year, month+1, 1)).getTime(),
            lastMonthStart = (new Date(year, month-1, 1)).getTime(),
            pastMonthStart = time - monthStart + lastMonthStart;

        var yearStart = (new Date(year, 0, 1)).getTime(),
            yearEnd = (new Date(year+1, 0, 1)).getTime(),
            lastYearStart = (new Date(year-1, 0, 1)).getTime(),
            pastYearStart = (new Date(time)).setFullYear(year-1);


        return {
            time: time,

            day: {
                start: dayStart,
                end: dayEnd
            },
            yesterday: {
                start: yesterdayStart,
                end: dayStart
            },
            pastDay: {
                start: pastDayStart,
                end: time
            },

            week: {
                start: weekStart,
                end: weekEnd
            },
            lastWeek: {
                start: lastWeekStart,
                end: weekStart
            },
            pastWeek: {
                start: pastWeekStart,
                end: time
            },

            month: {
                start: monthStart,
                end: monthEnd
            },
            lastMonth: {
                start: lastMonthStart,
                end: monthStart
            },
            pastMonth: {
                start: pastMonthStart,
                end: time
            },

            year: {
                start: yearStart,
                end: yearEnd
            },
            lastYear: {
                start: lastYearStart,
                end: yearStart
            },
            pastYear: {
                start: pastYearStart,
                end: time
            }
        }
    }

    window.xTime = gettime;

})();
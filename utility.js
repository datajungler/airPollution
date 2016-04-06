REGION_NUM = 5

function getCsv(targetUrl, callback) {
	$.ajax({
		url: targetUrl,
		type: "get",
		dataType: "text",
		success: function(data) {
			var csvObjects = $.csv.toObjects(data);
			callback(csvObjects)
		},
		error: function(xhr, ajaxOptions, error) {
			alert("Sorry for that some problem occurs");
		}
	})
}

function regionHourlyController(){
    var LENGTH = 200
    var prop = []
    for (var i=0; i < REGION_NUM; i++) {
        prop.push(1);
    }
    var region = d3.select("#region").append("svg:svg")
        .attr("width", LENGTH).attr("height", LENGTH)
        .attr("id", "donut");
    var donutRadius = 200
    var arc = d3.svg.arc().innerRadius(50).outerRadius(100);

    var arcGroup = region.append("svg:g")
        .attr("class", "arcGroup")
        .attr("transform", "translate(" + LENGTH/2 + "," + LENGTH/2 + ")");

    var pie = d3.layout.pie()
        .sort(null);

    var path = arcGroup.selectAll("path")
        .data(pie(prop))
        .enter()
        .append("svg:path")
        .attr("d", arc)
        .attr("fill", function(d, i) {
            if (showArray[i] == 0) {
                return color[i];
            }
            else {
                return heightColor[i];
            }
        })
        .on("click", function(d, i){
            if (showArray[i] == 0) {
                addHourly(i, function(showArray) {
                    d3.selectAll("#donut").remove();
                    regionHourlyController();
                });
            }
            else {
                removeHourly(i, function(d, i){
                    d3.selectAll("#donut").remove();
                    regionHourlyController();
                });
            }
        })


    arcGroup.selectAll("text")
        .data(pie(prop))
        .enter()
        .append("svg:text")
        .attr("transform", function(d) {return "translate(" + arc.centroid(d) + ")"; })
        .attr("dy", ".35em")
        .attr("stroke-width", 0.5)
        .attr("text-anchor", "middle")
        .style("font-size","11px")
        .text(function(d, i) {return regionName[i]; })
        .on("click", function(d, i){
            if (showArray[i] == 0) {
                addHourly(i, function(showArray) {
                    d3.selectAll("#donut").remove();
                    regionHourlyController();
                });
            }
            else {
                removeHourly(i, function(d, i){
                    d3.selectAll("#donut").remove();
                    regionHourlyController();
                });
            }
        });

    
    arcGroup.append("text")
        .text("Region")
        .attr("text-anchor", "middle")
}

function initHourlyChart(dataObject, callback) {
    var vis = d3.select("#visualisation");
        xArray = [];
        for (var i=1; i<=dataObject.length; i++) {
            xArray.push(i);
        }
        xScale = d3.scale.ordinal().rangeBands([MARGINS.left, WIDTH],1).domain(xArray),
        yScale = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([5, 18]),
        xAxis = d3.svg.axis()
        .scale(xScale),
        yAxis = d3.svg.axis()
        .scale(yScale)
        .orient("left");
    
    vis.append("svg:g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + (HEIGHT - MARGINS.bottom) + ")")
        .call(xAxis);
    vis.append("svg:g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + (MARGINS.left) + ",0)")
        .call(yAxis);
    var lineGen = d3.svg.line()
        .x(function(d) {
            return xScale(d.Hour);
        })
        .y(function(d) {
            return yScale(d.SO2);
        })
        .interpolate("linear");
    vis.append('svg:path')
        .attr('d', lineGen(dataObject))
        .attr('stroke', heightColor[2])
        .attr('stroke-width', 3)
        .attr('fill', 'none')
        .attr('id','central');

    vis.append("text")
        .attr("class", "x label")
        .attr("arial", "middle")
        .attr("x", WIDTH/2)
        .attr("y", HEIGHT + 20)
        .text("Hour");
    vis.append("text")
        .attr("class", "y label")
        .attr("arial", "middle")
        .attr("x", MARGINS.left - 5)
        .attr("y", MARGINS.top - 8)
        .text("SO2 concentration");

    callback(vis);
}
function initHourly() {
    initUrl = "https://s3-ap-southeast-1.amazonaws.com/airpollution/hour_central.csv"
    getCsv(initUrl, function(output){
        initHourlyChart(output, function(vis){});
    });
}
function getRegion(index){
    if (index == 0) {
        return "mongkok";
    }
    else if (index == 1) {
        return "tungchung";
    }
    else if (index == 2){
        return "central";
    }
    else if (index == 3){
        return "yuenlong";
    }
    else {
        return "tapmun";
    }
}
function addHourly(index, callback) {
    region = getRegion(index);
    Url = "https://s3-ap-southeast-1.amazonaws.com/airpollution/hour_"+region+".csv";
    getCsv(Url, function(output){
        var vis = d3.select("#visualisation");
        if (currentColumn=='y2011') {
            var lineGen = d3.svg.line()
            .x(function(d) {
                return xScale(d.Hour);
            })
            .y(function(d) {
                return yScale(d.y2011);
            })
            .interpolate("linear");
        }
        else if (currentColumn=='y2012') {
            var lineGen = d3.svg.line()
            .x(function(d) {
                return xScale(d.Hour);
            })
            .y(function(d) {
                return yScale(d.y2012);
            })
            .interpolate("linear");
        }
         else if (currentColumn=='y2013') {
            var lineGen = d3.svg.line()
            .x(function(d) {
                return xScale(d.Hour);
            })
            .y(function(d) {
                return yScale(d.y2013);
            })
            .interpolate("linear");
        }
        else if (currentColumn=='y2014') {
            var lineGen = d3.svg.line()
            .x(function(d) {
                return xScale(d.Hour);
            })
            .y(function(d) {
                return yScale(d.y2014);
            })
            .interpolate("linear");
        }
        else if (currentColumn=='y2015') {
            var lineGen = d3.svg.line()
            .x(function(d) {
                return xScale(d.Hour);
            })
            .y(function(d) {
                return yScale(d.y2015);
            })
            .interpolate("linear");
        }
        else {
            var lineGen = d3.svg.line()
            .x(function(d) {
                return xScale(d.Hour);
            })
            .y(function(d) {
                return yScale(d.SO2);
            })
            .interpolate("linear");
        }
        // alert(region);
        region = getRegion(index);
        vis.append('svg:path')
            .attr('d', lineGen(output))
            .attr('stroke', heightColor[index])
            .attr('stroke-width', 3)
            .attr('fill', 'none')
            .attr('id', region);
        showArray[index] = 1;
        callback(showArray);
        });
}
function removeHourly(index, callback) {
    region = getRegion(index);
    d3.select("#"+region).remove();
    showArray[index] = 0;
    callback(showArray);
}

function removeAllLine() {
    for (var i=0; i<REGION_NUM; i++) {
        region = getRegion(i)
        d3.select("#"+region).remove();
    }
}

function getNewHourly(){
    removeAllLine();
    d3.selectAll("#donut").remove();
    regionHourlyController();
    for (var i=0; i < REGION_NUM; i++) {
        if (showArray[i] == 1) {
            addHourly(i,function(){});
        }
    }
}

function changeButtonColor(column) {
    var newBtn = document.getElementById(column);
    var oldBtn = document.getElementById(currentColumn);
    if (currentColumn != column) {
        newBtn.style.background="#F8FF57"
        oldBtn.style.background="#FFFFFF"
        currentColumn = column;
    }
}

function regionWeekdayController(){
    var LENGTH = 200
    var prop = []
    for (var i=0; i < REGION_NUM; i++) {
        prop.push(1);
    }
    var region = d3.select("#region").append("svg:svg")
        .attr("width", LENGTH).attr("height", LENGTH)
        .attr("id", "donut");
    var donutRadius = 200
    var arc = d3.svg.arc().innerRadius(50).outerRadius(100);

    var arcGroup = region.append("svg:g")
        .attr("class", "arcGroup")
        .attr("transform", "translate(" + LENGTH/2 + "," + LENGTH/2 + ")");

    var pie = d3.layout.pie()
        .sort(null);

    var path = arcGroup.selectAll("path")
        .data(pie(prop))
        .enter()
        .append("svg:path")
        .attr("d", arc)
        .attr("fill", function(d, i) {
            if (showArray[i] == 0) {
                return color[i];
            }
            else {
                return heightColor[i];
            }
        })
        .on("click", function(d, i){
            if (showArray[i] == 0) {
                addWeekday(i, function(showArray) {
                    d3.selectAll("#donut").remove();
                    regionWeekdayController();
                });
            }
            else {
                removeWeekday(i, function(d, i){
                    d3.selectAll("#donut").remove();
                    regionWeekdayController();
                });
            }
        })


    arcGroup.selectAll("text")
        .data(pie(prop))
        .enter()
        .append("svg:text")
        .attr("transform", function(d) {return "translate(" + arc.centroid(d) + ")"; })
        .attr("dy", ".35em")
        .attr("stroke-width", 0.5)
        .attr("text-anchor", "middle")
        .style("font-size","11px")
        .text(function(d, i) {return regionName[i]; })
        .on("click", function(d, i){
            if (showArray[i] == 0) {
                addWeekday(i, function(showArray) {
                    d3.selectAll("#donut").remove();
                    regionWeekdayController();
                });
            }
            else {
                removeWeekday(i, function(d, i){
                    d3.selectAll("#donut").remove();
                    regionWeekdayController();
                });
            }
        });

    
    arcGroup.append("text")
        .text("Region")
        .attr("text-anchor", "middle")
}

function initWeekdayChart(dataObject, callback) {
    var vis = d3.select("#visualisation");
        // xArray = [];
        // for (var i=1; i<=dataObject.length; i++) {
        //     xArray.push(i);
        // }
        xArray = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"]
        xScale = d3.scale.ordinal().rangeBands([MARGINS.left, WIDTH],1).domain(xArray),
        yScale = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([6, 16]),
        xAxis = d3.svg.axis()
        .scale(xScale),
        yAxis = d3.svg.axis()
        .scale(yScale)
        .orient("left");
    
    vis.append("svg:g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + (HEIGHT - MARGINS.bottom) + ")")
        .call(xAxis);
    vis.append("svg:g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + (MARGINS.left) + ",0)")
        .call(yAxis);
    var lineGen = d3.svg.line()
        .x(function(d) {
            return xScale(d.Weekday);
        })
        .y(function(d) {
            return yScale(d.SO2);
        })
        .interpolate("linear");

    vis.append('svg:path')
        .attr('d', lineGen(dataObject))
        .attr('stroke', heightColor[2])
        .attr('stroke-width', 3)
        .attr('fill', 'none')
        .attr('id','central');

    vis.append("text")
        .attr("class", "x label")
        .attr("arial", "middle")
        .attr("x", WIDTH/2)
        .attr("y", HEIGHT + 20)
        .text("Weekday");

    vis.append("text")
        .attr("class", "y label")
        .attr("arial", "middle")
        .attr("x", MARGINS.left - 5)
        .attr("y", MARGINS.top - 8)
        .text("SO2 concentration");

    callback(vis);
}
function initWeekday() {
    initUrl = "https://s3-ap-southeast-1.amazonaws.com/airpollution/weekday_central.csv"
    getCsv(initUrl, function(output){
        initWeekdayChart(output, function(vis){});
    });
}
function addWeekday(index, callback) {
    region = getRegion(index);
    Url = "https://s3-ap-southeast-1.amazonaws.com/airpollution/weekday_"+region+".csv";
    getCsv(Url, function(output){
        var vis = d3.select("#visualisation");
        if (currentColumn=='y2011') {
            var lineGen = d3.svg.line()
            .x(function(d) {
                return xScale(d.Weekday);
            })
            .y(function(d) {
                return yScale(d.y2011);
            })
            .interpolate("linear");
        }
        else if (currentColumn=='y2012') {
            var lineGen = d3.svg.line()
            .x(function(d) {
                return xScale(d.Weekday);
            })
            .y(function(d) {
                return yScale(d.y2012);
            })
            .interpolate("linear");
        }
         else if (currentColumn=='y2013') {
            var lineGen = d3.svg.line()
            .x(function(d) {
                return xScale(d.Weekday);
            })
            .y(function(d) {
                return yScale(d.y2013);
            })
            .interpolate("linear");
        }
        else if (currentColumn=='y2014') {
            var lineGen = d3.svg.line()
            .x(function(d) {
                return xScale(d.Weekday);
            })
            .y(function(d) {
                return yScale(d.y2014);
            })
            .interpolate("linear");
        }
        else if (currentColumn=='y2015') {
            var lineGen = d3.svg.line()
            .x(function(d) {
                return xScale(d.Weekday);
            })
            .y(function(d) {
                return yScale(d.y2015);
            })
            .interpolate("linear");
        }
        else {
            var lineGen = d3.svg.line()
            .x(function(d) {
                return xScale(d.Weekday);
            })
            .y(function(d) {
                return yScale(d.SO2);
            })
            .interpolate("linear");
        }
        region = getRegion(index);
        vis.append('svg:path')
            .attr('d', lineGen(output))
            .attr('stroke', heightColor[index])
            .attr('stroke-width', 3)
            .attr('fill', 'none')
            .attr('id', region);
        showArray[index] = 1;
        callback(showArray);
        });
}
function removeWeekday(index, callback) {
    region = getRegion(index);
    d3.select("#"+region).remove();
    showArray[index] = 0;
    callback(showArray);
}

function getNewWeekday(){
    removeAllLine();
    d3.selectAll("#donut").remove();
    regionWeekdayController();
    for (var i=0; i < REGION_NUM; i++) {
        if (showArray[i] == 1) {
            addWeekday(i,function(){});
        }
    }
}
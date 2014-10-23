var options = {
    height: 300,
    width: 600,
    rwidth: 60,
    xpadding: 20, ypadding: 50, rpadding: 5,
}
var data = [100, 90, 20, 80, 50, 20, 50, 20, 20];

var yscal = d3.scale.linear()
        .domain([0, d3.max(data)])
        .range([0, options.height - options.xpadding]);

var yscalX = d3.scale.linear()
        .domain([d3.max(data), 0])
        .range([0, options.height - options.xpadding]);

var xscal = d3.scale
        .ordinal()
        .domain(d3.range(0, data.length))
        .rangeBands([0, options.width - options.ypadding - (options.rpadding * data.length)],.1);

var colors = d3.scale.linear()
        .domain([d3.min(data), d3.max(data)])
        .range(["red", "blue"]);


var xscalx = d3.scale
        .ordinal()
        .domain(d3.range(0, data.length))
        .rangeBands([0, options.width - options.ypadding]);


var svg = d3.selectAll(".chart").append("svg")
        .style({
            "background": "#ccc", padding: "5px"
        })
        .attr({
            height: options.height + 5,
            width: options.width + 5
        });



var g = svg.selectAll("g")
        .data(data)
        .enter()
        .append("g");



var rect = g.append("rect")
        .attr({
            width: xscal.rangeBand(),
            height: function (d, i) {
                return yscal(d);
            }, x: function (d, i) {

                return options.ypadding + i * (xscal.rangeBand() + options.rpadding);

            }, y: function (d, i) {
                return  options.height - yscal(d) - options.xpadding;

            }
            , fill: function (d, i) {
                return colors(d);
            }

        }).on("mousemove", function () {
    d3.select(this.parentNode).selectAll("text")
            .transition().style({opacity: "1"});
}).on("mouseout", function () {
    d3.select(this.parentNode).selectAll("text")
            .transition()
            .style({opacity: "0"});
});

g.append("text")
        .text(function (d) {
            return d;
        }).style({
    "opacity": "0"
}).attr({
    width: xscal.rangeBand(),
    height: function (d, i) {
        return yscal(d);
    }, x: function (d, i) {

        return options.ypadding + i * (xscal.rangeBand() + options.rpadding);

    }, y: function (d, i) {
        return  options.height - yscal(d) - options.xpadding + 15;

    }
    , fill: "#fff"
});




var yAxis = d3.svg.axis().orient("left").scale(yscalX).ticks(6)
svg.append("g").classed({'axis': true, yaxis: true}).call(yAxis).attr({transform: "translate(" + (options.ypadding-5) + "," + (options.xpadding-15 ) + ")"});

var xAxis = d3.svg.axis().orient("bottom").scale(xscalx)
svg.append("g").classed({'axis': true, xaxis: true}).call(xAxis).attr({transform: "translate(" + options.ypadding + "," + (options.height - options.xpadding + 5) + ")"});


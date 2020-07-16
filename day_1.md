```html
<!doctype html>
<html>
<head>
    <script src="d3.v3.min.js" type="text/JavaScript"></script>
</head>
<body>
    <div id="vizcontainer">
        <svg style="width:500px;height:500px;border:1px lightgray solid;" />
    </div>
    
    <script>
    	d3.select("svg")
        .append("circle")
        .attr("r",20)
        .attr("cx",20)
        .attr("cy",20)
        .style("fill","red");

//글씨를 숨김
        d3.select("svg")
        .append("text")
        .attr("id","a")
        .attr("x",20)
        .attr("y",20)
        .style("opacity",0)
        .text("Hello World")

        d3.select("svg")
        .append("circle")
        .attr("r",100)
        .attr("cx",400)
        .attr("cy",400)
        .style("fill","lightblue");

//글씨를 숨김
        d3.select("svg")
        .append("text")
        .attr("id","b")
        .attr("x",400)
        .attr("y",400)
        .style("opacity",0)
        .text("Uh,hi");


        d3.select("#a")
        .transition()
        .delay(1000)
        .style("opacity",1);

        d3.select("#b")
        .transition()
        .delay(3000)
        .style("opacity",0.75)
        .style("font-size","30px");

        d3.selectAll("circle")
        .transition()
        .duration(5000)
        .attr("cy",200);
    </script>
</body>
</html>
```

막대그래프 그리기
스케일
```html
<!DOCTYPE html>
<html>
<head>
	<title>94p</title>
	<script src="d3.v3.min.js" type="text/javascript"></script>
</head>

<style>
  svg {
    height: 500px;
    width: 500px;
    border: 1px solid gray;
  }
</style>

<body>
<div>
	<svg>
		
	</svg>	
</div>

</body>

<footer>
	<script>
		var yScale = d3.scale.linear().domain([0,24500]).range([0,100]);


		d3.select("svg")
		.selectAll("rect")
		.data([14763,6863,24500,1607,990,12000,5555])
		.enter()
		.append("rect")
		.attr("width",10)
		.attr("height",function(d){return yScale(d);})
		.style("fill","blue")
		.style("stroke","red")
		.style("stroke-width","1px")
		.style("opacity",0.15)
		.attr("x",function(d,i){return i*10;})
		.attr("y",function(d){return 100-yScale(d);});
	</script>
</footer>

</html>

```

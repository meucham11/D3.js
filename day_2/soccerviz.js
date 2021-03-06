function createSoccerViz(){
	d3.csv("worldcup.csv",function(data){overallTeamViz(data);})

	function overallTeamViz(incomingData){
		d3.select("svg")
		.append("g")
		.attr("id","teamsG")
		.attr("transform","translate(50,300)")
		.selectAll("g")
		.data(incomingData)
		.enter()
		.append("g")
		.attr("class","overallG")
		.attr("transform",function(d,i){return "translate("+(i*50)+",0)"});

		var teamG = d3.selectAll("g.overallG");

		teamG
		.append("circle")
		.attr("r",0)
		.transition()
		.delay(function(d,i){return i*100})
		.duration(500)
		.attr("r",40)
		.transition()
		.duration(500)
		.attr("r",20)

		teamG
		.append("text")
		.style("text-anchor","middle")
		.attr("y",30)
		.text(function(d){return d.team;})

		//수치열만
		var dataKeys=d3.keys(incomingData[0]).filter(function(el){return el!='team' && el!='region';})


		//buttonClick - click effect
		d3.select("#controls")
		.selectAll("button")
		.data(dataKeys)
		.enter()
		.append("button")
		.on("click",buttonClick)
		.html(function(d){return d;}); 
		
		function buttonClick(datapoint){
			var maxValue = d3.max(incomingData, function(d){
				return parseFloat(d[datapoint]);
			});

			var radiusScale = d3.scale.linear().domain([0,maxValue]).range([2,20]);
			

			//둘중 골라 써보자
			var tenColorScale = d3.scale.category10(["UEFA","CONMEBOL","CAF","AFC"]);
	        var colorQuantize = d3.scale.quantize().domain([0,maxValue]).range(colorbrewer.Reds[4]);


			d3.selectAll("g.overallG")
			.select("circle")
			.transition().duration(1000)
			.style("fill",function(d){return colorQuantize(d[datapoint])})
			.attr("r",function(d){return radiusScale(d[datapoint]);});
		}

		//mouseover - highlightRegion
		/*teamG.on("mouseover",highlightRegion);
		function highlightRegion(d){
			d3.selectAll("g.overallG")
			.select("circle")
			.style("fill",function(p){return p.region==d.region ? "red":"gray";});
		};
		*/

		teamG.on("mouseover",highlightRegion);
		teamG.on("mouseout", unHighlight);

		function highlightRegion(d,i){
			var teamColor = d3.rgb("pink");
			d3.select(this)
			.select("text")
			.attr("y",10)
			.classed("highlight",true);

			/* html <style>에 정의 한 class를 키고 끄기
			d3.selectAll("g.overallG")
			.each(function(p,i){p.region==d.region ? 
				d3.select(this).select("circle").classed("active",true):
				d3.select(this).select("circle").classed("inactive",true);});
			*/

			//위와 다르게 색깔을 조절
			d3.selectAll("g.overallG")
			.select("circle")
			.style("fill",function(p){
							return p.region==d.region ?
							teamColor.darker(0.75):teamColor.brighter(0.5)
						  });


			//글씨가 다음 원의 뒤로 숨는거 해결
			this.parentElement.appendChild(this);
		}

	//mouseout
		function unHighlight(d) {
			d3.selectAll("g.overallG")
			.select("circle")
			.classed("active",false)
			.classed("inactive",false);

			d3.selectAll("g.overallG")
			.select("text")
			.attr("y",30)
			.classed("highlight",false);
		}

		d3.selectAll("g.overallG")
		.insert("image","text")
		.attr("xlink:href", function(d){
			return "images/" + d.team + ".png"
		})
		.attr("width","45px").attr("height","20px")
		.attr("x","-22").attr("y","-10");


	//표 추가
		d3.text("resources/modal.html",function(data){
			d3.select("body")
			.append("div")
			.attr("id","modal")
			.html(data);
		});

		teamG.on("click",teamClick);

		function teamClick(ck){
			d3.selectAll("td.data")
			.data(d3.values(ck))
			.html(function(p){return p;})

		}
	}
}
레이아웃

레이아웃은 데이터를 직접 그리지 않으며<br/>
컴포넌트처럼 호출하지않는다<br/>
또한, 생성기와 달리 그림을 그리는 코드 안에서 참조하지 않는다.<br/>
즉, 데이터를 이미 선택한 형식으로 력할 수 있게 포맷하는 처리 과정으로 생각하자<br/>

```
d3.select("g.axis")
.selectAll("text")
.attr("dx",50) //글씨 위치 조정
```


nest
```
d3.nest().key() : 데이터의 무엇을 key로 해서 데이터를 수집할 것인가.
.map vs .entries
```
http://bl.ocks.org/shancarter/raw/4748131
출처: https://visualize.tistory.com/397 [시각화를 배우고 정리합니다]


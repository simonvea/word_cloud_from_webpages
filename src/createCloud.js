const d3 = require("d3");
const cloud = require("d3-cloud");

export default function createCloud(words) {
  const svgWidth = 500;
  const svgHeight = 500;
  const paddingBetweenWords = 5;
  const rotationDeg = 90;
  const font = "Impact";
  console.log(words);
  const layout = cloud()
    .size([svgWidth,svgHeight])
    .words(words) //Each word needs to have the form: {text: "ord", size: 50, test: "haha"}
    .padding(paddingBetweenWords)
    .rotate(() => ~~(Math.random() * 4) * 45 - 45)
    .font(font)
    .fontSize(d => d.size)
    .on("end", draw);

  layout.start();

}

function draw(words) {
  const element = "#word-cloud"
  const svgWidth = 500;
  const svgHeight = 500;
  const font = "Impact";
  const textAnchor = "middle"



  d3.select("#word-cloud").append("svg")
      .attr("width", svgWidth)
      .attr("height", svgHeight)
    .append("g")
      .attr("transform", "translate(" + svgWidth / 2 + "," + svgHeight / 2 + ")")
    .selectAll("text")
      .data(words)
    .enter().append("text")
      .style("font-size", word => word.size + "px")
      .style("font-family", font)
      .attr("text-anchor", textAnchor)
      .attr("transform", (word) => {
        return "translate(" + [word.x, word.y] + ")rotate(" + word.rotate + ")";
      })
      .attr("fill", word => word.fill)
      .text(word => word.text);
}
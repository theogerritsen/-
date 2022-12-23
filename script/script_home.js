$(function (){
    $("#gotit").click(function(){
        $(".construction").toggleClass('active');
    })
})

const width = window.innerWidth, height = window.innerHeight;
const widthVW = window.innerWidth;
console.log(widthVW)
const path = d3.geoPath();
const projection = d3.geoNaturalEarth1()
    // permet de gérer l'échelle
    .center([8.19, 46.845]) // centré sur la suisse
    .scale(1)
    .translate([0, 0]);
path.projection(projection);
const svg = d3.select("#map").append("svg")
    .attr("id", "svg")
    .attr("width", width)
    .attr("height", height);
const menu = svg.append("g");

const div = d3.select("#mydiv");
const rect = d3.select("#rect");


let articles = document.getElementById("Articles")
let projects = document.getElementById("Projects")
let contact = document.getElementById("Contact Me")
let github = document.getElementById("GitHub")
let cv = document.getElementById("CV")
const promises = [];
let lines = d3.select("line");
promises.push(d3.json("assets/home/menu_suisse.geojson"));


Promise.all(promises).then(function(values) {
    const geojson = values[0];
    const b = path.bounds(geojson),
    s = 0.6 / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height),
    t = [(width - s * (b[1][0] + b[0][0])) / 1.9, (600 - s * (b[1][1] + b[0][1])) / 2];
    projection 
        .scale(s)
        .translate(t);
        //const tooltip = addTooltip();

        
    d3.select("#mydiv").style("left", "'" + function(d){
        return path.centroid(d)[0];
    } + "px'")
    
    menu.selectAll("path")
        .data(geojson.features)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("id", d => d.properties.NAME)

        
        .on("mouseover", mouseOver)
        //     menu.selectAll('path').attr('class', 'unselected');

        //     menu.selectAll('line').attr('class', 'line-selected');

        //     d3.select(this).attr('class', 'selected');

            

            
            
            
        //     // tooltip.style("display", null);
        //     // tooltip.select('#tooltip-canton')
        //     //     .text(d.target.id);
    
                
        //     menu.selectAll("text")
        //         .data(geojson.features)
        //         .enter()
        //         .append('svg:text')
        //         .attr('class', 'menu-text')
        //         .text(function(d) {
        //             return d.properties.NAME;
        //         })
        //         .attr("x", function(d) {
        //             return path.centroid(d)[0];
        //         })
        //         .attr("y", function(d) {
        //             return 20;
        //         })
        //         .attr("text-anchor", "middle")
        //         .attr("font-size", '20px')
        //         .attr("fill", 'white')
        //         .style('opacity', '1');
            
        // })
        // .on("mouseout", mouseLeave)
            // svg.selectAll('path').attr('class', 'unselected');
            // menu.selectAll('line').attr('y2', function(d){
            //     return path.centroid(d)[1];
            // })
            // menu.selectAll('text').style('opacity', '0')
            //tooltip.style("display", "none");
            
            
        // })
        .on("mouseleave", mouseLeave)
            // d3.mouse n'est plus une fonction gérée par la v6 -> utiliser d3.pointer(event)
            // déplace le tooltip selon la position du curseur
        //     const mouse = d3.pointer(event);
        //     // évite que le tooltip se retrouve sous le curseur de notre souris (avec le translate)
        //     //tooltip.attr("transform", "translate(" + (mouse[0]-100) + "," + (0) + ")");
        // })
        .on("click", function(evt) {
            let clicked = evt.target;
            let currentId = clicked.id
            if (currentId == 'Projects') {
                window.location.href = 'projects/projects.html'
            }
            if (currentId == 'Articles') {
                console.log('Articles')
            }
            if (currentId == 'GitHub') {
                window.location.href = 'https://github.com/theogerritsen'
            }
            if (currentId == 'CV') {
                window.location.href = 'cv/cv.html'
            }
            if (currentId == 'Contact Me') {
                alert('Contact Me')
            }
        })


    

})
let coords;

let mouseOver = function(event, d) {

    coords = path.centroid(d)[0];
    div.html(d.properties.NAME)
    div.style("left", coords - 100 + "px")
        .style("color", "white")
    d3.select(this)
      .style("opacity", 1)
      .style("fill", "#52ae7e");
    d3.select(this)
        .style("opacity", 1)
    rect.style("left", coords + "px")
        .style("top", "130px")
        .style("width", "6px")
        .style("height", path.centroid(d)[1] + "px")
        .style("background-color", "#fff")
    // menu.selectAll('line')
    //     .enter()
    //     .append('svg:line')
    //     .attr('x1', coords)
    //     .attr('y1', path.centroid(d)[1])
    //     .attr('x2', coords)
    //     .attr('y2', "30px")
    //     .attr('stroke', 'red')
    //     .attr('stroke-width', '2px')
    //     .style('opacity', '1');
    
    console.log(coords / width);
    console.log('y1', path.centroid(d)[1])
      
  }
//   menu.selectAll('line')
//         .data(geojson.features)
//         .enter()
//         .append('svg:line')
//         .attr('x1', function(d) {
//             const coordX1 = path.centroid(d)[0];
//             console.log('x1', coordX1)
//             return path.centroid(d)[0];
//         })
//         .attr('y1', function(d) {
//             return path.centroid(d)[1];
//         })
//         .attr('x2', function (d){
//             return path.centroid(d)[0];
//         })
//         .attr('y2', '30px')
//         .attr('class', 'lines')
//         .attr('stroke', 'red')
//         .attr('stroke-width', '2px')
//         .style('opacity', '1');
  let mouseLeave = function(d) {
    div.html(null)
    d3.select(this)
      .style("fill", "#192024");
    rect.style("height", "0px");
  }

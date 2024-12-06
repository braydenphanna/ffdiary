let roman = ["I","II","III","IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", 'XIII', "XIV", "XV", "XVI"];
init();
function init(){

    var lib = document.getElementById("library");
	for(var i =1; i<=16; i++)
	{
		var div = document.createElement("div")
		div.id = i;
        div.className = "libItem";
        div.textContent=""+ roman[i-1];
		div.onclick = function() {changeGameView(this.id);};
		lib.appendChild(div);
	}
	
}
function changeGameView(ID){

	fetch("./library.json")
	.then(res => res.json())
	.then(data =>{
		var gameView = document.getElementById("gameView");
		gameView.innerHTML="";
		for(var i = 1; i<=Object.keys(data[ID]).length; i++){
			var panel = document.createElement("div")
			panel.id = "gamePanel";

			var art = document.createElement("div")
			art.id = "gameArt";

			var borderBottom = document.createElement("div")
			borderBottom.id = "borderBottom";

			panel.appendChild(art);
			panel.appendChild(borderBottom);
			gameView.appendChild(panel);
		}	
		var footer = document.createElement("div")
		footer.id = "footer";
		gameView.appendChild(footer);
	});
}
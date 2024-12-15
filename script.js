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

	/*
	1)Cache STEAM APP IDS IN JSON FILE
	
	2)  Use below with REPLACE NUMBER WITH APP ID
	
	    CORSANYWHERE : https://cors-anywhere.herokuapp.com/
		
		https://cdn.cloudflare.steamstatic.com/steam/apps/39140/library_600x900_2x.jpg
	*/
	fetch("./library.json")
	.then(res => res.json())
	.then(data =>{
		var gameView = document.getElementById("gameView");
		gameView.innerHTML="";
		for(var i = 1; i<=Object.keys(data[ID]).length; i++){
			console.log("Attempting to retreive "+ data[ID][i]["title"]+ " image...");
			getGameArt(data[ID][i]["title"], data[ID][i]["steam"], data[ID][i]["app-id"]).then(blob => {
				var art = document.createElement("div")
				art.id = "gameArt";
				var panel = document.createElement("div")
				panel.id = "gamePanel";
				var borderBottom = document.createElement("div")
				borderBottom.id = "borderBottom";
			
				panel.appendChild(art);
				
				const img = document.createElement('img');
				img.src = URL.createObjectURL(blob);
				art.style.backgroundImage = "url("+img.src+")";

				
				panel.appendChild(borderBottom);
				gameView.appendChild(panel);

				console.log("success!");
			})
		}	
		var footer = document.createElement("div")
		footer.id = "footer";
		gameView.appendChild(footer);
	});
}
async function getGameArt(title, steam, appid){
	if(steam==="true"){
		const response =  await fetch("https://cdn.cloudflare.steamstatic.com/steam/apps/"+appid+"/library_600x900_2x.jpg")
		const blob = response.blob();
		return blob;
	}
	else{
		let id = "";
		await fetch("https://cors-anywhere.herokuapp.com/https://www.steamgriddb.com/api/v2/search/autocomplete/"+title,{ 
			headers: new Headers({
				'Authorization': 'Bearer ---------------------------------------------',
			})
		}).then(res => res.json())
		.then(data => {
			id = data["data"][0]["id"];
		});

		await fetch("https://cors-anywhere.herokuapp.com/https://www.steamgriddb.com/api/v2/grids/game/"+id,{ 
			headers: new Headers({
				'Authorization': 'Bearer ---------------------------------------------',',
			})
		}).then(data => {
			console.log(data);
		});
	}
}

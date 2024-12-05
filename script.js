init();
function init(){
    let roman = ["I","II","III","IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", 'XIII', "XIV", "XV", "XVI"];

    var lib = document.getElementById("library");
	for(var i =1; i<=16; i++)
	{
		var div = document.createElement("div")
		div.id = "ff"+i;
        div.className = "libItem";
        div.textContent="FINAL FANTASY "+ roman[i-1];
		lib.appendChild(div);
	}
}
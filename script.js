var key, message;
var array,k_array;
var pos1, pos2, pos3;

//Alfabet łaciński, 26 znaków podstawowych dla kompatybilności z oryginalnymi bębnami. Wykorzystywany w symulacji procesu szyfrowania
var alpha=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];


//Bębny szyfrujące, oryginalne z niemiec, Niemiec płakał jak sprzedawał.
//BĘBNY W PEŁNI SPRAWNE, PODMIANKA PONIŻEJ. MOŻNA TEŻ PODŁĄCZYĆ WIĘCEJ DO SZYFRATORA (TRUDNE I DUŻO ROBOTY Z TYM)
var drum1=["E","K","M","F","L","G","D","Q","V","Z","N","T","O","W","Y","H","X","U","S","P","A","I","B","R","C","J"];
var drum2=["A","J","D","K","S","I","R","U","X","B","L","H","W","T","M","C","Q","G","Z","N","P","Y","F","V","O","E"];
var drum3=["B","D","F","H","J","L","C","P","R","T","X","V","Z","N","Y","E","I","W","G","A","K","M","U","S","Q","O"];
var drum4=[ "E","S","O","V","P","Z","J","A","Y","Q","U","I","R","H","X","L","N","F","T","G","K","D","C","M","W","B"];
var drum5=[ "V","Z","B","R","G","I","T","Y","U","P","S","D","N","H","L","X","A","W","M","J","Q","O","F","E","C","K"];
var drum6=[ "J","P","G","V","O","U","M","F","Y","Q","B","E","N","H","Z","R","D","K","A","S","X","L","I","C","T","W"];
var drum7=[ "N","Z","J","H","G","R","C","X","M","Y","S","W","B","O","U","F","A","I","V","L","P","E","K","Q","D","T"];
var drum8=[ "F","K","Q","H","T","L","X","O","C","B","J","S","P","D","Z","R","A","M","E","W","N","I","U","Y","G","V"];

//PONIŻSZYCH 2 BĘBNÓW MOŻNA UŻYWAĆ TYLKO NA 3 POZYCJI! (Tak naprawdę to na 4)
var drumBeta=[ "L","E","Y","J","V","C","N","I","X","W","P","B","Q","M","D","R","T","A","K","Z","G","F","U","H","O","S"];
var drumGamma=[ "F","S","O","K","A","N","U","E","R","H","M","B","T","I","Y","C","W","L","Q","P","Z","X","V","G","J","D"];


//Bębny odwracające. Mają 13, zamiast 26 połączeń. Umożliwiają deszyfrację po tym samym wejściu
var drumB = ["Y", "R", "U", "H", "Q", "S", "L", "D", "P", "X", "N", "G", "O", "K", "M", "I", "E", "B", "F", "Z", "C", "W", "V", "J", "A", "T"];
var drumC = ["F", "V", "P", "J", "I", "A", "O", "Y", "E", "D", "R", "Z", "X", "W", "G", "C", "T", "K", "U", "Q", "S", "B", "N", "M", "H", "L"];
var drumB_D = ["E", "N", "K", "Q", "A", "U", "Y", "W", "J", "I", "C", "O", "P", "B", "L", "M", "D", "X", "Z", "V", "F", "T", "H", "R", "G", "S"];
var drumC_D = ["R", "D", "O", "B", "J", "N", "T", "K", "V", "E", "H", "M", "L", "F", "C", "W", "Z", "A", "X", "G", "Y", "I", "P", "S", "U", "Q"];


//Wybór bębnów maszyny(WIP)
var drum_a1 = drum3; 	//Bęben nr 1
var drum_a2 = drum2; 	//Bęben nr 2
var drum_a3 = drumBeta;	//Bęben nr 3
var drum_R = drumB;		//Bęben odwracający



//Symulacja działania ŁĄCZNICY WTYCZKOWEJ
//Wygenerowanie nowego alfabetu i jego modyfikacja przy użyciu łącznicy
var posL = null;
var alpha_N = alpha.slice(0);
function podmien(litera){
	litera=litera.toUpperCase();
	if(alpha_N.indexOf(litera)==alpha.indexOf(litera)){
		if(posL === null){
			posL = alpha.indexOf(litera);
			
		}
		else{
			alpha_N[posL]=litera;
			alpha_N[alpha.indexOf(litera)]=alpha[posL];
			//console.log(alpha_N);
			posL=null;
		}
	}
}

function rozpocznij(){
	key=document.getElementById("key").value;
	message=document.getElementById("msg").value;
	if (key=="" || message=="") document.getElementById("wynik").innerHTML="Nie podano wszystkich parametrów! Wprowadź dane i spróbuj ponownie!";
	else dziel(message,key);
}

function dziel(text,text2){
	text=text.toUpperCase();
	text2=text2.toUpperCase();
	
	array=text.split("");
	k_array=text2.split("");

	pos1 = parseInt(alpha.indexOf(k_array[2]));
	pos2 = parseInt(alpha.indexOf(k_array[1]));
	pos3 = parseInt(alpha.indexOf(k_array[0]));

	document.getElementById("wynik").innerHTML="Twoja wyczekiwana odpowiedź śmiałku to:  </br>" + szyfrujRekur(array.length);

	
}

function reconfig_drums(){
	pos1++;
	
	if(drum_a1==drum1 && pos1==24){
		pos2++;
	}
	if(drum_a1==drum2 && pos1==23){
		pos2++;
	}
	if(drum_a1==drum3 && pos1==18){
		pos2++;
	}
	if(drum_a1==drum4 && pos1==21){
		pos2++;
	}
	if(drum_a1==drum5 && pos1==17){
		pos2++;
	}
	if(drum_a1==drum6 && (pos1==19 || pos1==13)){
		pos2++;
	}
	if(drum_a1==drum7 && (pos1==17 || pos1==1)){
		pos2++;
	}
	if(drum_a1==drum8 && (pos1==17 || pos1==21)){
		pos2++;
	}
	
	if(drum_a2==drum1 && pos2==24){
		pos3++;
	}
	if(drum_a2==drum2 && pos2==23){
		pos3++;
	}
	if(drum_a2==drum3 && pos2==18){
		pos3++;
	}
	if(drum_a2==drum4 && pos2==21){
		pos3++;
	}
	if(drum_a2==drum5 && pos2==17){
		pos3++;
	}
	if(drum_a2==drum6 && (pos2==19 || pos2==13)){
		pos3++;
	}
	if(drum_a2==drum7 && (pos2==17 || pos2==1)){
		pos3++;
	}
	if(drum_a2==drum8 && (pos2==17 || pos2==21)){
		pos3++;
	}
	
	
	if(pos1>=drum_a1.length){
		pos1=0;
	}
	if(pos2>=drum_a2.length){
		pos2=0;
	}
	if(pos3>=drum_a3.length){
		pos3=0;
	}
}
//Pełny chwały tryb rekurencyjny
function szyfrujRekur(dlug){
	var exit;
	//console.log(alpha_N);
	reconfig_drums();

	
	if (array[array.length-dlug]!=" " && isNaN(parseInt(array[array.length-dlug]))!=false){
		//1 seria szyfrująca
		var s1=alpha_N.indexOf(array[array.length-dlug])-pos1;
		if (s1<0) s1=alpha_N.length+s1;
		var step1 = drum3[s1];	
		
		var s2=alpha.indexOf(step1)-pos2;
		if (s2<0) s2=alpha.length+s2;
		var step2 = drum2[s2];
		
		var s3=alpha.indexOf(step2)-pos3;
		if (s3<0) s3=alpha.length+s3;
		var step3 = drum1[s3];
		
		
		//bęben odwracający
		var step4 = drumB[alpha.indexOf(step3)];
		
		
		//2 seria szyfrująca
		var s5=drum1.indexOf(step4)+pos3;
		if (s5>=alpha.length) s5=s5-alpha.length;
		var step5 = alpha[s5];
		
		var s6=drum2.indexOf(step5)+pos2;
		if (s6>=alpha.length) s6=s6-alpha.length;
		var step6 = alpha[s6];
		
		var s7=drum3.indexOf(step6)+pos1;
		if (s7>=alpha_N.length) s7=s7-alpha_N.length;
		var step7 = alpha_N[s7];
		exit = step7;

	}
	else exit = array[array.length-dlug];
	
	if (dlug==1) return exit;
	return exit + szyfrujRekur(dlug-1);
	
}
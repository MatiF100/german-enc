var key, message;
var array,k_array;
var pos_1st, pos_2nd, pos_3rd;

//Latin alphabet. Used in encryption process
var alpha=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];


//Orginal, german encryption drums. All have 26 connections, which means every letter is changed into another one.
//All following drums are fully functional. They can be changed at will (Currently only by modification in code itself. More on that in line 32)
var drum1=["E","K","M","F","L","G","D","Q","V","Z","N","T","O","W","Y","H","X","U","S","P","A","I","B","R","C","J"];
var drum2=["A","J","D","K","S","I","R","U","X","B","L","H","W","T","M","C","Q","G","Z","N","P","Y","F","V","O","E"];
var drum3=["B","D","F","H","J","L","C","P","R","T","X","V","Z","N","Y","E","I","W","G","A","K","M","U","S","Q","O"];
var drum4=["E","S","O","V","P","Z","J","A","Y","Q","U","I","R","H","X","L","N","F","T","G","K","D","C","M","W","B"];
var drum5=["V","Z","B","R","G","I","T","Y","U","P","S","D","N","H","L","X","A","W","M","J","Q","O","F","E","C","K"];
var drum6=["J","P","G","V","O","U","M","F","Y","Q","B","E","N","H","Z","R","D","K","A","S","X","L","I","C","T","W"];
var drum7=["N","Z","J","H","G","R","C","X","M","Y","S","W","B","O","U","F","A","I","V","L","P","E","K","Q","D","T"];
var drum8=["F","K","Q","H","T","L","X","O","C","B","J","S","P","D","Z","R","A","M","E","W","N","I","U","Y","G","V"];

//Following 2 drums can only be used on last position (Reversing drum doesn't count there)
var drumBeta=[ "L","E","Y","J","V","C","N","I","X","W","P","B","Q","M","D","R","T","A","K","Z","G","F","U","H","O","S"];
var drumGamma=["F","S","O","K","A","N","U","E","R","H","M","B","T","I","Y","C","W","L","Q","P","Z","X","V","G","J","D"];


//Reversing drums. Comparing them to standard ones, they only have 13 instead of 26 connections and they are not rotating. Their primary role is to allow using the same input for encryption and decryption.
var drumB = ["Y", "R", "U", "H", "Q", "S", "L", "D", "P", "X", "N", "G", "O", "K", "M", "I", "E", "B", "F", "Z", "C", "W", "V", "J", "A", "T"];
var drumC = ["F", "V", "P", "J", "I", "A", "O", "Y", "E", "D", "R", "Z", "X", "W", "G", "C", "T", "K", "U", "Q", "S", "B", "N", "M", "H", "L"];
var drumB_D = ["E", "N", "K", "Q", "A", "U", "Y", "W", "J", "I", "C", "O", "P", "B", "L", "M", "D", "X", "Z", "V", "F", "T", "H", "R", "G", "S"];
var drumC_D = ["R", "D", "O", "B", "J", "N", "T", "K", "V", "E", "H", "M", "L", "F", "C", "W", "Z", "A", "X", "G", "Y", "I", "P", "S", "U", "Q"];


//Here you can choose drums used by machine. Drums are counted from left to right (WIP)
var drum_a1 = drum3; 	//Drum no. 1
var drum_a2 = drum2; 	//Drum no. 2
var drum_a3 = drumBeta;	//Drum no. 3
var drum_R = drumB;		//Reversing drum



//Simulation of PLUG SWITCHBOARD
//New alphabet is generated and modified in real time using ugly html based switchboard interface.
var char_pos = null;
var alpha_N = alpha.slice(0);
function substitute(letter){
	letter=letter.toUpperCase();
	if(alpha_N.indexOf(letter)==alpha.indexOf(letter)){
		if(char_pos === null){
			char_pos = alpha.indexOf(letter);
			
		}
		else{
			alpha_N[char_pos]=letter;
			alpha_N[alpha.indexOf(letter)]=alpha[char_pos];
			//console.log(alpha_N);
			char_pos=null;
		}
	}
}

function start(){
	key=document.getElementById("key").value;
	message=document.getElementById("msg").value;
	if (key=="" || message=="") document.getElementById("result").innerHTML="Not every parameter was entered! Enter all parameters and try again!";
	else divide(message,key);
}

function divide(text,text2){
	text=text.toUpperCase();
	text2=text2.toUpperCase();
	
	array=text.split("");
	k_array=text2.split("");

	pos_1st = parseInt(alpha.indexOf(k_array[2]));
	pos_2nd = parseInt(alpha.indexOf(k_array[1]));
	pos_3rd = parseInt(alpha.indexOf(k_array[0]));

	document.getElementById("result").innerHTML="Your message is now:  </br>" + run_Encryption(array.length);

	
}

//Before each letter is encoded/decoded the arrangement of the drums is being changed. This function is based on real german drums design which were always rotating in specified location(This location being different to some drums was proven to be one of ENIGMA weaknesses).
function reconfig_drums(){
	pos_1st++;
	
	if(drum_a1==drum1 && pos_1st==24){
		pos_2nd++;
	}
	if(drum_a1==drum2 && pos_1st==23){
		pos_2nd++;
	}
	if(drum_a1==drum3 && pos_1st==18){
		pos_2nd++;
	}
	if(drum_a1==drum4 && pos_1st==21){
		pos_2nd++;
	}
	if(drum_a1==drum5 && pos_1st==17){
		pos_2nd++;
	}
	if(drum_a1==drum6 && (pos_1st==19 || pos_1st==13)){
		pos_2nd++;
	}
	if(drum_a1==drum7 && (pos_1st==17 || pos_1st==1)){
		pos_2nd++;
	}
	if(drum_a1==drum8 && (pos_1st==17 || pos_1st==21)){
		pos_2nd++;
	}
	
	if(drum_a2==drum1 && pos_2nd==24){
		pos_3rd++;
	}
	if(drum_a2==drum2 && pos_2nd==23){
		pos_3rd++;
	}
	if(drum_a2==drum3 && pos_2nd==18){
		pos_3rd++;
	}
	if(drum_a2==drum4 && pos_2nd==21){
		pos_3rd++;
	}
	if(drum_a2==drum5 && pos_2nd==17){
		pos_3rd++;
	}
	if(drum_a2==drum6 && (pos_2nd==19 || pos_2nd==13)){
		pos_3rd++;
	}
	if(drum_a2==drum7 && (pos_2nd==17 || pos_2nd==1)){
		pos_3rd++;
	}
	if(drum_a2==drum8 && (pos_2nd==17 || pos_2nd==21)){
		pos_3rd++;
	}
	
	
	if(pos_1st>=drum_a1.length){
		pos_1st=0;
	}
	if(pos_2nd>=drum_a2.length){
		pos_2nd=0;
	}
	if(pos_3rd>=drum_a3.length){
		pos_3rd=0;
	}
}
//Encrypting was realised using recursive function. It just encodes all letters of original message "char by char" until there is no more characters in array left. 
//Spaces and numbers are ommited.
function run_Encryption(steps){
	var exit;
	//console.log(alpha_N);
	reconfig_drums();

	
	if (array[array.length-steps]!=" " && isNaN(parseInt(array[array.length-steps]))!=false){
		//1st encrypting sequence
		var s1=alpha_N.indexOf(array[array.length-steps])-pos_1st;
		if (s1<0) s1=alpha_N.length+s1;
		var step1 = drum3[s1];	
		
		var s2=alpha.indexOf(step1)-pos_2nd;
		if (s2<0) s2=alpha.length+s2;
		var step2 = drum2[s2];
		
		var s3=alpha.indexOf(step2)-pos_3rd;
		if (s3<0) s3=alpha.length+s3;
		var step3 = drum1[s3];
		
		
		//Chars getting through reversing drum
		var step4 = drumB[alpha.indexOf(step3)];
		
		
		//2nd encrypting sequence
		var s5=drum1.indexOf(step4)+pos_3rd;
		if (s5>=alpha.length) s5=s5-alpha.length;
		var step5 = alpha[s5];
		
		var s6=drum2.indexOf(step5)+pos_2nd;
		if (s6>=alpha.length) s6=s6-alpha.length;
		var step6 = alpha[s6];
		
		var s7=drum3.indexOf(step6)+pos_1st;
		if (s7>=alpha_N.length) s7=s7-alpha_N.length;
		var step7 = alpha_N[s7];
		exit = step7;

	}
	else exit = array[array.length-steps];
	
	if (steps==1) return exit;
	return exit + run_Encryption(steps-1);
	
}
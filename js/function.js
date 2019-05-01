// グローバル変数
var gChangeFlg = false;	// ラジオボックスが変更された時
var paramArray = new Object();	// URLのパラメータ
paramArray["p1"] = -1;
paramArray["p2"] = -1;
paramArray["p3"] = -1;

// ルーン表示flg初期化
function runeinit(){
	for(var i=0;i<4;i++){
		for(var j=1;j<=71;j++){
			runetree[i][j][0] = 0;
		}
	}
}

// 強化値表示
function dispdata(){

	var ka = 0;		// 覺醒值
	var khp = 0;	// HP固定値
	var kbk = 0;	// 物攻固定値
	var kmk = 0;	// 魔攻固定値
	var kbb = 0;	// 物防固定値
	var kmb = 0;	// 魔防固定値
	var kti = 0;	// 知力
	var bhp = 0;	// HP倍率
	var bbk = 0;	// 物攻倍率
	var bmk = 0;	// 魔攻倍率
	var bbb = 0;	// 物防倍率
	var bmb = 0;	// 魔防倍率
	var bdz = 0;	// 增傷
	var bdg = 0;	// 減傷
	var bsy = 0;	// 召喚倍率
	var gold = 0;	// 需要金幣

	var runecount = new Array(37);
	for(var i=0;i<37;i++){
		runecount[i] = 0;
	}

	for(var i=0;i<4;i++){
		for(var j=1;j<=71;j++){
			if(runetree[i][j][0] == 1){
				gold += runetree[i][j][7];
				switch(runelist[runetree[i][j][1]][4]){
					case RUNE_KOTEI:
						switch(runelist[runetree[i][j][1]][2]){
							case RUNE_HP:
								khp += runelist[runetree[i][j][1]][3];
								break;
							case RUNE_BK:
								kbk += runelist[runetree[i][j][1]][3];
								break;
							case RUNE_MK:
								kmk += runelist[runetree[i][j][1]][3];
								break;
							case RUNE_BB:
								kbb += runelist[runetree[i][j][1]][3];
								break;
							case RUNE_MB:
								kmb += runelist[runetree[i][j][1]][3];
								break;
							case RUNE_TI:
								kti += runelist[runetree[i][j][1]][3];
								break;
							case RUNE_KA:
								ka += runelist[runetree[i][j][1]][3];
								break;
						}
						break;
					case RUNE_BAI:
						switch(runelist[runetree[i][j][1]][2]){
							case RUNE_HP:
								bhp += runelist[runetree[i][j][1]][3];
								break;
							case RUNE_BK:
								bbk += runelist[runetree[i][j][1]][3];
								break;
							case RUNE_MK:
								bmk += runelist[runetree[i][j][1]][3];
								break;
							case RUNE_BB:
								bbb += runelist[runetree[i][j][1]][3];
								break;
							case RUNE_MB:
								bmb += runelist[runetree[i][j][1]][3];
								break;
							case RUNE_DZ:
								bdz += runelist[runetree[i][j][1]][3];
								break;
							case RUNE_DG:
								bdg += runelist[runetree[i][j][1]][3];
								break;
							case RUNE_SY:
								bsy += runelist[runetree[i][j][1]][3];
								break;
						}
						break;
				}
				
				runecount[runetree[i][j][1]] += 1;
				
			}
		}
	}

	var output_html = "需要覺醒値 : " + ka + "<br>";
	if (khp != 0) {output_html += "ＨＰ : " + khp + "<br>";}
	if (bhp != 0) {output_html += "ＨＰ : " + bhp + "％ <br>";}
	if (kbk != 0) {output_html += "物理攻撃力 : " + kbk + "<br>";}
	if (bbk != 0) {output_html += "物理攻撃力 : " + bbk + "％ <br>";}
	if (kmk != 0) {output_html += "魔法攻撃力 : " + kmk + "<br>";}
	if (bmk != 0) {output_html += "魔法攻撃力 : " + bmk + "％ <br>";}
	if (kbb != 0) {output_html += "物理防御力 : " + kbb + "<br>";}
	if (bbb != 0) {output_html += "物理防御力 : " + bbb + "％ <br>";}
	if (kmb != 0) {output_html += "魔法防御力 : " + kmb + "<br>";}
	if (bmb != 0) {output_html += "魔法防御力 : " + bmb + "％ <br>";}
	if (kti != 0) {output_html += "智力 : " + kti + "<br>";}
	if (bdz != 0) {output_html += "增傷 : " + bdz + "％ <br>";}
	if (bdg != 0) {output_html += "減傷 : " + bdg + "％ <br>";}
	if (bsy != 0) {output_html += "召喚倍率 : " + bsy + "％ <br>";}
	if (gold != 0) {output_html += "需要金幣 : " + gold + "<br>";}
	document.getElementById("output").innerHTML = output_html;
	
	var output_html = "";
	for(i=1;i<37;i++){
		if (runecount[i] != 0) {output_html += runelist[i][1] + " : " + runecount[i] + "個 <br>";}
	}
	document.getElementById("output2").innerHTML = output_html;

}

// 子をたどって覚醒ルーンの手前までを埋める
function parton(num1,num2){
	for(var i=4;i<=6;i++){
		if(runetree[num1][num2][i] != -1){
			if(runetree[num1][runetree[num1][num2][i]][1] != 31 && runetree[num1][runetree[num1][num2][i]][1] != 32 && runetree[num1][runetree[num1][num2][i]][1] != 33){
				if(runetree[num1][runetree[num1][num2][i]][0] == 0){
					runetree[num1][runetree[num1][num2][i]][0] = 1;
					document.getElementById("rune"+num1+"_"+runetree[num1][num2][i]).src = "image/"+runetree[num1][runetree[num1][num2][i]][1]+".png";
				}
				parton(num1,runetree[num1][num2][i]);
			}
		} else {
			return;
		}
	}
}

// 親をたどって全て表示flgオンにする
function rooton(num1,num2){
	
	runetree[num1][num2][0] = 1;
	document.getElementById("rune"+num1+"_"+num2).src = "image/"+runetree[num1][num2][1]+".png";
	
	// チェックボックスがオンなら枝も埋める
	if(document.form1.autocheck.checked){
		parton(num1,num2);
	}
	
	if(runetree[num1][num2][3] == 0){
		return;
	} else {
		rooton(num1,runetree[num1][num2][3]);
	}
}

// 子をたどって全て表示flgオフにする
function rootoff(num1,num2){
	
	runetree[num1][num2][0] = 0;
	document.getElementById("rune"+num1+"_"+num2).src = "image/n"+runetree[num1][num2][1]+".png";
	
	for(var i=4;i<=6;i++){
		if(runetree[num1][num2][i] == -1){
			return;
		} else if (runetree[num1][runetree[num1][num2][i]][0] == 0){
			continue;
		} else {
			rootoff(num1,runetree[num1][num2][i]);
		}
	}
}

// ルーンクリック
function clickrune(num1,num2){
	
	if (runetree[num1][num2][0] == 0) {
		rooton(num1,num2);
	} else {
		rootoff(num1,num2);
	}
	
	dispdata();
}

// セレクトボックス変更
function selectchange(){
	initimage(Number(document.getElementById("selectC").value));
}

// ルーンマップ初期化
function initimage(num1){
	var runeimage_html = "";
	var num2 = 0;
	var rune = 0;
	
	var selectrare = rarecheck(num1);
	if(selectrare == 2) {
		num1 = num1 + 1;
	}
	
	if(selectrare == 0){
		runeimage_html += '<img id="tree" src="image/tree4.png">';
	} else {
		runeimage_html += '<img id="tree" src="image/tree.png">';
	}
	if(document.getElementById("radioh").checked){
		for(var j=1;j<=4;j++){
			for(var i=1;i<=71;i++){
				if(selectrare == 0 && i == 38) {i = 44;}
				if(selectrare == 0 && i == 66) {break;}
				rune = (j - 1) + "_" + i;
				if(i == 18){
				   	num2 = 6 * j - 1;
				   	runetree[j-1][i][1] = wapondata[num1][num2];
				   	runeimage_html += "<img id='rune"+ rune +"' src='image/n"+wapondata[num1][num2]+".png' alt='"+runelist[wapondata[num1][num2]][1]+"' title='"+runelist[wapondata[num1][num2]][1]+"' onClick='clickrune("+(j-1)+","+i+")'>";
			   	} else if(i == 29) {
			   		num2 = 6 * j;
			   		runetree[j-1][i][1] = wapondata[num1][num2];
			   		runeimage_html += "<img id='rune"+ rune +"' src='image/n"+wapondata[num1][num2]+".png' alt='"+runelist[wapondata[num1][num2]][1]+"' title='"+runelist[wapondata[num1][num2]][1]+"' onClick='clickrune("+(j-1)+","+i+")'>";
			   	} else if(i == 43) {
			   		num2 = 6 * j + 1;
			   		runetree[j-1][i][1] = wapondata[num1][num2];
			   		runeimage_html += "<img id='rune"+ rune +"' src='image/n"+wapondata[num1][num2]+".png' alt='"+runelist[wapondata[num1][num2]][1]+"' title='"+runelist[wapondata[num1][num2]][1]+"' onClick='clickrune("+(j-1)+","+i+")'>";
			   	} else if(i == 46) {
				   	num2 = 6 * j + 2;
				   	runetree[j-1][i][1] = wapondata[num1][num2];
				   	runeimage_html += "<img id='rune"+ rune +"' src='image/n"+wapondata[num1][num2]+".png' alt='"+runelist[wapondata[num1][num2]][1]+"' title='"+runelist[wapondata[num1][num2]][1]+"' onClick='clickrune("+(j-1)+","+i+")'>";
			   	} else if(i == 57) {
			   		num2 = 6 * j + 3;
			   		
			   		//--------------------魔法防御型タンクの知力ルーン暫定対応--------------------
					if(document.getElementById("selectR").value == 0 && j == 1 && wapondata[num1][num2] == 12) {
						runetree[j-1][i][1] = 11;
						runeimage_html += "<img id='rune"+ rune +"' src='image/n11.png' alt='"+runelist[11][1]+"' title='"+runelist[11][1]+"' onClick='clickrune("+(j-1)+","+i+")'>";
					} else {
						runetree[j-1][i][1] = wapondata[num1][num2];
						runeimage_html += "<img id='rune"+ rune +"' src='image/n"+wapondata[num1][num2]+".png' alt='"+runelist[wapondata[num1][num2]][1]+"' title='"+runelist[wapondata[num1][num2]][1]+"' onClick='clickrune("+(j-1)+","+i+")'>";
					}
			   		
			   		//runetree[j-1][i][1] = wapondata[num1][num2];
			   		//runeimage_html += "<img id='rune"+ rune +"' src='image/n"+wapondata[num1][num2]+".png' alt='"+runelist[wapondata[num1][num2]][1]+"' title='"+runelist[wapondata[num1][num2]][1]+"' onClick='clickrune("+(j-1)+","+i+")'>";
			   		
			   	} else if(i == 71) {
			   		num2 = 6 * j + 4;
			   		runetree[j-1][i][1] = wapondata[num1][num2];
			   		runeimage_html += "<img id='rune"+ rune +"' src='image/n"+wapondata[num1][num2]+".png' alt='"+runelist[wapondata[num1][num2]][1]+"' title='"+runelist[wapondata[num1][num2]][1]+"' onClick='clickrune("+(j-1)+","+i+")'>";
			   	} else {
			   		runetree[j-1][i][1] = waponconst[wapondata[num1][j]][i];
			   		runeimage_html += "<img id='rune"+ rune +"' src='image/n"+waponconst[wapondata[num1][j]][i]+".png' alt='"+runelist[waponconst[wapondata[num1][j]][i]][1]+"' title='"+runelist[waponconst[wapondata[num1][j]][i]][1]+"' onClick='clickrune("+(j-1)+","+i+")'>";
			   	}
			}
		}
	} else {
		for(var j=1;j<=4;j++){
			for(var i=1;i<=71;i++){
				if(selectrare == 0 && i == 38) {i = 44;}
				if(selectrare == 0 && i == 66) {break;}
				rune = (j - 1) + "_" + i;
				if(i == 18){
				   	num2 = 6 * j - 1;
				   	runetree[j-1][i][1] = wapondataB[num1][num2];
				   	runeimage_html += "<img id='rune"+ rune +"' src='image/n"+wapondataB[num1][num2]+".png' alt='"+runelist[wapondataB[num1][num2]][1]+"' title='"+runelist[wapondataB[num1][num2]][1]+"' onClick='clickrune("+(j-1)+","+i+")'>";
			   	} else if(i == 29) {
			   		num2 = 6 * j;
			   		runetree[j-1][i][1] = wapondataB[num1][num2];
			   		runeimage_html += "<img id='rune"+ rune +"' src='image/n"+wapondataB[num1][num2]+".png' alt='"+runelist[wapondataB[num1][num2]][1]+"' title='"+runelist[wapondataB[num1][num2]][1]+"' onClick='clickrune("+(j-1)+","+i+")'>";
			   	} else if(i == 43) {
			   		num2 = 6 * j + 1;
			   		runetree[j-1][i][1] = wapondataB[num1][num2];
			   		runeimage_html += "<img id='rune"+ rune +"' src='image/n"+wapondataB[num1][num2]+".png' alt='"+runelist[wapondataB[num1][num2]][1]+"' title='"+runelist[wapondataB[num1][num2]][1]+"' onClick='clickrune("+(j-1)+","+i+")'>";
			   	} else if(i == 46) {
				   	num2 = 6 * j + 2;
				   	runetree[j-1][i][1] = wapondataB[num1][num2];
				   	runeimage_html += "<img id='rune"+ rune +"' src='image/n"+wapondataB[num1][num2]+".png' alt='"+runelist[wapondataB[num1][num2]][1]+"' title='"+runelist[wapondataB[num1][num2]][1]+"' onClick='clickrune("+(j-1)+","+i+")'>";
			   	} else if(i == 57) {
			   		num2 = 6 * j + 3;
			   		
			   		//--------------------魔法防御型タンクの知力ルーン暫定対応--------------------
					if(document.getElementById("selectR").value == 0 && j == 1 && wapondataB[num1][num2] == 12) {
						runetree[j-1][i][1] = 11;
						runeimage_html += "<img id='rune"+ rune +"' src='image/n11.png' alt='"+runelist[11][1]+"' title='"+runelist[11][1]+"' onClick='clickrune("+(j-1)+","+i+")'>";
					} else {
						runetree[j-1][i][1] = wapondataB[num1][num2];
						runeimage_html += "<img id='rune"+ rune +"' src='image/n"+wapondataB[num1][num2]+".png' alt='"+runelist[wapondataB[num1][num2]][1]+"' title='"+runelist[wapondataB[num1][num2]][1]+"' onClick='clickrune("+(j-1)+","+i+")'>";
					}
			   		
			   		//runetree[j-1][i][1] = wapondataB[num1][num2];
			   		//runeimage_html += "<img id='rune"+ rune +"' src='image/n"+wapondataB[num1][num2]+".png' alt='"+runelist[wapondataB[num1][num2]][1]+"' title='"+runelist[wapondataB[num1][num2]][1]+"' onClick='clickrune("+(j-1)+","+i+")'>";
			   		
			   	} else if(i == 71) {
			   		num2 = 6 * j + 4;
			   		runetree[j-1][i][1] = wapondataB[num1][num2];
			   		runeimage_html += "<img id='rune"+ rune +"' src='image/n"+wapondataB[num1][num2]+".png' alt='"+runelist[wapondataB[num1][num2]][1]+"' title='"+runelist[wapondataB[num1][num2]][1]+"' onClick='clickrune("+(j-1)+","+i+")'>";
			   	} else {
			   		runetree[j-1][i][1] = waponconst[wapondataB[num1][j]][i];
			   		runeimage_html += "<img id='rune"+ rune +"' src='image/n"+waponconst[wapondataB[num1][j]][i]+".png' alt='"+runelist[waponconst[wapondataB[num1][j]][i]][1]+"' title='"+runelist[waponconst[wapondataB[num1][j]][i]][1]+"' onClick='clickrune("+(j-1)+","+i+")'>";
			   	}
			}
		}
	}
	
	document.getElementById("runeimage").innerHTML = runeimage_html;
	runeinit();
	document.getElementById("output").innerHTML = "覚醒値 : 0";
	document.getElementById("output2").innerHTML = "";
}

// レアリティチェック
function rarecheck(num1){

	var rare_html = '<select id="selectR" size="1" onchange="selectchange();">';
	var selectrare = 0;
	
	var rare4check = false;
	var rare5check = false;
	var rare6check = false;
	
	if(document.getElementById("radioh").checked){
		if(wapondata[num1][1] != 0){
			rare4check = true;
		}
		
		if(wapondata[num1][7] != 0){
			rare5check = true;
		}
		
		if(wapondata[num1+1][1] != 0){
			rare6check = true;
		}
	} else {
		if(wapondataB[num1][1] != 0){
			rare4check = true;
		}
		
		if(wapondataB[num1][7] != 0){
			rare5check = true;
		}
		
		if(wapondataB[num1+1][1] != 0){
			rare6check = true;
		}
	}
	
	if(document.getElementById("selectR") != null) {
		if(document.getElementById("selectR").value == 0) {
			if(rare4check) {
				if(gChangeFlg){
					if(rare5check){
						rare_html += '<option value="0" label="☆４">☆４</option>';
						rare_html += '<option value="1" label="☆５" selected>☆５</option>';
						selectrare = 1;
					} else {
						rare_html += '<option value="0" label="☆４" selected>☆４</option>';
						selectrare = 0;
					}
				} else {
					rare_html += '<option value="0" label="☆４" selected>☆４</option>';
					if(rare5check){
						rare_html += '<option value="1" label="☆５">☆５</option>';
					}
					selectrare = 0;
				}
				if(rare6check){
					rare_html += '<option value="2" label="☆６">☆６</option>';
				}
			} else {
				rare_html += '<option value="2" label="☆６" selected>☆６</option>';
				selectrare = 2;
			}
		} else if(document.getElementById("selectR").value == 1) {
			if(rare5check) {
				rare_html += '<option value="0" label="☆４">☆４</option>';
				rare_html += '<option value="1" label="☆５" selected>☆５</option>';
				selectrare = 1;
				if(rare6check){
					rare_html += '<option value="2" label="☆６">☆６</option>';
				}
			} else if(rare4check) {
				rare_html += '<option value="0" label="☆４" selected>☆４</option>';
				selectrare = 0;
				if(rare6check){
					rare_html += '<option value="2" label="☆６">☆６</option>';
				}
			} else if(rare6check) {
				rare_html += '<option value="2" label="☆６" selected>☆６</option>';
				selectrare = 2;
			}
		} else {
			if(rare6check) {
				if(rare5check) {
					rare_html += '<option value="0" label="☆４">☆４</option>';
					rare_html += '<option value="1" label="☆５">☆５</option>';
				} else if(rare4check) {
					rare_html += '<option value="0" label="☆４">☆４</option>';
				}
				rare_html += '<option value="2" label="☆６" selected>☆６</option>';
				selectrare = 2;
			} else {
				if(rare5check) {
					rare_html += '<option value="0" label="☆４">☆４</option>';
					rare_html += '<option value="1" label="☆５" selected>☆５</option>';
					selectrare = 1;
				} else if(rare4check) {
					rare_html += '<option value="0" label="☆４" selected>☆４</option>';
					selectrare = 0;
				}
			}
		}
	} else {
		if(rare4check) {
			rare_html += '<option value="0" label="☆４">☆４</option>';
			rare_html += '<option value="1" label="☆５" selected>☆５</option>';
			if(rare6check){
				rare_html += '<option value="2" label="☆６">☆６</option>';
			}
			selectrare = 1;
		} else {
			rare_html += '<option value="2" label="☆６" selected>☆６</option>';
			selectrare = 2;
		}
	}
	rare_html += "</select>";
	document.getElementById("td2").innerHTML = rare_html;
	
	gChangeFlg = false;
	
	if (paramArray.p3 != -1) {
		document.getElementById('selectR').value = paramArray.p3;
		selectrare = paramArray.p3;
		paramArray.p3 = -1;
	}
	
	return selectrare;
}

// 種族一覧
function selectHero(){

	var select_html = '<select id="selectC" size="1" onchange="selectchange();">';
	
	select_html += '<optgroup label="人類">';
	for(var i=0;i<charlistH.length;i++){
		if(wapondata[charlistH[i][0]][1] != 0 || wapondata[charlistH[i][0]+1][1] != 0){
			select_html += "<option value="+charlistH[i][0]+" label="+charlistH[i][1]+" >"+charlistH[i][1]+"</option>";
		}
	}
	select_html += '<optgroup label="精靈">';
	for(var i=0;i<charlistE.length;i++){
		if(wapondata[charlistE[i][0]][1] != 0 || wapondata[charlistE[i][0]+1][1] != 0){
			select_html += "<option value="+charlistE[i][0]+" label="+charlistE[i][1]+" >"+charlistE[i][1]+"</option>";
		}
	}
	select_html += '<optgroup label="矮人">';
	for(var i=0;i<charlistD.length;i++){
		if(wapondata[charlistD[i][0]][1] != 0 || wapondata[charlistD[i][0]+1][1] != 0){
			select_html += "<option value="+charlistD[i][0]+" label="+charlistD[i][1]+" >"+charlistD[i][1]+"</option>";
		}
	}
	select_html += '<optgroup label="獸人">';
	for(var i=0;i<charlistO.length;i++){
		if(wapondata[charlistO[i][0]][1] != 0 || wapondata[charlistO[i][0]+1][1] != 0){
			select_html += "<option value="+charlistO[i][0]+" label="+charlistO[i][1]+" >"+charlistO[i][1]+"</option>";
		}
	}
	select_html += '<optgroup label="蜥蜴人">';
	for(var i=0;i<charlistR.length;i++){
		if(wapondata[charlistR[i][0]][1] != 0 || wapondata[charlistR[i][0]+1][1] != 0){
			select_html += "<option value="+charlistR[i][0]+" label="+charlistR[i][1]+" >"+charlistR[i][1]+"</option>";
		}
	}
	select_html += '<optgroup label="蓋西">';
	for(var i=0;i<charlistG.length;i++){
		if(wapondata[charlistG[i][0]][1] != 0 || wapondata[charlistG[i][0]+1][1] != 0){
			select_html += "<option value="+charlistG[i][0]+" label="+charlistG[i][1]+" >"+charlistG[i][1]+"</option>";
		}
	}
	
	select_html += '</select>';
	document.getElementById("td1").innerHTML = select_html;
	
	gChangeFlg = true;
	
	if (paramArray.p2 != -1) {
		document.getElementById('selectC').value = paramArray.p2;
		paramArray.p2 = -1;
	}
	
	selectchange();
}

// 幻獸一覧
function selectBeast(){

	var select_html = '<select id="selectC" size="1" onchange="selectchange();">';

	select_html += '<optgroup label="二腳獸">';
	for(var i=0;i<beast2soku.length;i++){
		if(wapondataB[beast2soku[i][0]][1] != 0 || wapondataB[beast2soku[i][0]+1][1] != 0){
			select_html += "<option value="+beast2soku[i][0]+" label="+beast2soku[i][1]+">"+beast2soku[i][1]+"</option>";
		}
	}
	select_html += '<optgroup label="小型四腳獸獣">';
	for(var i=0;i<beast4sokuS.length;i++){
		if(wapondataB[beast4sokuS[i][0]][1] != 0 || wapondataB[beast4sokuS[i][0]+1][1] != 0){
			select_html += "<option value="+beast4sokuS[i][0]+" label="+beast4sokuS[i][1]+">"+beast4sokuS[i][1]+"</option>";
		}
	}
	select_html += '<optgroup label="大型四腳獸">';
	for(var i=0;i<beast4sokuB.length;i++){
		if(wapondataB[beast4sokuB[i][0]][1] != 0 || wapondataB[beast4sokuB[i][0]+1][1] != 0){
			select_html += "<option value="+beast4sokuB[i][0]+" label="+beast4sokuB[i][1]+">"+beast4sokuB[i][1]+"</option>";
		}
	}
	select_html += '<optgroup label="蟲">';
	for(var i=0;i<beastmushi.length;i++){
		if(wapondataB[beastmushi[i][0]][1] != 0 || wapondataB[beastmushi[i][0]+1][1] != 0){
			select_html += "<option value="+beastmushi[i][0]+" label="+beastmushi[i][1]+">"+beastmushi[i][1]+"</option>";
		}
	}
	select_html += '<optgroup label="爬蟲類">';
	for(var i=0;i<beasthatyuurui.length;i++){
		if(wapondataB[beasthatyuurui[i][0]][1] != 0 || wapondataB[beasthatyuurui[i][0]+1][1] != 0){
			select_html += "<option value="+beasthatyuurui[i][0]+" label="+beasthatyuurui[i][1]+">"+beasthatyuurui[i][1]+"</option>";
		}
	}
	select_html += '<optgroup label="水生生物">';
	for(var i=0;i<beastsuisei.length;i++){
		if(wapondataB[beastsuisei[i][0]][1] != 0 || wapondataB[beastsuisei[i][0]+1][1] != 0){
			select_html += "<option value="+beastsuisei[i][0]+" label="+beastsuisei[i][1]+">"+beastsuisei[i][1]+"</option>";
		}
	}
	select_html += '<optgroup label="植物">';
	for(var i=0;i<beastsyoku.length;i++){
		if(wapondataB[beastsyoku[i][0]][1] != 0 || wapondataB[beastsyoku[i][0]+1][1] != 0){
			select_html += "<option value="+beastsyoku[i][0]+" label="+beastsyoku[i][1]+">"+beastsyoku[i][1]+"</option>";
		}
	}
	select_html += '<optgroup label="飛行">';
	for(var i=0;i<beasthikou.length;i++){
		if(wapondataB[beasthikou[i][0]][1] != 0 || wapondataB[beasthikou[i][0]+1][1] != 0){
			select_html += "<option value="+beasthikou[i][0]+" label="+beasthikou[i][1]+">"+beasthikou[i][1]+"</option>";
		}
	}
	select_html += '<optgroup label="人型">';
	for(var i=0;i<beasthitogata.length;i++){
		if(wapondataB[beasthitogata[i][0]][1] != 0 || wapondataB[beasthitogata[i][0]+1][1] != 0){
			select_html += "<option value="+beasthitogata[i][0]+" label="+beasthitogata[i][1]+">"+beasthitogata[i][1]+"</option>";
		}
	}
	select_html += '<optgroup label="魔法生物">';
	for(var i=0;i<beastmahou.length;i++){
		if(wapondataB[beastmahou[i][0]][1] != 0 || wapondataB[beastmahou[i][0]+1][1] != 0){
			select_html += "<option value="+beastmahou[i][0]+" label="+beastmahou[i][1]+">"+beastmahou[i][1]+"</option>";
		}
	}
	select_html += '<optgroup label="不死怪">';
	for(var i=0;i<beastandead.length;i++){
		if(wapondataB[beastandead[i][0]][1] != 0 || wapondataB[beastandead[i][0]+1][1] != 0){
			select_html += "<option value="+beastandead[i][0]+" label="+beastandead[i][1]+">"+beastandead[i][1]+"</option>";
		}
	}
	select_html += '<optgroup label="特殊">';
	for(var i=0;i<beasttokusyu.length;i++){
		if(wapondataB[beasttokusyu[i][0]][1] != 0 || wapondataB[beasttokusyu[i][0]+1][1] != 0){
			select_html += "<option value="+beasttokusyu[i][0]+" label="+beasttokusyu[i][1]+">"+beasttokusyu[i][1]+"</option>";
		}
	}

	select_html += '</select>';
	document.getElementById("td1").innerHTML = select_html;
	
	gChangeFlg = true;
	
	if (paramArray.p2 != -1) {
		document.getElementById('selectC').value = paramArray.p2;
		paramArray.p2 = -1;
	}
	
	selectchange();
}

// 初期設定
function Init(){
	var urlParam = location.search.substring(1);
	
	if(urlParam){
		var param = urlParam.split('&');
		for (i = 0; i < param.length; i++) {
			var paramItem = param[i].split('=');
			paramArray[paramItem[0]] = paramItem[1];
		}
		
		if (paramArray.p1 == 0) {
			document.getElementById("radioh").checked = true;
			selectHero();
		} else {
			document.getElementById("radiob").checked = true;
			selectBeast();
		}
	}else{
		selectHero();
	}

}
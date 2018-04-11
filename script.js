
function get_coords(t){
	return [$(t).attr('data-x'), $(t).attr('data-y')]
}


function block_click(t){
	[x,y] = get_coords(t)
	select_symb(x,y)
}

function select_symb(x,y){
	console.log(game.win)
	if(game.win) {
		return
	}
	if(game.pole[y][x]){
		show_message('Это поле уже занято')
		return
	}
	set_symbol(x,y,game.hod)
	draw_symb()
	if(win=check_win()){
		show_message('Победили '+win)
		game.win = true
		console.log(game.win)
		return
	}
	if(check_nope()){
		show_message('Ничья')
		game.win = true
		return
	}
	
	
	change_symb()
	
}
function block_hover(t){
	[x,y] = get_coords(t)
	if(game.pole[y][x]) return
	n = (x-0)+(y*game.size_x-0)
	color = n%2 ? '#dfd': '#575' ;
	document.getElementById('BoxChaser_'+x+'_'+y).setAttribute('set_destination', color)
}
function block_out(t){
	[x,y] = get_coords(t)
	n = (x-0)+(y*game.size_x-0)
	color = n%2 ? '#eee': '#666' ;
	document.getElementById('BoxChaser_'+x+'_'+y).setAttribute('set_destination', color)
}

function show_message(text){
	console.log(text)
	$('#status').attr('string',text)
}

function change_symb(){
	game.hod = game.hod=='O' ? 'X' : 'O'
	show_message('Сейчас ходят '+game.hod)
}

function set_symbol(x,y,v){
	game.pole[y][x] = v
}

function check_win(){
	win = false
	c = false
	i = 0
	min = Math.min(game.size_x,game.size_y)
	
	if(!win)
	for(var y=0; y<game.size_y; y++){
		c = game.pole[y][0]
		if(c!='') {
		var next = false;
		for(var x=0, i=0; x<game.size_x; x++, i++){
			if(c!=game.pole[y][x]) {next=true;break}
		}
		if(next==false && i==min){win=true;break;}
		}
	}
	
	if(!win)
	for(var x=0; x<game.size_x; x++){
		c = game.pole[0][x]
		if(c!='') {
		var next = false;
		for(var y=0, i=0; y<game.size_y; y++, i++){
			if(c!=game.pole[y][x]) {next=true;break}
		}
		if(next==false && i==min){win=true;break;}
		}
	}
	
	if(!win){
		c = game.pole[0][0]
		if(c!='') {
		var next = false;
		for(var x=0, i=0; x<game.size_x; x++, i++){
			if(c!=game.pole[x][x]) {next=true;break}
		}
		if(next==false && i==min){win=true;}
		}
	}
	if(!win){
		c = game.pole[game.size_x-1][0]
		if(c!='') {
		var next = false;
		for(var x=0, i=0; x<game.size_x; x++, i++){
			if(c!=game.pole[game.size_x-1-x][x]) {next=true;break}
		}
		if(next==false && i==min){win=true;}
		}
	}
	
	if(win) console.log('Победа '+c)
		if(win) return c
}

function check_nope(){
	for(var y=0; y<game.size_y; y++){
	for(var x=0, i=0; x<game.size_x; x++, i++){
		if(game.pole[y][x]=='') return false
	}
	}
	return true
}

function draw_symb(){
	if(!game) return
	$('.block').each(function(){
			[x,y] = get_coords(this)
			var text = 'nope'
			if(game.pole[y][x]=='X') text='x'
			if(game.pole[y][x]=='O') text='o'
			$('[DEF="point_'+x+'_'+y+'"]').find('Appearance ImageTexture').attr('url',text+'.png')
			
		
	})
}


function restart(){
	game=jQuery.extend(true, {}, def_game);
	draw_symb();
}

function key_press(e){
	switch(e.key){
		case "1": select_symb(0,0); break;
		case "2": select_symb(1,0); break;
		case "3": select_symb(2,0); break;
		case "4": select_symb(0,1); break;
		case "5": select_symb(1,1); break;
		case "6": select_symb(2,1); break;
		case "7": select_symb(0,2); break;
		case "8": select_symb(1,2); break;
		case "9": select_symb(2,2); break;
	}
}
	
$(function(){restart()})
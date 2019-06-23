const car_color = ['black', 'white', 'blue', 'red'];
const alphas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var parking = [];

$(function(){

	$('.ui.search.dropdown.car-search').dropdown({
    	allowAdditions: true
  	});

});

class Car {

    constructor(registration, color, slot) {

        this.registration = registration;
        this.color = color;
        this.slot = slot;
    }

    getRegistration() {
        return `${this.registration}`;
    }

    getColor() {
        return `${this.color}`;
    }

    getSlot() {
        return `${this.slot}`;
    }
}

function createParking(){
	var slots = $("input[name=input-slot]").val();

	if($.isNumeric(slots)){
		parking = [];
		$('.car-enter').removeClass('ds-hidden');
		$('#car-container').html('<tr id="car-item" class="car-item ds-hidden"><td></td><td></td><td></td><td><button class="ui button negative" onclick="exitCar(this)">Remove</button></td></tr>');

		for(var i = 1 ; i <= slots ; i++){

			var carObj = createCar(i);
			parking[i-1] = carObj;
			
			cloneCar(carObj);
		}
		
	}
	else{
		alert('Enter a valid number');
	}
}

function randomNumber(min,max){
    var random = Math.floor(Math.random() * (max - min)) + min; 
    return random;
}

function createCar(i){
	var color = car_color[ randomNumber(0,4)];
	var number = 'KA-';
	number = number + randomNumber(0,10) + '' + randomNumber(0,10) + '-' + alphas.charAt(randomNumber(0,26)) + alphas.charAt(randomNumber(0,26)) + '-' + randomNumber(1000,9999);
	var carObj = new Car(number, color, i);
	return carObj;
}

function cloneCar(carObj){
	var car_item = $('#car-item').clone();
	car_item.find('td:nth-child(1)').html(carObj.slot);
	car_item.find('td:nth-child(2)').html(carObj.registration);
	car_item.find('td:nth-child(3)').html(carObj.color);
	//car_item.find('td:nth-child(4) .ui.button').attr('onclick', 'javascript:void(0)');
	car_item.removeClass('ds-hidden');
	car_item.removeAttr('id');
	$('#car-container').append(car_item);
}

function exitCar(ref){
	var emptied_slot = ($(ref).parents('.car-item').find('td:nth-child(1)').html()).trim();
	$(ref).parents('.car-item').find('td:nth-child(2)').html('');
	$(ref).parents('.car-item').find('td:nth-child(3)').html('');
	$(ref).parents('.car-item').find('td:nth-child(4)').html('');
	parking[emptied_slot-1] = null;
}

function enterCar(){
	var number = $("input[name=input-car1]").val() + '-' + $("input[name=input-car2]").val() + '-' + $("input[name=input-car3]").val() + '-' + $("input[name=input-car4]").val();
	if(number.length == 13){
		for(var i = 0 ; i < parking.length ; i++){
			if(parking[i] == null){
				var color = car_color[ randomNumber(0,4)];
				var carObj = new Car(number, color, i+1);
				parking[i] = carObj;

				$('#car-container .car-item:nth-child('+(i+2)+')').find('td:nth-child(2)').html(carObj.registration);
				$('#car-container .car-item:nth-child('+(i+2)+')').find('td:nth-child(3)').html(carObj.color);
				$('#car-container .car-item:nth-child('+(i+2)+')').find('td:nth-child(4)').html('<button class="ui button negative" onclick="exitCar(this)">Remove</button>');
				return;
			}
		}
	}
	else{
		alert("Enter valid car number");
	}

}

function searchCar(){
	var search_car = $('.car-search .text').html().trim().toLowerCase();
	switch(search_car){
		case 'black':
			showResult(search_car, 'color');
		break;
		case 'white':
			showResult(search_car, 'color');
		break;
		case 'blue':
			showResult(search_car, 'color');
		break;
		case 'red':
			showResult(search_car, 'color');
		break;
		default:
			if(search_car.length != 13){
				alert('Invalid Car');
				return;
			}
			showResult(search_car, 'registration');
		break;
	}
}

function showResult(search_car, flag){
	$('#search-result').html('Slots : ');
	var result_str = '';
	for (var i = 0 ; i < parking.length ; i++){
		if(parking[i] != null){
			if(flag == 'color'){
				if(parking[i].color == search_car){
					result_str += (i+1) + ', ';
				}
			}
			else if(flag == 'registration'){
				if(parking[i].registration.toLowerCase() == search_car.toLowerCase()){
					result_str += (i+1) + ', ';
				}
			}
		}
	}
	result_str = result_str.substr(0, result_str.length - 2);
	$('#search-result').append(result_str);
}
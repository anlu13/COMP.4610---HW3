/* function main() { */
getInputValues();

// When button is clicked, calls the function to populate the table
document.getElementById("button").addEventListener("click", getInputValues);

// creates dynamic multiplication table
function getInputValues() {
	// get all input from user and validate it
	var input = validateInput();
	// if invalid input, return failure
	if (input == false) {
		return 1;
	}

	// delete the old table
	var table = document.getElementById("table");
	table.remove();

	// creates new HTML table
	var table_Parent_Div = document.getElementById("col_table");
	var new_Table = document.createElement("table");
	// assign new_Table's id to "table"
	new_Table.id = "table";
	// append the table to the div
	table_Parent_Div.appendChild(new_Table);

	// create table head and body
	var new_Table_Head = document.createElement("thead");
	var new_Table_Body = document.createElement("tbody");
	// add table head and body to table
	new_Table.appendChild(new_Table_Head);
	new_Table.appendChild(new_Table_Body);

	// create table row
	var new_Table_Row = document.createElement("tr");
	// add table row to table
	new_Table_Head.appendChild(new_Table_Row);

	// create table head
	var new_Table_Head = document.createElement("th");
	// add table head to table
	new_Table_Row.appendChild(new_Table_Head);
	var new_Table_Head = document.createElement("th");
	new_Table_Row.appendChild(new_Table_Head);

	// pair together the table's head and body, add to table
	var table_Head_table_Body_Pair = document.getElementById("table").children;
	var table_Head = table_Head_table_Body_Pair[0];
	var table_Row_Collection = table_Head.children;
	console.log(table_Row_Collection);

	// pair together the column, add to table
	var table_Col_Headers = table_Row_Collection[0].children;
	console.log(table_Col_Headers);
	table_Col_Headers[1].innerHTML = input.minColVal;
	console.log(table_Col_Headers[1]);

	// populate the top row + column headers
	// traverse from the minimum column value to the maximum column value
	for (var i = input.minColVal + 1; i <= input.maxColVal; i++) {
		// create a new table head
		var new_Table_Head = document.createElement("th");
		// create a text node
		var text_Node = document.createTextNode(i);
		// add text node to table head
		new_Table_Head.appendChild(text_Node);
		// add table column to table's row collection
		table_Row_Collection[0].appendChild(new_Table_Head);
	}
    
    // traverse from minimum row value to maximum row value 
    for (var j = input.minRowVal; j <= input.maxRowVal; j++) {
        // create a new row
        var new_Table_Row = document.createElement("tr");
        // add to table 
		table_Head_table_Body_Pair[1].appendChild(new_Table_Row);
		// create last table's row
		var last_Table_Row = table_Head_table_Body_Pair[1].lastElementChild;
		// create new table head
		var new_Table_Head = document.createElement("th");

		var text_Node = document.createTextNode(j);
		new_Table_Head.appendChild(text_Node);
		last_Table_Row.appendChild(new_Table_Head);

		// populate in the row
		// traverse from minimum column value to maximum column value
		for (var x = input.minColVal; x <= input.maxColVal; x++) {
			// fill in the row
			var new_Table_d = document.createElement("td");
			var text_Node = document.createTextNode(x * j);
			new_Table_d.appendChild(text_Node);
			// add to row
			last_Table_Row.appendChild(new_Table_d);
		}
	}
}

// this function validates all the input: ensures only numbers entered, min isnt larger than max, etc.
function validateInput() {
	// minimum column element in "min_col" box
	var min_Col_Element = document.getElementById("min_col");
	// maxiumum column element in "max_col" box
	var max_Col_Element = document.getElementById("max_col");
	// minimum row element in "min_row" box
	var min_Row_Element = document.getElementById("min_row");
	// maxiumum row element in "max_row" box
	var max_Row_Element = document.getElementById("max_row");

	// minimum column value in "Minimum Column Value" box
	var min_Col_Value = checkIfInt(document.getElementById("min_col").value);
	// maximum column value in "Maximum Column Value" box
	var max_Col_Value = checkIfInt(document.getElementById("max_col").value);
	// minimum row value in "Minimum Row Value" box
	var min_Row_Value = checkIfInt(document.getElementById("min_row").value);
	// maximum row value in "Maximum Row Value" box
	var max_Row_Value = checkIfInt(document.getElementById("max_row").value);

	// the error message
	var error_Message = document.getElementById("error");

	// input is a dictionary, holding the values from the input boxes
	var input = {minCol: [min_Col_Value, min_Col_Element], maxCol: [max_Col_Value, max_Col_Element], minRow: [min_Row_Value, min_Row_Element], maxRow: [max_Row_Value, max_Row_Element]};
	// loop through the input dictionary
	for (let i in input) {
		// if an input value is invalid,
		if (input[i][0] == false) {
			// output the error message
			error_Message.innerHTML = "A non-integer value was entered.";
			// color that input value red
			input[i][1].style.color = "red";
			// return invalid
			return false;
		}
		// if the input is out of bounds (ie <-50 or >50)
		if (input[i][0] < -50 || input[i][0] > 50) {
			// output the error message
			error_Message.innerHTML = "The value you entered is out of range: -50 <= value <= 50.";
			// color that input value red
			input[i][1].style.color = "red";
			// return invalid
			return false;
		}
	}

	// if the minimum column value is > than the maximum column value
	if (min_Col_Value > max_Col_Value) {
		// output the error message
		error_Message.innerHTML = "The Minimum Column Value cannot be larger than the Maximum Column Value.";
		// color that input values red
		input.minCol[1].style.color = "red";
		input.maxCol[1].style.color = "red";
		// return invalid
		return false;
	}

	// if the minimum row value is > than the maximum row value
	if (min_Row_Value > max_Row_Value) {
		// output the error message
		error_Message.innerHTML = "The Minimum Row Value cannot be larger than the Maximum Row Value.";
		// color that input values red
		input.minRow[1].style.color = "red";
		input.maxRow[1].style.color = "red";
		// return invalid
		return false;
	}

    // reset colors from red back to black
    // traverse through the input's values
    for (let i in input) {
        // color them black
		input[i][1].style.color = "black";
	}

	// return the input values
	return {minColVal: min_Col_Value, maxColVal: max_Col_Value, minRowVal: min_Row_Value, maxRowVal: max_Row_Value};
}

// checks if input is an integer
function checkIfInt(input_Number) {
	var negative_number_string = "";

    // for negative numbers:
    // if the first character in input_Number is a negative sign
	if (input_Number[0] == "-") {
		// traverse through the number portion (skip the negative sign)
		for (let j = 1; j < input_Number.length; j++) {
			// store in negative_number_string
			negative_number_string += input_Number[j];
		}
		// recall function on the number portion only
		negative_number_string = checkIfInt(negative_number_string);
		// if checkIfInt() returned false, input_Number is not a valid number
		if (negative_number_string == false) {
			// return false
			return false;
		} 
	} else {
		// traverse through (positive or "made positive") input number
		for (let i = 0; i < input_Number.length; i++) {
			// if any digit is not an valid integer digit
			if (isNaN(parseInt(input_Number[i]))) {
				// return false
				return false;
			}
		}
	}

	// empty error message
	var errorMsg = document.getElementById("error");
	errorMsg.innerHTML = "";

	// return the int version of the number
	return parseInt(input_Number);
}

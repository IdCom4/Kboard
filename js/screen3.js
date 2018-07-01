$(document).ready(function() {

	function createNewPerson(names, description, skills) {
		var person = {};

		person.names = names;
		person.namesIndex = 0;
		person.namesLetterIndex = 0;

		person.description = description;
		person.descriptionIndex = 0;
		person.descriptionLetterIndex = 0;

		person.domObject = $("#" + names[0]);
		person.namesCursor = $("#" + names[0] + " .names .cursor");
		person.descriptionCursor = $("#" + names[0] + " .description .cursor");

		person.currentWritingSection = "NAMES";

		person.skills = skills;

		return person;
	}

	var seconds = 0;
	var lastTime = seconds;
	var cursorBlink = 0;

	var currentWritingSection = "NAMES";

	var persons = new Array();

	persons.push(createNewPerson(["ADRIEN", "BAUDRY"], 
								["5 YEARS OF CODING EXPERIENCE", ".", "HE LIKES ", "JAVA", ", ","REST API", " AND ", "CLEAN CODE", "."],
								["JAVA", "REST API", "CLEAN CODE"]));

	persons.push(createNewPerson(["IDRISS", "CORNUAU"], 
								["EX FRENCH SPECIAL FORCE", ".", "STUDENT OF 42 SCHOOL", ".", "HE LIKES ", "C", ", GAMES AND ", "ALGORITHMS", "."],
								["C", "ALGORITHMS"]));

	persons.push(createNewPerson(["ALEXIS", "JOURNAULT"], 
								["5 YEARS OF COPYWRITING EXPERIENCE", ".", "HE ADDS TO HIS BACKGROUND SOME DEVELOPPMENT SKILLS", ".", "HE LIKES ", "UX", " AND ", "ANGULAR", "."],
								["UX", "ANGULAR"]));

	function isWritingSectionOver(writingSection) {
		for(var personIndex = 0; personIndex < persons.length; personIndex++) {
			if(persons[personIndex].currentWritingSection == writingSection) {
				return false;
			}
		}

		return true;
	}

	function blinkCursor(cursor) {
		if(cursorBlink % 8 == 0) {
			cursor.css("opacity", "0");
		}
		if(cursorBlink % 8 == 4) {
			cursor.css("opacity", "1");
		}
	}

	function shutDownNamesCursors() {
		for(var personIndex = 0; personIndex < persons.length; personIndex++) {
			persons[personIndex].namesCursor.css("opacity", "0");
		}
	}

	function highlightSkills() {
		$(".skill").css("color", "white");
	}

	function isDescPartASkill(descriptionPart, skills) {
		for(var skillIndex = 0; skillIndex < skills.length; skillIndex++) {
			if(descriptionPart == skills[skillIndex]) {
				return true;
			}
		}

		return false;
	}

	setTimeout(startScreen3Interval, 23000);

	function startScreen3Interval() {
		setInterval(function() {
			seconds++;
		}, 1000);
		screen3Interval = setInterval(function() {
			if(currentWritingSection == "NAMES") {
				for(var personIndex = 0; personIndex < persons.length; personIndex++) {
					if(persons[personIndex].currentWritingSection == "NAMES") {
						var names = persons[personIndex].names;
						var namesIndex = persons[personIndex].namesIndex;
						var namesLetterIndex = persons[personIndex].namesLetterIndex;
						var namesCursor = persons[personIndex].namesCursor;

						if(namesLetterIndex == 0) {
							var newSpan = '<span id="name-'+ namesIndex +'"></span>';
							$(newSpan).insertBefore(namesCursor);
						}

						var currentSpan = $("#thirdPitch #"+ names[0] +" #name-"+ namesIndex);
						currentSpan.text(currentSpan.text() + names[namesIndex][namesLetterIndex]);
						persons[personIndex].namesLetterIndex++;

						if(namesLetterIndex + 1 >= names[namesIndex].length) {
							persons[personIndex].namesLetterIndex = 0;
							persons[personIndex].namesIndex++;
							if(namesIndex + 1 >= names.length) {
								persons[personIndex].currentWritingSection = "DESCRIPTION";
								lastTime = seconds;
							}
							else {
								$("<br/>").insertBefore(namesCursor);
							}
						}
					}
					else {
						blinkCursor(persons[personIndex].namesCursor);
					}
				}
				if(isWritingSectionOver("NAMES")) {
					for(var personIndex = 0; personIndex < persons.length; personIndex++) {
						blinkCursor(persons[personIndex].namesCursor);
					}
					if(seconds - lastTime >= 2) {
						currentWritingSection = "DESCRIPTION";
						shutDownNamesCursors();
						for(var personIndex = 0; personIndex < persons.length; personIndex++) {
							persons[personIndex].descriptionCursor.css("opacity", "1");
						}
					}
				}
			}
			else if (currentWritingSection == "DESCRIPTION") {
				for(var personIndex = 0; personIndex < persons.length; personIndex++) {
					if(persons[personIndex].currentWritingSection == "DESCRIPTION") {

						var names = persons[personIndex].names;
						var description = persons[personIndex].description;
						var descriptionIndex = persons[personIndex].descriptionIndex;
						var descriptionLetterIndex = persons[personIndex].descriptionLetterIndex;
						var skills = persons[personIndex].skills;
						var descriptionCursor = persons[personIndex].descriptionCursor;

						if(descriptionLetterIndex == 0) {
							var newSpan;
							
							if(isDescPartASkill(description[descriptionIndex], skills)) {
								newSpan = '<span id="description-'+ descriptionIndex +'" class="skill"></span>'
							}
							else {
								newSpan = '<span id="description-'+ descriptionIndex +'"></span>';
							}
							$(newSpan).insertBefore(descriptionCursor);
						}

						var currentSpan = $("#thirdPitch #"+ names[0] +" #description-"+ descriptionIndex);
						currentSpan.text(currentSpan.text() + description[descriptionIndex][descriptionLetterIndex]);
						persons[personIndex].descriptionLetterIndex++;

						if(descriptionLetterIndex + 1 >= description[descriptionIndex].length) {
							persons[personIndex].descriptionLetterIndex = 0;
							persons[personIndex].descriptionIndex++;
							if(descriptionIndex + 1 >= description.length) {
								persons[personIndex].currentWritingSection = "FINISH";
								lastTime = seconds;
							}
							else if(description[descriptionIndex] == ".") {
								$("<br/>").insertBefore(descriptionCursor);
							}
						}
					}
					else {
						blinkCursor(persons[personIndex].descriptionCursor);
					}
				}
				if(isWritingSectionOver("DESCRIPTION")) {
					for(var personIndex = 0; personIndex < persons.length; personIndex++) {
						blinkCursor(persons[personIndex].descriptionCursor);
					}
					if(seconds - lastTime >= 1) {
						currentWritingSection = "FINISH";
						highlightSkills();
					}
				}
			}
			else {
				for(var personIndex = 0; personIndex < persons.length; personIndex++) {
					blinkCursor(persons[personIndex].descriptionCursor);
				}
			}
			cursorBlink++;
		}, 100);
	}
});
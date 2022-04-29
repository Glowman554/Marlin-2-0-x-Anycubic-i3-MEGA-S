if (Deno.args.length != 2) {
	console.log("Usage: chord_parse <in> <out>");
	Deno.exit(1);
}

var note_len = 100;

var file = Deno.readTextFileSync(Deno.args[0]);

var notes = [];

// note must contain length of note (in ms) and the octave of the note and the note itself

var last_note = 0;

file.split("\n\n").forEach(function(section) {
	var octaves = [];

	section.split("\n").forEach(function(octave) {
		if (octave.endsWith("|")) {
			octave = octave.substring(0, octave.length - 1);
		}

		var num_octave = octave.split("|")[0];

		octaves.push({
			num_octave: num_octave,
			notes: octave.split("|")[1].split("")
		});
	});

	for (let i = 0; i < octaves[0].notes.length; i++) {
		for (let j = 0; j < octaves.length; j++) {
			if (octaves[j].notes[i] != "-") {
				var obj = {
					length: 0,
					octave: octaves[j].num_octave,
					note: octaves[j].notes[i]
				};

				if (notes.length != 0) {
					notes[notes.length - 1] = {
						...notes[notes.length - 1],
						length: (last_note - note_len == 0) ? note_len / 2 : last_note - note_len
					};
				}

				notes.push(obj);
				last_note = 0;
				break;
			}
		}
		last_note += note_len;
	}
});

notes[notes.length - 1] = {
	...notes[notes.length - 1],
	length: note_len
};



function note_to_int(note) {
	switch (note) {
		case "c": return 0;
		case "C": return 1;
		case "d": return 2;
		case "D": return 3;
		case "e": return 4;
		case "f": return 5;
		case "F": return 6;
		case "g": return 7;
		case "G": return 8;
		case "a": return 9;
		case "A": return 10;
		case "b": return 11;
		default: throw new Error("Invalid note " + note);
	}
}

var notes_to_freq_table = [
	[ 18243, 17219, 16252, 15340, 14479, 13666, 12899, 12175, 11492, 10847, 10238, 9664 ],
	[ 9121, 8609, 8126, 7670, 7240, 6833, 6450, 6088, 5746, 5424, 5119, 4832 ],
	[ 4561, 4305, 4063, 3835, 3620, 3417, 3225, 3044, 2873, 2712, 2560, 2416 ],
	[ 2280, 2152, 2032, 1918, 1810, 1708, 1612, 1522, 1437, 1356, 1280, 1208 ],
	[ 1140, 1076, 1016, 959, 905, 854, 806, 761, 718, 678, 640, 604 ],
	[ 570, 538, 508, 479, 452, 427, 403, 380, 359, 339, 320, 302 ],
	[ 285, 269, 254, 240, 226, 214, 202, 190, 180, 170, 161, 153 ],
];

var gcode = [];

notes.forEach(function(note, index) {
	gcode.push(`M42069 ${note.length} ${notes_to_freq_table[note.octave][note_to_int(note.note)]}`);
	gcode.push(`G4 P${note.length + 50}`);
});

console.log("Parsed " + notes.length + " notes");

var gcode_str = gcode.join("\n");

Deno.writeTextFileSync(Deno.args[1], gcode_str);
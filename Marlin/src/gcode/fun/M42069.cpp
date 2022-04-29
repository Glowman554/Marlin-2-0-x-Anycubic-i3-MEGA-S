#include "../gcode.h"

#include "../../MarlinCore.h"
#include "../../libs/buzzer.h"

void GcodeSuite::M42069() {
	size_t len = strlen(parser.string_arg);

	int duration = 0;
	int frequency = 0;

	char cpy[64];
	strncpy(cpy, parser.string_arg, min(len, 63));

	char *pch = strtok(cpy, " ");
	if (pch != NULL) {
		duration = atoi(pch);
		pch = strtok(NULL, " ");
		if (pch != NULL) {
			frequency = atoi(pch);
		} else {
			SERIAL_ECHO_MSG("M42069: missing frequency");
			return;
		}
	} else {
		SERIAL_ECHO_MSG("M42069: missing duration");
		return;
	}

	buzzer.tone(duration, frequency);
}
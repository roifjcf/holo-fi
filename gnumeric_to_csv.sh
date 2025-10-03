
#!/bin/bash
# convert .gnumeric to .csv

INPUT="tracks-original-en.gnumeric"
OUTPUT="tracks-original-en.csv"

ssconvert "$INPUT" "$OUTPUT"
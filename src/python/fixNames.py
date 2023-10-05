import json
import re

# Read the JSON file as a raw string
with open('./sortedHexNames.json', 'r') as file:
    raw_content = file.read()

# Function to replace escape sequences with an empty string
def replace_escape(match):
    try:
        return bytes(match.group(0), "utf-8").decode("unicode_escape")
    except:
        return ""

# Use a regex to find and remove all such sequences
cleaned_content = re.sub(r'\\[^"]', replace_escape, raw_content)

# Parse cleaned content back to a dictionary
cleaned_colors = json.loads(cleaned_content)

# Save the cleaned colors back to the JSON file
with open('cleanedSortedColorNames.json', 'w') as file:
    json.dump(cleaned_colors, file, indent=4)

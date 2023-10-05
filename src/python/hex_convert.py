import json

# Load the JSON file
with open('./hexNames.json', 'r') as file:
    colors = json.load(file)

# Sort the colors by their hex value
sorted_colors = dict(sorted(colors.items(), key=lambda item: item[0]))

# Save the sorted colors back to the JSON file
with open('newHexNames.json', 'w') as file:
    json.dump(sorted_colors, file, indent=4)

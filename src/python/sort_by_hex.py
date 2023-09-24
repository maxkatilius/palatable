import json

# Read the colorNames.js file
with open('../colorNames.json', 'r') as file:
    content = file.read()

# Strip export statements
content = content.replace("export const colorNames =", "").replace("export default colorNames;", "").strip()

# Convert to valid JSON (in case there are other issues)
content = content.replace("'", '"')

# Now attempt to parse the modified content as JSON
colorNames = json.loads(content)

# Sort by the hex value
sorted_colorNames = sorted(colorNames, key=lambda x: x['hex'])

# Write the sorted list back to a .js file
with open('colorNames_sorted.js', 'w') as file:
    file.write("export const colorNames = [\n")
    for entry in sorted_colorNames:
        file.write(f'    {{ hex: "{entry["hex"]}", name: "{entry["name"]}" }},\n')
    file.write("];\n\nexport default colorNames;\n")

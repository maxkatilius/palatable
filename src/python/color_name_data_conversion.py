import json

# Load the JSON file
with open('./hexNames.json', 'r') as f:
    data = json.load(f)

# Transform data
color_names = [{"hex": f"#{hex_value}", "name": name} for hex_value, name in data.items()]

# Write the transformed data to a new JavaScript file
with open('names.js', 'w') as f:
    f.write("const colorNames = [\n")
    for item in color_names:
        f.write(f"    {{ hex: \"{item['hex']}\", name: \"{item['name']}\" }},\n")
    f.write("];\n\n")
    f.write("export default colorNames;\n")

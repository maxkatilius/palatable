import json

# Read the input file
with open('./color-names-raw.json', 'r') as file:
    data = json.load(file)

# Convert the data format
converted_big_data = {item['hex'].lstrip('#').upper(): item['name'] for item in data}

# Write the converted data to an output file
with open('output.json', 'w') as file:
    json.dump(converted_big_data, file, indent=4)

print("Conversion complete!")

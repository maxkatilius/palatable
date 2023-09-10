import json

# Step 1: Load both JSON files
with open('./hex2.json', 'r') as f1:
    data1 = json.load(f1)

with open('./output.json', 'r') as f2:
    data2 = json.load(f2)

# Step 2: Combine the data. If there's a duplicate hex value, the value from file2 will overwrite the one from file1.
combined_data = {**data1, **data2}

# Step 3: Save the combined data to a new JSON file
with open('hex_names.json', 'w') as outfile:
    json.dump(combined_data, outfile, indent=4)

print("Data saved to hex_names.json")

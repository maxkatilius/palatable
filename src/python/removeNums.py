import json
import re

# Step 1: Read the JSON file
with open('hexNames.json', 'r') as f:
    data = json.load(f)

# This function checks if the name field has any anomalies
def has_anomaly(color_name):
    # This regex checks for digits in the name.
    return bool(re.search(r'\d', color_name))

# This function tries to correct the anomalies
# Currently, it just removes numbers, but it can be expanded based on the anomaly patterns.
def correct_anomaly(color_name):
    # Remove digits
    corrected_name = re.sub(r'\d', '', color_name)
    
    # If after correction, the name is still meaningful, return it. Otherwise, return None.
    return corrected_name.strip() if corrected_name.strip() else None

# Step 2, 3, 4: Identify, correct, or remove anomalies
cleaned_data = []
for entry in data:
    if has_anomaly(entry['name']):
        corrected_name = correct_anomaly(entry['name'])
        if corrected_name:
            entry['name'] = corrected_name
            cleaned_data.append(entry)
    else:
        cleaned_data.append(entry)

# Step 5: Write the cleaned dataset back to the JSON file
with open('cleaned_colors.json', 'w') as f:
    json.dump(cleaned_data, f, indent=4)

print("Data cleaning complete!")

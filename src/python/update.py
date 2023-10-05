import re

# Read the file content
with open('./hexNames.json', 'r') as file:
    content = file.read()

# Replace single-quoted keys with double-quoted keys
content = re.sub(r'(\s)(hex|name)(\s*:)', r'\1"\2"\3', content)

# Write the fixed content back to the file
with open('newHexNames.json', 'w') as file:
    file.write(content)

print("newHexNames.json has been updated!")

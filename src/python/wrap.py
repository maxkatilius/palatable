# Script to wrap all the hex and name instances in double quotes

# Read the file into a string
with open("names.js", "r") as f:
    content = f.read()

# Replace any pattern that's not already double quoted with double quotes
content = content.replace("{ hex: ", '{ "hex": ')
content = content.replace(", name: ", ', "name": ')

# Replace single quotes around the hex values and names with double quotes
content = content.replace("'#", '"#')
content = content.replace("',", '",')
content = content.replace(" '", ' "')
content = content.replace("' }", '" }')

# Write the modified content back to the file
with open("newNames.js", "w") as f:
    f.write(content)

print("Finished updating the file!")

import sys
import json

# Read input from Node.js via stdin
input_data = json.load(sys.stdin)

# Example processing: sum the numbers
result = sum(input_data)

# Output result (Node.js reads this)
print(result)
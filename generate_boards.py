import json, random

def generate_board():
    mines = random.sample(range(25), 3)
    return [1 if i in mines else 0 for i in range(25)]

data = []
for _ in range(200):
    board = generate_board()
    data.append({
        "input":  board,
        "output": board
    })

with open("data.json", "w") as f:
    json.dump(data, f)

print("Generated 200 boards with matching outputs.")

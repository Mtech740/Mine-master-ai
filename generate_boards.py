import json, random
def generate_board():
    mines = random.sample(range(25), 3)
    return [1 if i in mines else 0 for i in range(25)]
data = [{"input": generate_board(), "output": [0]*25} for _ in range(200)]
with open("data.json", "w") as f: json.dump(data, f)
print("Generated 200 boards and wrote to data.json")
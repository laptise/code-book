import sys
import os
from templates.get_method_names import get_method_names

args = sys.argv
_, path = args


files = os.listdir(path)


def read_file(file_path: str) -> str:
    with open(file_path) as file:
        return file.read()


res = []

for file_name in files:
    file_path = f"{path}/{file_name}"
    content = read_file(file_path)
    method_names = get_method_names(file_name, content)
    res.append(method_names)

output = ",\n".join(res)
print("{\n" + output+"\n}")

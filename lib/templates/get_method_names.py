import openai
import os


def test():
    print(11)


openai.organization = "org-rG5c1xdMb3ex5Akz6EkhDRm5"
openai.api_key = os.getenv("OPENAI_API_KEY")


def get_method_names(file_name: str, code: str):
    prefix = '''
    Summary the functions defined in the following code as JSON format.
    You must keep this format exactly, No additional explanation needed.
    Rule:
    {
        [definedFunctionName]:
        {
            "steps":
            [
                {
                    "description": [write description here],
                    "external": [If this step calls external function, then write the function's name here],
                    "path":[If this step calls external function, then write the function's path here]
                }
            ],
        }
    }

    Output example:
    {
        "SampleFunc1":
        {
            "steps":
            [
                {
                    "description": "output log 'ABC' to console"
                },
                {
                    "description": "return 'ANSWER'"
                }
            ]
        },
        "SampleFunc2":
        {
            "steps":
            [
                {
                    "description":  "output log 'DEF' to console"
                },
                {
                    "description": "call 'CalledFuncA'",
                    "external" : "CalledFuncA"
                    "path": "importSource.ts"
                }
            ],
        }
    }
    ----------------------------------------------------------------------
    '''
    completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo", messages=[{"role": "user", "content": f"{prefix}\n{code}"}])
    res = completion.choices[0].message.content
    return f"\"{file_name}\":{res}"

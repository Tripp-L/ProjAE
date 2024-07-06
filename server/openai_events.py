import openai
import json
import os

openai.api_key = os.getenv("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")  
def get_historical_event(civilization):
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {
                "role": "user", 
                "content": f"Give me information about a significant historical event related to the {civilization} civilization. Please provide the event name, a brief description, an image URL (from Wikimedia Commons if possible), the date of the event, and some additional details. Format the information in this JSON structure: \n\n`json\n{{\n    \"id\": 1,\n    \"name\": \"Event Name\",\n    \"description\": \"Description of the event\",\n    \"imageurl\": \"Image URL\",\n    \"date\": \"Event Date\",\n    \"civilization\": \"Civilization Name\",\n    \"details\": \"Additional details about the event\"\n}}\n`"
            }
        ]
    )
    return response['choices'][0]['message']['content']

civilizations = [
    "Roman Republic/Empire", "Qin Dynasty", "Phoenician Civilization", "Persian Empire",
    "Minoan Civilization", "Olmec Civilization", "Maya Civilization", "Indus Valley Civilization",
    "Aztec Civilization", "Ancient Egypt", "Ancient Greece", "Mesopotamia",
    "Atlantis", "Ancient China"  
]

final_result = []
for civilization in civilizations:
    civilization_data = {
        "name": civilization,
        "events": []
    }
    
    event_data = get_historical_event(civilization)
    # Parse the JSON response
    try:
        event_json = json.loads(event_data)
        civilization_data["events"].append(event_json)
    except json.JSONDecodeError:
        print(f"Error parsing JSON for {civilization}: {event_data}")

    final_result.append(civilization_data)

print(json.dumps(final_result))  # Output all civilization events
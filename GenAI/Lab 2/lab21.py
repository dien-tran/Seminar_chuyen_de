from openai import OpenAI

# Initialize the client
# If your key is in an environment variable named OPENAI_API_KEY,
# you don't even need to pass it here!
client = OpenAI(api_key="your_openai_api_key_here")

def get_ai_response(prompt):
    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You are a concise assistant."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.7
        )
        
        # Accessing content is much easier with the SDK
        return response.choices[0].message.content

    except Exception as e:
        return f"An error occurred: {e}"

# Usage
print(get_ai_response("Why is Python popular for AI?"))
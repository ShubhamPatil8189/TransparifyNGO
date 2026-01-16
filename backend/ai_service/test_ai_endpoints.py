import requests
import json

BASE_URL = "https://transparifyngo-aiservice.onrender.com"

def test_endpoint(name, method, endpoint, payload=None):
    print(f"Testing {name} ({endpoint})...", end=" ")
    try:
        url = f"{BASE_URL}{endpoint}"
        if method == "GET":
            response = requests.get(url)
        else:
            response = requests.post(url, json=payload)
        
        if response.status_code == 200:
            print("SUCCESS")
            # print(json.dumps(response.json(), indent=2))
        else:
            print(f"FAILED (Status: {response.status_code})")
            print(response.text)
    except Exception as e:
        print(f"ERROR: {str(e)}")

def run_tests():
    # 1. Root
    test_endpoint("Root", "GET", "/")

    # 2. Trust Score (using a placeholder NGO ID)
    test_endpoint("Trust Score", "GET", "/transparency/trust-score/677f864bc149b019dfd76b15")

    # 3. Fund Allocation (using a placeholder Campaign ID)
    test_endpoint("Fund Allocation", "GET", "/transparency/fund-allocation/677f872ec149b019dfd76b32")

    # 4. Report Generation
    report_payload = {
        "ngo_data": {"name": "Test NGO", "total_raised": 50000},
        "report_type": "summary"
    }
    test_endpoint("Report Gen", "POST", "/ai/generate-report", report_payload)

    # 5. Impact Prediction
    impact_payload = {"amount": 5000, "category": "education"}
    test_endpoint("Impact Prediction", "POST", "/ai/impact-prediction", impact_payload)

    # 6. Chat
    chat_payload = {"message": "Hello", "context": {}}
    test_endpoint("Chat", "POST", "/ai/chat", chat_payload)

if __name__ == "__main__":
    run_tests()

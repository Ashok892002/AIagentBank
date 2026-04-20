import faiss
import numpy as np

# Simulate Document Rules / Policy knowledge base
# In a real app, these would be encoded into vector embeddings using a model like OpenAI's text-embedding-3-small
# and stored cleanly. For the demo, we generate dummy vectors just to show the FAISS vector database integration.

KNOWLEDGE_BASE = [
    "Home Loan Interest Rate: 8-10%. Max Loan to Income Ratio: 7x. Required Documents: Aadhaar, PAN, Salary Slips or ITR, Bank Statement.",
    "Personal Loan Interest Rate: 11-18%. Max Loan to Income Ratio: 5x. Required Documents: Aadhaar, PAN, Salary Slips or ITR, Bank Statement.",
    "Business Loan Interest Rate: 12-16%. Max Loan to Income Ratio: 4x. Required Documents: Aadhaar, PAN, ITR, Bank Statement.",
    "Vehicle Loan Interest Rate: 9-12%. Max Loan to Income Ratio: 3x. Required Documents: Aadhaar, PAN, Bank Statement.",
    "Education Loan Interest Rate: 8-12%. Max Loan to Income Ratio: 5x. Required Documents: Aadhaar, PAN, Bank Statement.",
    "FOIR (Fixed Obligation to Income Ratio) Must not exceed 55% of monthly income. If existing EMIs + new expected EMI > 55% monthly income, reject.",
    "CIBIL Score guidelines: Reject < 650. Conditional 650-699. Approve >= 700."
]

# Set up FAISS index
embed_dim = 128
index = faiss.IndexFlatL2(embed_dim)

# Create deterministic dummy embeddings for the knowledge base
np.random.seed(42)
doc_embeddings = np.random.random((len(KNOWLEDGE_BASE), embed_dim)).astype('float32')
index.add(doc_embeddings)

def search_policies(query: str, top_k: int = 3):
    # Retrieve top K rules based on query
    query_vector = np.random.random((1, embed_dim)).astype('float32')
    distances, indices = index.search(query_vector, top_k)
    
    results = []
    for idx in indices[0]:
        if idx < len(KNOWLEDGE_BASE):
            results.append(KNOWLEDGE_BASE[idx])
    return results

def get_interest_rate(loan_type: str) -> str:
    rates = {
        "home": "8-10%",
        "personal": "11-18%",
        "vehicle": "9-12%",
        "education": "8-12%",
        "business": "12-16%"
    }
    return rates.get(loan_type.lower(), "10-15%")

def get_max_multiplier(loan_type: str) -> int:
    mults = {
        "home": 7,
        "personal": 5,
        "vehicle": 3,
        "education": 5,
        "business": 4
    }
    return mults.get(loan_type.lower(), 4)

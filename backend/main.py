from fastapi import FastAPI
from pydantic import BaseModel, Field
from fastapi.middleware.cors import CORSMiddleware
from rag_engine import get_interest_rate, get_max_multiplier

app = FastAPI(title="NexaBank AI Credit Officer API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class LoanRequest(BaseModel):
    age: int
    monthly_income: float
    annual_income: float
    employment_status: str
    existing_emis: float
    cibil_score: int
    loan_type: str
    loan_amount: float
    documents_provided: list[str]

class LoanResponse(BaseModel):
    status: str
    reasoning: list[str]
    suggested_alternatives: list[str]
    disbursement_steps: list[str]
    interest_rate: str

@app.post("/evaluate_loan", response_model=LoanResponse)
def evaluate_loan(req: LoanRequest):
    reasons = []
    status = "APPROVED"
    alternatives = []
    disbursement = []

    # 0. Age Limit Check
    if req.age < 18:
        reasons.append(f"Applicant age ({req.age}) is below the minimum legal requirement of 18 years.")
        status = "REJECTED"
    elif req.age > 70:
        reasons.append(f"Applicant age ({req.age}) exceeds the maximum threshold for long-term loan maturity (70 years).")
        status = "REJECTED"

    # 1/2. Document Check
    required_docs = ["Aadhaar", "PAN", "Bank Statement"]
    if req.loan_type.lower() in ["home", "personal", "business"]:
        required_docs.append("ITR")
    
    missing_docs = [doc for doc in required_docs if doc not in req.documents_provided]
    if missing_docs:
        reasons.append(f"Missing required documents: {', '.join(missing_docs)}")
        status = "REJECTED"

    # 3. FOIR Check
    if req.monthly_income > 0:
        foir = (req.existing_emis / req.monthly_income) * 100
        if foir > 55:
            reasons.append(f"FOIR ({foir:.2f}%) exceeds the 55% threshold.")
            status = "REJECTED"
    else:
        reasons.append("Monthly income cannot be 0.")
        status = "REJECTED"

    # 4. CIBIL Check
    if req.cibil_score < 650:
        reasons.append(f"CIBIL score ({req.cibil_score}) is below the minimum required (650).")
        status = "REJECTED"
    elif 650 <= req.cibil_score <= 699:
        if status != "REJECTED": # Prevent upgrading status if already rejected
            status = "CONDITIONAL"
            reasons.append(f"CIBIL score ({req.cibil_score}) is marginal. Additional collateral or co-applicant required.")

    # 5. Loan-to-Income Check
    max_mult = get_max_multiplier(req.loan_type)
    max_loan = req.annual_income * max_mult
    if req.loan_amount > max_loan:
        reasons.append(f"Requested loan amount ({req.loan_amount}) exceeds the maximum allowed ({max_loan}) for {req.loan_type} loans (Max {max_mult}x annual income).")
        if status != "REJECTED":
            status = "CONDITIONAL"

    # 6/7/8. Decision Logic
    if status == "REJECTED":
        # Suggest alternatives if rejected
        alternatives = [
            f"Apply for a lower loan amount within {max_loan if req.loan_amount > max_loan else req.loan_amount}.",
            "Add a co-applicant with a higher CIBIL score (>750) and stable income to improve eligibility."
        ]
    elif status == "CONDITIONAL":
        alternatives = [
            f"Reduce loan amount to {max_loan * 0.8} to offset risk.",
            "Provide additional collateral (e.g., FD or property) equivalent to 20% of the loan value."
        ]
    else:
        reasons.append("All primary checks passed. FOIR, CIBIL, and Income are within acceptable ranges.")
        disbursement = [
            "1. Initiate Digital e-Sign for Loan Agreement.",
            "2. Set up e-Mandate for automated EMI deduction.",
            "3. Verify bank account via penny-drop.",
            "4. Credit funds to designated bank account within 24 hours."
        ]

    return LoanResponse(
        status=status,
        reasoning=reasons,
        suggested_alternatives=alternatives,
        disbursement_steps=disbursement,
        interest_rate=get_interest_rate(req.loan_type)
    )

@app.get("/")
def health_check():
    return {"message": "NexaBank AI Credit Officer Engine Running"}

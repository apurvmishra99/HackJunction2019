import os
from dotenv import load_dotenv

load_dotenv()
AIVEN_DB_URI = os.getenv("AIVEN_URI")


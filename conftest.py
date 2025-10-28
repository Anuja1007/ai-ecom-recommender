# conftest.py

import sys
import os

# Get the path to the project root (one directory up from where conftest.py is if it were in a test folder)
# Since conftest.py is in the root, we add the current directory.
sys.path.insert(0, os.path.abspath(os.path.dirname(__file__)))